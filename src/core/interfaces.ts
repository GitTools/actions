export interface IVersionManager {
    isExplicitVersion(versionSpec: string): boolean;
    evaluateVersions(versions: string[], versionSpec: string): string;
    cleanVersion(version: string): string;
}

export interface IBuildAgent {
    find(toolName: string, versionSpec: string, arch?: string): string;
    cacheDir(sourceDir: string, tool: string, version: string, arch?: string): Promise<string>;
    createTempDir(): Promise<string>;
    debug(message: string): void;
    setFailed(message: string, done?: boolean): void;
    setSucceeded(message: string, done?: boolean): void;
    exportVariable(name: string, val: string): void;
    getVariable(name: string): string;
    addPath(inputPath: string): void;
    which(tool: string, check?: boolean): Promise<string>;
    exec(exec: string, args: string[]): Promise<IExecResult>;

    getSourceDir(): string;
    isValidInputFile(input: string, file: string): boolean;
    fileExists(file: string): boolean;
    directoryExists(file: string): boolean;

    setOutput(name: string, value: string): void;
    getInput(input: string, required?: boolean): string;
    getBooleanInput(input: string, required?: boolean): boolean;
}

export interface IDotnetTool {
    run(args: string[]): Promise<IExecResult>;
    toolInstall(toolName: string, versionSpec: string, checkLatest: boolean, includePre: boolean): Promise<string>;
}

export class Argument {
    constructor(public readonly name: string, public readonly value: string) {
    }
}
export interface IGitVersionTool {
    install(versionSpec: string, includePrerelease: boolean): Promise<void>;
    run(options: IGitVersionOptions): Promise<IExecResult>;
}
export interface IExecResult {
    stdout: string;
    stderr: string;
    code: number;
    error: Error;
}

export interface IGitVersionOptions {
    targetPath: string;
    useConfigFile: boolean;
    configFilePath: string;
    updateAssemblyInfo: boolean;
    updateAssemblyInfoFilename: string;
    additionalArguments: string;
    srcDir: string;
}

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
