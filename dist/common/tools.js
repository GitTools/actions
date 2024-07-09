import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import 'node:process';
import 'node:child_process';
import { parseArgs } from 'node:util';
import { s as semver } from './semver.js';
import * as crypto from 'node:crypto';
import * as os from 'node:os';

async function getAgent(buildAgent) {
  const agent = `../agents/${buildAgent}/build-agent.js`;
  const module = await import(agent);
  return new module.BuildAgent();
}

var SetupFields = /* @__PURE__ */ ((SetupFields2) => {
  SetupFields2["includePrerelease"] = "includePrerelease";
  SetupFields2["versionSpec"] = "versionSpec";
  SetupFields2["ignoreFailedSources"] = "ignoreFailedSources";
  SetupFields2["preferLatestVersion"] = "preferLatestVersion";
  return SetupFields2;
})(SetupFields || {});

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
    let version = semver.clean(setupSettings.versionSpec) || setupSettings.versionSpec;
    this.buildAgent.info("--------------------------");
    this.buildAgent.info(`Acquiring ${this.packageName} for version spec: ${version}`);
    this.buildAgent.info("--------------------------");
    if (!this.isExplicitVersion(version)) {
      version = await this.queryLatestMatch(this.packageName, version, setupSettings.includePrerelease);
      if (!version) {
        throw new Error(`Unable to find ${this.packageName} version '${version}'.`);
      }
    }
    if (this.versionRange && !semver.satisfies(version, this.versionRange, { includePrerelease: setupSettings.includePrerelease })) {
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
    const gitVersionPath = this.buildAgent.getVariableAsPath(this.toolPathVariable);
    if (gitVersionPath) {
      toolPath = path.join(gitVersionPath, os.platform() === "win32" ? `${this.toolName}.exe` : this.toolName);
    }
    if (!toolPath) {
      toolPath = await this.buildAgent.which(this.toolName, true);
    }
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
    const version = semver.maxSatisfying(versions, versionSpec, { includePrerelease });
    if (version) {
      this.buildAgent.info(`Found matching version: ${version}`);
    } else {
      this.buildAgent.info("match not found");
    }
    return version;
  }
  async installTool(toolName, version, ignoreFailedSources) {
    const semverVersion = semver.clean(version);
    if (!semverVersion) {
      throw new Error(`Invalid version spec: ${version}`);
    }
    const tempDirectory = await this.createTempDirectory();
    if (!tempDirectory) {
      throw new Error("Unable to create temp directory");
    }
    const args = ["tool", "install", toolName, "--tool-path", tempDirectory, "--version", semverVersion];
    if (ignoreFailedSources) {
      args.push("--ignore-failed-sources");
    }
    const result = await this.execute("dotnet", args);
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
    const cleanedVersionSpec = semver.clean(versionSpec);
    const valid = semver.valid(cleanedVersionSpec) != null;
    this.buildAgent.debug(`Is version explicit? ${valid}`);
    return valid;
  }
}

class SettingsProvider {
  constructor(buildAgent) {
    this.buildAgent = buildAgent;
  }
  getSetupSettings() {
    const versionSpec = this.buildAgent.getInput(SetupFields.versionSpec);
    const includePrerelease = this.buildAgent.getBooleanInput(SetupFields.includePrerelease);
    const ignoreFailedSources = this.buildAgent.getBooleanInput(SetupFields.ignoreFailedSources);
    const preferLatestVersion = this.buildAgent.getBooleanInput(SetupFields.preferLatestVersion);
    return {
      versionSpec,
      includePrerelease,
      ignoreFailedSources,
      preferLatestVersion
    };
  }
}

function parseCliArgs() {
  return parseArgs({
    options: {
      command: { type: "string", short: "c" },
      buildAgent: { type: "string", short: "a" }
    }
  }).values;
}
const keysFn = Object.keys;

export { DotnetTool as D, SettingsProvider as S, getAgent as g, keysFn as k, parseCliArgs as p };
//# sourceMappingURL=tools.js.map
