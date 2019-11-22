
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as semver from "semver";
import * as http from "typed-rest-client/HttpClient";

import { inject, injectable } from "inversify";

import { Argument, IBuildAgent, IDotnetTool, IExecResult, IGitVersionOptions, IGitVersionTool, IVersionManager } from "./interfaces";
import { TYPES } from "./types";

@injectable()
class DotnetTool implements IDotnetTool {

    private buildAgent: IBuildAgent;
    private versionManager: IVersionManager;
    private httpClient: http.HttpClient;

    constructor(
        @inject(TYPES.IBuildAgent) buildAgent: IBuildAgent,
        @inject(TYPES.IVersionManager) versionManager: IVersionManager,
    ) {
        this.buildAgent = buildAgent;
        this.versionManager = versionManager;
        this.httpClient = new http.HttpClient("dotnet");
    }

    public run(args: string[]): Promise<IExecResult> {
        return this.buildAgent.exec("dotnet", args);
    }

    public async toolInstall(toolName: string, versionSpec: string, checkLatest: boolean, includePre: boolean)
    : Promise<string> {
        console.log("");
        console.log("--------------------------");
        console.log(`Installing ${toolName} version ` + versionSpec);
        console.log("--------------------------");

        if (this.versionManager.isExplicitVersion(versionSpec)) {
            checkLatest = false; // check latest doesn't make sense when explicit version
        }

        let toolPath: string;
        if (!checkLatest) {
            //
            // Let's try and resolve the version spec locally first
            //
            toolPath = this.buildAgent.find(toolName, versionSpec);
        }

        if (!toolPath) {
            let version: string;
            if (this.versionManager.isExplicitVersion(versionSpec)) {
                //
                // Explicit version was specified. No need to query for list of versions.
                //
                version = versionSpec;
            } else {
                //
                // Let's query and resolve the latest version for the versionSpec.
                // If the version is an explicit version (1.1.1 or v1.1.1) then no need to query.
                // If your tool doesn't offer a mechanism to query,
                // then it can only support exact version inputs.
                //
                version = await this.queryLatestMatch(toolName, versionSpec, includePre);
                if (!version) {
                    throw new Error(`Unable to find ${toolName} version '${versionSpec}'.`);
                }

                //
                // Check the cache for the resolved version.
                //
                toolPath = this.buildAgent.find(toolName, version);
            }
            if (!toolPath) {
                //
                // Download, extract, cache
                //
                toolPath = await this.acquireTool(toolName, version);
            }
        }

        //
        // Prepend the tools path. This prepends the PATH for the current process and
        // instructs the agent to prepend for each task that follows.
        //
        this.buildAgent.debug(`toolPath: ${toolPath}`);

        if (os.platform() !== "win32") {
            const dotnetRoot = path.dirname(fs.readlinkSync(await this.buildAgent.which("dotnet")));
            this.buildAgent.exportVariable("DOTNET_ROOT", dotnetRoot);
        }
        this.buildAgent.addPath(toolPath);

        return toolPath;
    }

    private async queryLatestMatch(toolName: string, versionSpec: string, includePrerelease: boolean): Promise<string> {
        this.buildAgent.debug(`querying tool versions for ${toolName}${versionSpec ? `@${versionSpec}` : ""} ${includePrerelease ? "including pre-releases" : ""}`);

        const downloadPath = `https://api-v2v3search-0.nuget.org/query?q=${encodeURIComponent(toolName.toLowerCase())}&prerelease=${includePrerelease ? "true" : "false"}&semVerLevel=2.0.0`;
        const res = await this.httpClient.get(downloadPath);

        if (!res || res.message.statusCode !== 200) {
            return null;
        }

        const body: string = await res.readBody();
        const data = JSON.parse(body).data;

        const versions = (data[0].versions as Array<{ version: string }>).map((x) => x.version);
        if (!versions || !versions.length) {
            return null;
        }

        this.buildAgent.debug(`got versions: ${versions.join(", ")}`);

        return this.versionManager.evaluateVersions(versions, versionSpec);
    }

    private async acquireTool(toolName: string, version: string): Promise<string> {

        const tempDirectory = await this.buildAgent.createTempDir();
        let args = ["tool", "install", toolName, "--tool-path", tempDirectory];

        if (version) {
            version = this.versionManager.cleanVersion(version);
            args = args.concat(["--version", version]);
        }

        const result = await this.run(args);
        const status = result.code === 0 ? "success" : "failure";
        const message = result.code === 0 ? result.stdout : result.stderr;

        this.buildAgent.debug(`tool install result: ${status} ${message}`);

        if (result.code) {
            throw new Error("Error installing tool");
        }

        return await this.buildAgent.cacheDir(tempDirectory, toolName, version);
    }
}

@injectable()
class GitVersionTool implements IGitVersionTool {

    private buildAgent: IBuildAgent;
    private dotnetTool: IDotnetTool;

    constructor(
        @inject(TYPES.IBuildAgent) buildAgent: IBuildAgent,
        @inject(TYPES.IDotnetTool) dotnetTool: IDotnetTool,
    ) {
        this.buildAgent = buildAgent;
        this.dotnetTool = dotnetTool;
    }

    public async install(versionSpec: string, includePrerelease: boolean): Promise<void> {
        await this.dotnetTool.toolInstall("GitVersion.Tool", versionSpec, false, includePrerelease);
    }

    public run(options: IGitVersionOptions): Promise<IExecResult> {
        const workDir = this.getRepoDir(options.targetPath);

        const args = this.getArguments(workDir, options);

        return this.buildAgent.exec("dotnet-gitversion", args);
    }

    private getRepoDir(targetPath: string): string {
        let workDir: string;
        const srcDir = this.buildAgent.getSourceDir();
        if (!targetPath) {
            workDir = srcDir;
        } else {
            if (this.buildAgent.directoryExists(targetPath)) {
                workDir = path.join(srcDir, targetPath);
            } else {
                throw new Error("Directory not found at " + targetPath);
            }
        }
        return workDir.replace(/\\/g, "/");
    }

    private getArguments(workDir: string, options: IGitVersionOptions) {
        const args = [
            workDir,
            "/output",
            "json",
        ];

        const {
            useConfigFile,
            configFilePath,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            additionalArguments,
         } = options;

        if (useConfigFile) {
            if (this.buildAgent.isValidInputFile("configFilePath", configFilePath)) {
                args.push("/config", configFilePath);
            } else {
                throw new Error("GitVersion configuration file not found at " + configFilePath);
            }
        }
        if (updateAssemblyInfo) {
            args.push("/updateassemblyinfo");
            if (this.buildAgent.isValidInputFile("updateAssemblyInfoFilename", updateAssemblyInfoFilename)) {
                args.push(updateAssemblyInfoFilename);
            } else {
                throw new Error("AssemblyInfoFilename file not found at " + updateAssemblyInfoFilename);
            }
        }

        args.push(additionalArguments);
        return args;
    }
}

const cmp = require("semver-compare");

@injectable()
class VersionManager implements IVersionManager {

    private buildAgent: IBuildAgent;
    constructor(
        @inject(TYPES.IBuildAgent) buildAgent: IBuildAgent,
    ) {
        this.buildAgent = buildAgent;
    }

    public isExplicitVersion(versionSpec: string): boolean {
        const c = semver.clean(versionSpec);
        this.buildAgent.debug("isExplicit: " + c);

        const valid = semver.valid(c) != null;
        this.buildAgent.debug("explicit? " + valid);

        return valid;
    }

    public evaluateVersions(versions: string[], versionSpec: string): string {
        let version: string;
        this.buildAgent.debug("evaluating " + versions.length + " versions");
        versions = versions.sort(cmp);
        for (let i = versions.length - 1; i >= 0; i--) {
        const potential: string = versions[i];
        const satisfied: boolean = semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }

        if (version) {
            this.buildAgent.debug("matched: " + version);
    } else {
        this.buildAgent.debug("match not found");
    }

        return version;
    }

    public cleanVersion(version: string): string {
        this.buildAgent.debug("cleaning: " + version);
        return semver.clean(version);
    }
}

export {
    DotnetTool,
    GitVersionTool,
    VersionManager,
};
