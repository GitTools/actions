import { type ExecResult } from '@agents/common'

export type Fields<T> = {
    [Key in keyof T]: Key
}

export type SetupSettings = {
    versionSpec: string
    includePrerelease: boolean
    ignoreFailedSources: boolean
    preferLatestVersion: boolean
}

export const SetupFields: Fields<SetupSettings> = {
    versionSpec: 'versionSpec',
    includePrerelease: 'includePrerelease',
    ignoreFailedSources: 'ignoreFailedSources',
    preferLatestVersion: 'preferLatestVersion'
}

export type IRunner = {
    run(command: string): Promise<ExecResult>
}

export type NugetVersions = { data: { versions: { version: string }[] }[] }
