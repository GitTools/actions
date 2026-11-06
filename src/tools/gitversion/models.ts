export type Commands = 'setup' | 'execute' | 'command'

export type GitVersionVerbosity = 'quiet' | 'minimal' | 'normal' | 'verbose' | 'diagnostic'

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
    updateWixVersionFile: boolean
    buildNumberFormat?: string
    verbosity?: GitVersionVerbosity
}

export type CommandSettings = {
    targetPath: string
    disableShallowCloneCheck: boolean
    arguments: string
    verbosity?: GitVersionVerbosity
}

export type GitVersionOutput = {
    AssemblySemFileVer: string | null
    AssemblySemVer: string | null
    BranchName: string | null
    BuildMetaData: number | null
    CommitCountSourceDistance: number | null
    CommitCountSourceSha: string | null
    CommitDate: string | null
    CustomVersion: string | null
    EscapedBranchName: string | null
    FullBuildMetaData: string | null
    FullSemVer: string | null
    InformationalVersion: string | null
    Major: number | null
    MajorMinorPatch: string | null
    Minor: number | null
    Patch: number | null
    PreReleaseLabel: string | null
    PreReleaseLabelName: string | null
    PreReleaseLabelNameWithDash: string | null
    PreReleaseLabelWithDash: string | null
    PreReleaseNumber: number | null
    SemVer: string | null
    SemVerSourceIncrement: string | null
    SemVerSourceSemVer: string | null
    SemVerSourceSha: string | null
    Sha: string | null
    ShortSha: string | null
    UncommittedChanges: number | null
    VersionSourceDistance: number | null
    VersionSourceIncrement: string | null
    VersionSourceSemVer: string | null
    VersionSourceSha: string | null
    WeightedPreReleaseNumber: number | null
}
