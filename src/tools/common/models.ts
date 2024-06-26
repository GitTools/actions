export enum SetupFields {
    includePrerelease = 'includePrerelease',
    versionSpec = 'versionSpec',
    ignoreFailedSources = 'ignoreFailedSources',
    preferLatestVersion = 'preferLatestVersion'
}

export type SetupSettings = {
    [SetupFields.versionSpec]: string
    [SetupFields.includePrerelease]: boolean
    [SetupFields.ignoreFailedSources]: boolean
    [SetupFields.preferLatestVersion]: boolean
}

export const TYPES = {
    IBuildAgent: Symbol.for('BuildAgent'),
    IDotnetTool: Symbol.for('DotnetTool'),
    IGitVersionTool: Symbol.for('GitVersionTool'),
    IGitReleaseManagerTool: Symbol.for('GitReleaseManagerTool'),
    IGitVersionSettingsProvider: Symbol.for('GitVersionSettingsProvider'),
    IGitReleaseManagerSettingsProvider: Symbol.for('GitReleaseManagerSettingsProvider')
}

export const keysFn = Object.keys as <T extends object>(obj: T) => (keyof T)[]
