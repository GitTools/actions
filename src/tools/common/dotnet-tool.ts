import { type SetupSettings, TYPES } from './models'
import { inject, injectable } from 'inversify'
import { IBuildAgent } from '../../agents/common/build-agent'
import * as http from 'typed-rest-client/HttpClient'
import { type ExecResult } from '../../agents/common/models'
import * as semver from 'semver'
import os from 'os'
import fs from 'fs'
import path from 'path'

export interface IDotnetTool {
    disableTelemetry(): void

    toolInstall(toolName: string, versionRange: string, setupSettings: SetupSettings): Promise<string>
}

@injectable()
export class DotnetTool implements IDotnetTool {
    protected buildAgent: IBuildAgent
    private httpClient: http.HttpClient

    private static readonly nugetRoot: string = 'https://azuresearch-usnc.nuget.org/query'

    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent) {
        this.buildAgent = buildAgent
        this.httpClient = new http.HttpClient('dotnet', undefined, this.buildAgent.proxyConfiguration(DotnetTool.nugetRoot))
    }

    public disableTelemetry(): void {
        this.buildAgent.info('Disable Telemetry')
        this.buildAgent.setVariable('DOTNET_CLI_TELEMETRY_OPTOUT', 'true')
        this.buildAgent.setVariable('DOTNET_NOLOGO', 'true')
    }

    public execute(cmd: string, args: string[]): Promise<ExecResult> {
        this.buildAgent.info(`Command: ${cmd} ${args.join(' ')}`)
        return this.buildAgent.exec(cmd, args)
    }

    public async toolInstall(toolName: string, versionRange: string, setupSettings: SetupSettings): Promise<string> {

        await this.setDotnetRoot()
        let version: string | null = semver.clean(setupSettings.versionSpec) || setupSettings.versionSpec
        console.log('')
        console.log('--------------------------')
        console.log(`Acquiring ${toolName} for version spec: ${version}`)
        console.log('--------------------------')

        if (!this.isExplicitVersion(version)) {
            version = await this.queryLatestMatch(toolName, version, setupSettings.includePrerelease)
            if (!version) {
                throw new Error(`Unable to find ${toolName} version '${version}'.`)
            }
        }

        if (!semver.satisfies(version, versionRange, { includePrerelease: setupSettings.includePrerelease })) {
            throw new Error(
                `Version spec '${setupSettings.versionSpec}' resolved as '${version}' does not satisfy the range '${versionRange}'.` +
                    'See https://github.com/GitTools/actions/blob/main/docs/versions.md for more information.'
            )
        }

        let toolPath: string | null = null
        if (!setupSettings.preferLatestVersion) {
            // Let's try and resolve the version locally first
            toolPath = this.buildAgent.find(toolName, setupSettings.versionSpec)
            if (toolPath) {
                console.log('--------------------------')
                console.log(`${toolName} version: ${version} found in local cache at ${toolPath}.`)
                console.log('--------------------------')
            }
        }

        if (!toolPath) {
            // Download, extract, cache
            toolPath = await this.installTool(toolName, version, setupSettings.ignoreFailedSources)
            console.log('--------------------------')
            console.log(`${toolName} version: ${version} installed.`)
            console.log('--------------------------')
        }

        // Prepend the tool's path. This prepends the PATH for the current process and
        // instructs the agent to prepend for each task that follows.
        this.buildAgent.debug(`Prepending ${toolPath} to PATH`)

        this.buildAgent.addPath(toolPath)

        return toolPath
    }

    protected async setDotnetRoot(): Promise<void> {
        if (os.platform() !== 'win32' && !this.buildAgent.getVariable('DOTNET_ROOT')) {
            let dotnetPath = await this.buildAgent.which('dotnet')
            dotnetPath = fs.readlinkSync(dotnetPath) || dotnetPath
            const dotnetRoot = path.dirname(dotnetPath)
            this.buildAgent.setVariable('DOTNET_ROOT', dotnetRoot)
        }
    }

    private async queryLatestMatch(toolName: string, versionSpec: string, includePrerelease: boolean): Promise<string | null> {
        this.buildAgent.info(
            `Querying tool versions for ${toolName}${versionSpec ? `@${versionSpec}` : ''} ${includePrerelease ? 'including pre-releases' : ''}`
        )

        const toolNameParam = encodeURIComponent(toolName.toLowerCase())
        const prereleaseParam = includePrerelease ? 'true' : 'false'
        const downloadPath = `${DotnetTool.nugetRoot}?q=${toolNameParam}&prerelease=${prereleaseParam}&semVerLevel=2.0.0&take=1`

        const res = await this.httpClient.get(downloadPath)

        if (!res || res.message.statusCode !== 200) {
            return null
        }

        const body: string = await res.readBody()
        const data = JSON.parse(body).data

        const versions = (data[0].versions as { version: string }[]).map(x => x.version)
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
        const tempDirectory = await this.buildAgent.createTempDir()
        let args = ['tool', 'install', toolName, '--tool-path', tempDirectory]

        if (ignoreFailedSources) {
            args.push('--ignore-failed-sources')
        }

        if (version) {
            version = semver.clean(version)
            args = args.concat(['--version', version])
        }

        const result = await this.execute('dotnet', args)
        const status = result.code === 0 ? 'success' : 'failure'
        const message = result.code === 0 ? result.stdout : result.stderr

        this.buildAgent.debug(`tool install result: ${status} ${message}`)

        if (result.code) {
            throw new Error('Error installing tool')
        }

        return await this.buildAgent.cacheDir(tempDirectory, toolName, version)
    }

    private isExplicitVersion(versionSpec: string): boolean {
        const cleanedVersionSpec = semver.clean(versionSpec)
        const valid = semver.valid(cleanedVersionSpec) != null
        this.buildAgent.debug(`Is version explicit? ${valid}`)

        return valid
    }
}
