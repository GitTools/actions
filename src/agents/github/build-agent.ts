import * as fs from 'fs'
import * as path from 'path'
import * as urlApi from 'url'

import { v4 as uuidv4 } from 'uuid'

import * as core from '@actions/core'
import * as exe from '@actions/exec'
import * as io from '@actions/io'
import * as toolCache from '@actions/tool-cache'

import { injectable } from 'inversify'

import { IRequestOptions, IProxyConfiguration } from 'typed-rest-client/Interfaces'
import { type ExecResult } from '../common/models'
import { IBuildAgent } from '../common/build-agent'

@injectable()
class BuildAgent implements IBuildAgent {
    public get agentName(): string {
        return 'GitHub Actions'
    }

    public find(toolName: string, versionSpec: string, arch?: string): string {
        return toolCache.find(toolName, versionSpec, arch)
    }

    public proxyConfiguration(url: string): IRequestOptions {
        return {
            proxy: this.getProxyConfiguration(url),
            cert: undefined,
            ignoreSslError: undefined
        }
    }

    private getProxyConfiguration(requestedUrl: string): IProxyConfiguration {
        let noProxy = process.env.NO_PROXY || process.env.no_proxy || null
        let allowedHostsWithoutProxy
        let dontUseProxy = false
        if (noProxy) {
            if (noProxy === '*') {
                dontUseProxy = true
            } else {
                allowedHostsWithoutProxy = noProxy.split(',')
                if (requestedUrl) {
                    allowedHostsWithoutProxy.forEach(host => {
                        if (new RegExp(host, 'i').test(requestedUrl)) {
                            dontUseProxy = true
                        }
                    })
                }
            }
        }

        if (dontUseProxy) {
            return undefined
        }

        let proxyURL = process.env.HTTP_PROXY || process.env.http_proxy || process.env.HTTPS_PROXY || process.env.https_proxy || null

        if (proxyURL) {
            let url = new urlApi.URL(requestedUrl)

            return {
                proxyUrl: `${url.protocol}//${url.hostname}:${url.port}`,
                proxyUsername: url.username,
                proxyPassword: url.password,
                proxyBypassHosts: allowedHostsWithoutProxy
            }
        }
        return undefined
    }

    public cacheToolDirectory(sourceDir: string, tool: string, version: string, arch?: string): Promise<string> {
        return toolCache.cacheDir(sourceDir, tool, version, arch)
    }

    public async createTempDirectory(): Promise<string> {
        const IS_WINDOWS = process.platform === 'win32'

        let tempDirectory: string = process.env.RUNNER_TEMP || ''

        if (!tempDirectory) {
            let baseLocation: string
            if (IS_WINDOWS) {
                // On Windows use the USERPROFILE env variable
                baseLocation = process.env.USERPROFILE || 'C:\\'
            } else {
                if (process.platform === 'darwin') {
                    baseLocation = '/Users'
                } else {
                    baseLocation = '/home'
                }
            }
            tempDirectory = path.join(baseLocation, 'actions', 'temp')
        }
        const dest = path.join(tempDirectory, uuidv4())
        await io.mkdirP(dest)
        return dest
    }

    removeDirectory(dir: string): Promise<void> {
        return io.rmRF(dir)
    }

    public debug(message: string): void {
        core.debug(message)
    }

    public info(message: string): void {
        core.info(message)
    }

    public error(message: string): void {
        core.error(message)
    }

    public setFailed(message: string, done?: boolean): void {
        core.setFailed(message)
    }

    public setSucceeded(message: string, done?: boolean): void {
        //
    }

    public setVariable(name: string, val: string): void {
        core.exportVariable(name, val)
    }

    public getVariable(name: string): string {
        return process.env[name]
    }

    getVariableAsPath(name: string): string {
        return path.resolve(path.normalize(this.getVariable(name)))
    }

    public addPath(inputPath: string): void {
        core.addPath(inputPath)
    }

    public which(tool: string, check?: boolean): Promise<string> {
        return io.which(tool, check)
    }

    public async exec(exec: string, args: string[]): Promise<ExecResult> {
        const dotnetPath = await io.which(exec, true)
        let result = await exe.getExecOutput(`"${dotnetPath}"`, args)
        return {
            code: result.exitCode,
            error: null,
            stderr: result.stderr,
            stdout: result.stdout
        }
    }

    public getSourceDir(): string {
        return this.getVariable('GITHUB_WORKSPACE')
    }

    public setOutput(name: string, value: string): void {
        core.setOutput(name, value)
    }

    public getInput(input: string, required?: boolean): string {
        return core.getInput(input, { required } as core.InputOptions)?.trim()
    }

    public getListInput(input: string, required?: boolean): string[] {
        return core
            .getInput(input, { required } as core.InputOptions)
            .split('\n')
            .filter(x => x !== '')
    }

    public getBooleanInput(input: string, required?: boolean): boolean {
        const inputValue = this.getInput(input, required)
        return (inputValue || 'false').toLowerCase() === 'true'
    }

    public isValidInputFile(input: string, file: string): boolean {
        return this.filePathSupplied(input) && this.fileExists(file)
    }

    public filePathSupplied(file: string): boolean {
        const pathValue = path.resolve(this.getInput(file) || '')
        const repoRoot = this.getSourceDir()
        return pathValue !== repoRoot
    }

    public fileExists(file: string): boolean {
        return this._exist(file) && this._stats(file).isFile()
    }

    public directoryExists(file: string): boolean {
        return this._exist(file) && this._stats(file).isDirectory()
    }

    private _exist(file: string): boolean {
        let exist = false
        try {
            exist = !!(file && fs.statSync(file) != null)
        } catch (err) {
            if (err && err.code === 'ENOENT') {
                exist = false
            } else {
                throw err
            }
        }
        return exist
    }

    private _stats(file: string): fs.Stats {
        return fs.statSync(file)
    }
}

export { BuildAgent }
