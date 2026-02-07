export type Commands = 'setup' | 'execute' | 'command'

export type ExecuteSettings = {
    targetPath: string
    disableCache: boolean
    disableNormalization: boolean
    disableShallowCloneCheck: boolean
    configFilePath?: string
    overrideConfig?: string[]
    updateAssemblyInfo: boolean
    updateAssemblyInfoFilename?: string
    updateProjectFiles: boolean
    buildNumberFormat?: string
}

export type CommandSettings = {
    targetPath: string
    disableShallowCloneCheck: boolean
    arguments: string
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
    VersionSourceSemVer?: string
    VersionSourceDistance?: number
    UncommittedChanges: number
    CommitDate: string
}
