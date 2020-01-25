import { IBuildAgent, IDotnetTool, IExecResult, TYPES } from "./common";
import { injectable, inject } from "inversify";
import path = require("path");

export interface IGitVersionOptions {
    targetPath: string;
    useConfigFile: boolean;
    configFilePath: string;
    updateAssemblyInfo: boolean;
    updateAssemblyInfoFilename: string;
    additionalArguments: string;
    srcDir: string;
}

export const RunOptions = {
    targetPath: "targetPath",

    useConfigFile: "useConfigFile",
    configFilePath: "configFilePath",

    updateAssemblyInfo: "configFilePath",
    updateAssemblyInfoFilename: "configFilePath",

    additionalArguments: "additionalArguments",
};

export interface IGitVersion {
    Major: number;
    Minor: number;
    Patch: number;
    PreReleaseTag: string;
    PreReleaseTagWithDash: string;
    PreReleaseLabel: string;
    PreReleaseNumber: number;
    WeightedPreReleaseNumber: number;
    BuildMetaData: number;
    BuildMetaDataPadded: string;
    FullBuildMetaData: string;
    MajorMinorPatch: string;
    SemVer: string;
    LegacySemVer: string;
    LegacySemVerPadded: string;
    AssemblySemVer: string;
    AssemblySemFileVer: string;
    FullSemVer: string;
    InformationalVersion: string;
    BranchName: string;
    Sha: string;
    ShortSha: string;
    NuGetVersionV2: string;
    NuGetVersion: string;
    NuGetPreReleaseTagV2: string;
    NuGetPreReleaseTag: string;
    VersionSourceSha: string;
    CommitsSinceVersionSource: number;
    CommitsSinceVersionSourcePadded: string;
    CommitDate: string;
}

export interface IGitVersionTool {
    install(versionSpec: string, includePrerelease: boolean): Promise<void>;
    run(options: IGitVersionOptions): Promise<IExecResult>;
    writeGitVersionToAgent(gitversion: IGitVersion): void;
    getGitVersionOptions(): IGitVersionOptions;
}

@injectable()
export class GitVersionTool implements IGitVersionTool {

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

    private getArguments(workDir: string, options: IGitVersionOptions): string[] {
        const args = [
            workDir,
            "/output",
            "json", // need to use buildserver later
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

    public getGitVersionOptions(): IGitVersionOptions {

        const targetPath = this.buildAgent.getInput(RunOptions.targetPath);

        const useConfigFile = this.buildAgent.getBooleanInput(RunOptions.useConfigFile);
        const configFilePath = this.buildAgent.getInput(RunOptions.configFilePath);

        const updateAssemblyInfo = this.buildAgent.getBooleanInput(RunOptions.updateAssemblyInfo);
        const updateAssemblyInfoFilename = this.buildAgent.getInput(RunOptions.updateAssemblyInfoFilename);

        const additionalArguments = this.buildAgent.getInput(RunOptions.additionalArguments);

        const srcDir = this.buildAgent.getSourceDir().replace(/\\/g, "/");

        return {
            targetPath,
            useConfigFile,
            configFilePath,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            additionalArguments,
            srcDir,
        };
    }

    public writeGitVersionToAgent(gitversion: IGitVersion): void {

        this.buildAgent.setOutput("major",                           gitversion.Major.toString());
        this.buildAgent.setOutput("minor",                           gitversion.Minor.toString());
        this.buildAgent.setOutput("patch",                           gitversion.Patch.toString());
        this.buildAgent.setOutput("preReleaseTag",                   gitversion.PreReleaseTag);
        this.buildAgent.setOutput("preReleaseTagWithDash",           gitversion.PreReleaseTagWithDash);
        this.buildAgent.setOutput("preReleaseLabel",                 gitversion.PreReleaseLabel);
        this.buildAgent.setOutput("preReleaseNumber",                gitversion.PreReleaseNumber.toString());
        this.buildAgent.setOutput("weightedPreReleaseNumber",        gitversion.WeightedPreReleaseNumber.toString());
        this.buildAgent.setOutput("buildMetaData",                   gitversion.BuildMetaData.toString());
        this.buildAgent.setOutput("buildMetaDataPadded",             gitversion.BuildMetaDataPadded);
        this.buildAgent.setOutput("fullBuildMetaData",               gitversion.FullBuildMetaData);
        this.buildAgent.setOutput("majorMinorPatch",                 gitversion.MajorMinorPatch);
        this.buildAgent.setOutput("semVer",                          gitversion.SemVer);
        this.buildAgent.setOutput("legacySemVer",                    gitversion.LegacySemVer);
        this.buildAgent.setOutput("legacySemVerPadded",              gitversion.LegacySemVerPadded);
        this.buildAgent.setOutput("assemblySemVer",                  gitversion.AssemblySemVer);
        this.buildAgent.setOutput("assemblySemFileVer",              gitversion.AssemblySemFileVer);
        this.buildAgent.setOutput("fullSemVer",                      gitversion.FullSemVer);
        this.buildAgent.setOutput("informationalVersion",            gitversion.InformationalVersion);
        this.buildAgent.setOutput("branchName",                      gitversion.BranchName);
        this.buildAgent.setOutput("sha",                             gitversion.Sha);
        this.buildAgent.setOutput("shortSha",                        gitversion.ShortSha);
        this.buildAgent.setOutput("nuGetVersionV2",                  gitversion.NuGetVersionV2);
        this.buildAgent.setOutput("nuGetVersion",                    gitversion.NuGetVersion);
        this.buildAgent.setOutput("nuGetPreReleaseTagV2",            gitversion.NuGetPreReleaseTagV2);
        this.buildAgent.setOutput("nuGetPreReleaseTag",              gitversion.NuGetPreReleaseTag);
        this.buildAgent.setOutput("versionSourceSha",                gitversion.VersionSourceSha);
        this.buildAgent.setOutput("commitsSinceVersionSource",       gitversion.CommitsSinceVersionSource.toString());
        this.buildAgent.setOutput("commitsSinceVersionSourcePadded", gitversion.CommitsSinceVersionSourcePadded);
        this.buildAgent.setOutput("commitDate",                      gitversion.CommitDate);
    }
}