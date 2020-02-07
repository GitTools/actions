export const GitVersionRunOptions = {
    targetPath: "targetPath",
    useConfigFile: "useConfigFile",
    configFilePath: "configFilePath",
    updateAssemblyInfo: "configFilePath",
    updateAssemblyInfoFilename: "configFilePath",
    additionalArguments: "additionalArguments",
};

export interface IGitVersionInput {
    targetPath: string;
    useConfigFile: boolean;
    configFilePath: string;
    updateAssemblyInfo: boolean;
    updateAssemblyInfoFilename: string;
    additionalArguments: string;
    srcDir: string;
}

export interface IGitVersionOutput {
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
