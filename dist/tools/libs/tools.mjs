import * as crypto from 'node:crypto';
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { s as semverExports } from './semver.mjs';

class ArgumentsBuilder {
  args = [];
  isWindows = os.platform() === "win32";
  /**
   * Adds a simple argument without a key
   * @param value The argument value
   */
  addArgument(value) {
    if (value) {
      this.args.push(this.escapeArgument(value));
    }
    return this;
  }
  /**
   * Adds multiple arguments
   * @param values The argument values
   */
  addArguments(values) {
    for (const value of values) {
      this.addArgument(value);
    }
    return this;
  }
  /**
   * Adds a flag argument (--flag)
   * @param key The flag name
   */
  addFlag(key) {
    if (key) {
      this.args.push(`--${key}`);
    }
    return this;
  }
  /**
   * Adds a key-value argument (--key value)
   * @param key The argument key
   * @param value The argument value
   */
  addKeyValue(key, value) {
    if (key && value !== undefined && value !== null) {
      this.args.push(`--${key}`);
      this.args.push(this.escapeArgument(value));
    }
    return this;
  }
  /**
   * Adds an equals-style argument (--key=value)
   * @param key The argument key
   * @param value The argument value
   */
  addKeyValueEquals(key, value) {
    if (key && value !== undefined && value !== null) {
      this.args.push(`--${key}=${this.escapeArgument(value)}`);
    }
    return this;
  }
  /**
   * Adds a comma-separated list (--key value1,value2,value3)
   * @param key The argument key
   * @param values The list of values
   */
  addCommaList(key, values) {
    if (key && values && values.length > 0) {
      const escapedValues = values.map((v) => this.escapeArgument(v));
      this.args.push(`--${key}`);
      this.args.push(escapedValues.join(","));
    }
    return this;
  }
  /**
   * Escapes an argument value based on the current OS
   * @param value The argument value to escape
   * @returns The escaped argument value
   */
  escapeArgument(value) {
    if (!value) return value;
    if (!this.needsEscaping(value)) return value;
    if (this.isWindows) {
      return `"${value.replace(/"/g, '\\"')}"`;
    } else {
      return `'${value.replace(/'/g, "'\\''")}'`;
    }
  }
  /**
   * Determines if a value needs to be escaped
   * @param value The value to check
   * @returns True if the value needs escaping
   */
  needsEscaping(value) {
    const windowsNeedsEscaping = /[\s&|<>^(){}[\]"']/;
    const unixNeedsEscaping = /[\s$\\`&|<>(){}[\]"']/;
    if (this.isWindows) {
      return windowsNeedsEscaping.test(value);
    }
    return unixNeedsEscaping.test(value);
  }
  /**
   * Returns the built argument array
   */
  build() {
    return [...this.args];
  }
  /**
   * Parses an argument string into an array
   * @param argString The argument string to parse
   * @returns Array of parsed arguments
   */
  static parseArgumentString(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let lastCharWasSpace = true;
    let arg = "";
    const append = (c) => {
      if (escaped && c !== '"' && c !== "\\") {
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
        arg += "\\";
        escaped = false;
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
}

class DotnetTool {
  constructor(buildAgent) {
    this.buildAgent = buildAgent;
  }
  static nugetRoot = "https://azuresearch-usnc.nuget.org/query";
  disableTelemetry() {
    this.buildAgent.info("Disable Telemetry");
    this.buildAgent.setVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "true");
    this.buildAgent.setVariable("DOTNET_NOLOGO", "true");
  }
  async install() {
    const dotnetExePath = await this.buildAgent.which("dotnet", true);
    this.buildAgent.debug(`whichPath: ${dotnetExePath}`);
    await this.setDotnetRoot();
    const setupSettings = this.settingsProvider.getSetupSettings();
    let version = semverExports.clean(setupSettings.versionSpec) || setupSettings.versionSpec;
    this.buildAgent.info("--------------------------");
    this.buildAgent.info(`Acquiring ${this.packageName} for version spec: ${version}`);
    this.buildAgent.info("--------------------------");
    if (!this.isExplicitVersion(version)) {
      version = await this.queryLatestMatch(this.packageName, version, setupSettings.includePrerelease);
      if (!version) {
        throw new Error(`Unable to find ${this.packageName} version '${version}'.`);
      }
    }
    if (this.versionRange && !semverExports.satisfies(version, this.versionRange, { includePrerelease: setupSettings.includePrerelease })) {
      throw new Error(
        `Version spec '${setupSettings.versionSpec}' resolved as '${version}' does not satisfy the range '${this.versionRange}'.See https://github.com/GitTools/actions/blob/main/docs/versions.md for more information.`
      );
    }
    let toolPath = null;
    if (!setupSettings.preferLatestVersion) {
      toolPath = await this.buildAgent.findLocalTool(this.packageName, version);
      if (toolPath) {
        this.buildAgent.info("--------------------------");
        this.buildAgent.info(`${this.packageName} version: ${version} found in local cache at ${toolPath}.`);
        this.buildAgent.info("--------------------------");
      }
    }
    if (!toolPath) {
      toolPath = await this.installTool(this.packageName, version, setupSettings.ignoreFailedSources);
      this.buildAgent.info("--------------------------");
      this.buildAgent.info(`${this.packageName} version: ${version} installed.`);
      this.buildAgent.info("--------------------------");
    }
    this.buildAgent.info(`Prepending ${toolPath} to PATH`);
    this.buildAgent.addPath(toolPath);
    const pathVariable = this.toolPathVariable;
    this.buildAgent.info(`Set ${pathVariable} to ${toolPath}`);
    this.buildAgent.setVariable(pathVariable, toolPath);
    this.buildAgent.setSucceeded(`${this.toolName} installed successfully`, true);
    return toolPath;
  }
  async execute(cmd, args) {
    this.buildAgent.info(`Command: ${cmd} ${args.join(" ")}`);
    return await this.buildAgent.exec(cmd, args);
  }
  async setDotnetRoot() {
    if (os.platform() !== "win32" && !this.buildAgent.getVariable("DOTNET_ROOT")) {
      let dotnetPath = await this.buildAgent.which("dotnet", true);
      const stats = await fs.lstat(dotnetPath);
      if (stats.isSymbolicLink()) {
        dotnetPath = await fs.readlink(dotnetPath) || dotnetPath;
      }
      const dotnetRoot = path.dirname(dotnetPath);
      this.buildAgent.setVariable("DOTNET_ROOT", dotnetRoot);
    }
  }
  async executeTool(args) {
    let toolPath;
    const variableAsPath = this.buildAgent.getVariableAsPath(this.toolPathVariable);
    if (variableAsPath) {
      toolPath = path.join(variableAsPath, os.platform() === "win32" ? `${this.toolName}.exe` : this.toolName);
    }
    if (!toolPath) {
      toolPath = await this.buildAgent.which(this.toolName, true);
    }
    args = ["--roll-forward Major", ...args];
    return await this.execute(toolPath, args);
  }
  async isValidInputFile(input, file) {
    return this.filePathSupplied(input) && await this.buildAgent.fileExists(file);
  }
  filePathSupplied(file) {
    const pathValue = path.resolve(this.buildAgent.getInput(file) || "");
    const repoRoot = this.buildAgent.sourceDir;
    return pathValue !== repoRoot;
  }
  async getRepoPath(targetPath) {
    const srcDir = this.buildAgent.sourceDir || ".";
    let workDir;
    if (!targetPath) {
      workDir = srcDir;
    } else {
      if (await this.buildAgent.directoryExists(targetPath)) {
        workDir = targetPath;
      } else {
        throw new Error(`Directory not found at ${targetPath}`);
      }
    }
    return workDir.replace(/\\/g, "/");
  }
  async queryLatestMatch(toolName, versionSpec, includePrerelease) {
    this.buildAgent.info(
      `Querying tool versions for ${toolName}${versionSpec ? `@${versionSpec}` : ""} ${includePrerelease ? "including pre-releases" : ""}`
    );
    const toolNameParam = encodeURIComponent(toolName.toLowerCase());
    const prereleaseParam = includePrerelease ? "true" : "false";
    const downloadPath = `${DotnetTool.nugetRoot}?q=${toolNameParam}&prerelease=${prereleaseParam}&semVerLevel=2.0.0&take=1`;
    const response = await fetch(downloadPath);
    if (!response || !response.ok) {
      this.buildAgent.info(`failed to query latest version for ${toolName} from ${downloadPath}. Status code: ${response ? response.status : "unknown"}`);
      return null;
    }
    const { data } = await response.json();
    const versions = data[0].versions.map((x) => x.version);
    if (!versions || !versions.length) {
      return null;
    }
    this.buildAgent.debug(`got versions: ${versions.join(", ")}`);
    const version = semverExports.maxSatisfying(versions, versionSpec, { includePrerelease });
    if (version) {
      this.buildAgent.info(`Found matching version: ${version}`);
    } else {
      this.buildAgent.info("match not found");
    }
    return version;
  }
  async installTool(toolName, version, ignoreFailedSources) {
    const semverVersion = semverExports.clean(version);
    if (!semverVersion) {
      throw new Error(`Invalid version spec: ${version}`);
    }
    const tempDirectory = await this.createTempDirectory();
    if (!tempDirectory) {
      throw new Error("Unable to create temp directory");
    }
    const builder = new ArgumentsBuilder().addArgument("tool").addArgument("install").addArgument(toolName).addKeyValue("tool-path", tempDirectory).addKeyValue("version", semverVersion);
    if (ignoreFailedSources) {
      builder.addFlag("ignore-failed-sources");
    }
    const result = await this.execute("dotnet", builder.build());
    const status = result.code === 0 ? "success" : "failure";
    const message = result.code === 0 ? result.stdout : result.stderr;
    this.buildAgent.debug(`Tool install result: ${status} ${message}`);
    if (result.code !== 0) {
      throw new Error(message);
    }
    const toolPath = await this.buildAgent.cacheToolDirectory(tempDirectory, toolName, semverVersion);
    this.buildAgent.debug(`Cached tool path: ${toolPath}`);
    this.buildAgent.debug(`Cleaning up temp directory: ${tempDirectory}`);
    await this.buildAgent.removeDirectory(tempDirectory);
    return toolPath;
  }
  async createTempDirectory() {
    const tempRootDir = this.buildAgent.tempDir;
    if (!tempRootDir) {
      throw new Error("Temp directory not set");
    }
    const uuid = crypto.randomUUID();
    const tempPath = path.join(tempRootDir, uuid);
    this.buildAgent.debug(`Creating temp directory ${tempPath}`);
    await fs.mkdir(tempPath, { recursive: true });
    return tempPath;
  }
  isExplicitVersion(versionSpec) {
    const cleanedVersionSpec = semverExports.clean(versionSpec);
    const valid = semverExports.valid(cleanedVersionSpec) != null;
    this.buildAgent.debug(`Is version explicit? ${valid}`);
    return valid;
  }
}

class SettingsProvider {
  constructor(buildAgent) {
    this.buildAgent = buildAgent;
  }
  getSetupSettings() {
    const versionSpec = this.buildAgent.getInput("versionSpec");
    const includePrerelease = this.buildAgent.getBooleanInput("includePrerelease");
    const ignoreFailedSources = this.buildAgent.getBooleanInput("ignoreFailedSources");
    const preferLatestVersion = this.buildAgent.getBooleanInput("preferLatestVersion");
    return {
      versionSpec,
      includePrerelease,
      ignoreFailedSources,
      preferLatestVersion
    };
  }
}

const keysOf = Object.keys;

class RunnerBase {
  constructor(buildAgent) {
    this.buildAgent = buildAgent;
  }
  disableTelemetry() {
    this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`);
    this.buildAgent.debug("Disabling telemetry");
    this.tool.disableTelemetry();
  }
  async safeExecute(action, successMessage) {
    try {
      this.disableTelemetry();
      const result = await action();
      this.buildAgent.info(`${this.tool.toolName} Output:`);
      this.buildAgent.info("-------------------");
      this.buildAgent.info(result.stdout);
      this.buildAgent.info("-------------------");
      if (result.code === 0) {
        this.buildAgent.debug(`${this.tool.toolName} succeeded`);
        this.buildAgent.setSucceeded(successMessage, true);
        return result;
      } else {
        this.buildAgent.debug(`${this.tool.toolName} failed`);
        this.buildAgent.error(result.stderr);
        this.buildAgent.setFailed(result.stderr, true);
        return result;
      }
    } catch (error) {
      if (error instanceof Error) {
        this.buildAgent.debug(`${this.tool.toolName} failed`);
        this.buildAgent.error(error.message);
        this.buildAgent.setFailed(error.message, true);
      }
      return {
        code: -1,
        error
      };
    }
  }
}

export { ArgumentsBuilder as A, DotnetTool as D, RunnerBase as R, SettingsProvider as S, keysOf as k };
//# sourceMappingURL=tools.mjs.map
