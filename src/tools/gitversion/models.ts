export type Commands = 'setup' | 'execute'

export enum ExecuteFields {
    targetPath = 'targetPath',
    disableCache = 'disableCache',
    disableNormalization = 'disableNormalization',
    disableShallowCloneCheck = 'disableShallowCloneCheck',
    useConfigFile = 'useConfigFile',
    configFilePath = 'configFilePath',
    overrideConfig = 'overrideConfig',
    updateAssemblyInfo = 'updateAssemblyInfo',
    updateAssemblyInfoFilename = 'updateAssemblyInfoFilename'
}

export type GitVersionExecuteSettings = {
    [ExecuteFields.targetPath]: string
    [ExecuteFields.disableCache]: boolean
    [ExecuteFields.disableNormalization]: boolean
    [ExecuteFields.disableShallowCloneCheck]: boolean
    [ExecuteFields.useConfigFile]: boolean
    [ExecuteFields.configFilePath]: string
    [ExecuteFields.overrideConfig]: string[]
    [ExecuteFields.updateAssemblyInfo]: boolean
    [ExecuteFields.updateAssemblyInfoFilename]: string
}

export type GitVersionOutput = {
    Major: number
    Minor: number
    Patch: number
    PreReleaseTag: string
    PreReleaseTagWithDash: string
    PreReleaseLabel: string
    PreReleaseNumber: number
    WeightedPreReleaseNumber: number
    BuildMetaData: number
    FullBuildMetaData: string
    MajorMinorPatch: string
    SemVer: string
    AssemblySemVer: string
    AssemblySemFileVer: string
    FullSemVer: string
    InformationalVersion: string
    BranchName: string
    EscapedBranchName: string
    Sha: string
    ShortSha: string
    VersionSourceSha: string
    CommitsSinceVersionSource: number
    UncommittedChanges: number
    CommitDate: string
}
