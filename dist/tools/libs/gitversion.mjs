import { S as SettingsProvider, D as DotnetTool, k as keysOf, A as ArgumentsBuilder, R as RunnerBase } from './tools.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:os';
import 'node:path';
import './semver.mjs';

class GitVersionSettingsProvider extends SettingsProvider {
  getExecuteSettings() {
    const targetPath = this.buildAgent.getInput("targetPath");
    const disableCache = this.buildAgent.getBooleanInput("disableCache");
    const disableNormalization = this.buildAgent.getBooleanInput("disableNormalization");
    const disableShallowCloneCheck = this.buildAgent.getBooleanInput("disableShallowCloneCheck");
    const configFilePath = this.buildAgent.getInput("configFilePath");
    const overrideConfig = this.buildAgent.getListInput("overrideConfig");
    const updateAssemblyInfo = this.buildAgent.getBooleanInput("updateAssemblyInfo");
    const updateAssemblyInfoFilename = this.buildAgent.getInput("updateAssemblyInfoFilename");
    const updateProjectFiles = this.buildAgent.getBooleanInput("updateProjectFiles");
    const buildNumberFormat = this.buildAgent.getInput("buildNumberFormat");
    return {
      targetPath,
      disableCache,
      disableNormalization,
      disableShallowCloneCheck,
      configFilePath,
      overrideConfig,
      updateAssemblyInfo,
      updateAssemblyInfoFilename,
      updateProjectFiles,
      buildNumberFormat
    };
  }
  getCommandSettings() {
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
    return ">=6.1.0 <7.0.0";
  }
  get settingsProvider() {
    return new GitVersionSettingsProvider(this.buildAgent);
  }
  async executeJson() {
    const settings = this.settingsProvider.getExecuteSettings();
    const workDir = await this.getRepoDir(settings);
    await this.checkShallowClone(settings, workDir);
    const args = await this.getExecuteArguments(workDir, settings);
    await this.setDotnetRoot();
    return await this.executeTool(args);
  }
  async executeCommand() {
    const settings = this.settingsProvider.getCommandSettings();
    const workDir = await this.getRepoDir(settings);
    await this.checkShallowClone(settings, workDir);
    const args = this.getCommandArguments(workDir, settings);
    await this.setDotnetRoot();
    return await this.executeTool(args);
  }
  writeGitVersionToAgent(output) {
    const settings = this.settingsProvider.getExecuteSettings();
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
      } catch (_error) {
        this.buildAgent.error(`Unable to set output/variable for ${property}`);
      }
    }
    if (settings.buildNumberFormat) {
      const buildNumber = this.buildAgent.getExpandedString(settings.buildNumberFormat);
      this.buildAgent.updateBuildNumber(buildNumber);
    }
  }
  async getRepoDir(settings) {
    return await super.getRepoPath(settings.targetPath);
  }
  async getExecuteArguments(workDir, options) {
    const builder = new ArgumentsBuilder().addArgument(workDir).addArgument("/output").addArgument("json").addArgument("/l").addArgument("console");
    const {
      disableCache,
      disableNormalization,
      configFilePath,
      overrideConfig,
      updateAssemblyInfo,
      updateAssemblyInfoFilename,
      updateProjectFiles
      //
    } = options;
    if (disableCache) {
      builder.addArgument("/nocache");
    }
    if (disableNormalization) {
      builder.addArgument("/nonormalize");
    }
    if (configFilePath) {
      if (await this.isValidInputFile("configFilePath", configFilePath)) {
        builder.addArgument("/config").addArgument(configFilePath);
      } else {
        throw new Error(`GitVersion configuration file not found at ${configFilePath}`);
      }
    }
    if (overrideConfig) {
      for (let config of overrideConfig) {
        config = config.trim();
        if (config.match(/([a-zA-Z0-9]+(-[a-zA-Z]+)*=[a-zA-Z0-9\- :.']*)/)) {
          builder.addArgument("/overrideconfig").addArgument(config);
        }
      }
    }
    if (updateAssemblyInfo) {
      builder.addArgument("/updateassemblyinfo");
      if (updateAssemblyInfoFilename?.length > 0) {
        if (await this.isValidInputFile("updateAssemblyInfoFilename", updateAssemblyInfoFilename)) {
          builder.addArgument(updateAssemblyInfoFilename);
        } else {
          throw new Error(`AssemblyInfoFilename file not found at ${updateAssemblyInfoFilename}`);
        }
      }
    }
    if (updateProjectFiles) {
      builder.addArgument("/updateprojectfiles");
    }
    return builder.build();
  }
  getCommandArguments(workDir, options) {
    const builder = new ArgumentsBuilder().addArgument(workDir);
    if (options.arguments) {
      builder.addArguments(ArgumentsBuilder.parseArgumentString(options.arguments));
    }
    return builder.build();
  }
  async checkShallowClone(settings, workDir) {
    if (!settings.disableShallowCloneCheck) {
      const isShallowResult = await this.execute("git", ["-C", workDir, "rev-parse", "--is-shallow-repository"]);
      if (isShallowResult.code === 0 && isShallowResult.stdout?.trim() === "true") {
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

class Runner extends RunnerBase {
  constructor(buildAgent) {
    super(buildAgent);
    this.buildAgent = buildAgent;
    this.tool = new GitVersionTool(this.buildAgent);
  }
  tool;
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
    return this.safeExecute(async () => {
      await this.tool.install();
      return { code: 0 };
    }, "GitVersion setup successfully");
  }
  async execute() {
    return this.safeExecute(async () => {
      const result = await this.tool.executeJson();
      this.buildAgent.debug("Parsing GitVersion output");
      return this.processGitVersionOutput(result);
    }, "GitVersion executed successfully");
  }
  async command() {
    return this.safeExecute(async () => await this.tool.executeCommand(), "GitVersion executed successfully");
  }
  processGitVersionOutput(result) {
    const stdout = result.stdout;
    if (stdout.lastIndexOf("{") === -1 || stdout.lastIndexOf("}") === -1) {
      const errorMessage = "GitVersion output is not valid JSON, see output details";
      this.buildAgent.debug(errorMessage);
      this.buildAgent.setFailed(errorMessage, true);
      return {
        code: -1,
        error: new Error(errorMessage)
      };
    } else {
      const jsonOutput = stdout.substring(stdout.lastIndexOf("{"), stdout.lastIndexOf("}") + 1);
      const gitVersionOutput = JSON.parse(jsonOutput);
      this.tool.writeGitVersionToAgent(gitVersionOutput);
      this.buildAgent.setSucceeded("GitVersion executed successfully", true);
      return result;
    }
  }
}

export { Runner };
//# sourceMappingURL=gitversion.mjs.map
