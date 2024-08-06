import { S as SettingsProvider, D as DotnetTool, k as keysOf } from './tools.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:os';
import 'node:path';
import './semver.mjs';

class GitVersionSettingsProvider extends SettingsProvider {
  getGitVersionExecuteSettings() {
    const targetPath = this.buildAgent.getInput("targetPath");
    const disableCache = this.buildAgent.getBooleanInput("disableCache");
    const disableNormalization = this.buildAgent.getBooleanInput("disableNormalization");
    const disableShallowCloneCheck = this.buildAgent.getBooleanInput("disableShallowCloneCheck");
    const useConfigFile = this.buildAgent.getBooleanInput("useConfigFile");
    const configFilePath = this.buildAgent.getInput("configFilePath");
    const overrideConfig = this.buildAgent.getListInput("overrideConfig");
    const updateAssemblyInfo = this.buildAgent.getBooleanInput("updateAssemblyInfo");
    const updateAssemblyInfoFilename = this.buildAgent.getInput("updateAssemblyInfoFilename");
    return {
      targetPath,
      disableCache,
      disableNormalization,
      disableShallowCloneCheck,
      useConfigFile,
      configFilePath,
      overrideConfig,
      updateAssemblyInfo,
      updateAssemblyInfoFilename
    };
  }
  getGitVersionCommandSettings() {
    const targetPath = this.buildAgent.getInput("targetPath");
    const disableShallowCloneCheck = this.buildAgent.getBooleanInput("disableShallowCloneCheck");
    const args = this.buildAgent.getInput("arguments");
    return {
      targetPath,
      disableShallowCloneCheck,
      arguments: args
    };
  }
}

class GitVersionTool extends DotnetTool {
  get packageName() {
    return "GitVersion.Tool";
  }
  get toolName() {
    return "dotnet-gitversion";
  }
  get toolPathVariable() {
    return "GITVERSION_PATH";
  }
  get versionRange() {
    return ">=5.2.0 <6.1.0";
  }
  get settingsProvider() {
    return new GitVersionSettingsProvider(this.buildAgent);
  }
  async executeJson() {
    const settings = this.settingsProvider.getGitVersionExecuteSettings();
    const workDir = await this.getRepoDir(settings);
    await this.checkShallowClone(settings, workDir);
    const args = await this.getExecuteArguments(workDir, settings);
    await this.setDotnetRoot();
    return await this.executeTool(args);
  }
  async executeCommand() {
    const settings = this.settingsProvider.getGitVersionCommandSettings();
    const workDir = await this.getRepoDir(settings);
    await this.checkShallowClone(settings, workDir);
    const args = await this.getCommandArguments(workDir, settings);
    await this.setDotnetRoot();
    return await this.executeTool(args);
  }
  writeGitVersionToAgent(output) {
    for (const property of keysOf(output)) {
      const name = this.toCamelCase(property);
      try {
        let value = output[property]?.toString();
        if (value === "0") {
          value = "0";
        }
        this.buildAgent.setOutput(name, value);
        this.buildAgent.setOutput(`GitVersion_${property}`, value);
        this.buildAgent.setVariable(name, value);
        this.buildAgent.setVariable(`GitVersion_${property}`, value);
      } catch (error) {
        this.buildAgent.error(`Unable to set output/variable for ${property}`);
      }
    }
  }
  async getRepoDir(settings) {
    return await super.getRepoPath(settings.targetPath);
  }
  async getExecuteArguments(workDir, options) {
    const args = [workDir, "/output", "json", "/output", "buildserver"];
    const {
      useConfigFile,
      disableCache,
      disableNormalization,
      configFilePath,
      overrideConfig,
      updateAssemblyInfo,
      updateAssemblyInfoFilename
      //
    } = options;
    if (disableCache) {
      args.push("/nocache");
    }
    if (disableNormalization) {
      args.push("/nonormalize");
    }
    if (useConfigFile) {
      if (await this.isValidInputFile("configFilePath", configFilePath)) {
        args.push("/config", configFilePath);
      } else {
        throw new Error(`GitVersion configuration file not found at ${configFilePath}`);
      }
    }
    if (overrideConfig) {
      for (let config of overrideConfig) {
        config = config.trim();
        if (config.match(/([a-zA-Z0-9]+(-[a-zA-Z]+)*=[a-zA-Z0-9\- :.']*)/)) {
          args.push("/overrideconfig", config);
        }
      }
    }
    if (updateAssemblyInfo) {
      args.push("/updateassemblyinfo");
      if (updateAssemblyInfoFilename?.length > 0) {
        if (await this.isValidInputFile("updateAssemblyInfoFilename", updateAssemblyInfoFilename)) {
          args.push(updateAssemblyInfoFilename);
        } else {
          throw new Error(`AssemblyInfoFilename file not found at ${updateAssemblyInfoFilename}`);
        }
      }
    }
    return args;
  }
  async getCommandArguments(workDir, options) {
    let args = [workDir];
    if (options.arguments) {
      args = args.concat(this.argStringToArray(options.arguments));
    }
    return args;
  }
  argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let lastCharWasSpace = true;
    let arg = "";
    const append = (c) => {
      if (escaped && c !== '"') {
        arg += "\\";
      }
      arg += c;
      escaped = false;
    };
    for (let i = 0; i < argString.length; i++) {
      const c = argString.charAt(i);
      if (c === " " && !inQuotes) {
        if (!lastCharWasSpace) {
          args.push(arg);
          arg = "";
        }
        lastCharWasSpace = true;
        continue;
      } else {
        lastCharWasSpace = false;
      }
      if (c === '"') {
        if (!escaped) {
          inQuotes = !inQuotes;
        } else {
          append(c);
        }
        continue;
      }
      if (c === "\\" && escaped) {
        append(c);
        continue;
      }
      if (c === "\\" && inQuotes) {
        escaped = true;
        continue;
      }
      append(c);
      lastCharWasSpace = false;
    }
    if (!lastCharWasSpace) {
      args.push(arg.trim());
    }
    return args;
  }
  async checkShallowClone(settings, workDir) {
    if (!settings.disableShallowCloneCheck) {
      const isShallowResult = await this.execute("git", ["-C", workDir, "rev-parse", "--is-shallow-repository"]);
      if (isShallowResult.code === 0 && isShallowResult.stdout.trim() === "true") {
        throw new Error(
          "The repository is shallow. Consider disabling shallow clones. See https://github.com/GitTools/actions/blob/main/docs/cloning.md for more information."
        );
      }
    }
  }
  toCamelCase(input) {
    return input.replace(/^\w|[A-Z]|\b\w|\s+/g, function(match, index) {
      if (+match === 0) return "";
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }
}

class Runner {
  constructor(buildAgent) {
    this.buildAgent = buildAgent;
    this.gitVersionTool = new GitVersionTool(this.buildAgent);
  }
  gitVersionTool;
  async run(command) {
    switch (command) {
      case "setup":
        return await this.setup();
      case "execute":
        return await this.execute();
      case "command":
        return await this.command();
    }
  }
  async setup() {
    try {
      this.disableTelemetry();
      this.buildAgent.debug("Installing GitVersion");
      const toolPath = await this.gitVersionTool.install();
      const pathVariable = this.gitVersionTool.toolPathVariable;
      this.buildAgent.info(`Set ${pathVariable} to ${toolPath}`);
      this.buildAgent.setVariable(pathVariable, toolPath);
      this.buildAgent.setSucceeded("GitVersion installed successfully", true);
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
  async execute() {
    try {
      this.disableTelemetry();
      this.buildAgent.info("Executing GitVersion");
      const result = await this.gitVersionTool.executeJson();
      if (result.code === 0) {
        this.buildAgent.info("GitVersion executed successfully");
        const stdout = result.stdout;
        this.buildAgent.info("GitVersion output:");
        this.buildAgent.info("-------------------");
        this.buildAgent.info(stdout);
        this.buildAgent.info("-------------------");
        this.buildAgent.debug("Parsing GitVersion output");
        if (stdout.lastIndexOf("{") === -1 || stdout.lastIndexOf("}") === -1) {
          this.buildAgent.debug("GitVersion output is not valid JSON");
          this.buildAgent.setFailed("GitVersion output is not valid JSON", true);
          return {
            code: -1,
            error: new Error("GitVersion output is not valid JSON")
          };
        } else {
          const jsonOutput = stdout.substring(stdout.lastIndexOf("{"), stdout.lastIndexOf("}") + 1);
          const gitVersionOutput = JSON.parse(jsonOutput);
          this.gitVersionTool.writeGitVersionToAgent(gitVersionOutput);
          this.buildAgent.setSucceeded("GitVersion executed successfully", true);
          return result;
        }
      } else {
        this.buildAgent.debug("GitVersion failed");
        const error = result.error;
        if (error instanceof Error) {
          this.buildAgent.setFailed(error.message, true);
        }
        return result;
      }
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
  async command() {
    try {
      this.disableTelemetry();
      this.buildAgent.info("Executing GitVersion");
      const result = await this.gitVersionTool.executeCommand();
      if (result.code === 0) {
        this.buildAgent.info("GitVersion executed successfully");
        const stdout = result.stdout;
        this.buildAgent.info("GitVersion output:");
        this.buildAgent.info("-------------------");
        this.buildAgent.info(stdout);
        this.buildAgent.info("-------------------");
        this.buildAgent.setSucceeded("GitVersion executed successfully", true);
        return result;
      } else {
        this.buildAgent.debug("GitVersion failed");
        const error = result.error;
        if (error instanceof Error) {
          this.buildAgent.setFailed(error.message, true);
        }
        return result;
      }
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
    this.gitVersionTool.disableTelemetry();
  }
}

export { Runner };
//# sourceMappingURL=gitversion.mjs.map
