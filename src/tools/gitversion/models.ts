export enum ExecuteFields {
    targetPath = 'targetPath',
    useConfigFile = 'useConfigFile',
    configFilePath = 'configFilePath',
    updateAssemblyInfo = 'updateAssemblyInfo',
    updateAssemblyInfoFilename = 'updateAssemblyInfoFilename',
    additionalArguments = 'additionalArguments',
    srcDir = 'srcDir'
}

export interface GitVersionSettings {
    [ExecuteFields.targetPath]: string
    [ExecuteFields.useConfigFile]: boolean
    [ExecuteFields.configFilePath]: string
    [ExecuteFields.updateAssemblyInfo]: boolean
    [ExecuteFields.updateAssemblyInfoFilename]: string
    [ExecuteFields.additionalArguments]: string
    [ExecuteFields.srcDir]: string
}

export interface GitVersionOutput {
    Major: number
    Minor: number
    Patch: number
    PreReleaseTag: string
    PreReleaseTagWithDash: string
    PreReleaseLabel: string
    PreReleaseNumber: number
    WeightedPreReleaseNumber: number
    BuildMetaData: number
    BuildMetaDataPadded: string
    FullBuildMetaData: string
    MajorMinorPatch: string
    SemVer: string
    LegacySemVer: string
    LegacySemVerPadded: string
    AssemblySemVer: string
    AssemblySemFileVer: string
    FullSemVer: string
    InformationalVersion: string
    BranchName: string
    EscapedBranchName: string
    Sha: string
    ShortSha: string
    NuGetVersionV2: string
    NuGetVersion: string
    NuGetPreReleaseTagV2: string
    NuGetPreReleaseTag: string
    VersionSourceSha: string
    CommitsSinceVersionSource: number
    CommitsSinceVersionSourcePadded: string
    UncommittedChanges: number
    CommitDate: string
}
