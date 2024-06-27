import { TYPES } from './models'
import { inject, injectable } from 'inversify'
import { IBuildAgent } from '../../agents/common/build-agent'
import * as http from 'typed-rest-client/HttpClient'
import { type ExecResult } from '../../agents/common/models'
import * as semver from 'semver'
import os from 'os'
import fs from 'fs'
import path from 'path'
import { ISettingsProvider } from './settings'

export interface IDotnetTool {
    disableTelemetry(): void

    install(): Promise<string>
}

type NugetVersions = { data: { versions: { version: string }[] }[] }

@injectable()
export abstract class DotnetTool implements IDotnetTool {
    protected buildAgent: IBuildAgent
    private httpClient: http.HttpClient

    private static readonly nugetRoot: string = 'https://azuresearch-usnc.nuget.org/query'

    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent) {
        this.buildAgent = buildAgent
        this.httpClient = new http.HttpClient('dotnet', undefined, this.buildAgent.proxyConfiguration(DotnetTool.nugetRoot))
    }
    abstract get settingsProvider(): ISettingsProvider

    abstract get toolName(): string

    abstract get versionRange(): string | null

    public disableTelemetry(): void {
        this.buildAgent.info('Disable Telemetry')
        this.buildAgent.setVariable('DOTNET_CLI_TELEMETRY_OPTOUT', 'true')
        this.buildAgent.setVariable('DOTNET_NOLOGO', 'true')
    }

    public execute(cmd: string, args: string[]): Promise<ExecResult> {
        this.buildAgent.info(`Command: ${cmd} ${args.join(' ')}`)
        return this.buildAgent.exec(cmd, args)
    }

    public async install(): Promise<string> {
        const dotnetExePath = await this.buildAgent.which('dotnet', true)
        this.buildAgent.debug(`whichPath: ${dotnetExePath}`)
        await this.setDotnetRoot()

        const setupSettings = this.settingsProvider.getSetupSettings()

        let version: string | null = semver.clean(setupSettings.versionSpec) || setupSettings.versionSpec
        this.buildAgent.info('--------------------------')
        this.buildAgent.info(`Acquiring ${this.toolName} for version spec: ${version}`)
        this.buildAgent.info('--------------------------')

        if (!this.isExplicitVersion(version)) {
            version = await this.queryLatestMatch(this.toolName, version, setupSettings.includePrerelease)
            if (!version) {
                throw new Error(`Unable to find ${this.toolName} version '${version}'.`)
            }
        }

        if (this.versionRange && !semver.satisfies(version, this.versionRange, { includePrerelease: setupSettings.includePrerelease })) {
            throw new Error(
                `Version spec '${setupSettings.versionSpec}' resolved as '${version}' does not satisfy the range '${this.versionRange}'.` +
                    'See https://github.com/GitTools/actions/blob/main/docs/versions.md for more information.'
            )
        }

        let toolPath: string | null = null
        if (!setupSettings.preferLatestVersion) {
            // Let's try and resolve the version locally first
            toolPath = this.buildAgent.find(this.toolName, version)
            if (toolPath) {
                this.buildAgent.info('--------------------------')
                this.buildAgent.info(`${this.toolName} version: ${version} found in local cache at ${toolPath}.`)
                this.buildAgent.info('--------------------------')
            }
        }

        if (!toolPath) {
            // Download, extract, cache
            toolPath = await this.installTool(this.toolName, version, setupSettings.ignoreFailedSources)
            this.buildAgent.info('--------------------------')
            this.buildAgent.info(`${this.toolName} version: ${version} installed.`)
            this.buildAgent.info('--------------------------')
        }

        // Prepend the tool's path. This prepends the PATH for the current process and
        // instructs the agent to prepend for each task that follows.
        this.buildAgent.info(`Prepending ${toolPath} to PATH`)
        this.buildAgent.addPath(toolPath)

        return toolPath
    }

    protected async setDotnetRoot(): Promise<void> {
        if (os.platform() !== 'win32' && !this.buildAgent.getVariable('DOTNET_ROOT')) {
            let dotnetPath = await this.buildAgent.which('dotnet', true)

            const stats = fs.lstatSync(dotnetPath)
            if (stats.isSymbolicLink()) {
                dotnetPath = fs.readlinkSync(dotnetPath) || dotnetPath
            }

            const dotnetRoot = path.dirname(dotnetPath)
            this.buildAgent.setVariable('DOTNET_ROOT', dotnetRoot)
        }
    }

    protected getRepoPath(targetPath: string): string {
        const srcDir = this.buildAgent.getSourceDir() || '.'
        let workDir: string
        if (!targetPath) {
            workDir = srcDir
        } else {
            if (this.buildAgent.directoryExists(targetPath)) {
                workDir = targetPath
            } else {
                throw new Error(`Directory not found at ${targetPath}`)
            }
        }
        return workDir.replace(/\\/g, '/')
    }

    private async queryLatestMatch(toolName: string, versionSpec: string, includePrerelease: boolean): Promise<string | null> {
        this.buildAgent.info(
            `Querying tool versions for ${toolName}${versionSpec ? `@${versionSpec}` : ''} ${includePrerelease ? 'including pre-releases' : ''}`
        )

        const toolNameParam = encodeURIComponent(toolName.toLowerCase())
        const prereleaseParam = includePrerelease ? 'true' : 'false'
        const downloadPath = `${DotnetTool.nugetRoot}?q=${toolNameParam}&prerelease=${prereleaseParam}&semVerLevel=2.0.0&take=1`

        const response = await this.httpClient.get(downloadPath)

        if (!response || response.message.statusCode !== 200) {
            this.buildAgent.info(`failed to query latest version for ${toolName} from ${downloadPath}. Status code: ${response ? response.message.statusCode : 'unknown'}`)
            return null
        }

        const { data } = JSON.parse(await response.readBody()) as NugetVersions

        const versions = data[0].versions.map(x => x.version)
        if (!versions || !versions.length) {
            return null
        }

        this.buildAgent.debug(`got versions: ${versions.join(', ')}`)

        const version = semver.maxSatisfying(versions, versionSpec, { includePrerelease })
        if (version) {
            this.buildAgent.info(`Found matching version: ${version}`)
        } else {
            this.buildAgent.info('match not found')
        }

        return version
    }

    private async installTool(toolName: string, version: string, ignoreFailedSources: boolean): Promise<string> {
        const semverVersion = semver.clean(version)
        if (!semverVersion) {
            throw new Error(`Invalid version spec: ${version}`)
        }

        const tempDirectory = await this.buildAgent.createTempDirectory()

        if (!tempDirectory) {
            throw new Error('Unable to create temp directory')
        }

        const args = ['tool', 'install', toolName, '--tool-path', tempDirectory, '--version', semverVersion]
        if (ignoreFailedSources) {
            args.push('--ignore-failed-sources')
        }

        const result = await this.execute('dotnet', args)
        const status = result.code === 0 ? 'success' : 'failure'
        const message = result.code === 0 ? result.stdout : result.stderr

        this.buildAgent.debug(`Tool install result: ${status} ${message}`)

        if (result.code !== 0) {
            throw new Error(message)
        }

        return await this.buildAgent.cacheToolDirectory(tempDirectory, toolName, semverVersion)
    }

    private isExplicitVersion(versionSpec: string): boolean {
        const cleanedVersionSpec = semver.clean(versionSpec)
        const valid = semver.valid(cleanedVersionSpec) != null
        this.buildAgent.debug(`Is version explicit? ${valid}`)

        return valid
    }
}
