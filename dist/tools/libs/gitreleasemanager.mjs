import * as path from 'path';
import { S as SettingsProvider, D as DotnetTool } from './tools.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:os';
import 'node:path';
import './semver.mjs';

class GitReleaseManagerSettingsProvider extends SettingsProvider {
  getCreateSettings() {
    const name = this.buildAgent.getInput("name");
    const inputFileName = this.buildAgent.getInput("inputFileName");
    const isPreRelease = this.buildAgent.getBooleanInput("isPreRelease");
    const commit = this.buildAgent.getInput("commit");
    const assets = this.buildAgent.getListInput("assets");
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      name,
      inputFileName,
      isPreRelease,
      commit,
      assets
    };
  }
  getDiscardSettings() {
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings
    };
  }
  getCloseSettings() {
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings
    };
  }
  getOpenSettings() {
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings
    };
  }
  getPublishSettings() {
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings
    };
  }
  getAddAssetSettings() {
    const assets = this.buildAgent.getListInput("assets");
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      assets
    };
  }
  getCommonSettings() {
    const milestone = this.buildAgent.getInput("milestone");
    const owner = this.buildAgent.getInput("owner");
    const repository = this.buildAgent.getInput("repository");
    const token = this.buildAgent.getInput("token");
    const targetDirectory = this.buildAgent.getInput("targetDirectory");
    return {
      owner,
      repository,
      token,
      targetDirectory,
      milestone
    };
  }
}

class GitReleaseManagerTool extends DotnetTool {
  get packageName() {
    return "GitReleaseManager.Tool";
  }
  get toolName() {
    return "dotnet-gitreleasemanager";
  }
  get toolPathVariable() {
    return "GITRELEASEMANAGER_PATH";
  }
  get versionRange() {
    return ">=0.10.0 <0.20.0";
  }
  get settingsProvider() {
    return new GitReleaseManagerSettingsProvider(this.buildAgent);
  }
  async create() {
    const settings = this.settingsProvider.getCreateSettings();
    const args = await this.getCreateArguments(settings);
    return await this.executeTool(args);
  }
  async discard() {
    const settings = this.settingsProvider.getDiscardSettings();
    const args = await this.getDiscardArguments(settings);
    return await this.executeTool(args);
  }
  async close() {
    const settings = this.settingsProvider.getCloseSettings();
    const args = await this.getCloseArguments(settings);
    return await this.executeTool(args);
  }
  async open() {
    const settings = this.settingsProvider.getOpenSettings();
    const args = await this.getOpenArguments(settings);
    return await this.executeTool(args);
  }
  async publish() {
    const settings = this.settingsProvider.getPublishSettings();
    const args = await this.getPublishArguments(settings);
    return await this.executeTool(args);
  }
  async addAsset() {
    const settings = this.settingsProvider.getAddAssetSettings();
    const args = await this.getAddAssetArguments(settings);
    return await this.executeTool(args);
  }
  async getCommonArguments(settings) {
    const args = [];
    args.push("--owner", settings.owner);
    args.push("--repository", settings.repository);
    args.push("--token", settings.token);
    settings.targetDirectory = await this.getRepoDir(settings);
    args.push("--targetDirectory", settings.targetDirectory);
    return args;
  }
  async getCreateArguments(settings) {
    const args = ["create", ...await this.getCommonArguments(settings)];
    if (settings.milestone) {
      args.push("--milestone", settings.milestone);
    }
    if (settings.name) {
      args.push("--name", settings.name);
    }
    if (settings.commit) {
      args.push("--targetcommitish", settings.commit);
    }
    if (settings.inputFileName) {
      if (await this.buildAgent.fileExists(settings.inputFileName)) {
        args.push("--inputFilePath", settings.inputFileName);
      } else {
        throw new Error(`GitReleaseManager inputFilePath not found at ${settings.inputFileName}`);
      }
    }
    if (settings.isPreRelease) {
      args.push("--pre");
    }
    if (settings.assets && settings.assets.length > 0) {
      settings.assets = settings.assets.map((asset) => {
        return path.join(settings.targetDirectory, asset);
      });
      args.push("--assets", settings.assets.join(","));
    }
    return args;
  }
  async getDiscardArguments(settings) {
    const args = ["discard", ...await this.getCommonArguments(settings)];
    if (settings.milestone) {
      args.push("--milestone", settings.milestone);
    }
    return args;
  }
  async getCloseArguments(settings) {
    const args = ["close", ...await this.getCommonArguments(settings)];
    if (settings.milestone) {
      args.push("--milestone", settings.milestone);
    }
    return args;
  }
  async getOpenArguments(settings) {
    const args = ["open", ...await this.getCommonArguments(settings)];
    if (settings.milestone) {
      args.push("--milestone", settings.milestone);
    }
    return args;
  }
  async getPublishArguments(settings) {
    const args = ["publish", ...await this.getCommonArguments(settings)];
    if (settings.milestone) {
      args.push("--tagName", settings.milestone);
    }
    return args;
  }
  async getAddAssetArguments(settings) {
    const args = ["addasset", ...await this.getCommonArguments(settings)];
    if (settings.milestone) {
      args.push("--tagName", settings.milestone);
    }
    if (settings.assets && settings.assets.length > 0) {
      settings.assets = settings.assets.map((asset) => {
        return path.join(settings.targetDirectory, asset);
      });
      args.push("--assets", settings.assets.join(","));
    }
    return args;
  }
  async getRepoDir(settings) {
    return await this.getRepoPath(settings.targetDirectory);
  }
}

class Runner {
  constructor(buildAgent) {
    this.buildAgent = buildAgent;
    this.gitReleaseManagerTool = new GitReleaseManagerTool(this.buildAgent);
  }
  gitReleaseManagerTool;
  async run(command) {
    switch (command) {
      case "setup":
        return await this.setup();
      case "addasset":
        return await this.addAsset();
      case "open":
        return await this.open();
      case "close":
        return await this.close();
      case "create":
        return await this.create();
      case "discard":
        return await this.discard();
      case "publish":
        return await this.publish();
    }
  }
  async setup() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Installing GitReleaseManager");
      const toolPath = await this.gitReleaseManagerTool.install();
      const pathVariable = this.gitReleaseManagerTool.toolPathVariable;
      this.buildAgent.info(`Set ${pathVariable} to ${toolPath}`);
      this.buildAgent.setVariable(pathVariable, toolPath);
      this.buildAgent.setSucceeded("GitReleaseManager installed successfully", true);
      return {
        code: 0
      };
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
  async create() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Creating release");
      const result = await this.gitReleaseManagerTool.create();
      this.buildAgent.setSucceeded("GitReleaseManager created release successfully", true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
  async discard() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Discarding release");
      const result = await this.gitReleaseManagerTool.discard();
      this.buildAgent.setSucceeded("GitReleaseManager discarded release successfully", true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
  async close() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Closing release");
      const result = await this.gitReleaseManagerTool.close();
      this.buildAgent.setSucceeded("GitReleaseManager closed release successfully", true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
  async open() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Opening release");
      const result = await this.gitReleaseManagerTool.open();
      this.buildAgent.setSucceeded("GitReleaseManager opened release successfully", true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
  async publish() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Publishing release");
      const result = await this.gitReleaseManagerTool.publish();
      this.buildAgent.setSucceeded("GitReleaseManager published release successfully", true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
  async addAsset() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Adding asset to release");
      const result = await this.gitReleaseManagerTool.addAsset();
      this.buildAgent.setSucceeded("GitReleaseManager added assets to release successfully", true);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
  disableTelemetry() {
    this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`);
    this.buildAgent.debug("Disabling telemetry");
    this.gitReleaseManagerTool.disableTelemetry();
  }
}

export { Runner };
//# sourceMappingURL=gitreleasemanager.mjs.map
