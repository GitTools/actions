import { S as SettingsProvider, D as DotnetTool, k as keysOf, A as ArgumentsBuilder, R as RunnerBase } from './tools.mjs';
import 'node:crypto';
import 'node:fs/promises';
import 'node:os';
import 'node:path';
import './semver.mjs';
import { allIndexesOf } from '../lib.mjs';

class GitVersionSettingsProvider extends SettingsProvider {
  getExecuteSettings() {
    const targetPath = this.buildAgent.getInput("targetPath");
    const disableCache = this.buildAgent.getBooleanInput("disableCache");
    const disableNormalization = this.buildAgent.getBooleanInput("disableNormalization");
    const disableShallowCloneCheck = this.buildAgent.getBooleanInput("disableShallowCloneCheck");
    const configFilePath = this.buildAgent.getInput("configFilePath", false);
    const overrideConfig = this.buildAgent.getListInput("overrideConfig", false);
    const updateAssemblyInfo = this.buildAgent.getBooleanInput("updateAssemblyInfo");
    const updateAssemblyInfoFilename = this.buildAgent.getInput("updateAssemblyInfoFilename");
    const updateProjectFiles = this.buildAgent.getBooleanInput("updateProjectFiles");
    const buildNumberFormat = this.buildAgent.getInput("buildNumberFormat", false);
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
  }
  updateBuildNumber() {
    const settings = this.settingsProvider.getExecuteSettings();
    if (settings.buildNumberFormat) {
      const buildNumber = this.buildAgent.getExpandedString(settings.buildNumberFormat);
      this.buildAgent.updateBuildNumber(buildNumber);
    } else {
      this.buildAgent.debug("No buildNumberFormat provided. Skipping build number update.");
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
      if (await this.isValidInputFile(workDir, configFilePath)) {
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
      if (updateAssemblyInfoFilename) {
        if (await this.isValidInputFile(workDir, updateAssemblyInfoFilename)) {
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
      return this.processGitVersionOutput(result);
    }, "GitVersion executed successfully");
  }
  async command() {
    return this.safeExecute(async () => await this.tool.executeCommand(), "GitVersion executed successfully");
  }
  processGitVersionOutput(result) {
    this.buildAgent.debug("Parsing GitVersion output");
    if (result.code !== 0) {
      return result;
    }
    const stdout = result.stdout;
    const gitVersionOutput = this.extractGitVersionOutput(stdout);
    if (gitVersionOutput === null) {
      const errorMessage = "GitVersion output is not valid JSON, see output details";
      this.buildAgent.debug(errorMessage);
      this.buildAgent.setFailed(errorMessage, true);
      return {
        code: -1,
        error: new Error(errorMessage)
      };
    }
    this.tool.writeGitVersionToAgent(gitVersionOutput);
    this.tool.updateBuildNumber();
    this.buildAgent.setSucceeded("GitVersion executed successfully", true);
    return result;
  }
  /**
   * Attempts to extract and parse a JSON object representing `GitVersionOutput` from the given input string.
   * The method assumes the last closing curly brace (`}`) in the input belongs to the end of the JSON object,
   * and iteratively expands the search area backwards from each opening curly brace (`{`) until a valid JSON object is found.
   * If parsing fails, it logs debug information and continues searching until all possible start positions are exhausted.
   *
   * @param input - The string containing the potential JSON output from GitVersion.
   * @returns The parsed `GitVersionOutput` object if extraction and parsing succeed; otherwise, `null`.
   */
  extractGitVersionOutput(input) {
    const allStartOfJsonIndexes = allIndexesOf(input, "{");
    const endOfJsonIndex = input.lastIndexOf("}") + 1;
    if (allStartOfJsonIndexes.length === 0) {
      this.buildAgent.debug("No opening curly brace '{' found in input; cannot extract JSON.");
      return null;
    }
    if (endOfJsonIndex === 0) {
      this.buildAgent.debug("No closing curly brace '}' found in input; cannot extract JSON.");
      return null;
    }
    let startIndexArrayPos = allStartOfJsonIndexes.length - 1;
    let decodePassCount = 1;
    let currSearchString = input.substring(allStartOfJsonIndexes[startIndexArrayPos], endOfJsonIndex);
    let resultJson = null;
    while (resultJson === null && startIndexArrayPos >= 0) {
      try {
        this.buildAgent.debug(`Starting JSON extraction at ${allStartOfJsonIndexes[startIndexArrayPos]} to ${endOfJsonIndex}`);
        resultJson = JSON.parse(currSearchString);
      } catch (ex) {
        let exObject = new Error("Unable to parse exception object");
        if (ex instanceof Error) {
          exObject = ex;
        }
        const errorMessage = `Failed to parse JSON object on pass ${decodePassCount}. Expanding search area from string index ${allStartOfJsonIndexes[startIndexArrayPos]} to ${endOfJsonIndex}. 
Previous search area:'${currSearchString}' 
Caught Exception: ${exObject.message}`;
        this.buildAgent.debug(errorMessage);
        decodePassCount++;
        startIndexArrayPos--;
        currSearchString = input.substring(allStartOfJsonIndexes[startIndexArrayPos], endOfJsonIndex);
      }
    }
    return resultJson;
  }
}

export { Runner };
//# sourceMappingURL=gitversion.mjs.map
