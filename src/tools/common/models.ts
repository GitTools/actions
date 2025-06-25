import { type ExecResult } from '@agents/common'

export type SetupSettings = {
    versionSpec: string
    packageSource: string
    includePrerelease: boolean
    ignoreFailedSources: boolean
    preferLatestVersion: boolean
}

export type IRunner = {
    run(command: string): Promise<ExecResult>
}

export type NugetVersions = { data: { versions: { version: string }[] }[] }
