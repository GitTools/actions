import { Fields } from '@tools/common'

export type Commands = 'setup' | 'execute' | 'command'

export type GitVersionExecuteSettings = {
    targetPath: string
    disableCache: boolean
    disableNormalization: boolean
    disableShallowCloneCheck: boolean
    useConfigFile: boolean
    configFilePath: string
    overrideConfig: string[]
    updateAssemblyInfo: boolean
    updateAssemblyInfoFilename: string
}

export const ExecuteFields: Fields<GitVersionExecuteSettings> = {
    targetPath: 'targetPath',
    disableCache: 'disableCache',
    disableNormalization: 'disableNormalization',
    disableShallowCloneCheck: 'disableShallowCloneCheck',
    useConfigFile: 'useConfigFile',
    configFilePath: 'configFilePath',
    overrideConfig: 'overrideConfig',
    updateAssemblyInfo: 'updateAssemblyInfo',
    updateAssemblyInfoFilename: 'updateAssemblyInfoFilename'
}

export type GitVersionCommandSettings = {
    targetPath: string
    disableShallowCloneCheck: boolean
    arguments: string
}

export const CommandFields: Fields<GitVersionCommandSettings> = {
    targetPath: 'targetPath',
    disableShallowCloneCheck: 'disableShallowCloneCheck',
    arguments: 'arguments'
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
