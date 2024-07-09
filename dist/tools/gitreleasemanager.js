import { S as SettingsProvider, D as DotnetTool, p as parseCliArgs, g as getAgent } from '../common/tools.js';
import * as path from 'path';
import 'node:util';
import 'node:crypto';
import 'node:fs/promises';
import 'node:os';
import 'node:path';
import '../common/semver.js';

var CommonFields = /* @__PURE__ */ ((CommonFields2) => {
  CommonFields2["repository"] = "repository";
  CommonFields2["owner"] = "owner";
  CommonFields2["token"] = "token";
  CommonFields2["targetDirectory"] = "targetDirectory";
  return CommonFields2;
})(CommonFields || {});
var CreateFields = /* @__PURE__ */ ((CreateFields2) => {
  CreateFields2["milestone"] = "milestone";
  CreateFields2["name"] = "name";
  CreateFields2["inputFileName"] = "inputFileName";
  CreateFields2["isPreRelease"] = "isPreRelease";
  CreateFields2["commit"] = "commit";
  CreateFields2["assets"] = "assets";
  return CreateFields2;
})(CreateFields || {});
var DiscardFields = /* @__PURE__ */ ((DiscardFields2) => {
  DiscardFields2["milestone"] = "milestone";
  return DiscardFields2;
})(DiscardFields || {});
var CloseFields = /* @__PURE__ */ ((CloseFields2) => {
  CloseFields2["milestone"] = "milestone";
  return CloseFields2;
})(CloseFields || {});
var OpenFields = /* @__PURE__ */ ((OpenFields2) => {
  OpenFields2["milestone"] = "milestone";
  return OpenFields2;
})(OpenFields || {});
var PublishFields = /* @__PURE__ */ ((PublishFields2) => {
  PublishFields2["tagName"] = "tagName";
  return PublishFields2;
})(PublishFields || {});
var AddAssetFields = /* @__PURE__ */ ((AddAssetFields2) => {
  AddAssetFields2["tagName"] = "tagName";
  AddAssetFields2["assets"] = "assets";
  return AddAssetFields2;
})(AddAssetFields || {});

class GitReleaseManagerSettingsProvider extends SettingsProvider {
  getCreateSettings() {
    const milestone = this.buildAgent.getInput(CreateFields.milestone);
    const name = this.buildAgent.getInput(CreateFields.name);
    const inputFileName = this.buildAgent.getInput(CreateFields.inputFileName);
    const isPreRelease = this.buildAgent.getBooleanInput(CreateFields.isPreRelease);
    const commit = this.buildAgent.getInput(CreateFields.commit);
    const assets = this.buildAgent.getListInput(CreateFields.assets);
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      milestone,
      name,
      inputFileName,
      isPreRelease,
      commit,
      assets
    };
  }
  getDiscardSettings() {
    const milestone = this.buildAgent.getInput(DiscardFields.milestone);
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      milestone
    };
  }
  getCloseSettings() {
    const milestone = this.buildAgent.getInput(CloseFields.milestone);
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      milestone
    };
  }
  getOpenSettings() {
    const milestone = this.buildAgent.getInput(OpenFields.milestone);
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      milestone
    };
  }
  getPublishSettings() {
    const tagName = this.buildAgent.getInput(PublishFields.tagName);
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      tagName
    };
  }
  getAddAssetSettings() {
    const tagName = this.buildAgent.getInput(AddAssetFields.tagName);
    const assets = this.buildAgent.getListInput(AddAssetFields.assets);
    const commonSettings = this.getCommonSettings();
    return {
      ...commonSettings,
      tagName,
      assets
    };
  }
  getCommonSettings() {
    const owner = this.buildAgent.getInput(CommonFields.owner, true);
    const repository = this.buildAgent.getInput(CommonFields.repository, true);
    const token = this.buildAgent.getInput(CommonFields.token, true);
    const targetDirectory = this.buildAgent.getInput(CommonFields.targetDirectory);
    return {
      owner,
      repository,
      token,
      targetDirectory
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
    return ">=0.10.0 <0.18.0";
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
    if (settings.tagName) {
      args.push("--tagName", settings.tagName);
    }
    return args;
  }
  async getAddAssetArguments(settings) {
    const args = ["addasset", ...await this.getCommonArguments(settings)];
    if (settings.tagName) {
      args.push("--tagName", settings.tagName);
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
      return 0;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return -1;
    }
  }
  async create() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Creating release");
      await this.gitReleaseManagerTool.create();
      this.buildAgent.setSucceeded("GitReleaseManager created release successfully", true);
      return 0;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return -1;
    }
  }
  async discard() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Discarding release");
      await this.gitReleaseManagerTool.discard();
      this.buildAgent.setSucceeded("GitReleaseManager discarded release successfully", true);
      return 0;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return -1;
    }
  }
  async close() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Closing release");
      await this.gitReleaseManagerTool.close();
      this.buildAgent.setSucceeded("GitReleaseManager closed release successfully", true);
      return 0;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return -1;
    }
  }
  async open() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Opening release");
      await this.gitReleaseManagerTool.open();
      this.buildAgent.setSucceeded("GitReleaseManager opened release successfully", true);
      return 0;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return -1;
    }
  }
  async publish() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Publishing release");
      await this.gitReleaseManagerTool.publish();
      this.buildAgent.setSucceeded("GitReleaseManager published release successfully", true);
      return 0;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return -1;
    }
  }
  async addAsset() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Adding asset to release");
      await this.gitReleaseManagerTool.addAsset();
      this.buildAgent.setSucceeded("GitReleaseManager added assets to release successfully", true);
      return 0;
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.setFailed(error.message, true);
      }
      return -1;
    }
  }
  disableTelemetry() {
    this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`);
    this.buildAgent.debug("Disabling telemetry");
    this.gitReleaseManagerTool.disableTelemetry();
  }
}

const { command, buildAgent } = parseCliArgs();
const agent = await getAgent(buildAgent);
const runner = new Runner(agent);
await runner.run(command);
//# sourceMappingURL=gitreleasemanager.js.map
