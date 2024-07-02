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

export type IRunner = {
    run(command: string): Promise<number>
}

export type NugetVersions = { data: { versions: { version: string }[] }[] }
