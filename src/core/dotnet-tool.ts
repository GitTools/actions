import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as http from 'typed-rest-client/HttpClient'

import { inject, injectable } from 'inversify'
import { TYPES, IExecResult, IBuildAgent, ISetupSettings } from './models'
import { IVersionManager } from './versionManager'

export interface IDotnetTool {
    disableTelemetry(): void
    toolInstall(
        toolName: string,
        checkLatest: boolean,
        setupSettings: ISetupSettings
    ): Promise<string>
}

@injectable()
export class DotnetTool implements IDotnetTool {
    protected buildAgent: IBuildAgent
    protected versionManager: IVersionManager
    private httpClient: http.HttpClient

    private static readonly nugetRoot: string =
        'https://azuresearch-usnc.nuget.org/'

    constructor(
        @inject(TYPES.IBuildAgent) buildAgent: IBuildAgent,
        @inject(TYPES.IVersionManager) versionManager: IVersionManager
    ) {
        this.buildAgent = buildAgent
        this.versionManager = versionManager
        this.httpClient = new http.HttpClient(
            'dotnet',
            undefined,
            this.buildAgent.proxyConfiguration(DotnetTool.nugetRoot)
        )
    }

    public disableTelemetry(): void {
        this.buildAgent.exportVariable('DOTNET_CLI_TELEMETRY_OPTOUT', 'true')
        this.buildAgent.exportVariable('DOTNET_NOLOGO', 'true')
    }

    public execute(cmd: string, args: string[]): Promise<IExecResult> {
        console.log(`Command: ${cmd} ${args.join(' ')}`)
        return this.buildAgent.exec(cmd, args)
    }

    public async toolInstall(
        toolName: string,
        checkLatest: boolean,
        setupSettings: ISetupSettings
    ): Promise<string> {
        console.log('')
        console.log('--------------------------')
        console.log(
            `Installing ${toolName} version ` + setupSettings.versionSpec
        )
        console.log('--------------------------')

        if (this.versionManager.isExplicitVersion(setupSettings.versionSpec)) {
            checkLatest = false // check latest doesn't make sense when explicit version
        }

        let toolPath: string
        if (!checkLatest) {
            //
            // Let's try and resolve the version spec locally first
            //
            toolPath = this.buildAgent.find(toolName, setupSettings.versionSpec)
        }

        if (!toolPath) {
            let version: string
            if (
                this.versionManager.isExplicitVersion(setupSettings.versionSpec)
            ) {
                //
                // Explicit version was specified. No need to query for list of versions.
                //
                version = setupSettings.versionSpec
            } else {
                //
                // Let's query and resolve the latest version for the versionSpec.
                // If the version is an explicit version (1.1.1 or v1.1.1) then no need to query.
                // If your tool doesn't offer a mechanism to query,
                // then it can only support exact version inputs.
                //
                version = await this.queryLatestMatch(
                    toolName,
                    setupSettings.versionSpec,
                    setupSettings.includePrerelease
                )
                if (!version) {
                    throw new Error(
                        `Unable to find ${toolName} version '${setupSettings.versionSpec}'.`
                    )
                }

                //
                // Check the cache for the resolved version.
                //
                toolPath = this.buildAgent.find(toolName, version)
            }
            if (!toolPath) {
                //
                // Download, extract, cache
                //
                toolPath = await this.acquireTool(
                    toolName,
                    version,
                    setupSettings.ignoreFailedSources
                )
            }
        }

        //
        // Prepend the tools path. This prepends the PATH for the current process and
        // instructs the agent to prepend for each task that follows.
        //
        this.buildAgent.debug(`toolPath: ${toolPath}`)

        if (
            os.platform() !== 'win32' &&
            !this.buildAgent.getVariable('DOTNET_ROOT')
        ) {
            let dotnetPath = await this.buildAgent.which('dotnet')
            dotnetPath = fs.readlinkSync(dotnetPath) || dotnetPath
            const dotnetRoot = path.dirname(dotnetPath)
            this.buildAgent.exportVariable('DOTNET_ROOT', dotnetRoot)
        }
        this.buildAgent.addPath(toolPath)

        return toolPath
    }

    private async queryLatestMatch(
        toolName: string,
        versionSpec: string,
        includePrerelease: boolean
    ): Promise<string> {
        this.buildAgent.debug(
            `querying tool versions for ${toolName}${
                versionSpec ? `@${versionSpec}` : ''
            } ${includePrerelease ? 'including pre-releases' : ''}`
        )

        const toolNameParam = encodeURIComponent(toolName.toLowerCase());
        const prereleaseParam = includePrerelease ? 'true' : 'false';
        const downloadPath = `${DotnetTool.nugetRoot}query?q=${toolNameParam}&prerelease=${prereleaseParam}&semVerLevel=2.0.0&take=1`

        const res = await this.httpClient.get(downloadPath)

        if (!res || res.message.statusCode !== 200) {
            return null
        }

        const body: string = await res.readBody()
        const data = JSON.parse(body).data

        const versions = (data[0].versions as { version: string }[]).map(
            x => x.version
        )
        if (!versions || !versions.length) {
            return null
        }

        this.buildAgent.debug(`got versions: ${versions.join(', ')}`)

        return this.versionManager.evaluateVersions(versions, versionSpec, { includePrerelease })
    }

    private async acquireTool(
        toolName: string,
        version: string,
        ignoreFailedSources: boolean
    ): Promise<string> {
        const tempDirectory = await this.buildAgent.createTempDir()
        let args = ['tool', 'install', toolName, '--tool-path', tempDirectory]

        if (ignoreFailedSources) {
            args.push('--ignore-failed-sources')
        }

        if (version) {
            version = this.versionManager.cleanVersion(version)
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
}
