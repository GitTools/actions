export enum SetupFields {
    includePrerelease = 'includePrerelease',
    versionSpec = 'versionSpec',
    ignoreFailedSources = 'ignoreFailedSources'
}

export interface ISetupSettings {
    [SetupFields.versionSpec]: string
    [SetupFields.includePrerelease]: boolean
    [SetupFields.ignoreFailedSources]: boolean
}

export interface ISettingsProvider {
    getSetupSettings(): ISetupSettings
}
