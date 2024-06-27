import { injectable } from 'inversify'

import { IRequestOptions } from 'typed-rest-client/Interfaces'
import { type ExecResult } from '../common/models'
import { IBuildAgent } from '../common/build-agent'
import fs from 'node:fs/promises'

@injectable()
class BuildAgent implements IBuildAgent {
    proxyConfiguration(url: string): IRequestOptions {
        console.log('proxyConfiguration')
        return undefined
    }
    public get agentName(): string {
        console.log('getAgentName')
        return 'Local'
    }

    public find(toolName: string, versionSpec: string, arch?: string): string {
        console.log('find')
        return 'find'
    }

    public cacheToolDirectory(sourceDir: string, tool: string, version: string, arch?: string): Promise<string> {
        console.log('cacheDir')
        return Promise.resolve('cacheDir')
    }

    public createTempDirectory(): Promise<string> {
        console.log('createTempDir')
        return Promise.resolve('createTempDir')
    }

    async removeDirectory(dir: string): Promise<void> {
        await fs.rm(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 1000 })
    }

    public debug(message: string): void {
        console.log('debug')
    }

    public info(message: string): void {
        console.log(message)
    }

    public error(message: string): void {
        console.error(message)
    }

    public setFailed(message: string, done?: boolean): void {
        console.log('setFailed')
    }

    public setSucceeded(message: string, done?: boolean): void {
        console.log('setSucceeded')
    }

    public setVariable(name: string, val: string): void {
        console.log('setVariable')
    }

    public getVariable(name: string): string {
        console.log('getVariable')
        return 'getVariable'
    }

    public addPath(inputPath: string): void {
        console.log('addPath')
    }

    public which(tool: string, check?: boolean): Promise<string> {
        console.log('which')
        return Promise.resolve('which')
    }

    public exec(exec: string, args: string[]): Promise<ExecResult> {
        return Promise.resolve({
            code: 0,
            error: null,
            stderr: 'result.stderr',
            stdout: 'result.stdout'
        })
    }

    public getSourceDir(): string {
        console.log('getSourceDir')
        return 'getSourceDir'
    }

    public setOutput(name: string, value: string): void {
        console.log('setOutput')
    }

    public getInput(input: string, required?: boolean): string {
        console.log('getInput')
        return 'getInput'
    }

    public getListInput(input: string, required?: boolean): string[] {
        console.log('getListInput')
        return ['getInput']
    }

    public getBooleanInput(input: string, required?: boolean): boolean {
        console.log('getBooleanInput')
        return false
    }

    public isValidInputFile(input: string, file: string) {
        console.log('isValidInputFile')
        return false
    }

    public fileExists(file: string) {
        console.log('fileExists')
        return false
    }

    public directoryExists(file: string) {
        console.log('directoryExists')
        return false
    }
}

export { BuildAgent }