import { type ExecResult } from '@agents/common'

export type SetupSettings = {
    versionSpec: string
    includePrerelease: boolean
    ignoreFailedSources: boolean
    preferLatestVersion: boolean
    nugetConfigPath: string
}

export type IRunner = {
    run(command: string): Promise<ExecResult>
}

export type NugetVersions = { data: { versions: { version: string }[] }[] }
