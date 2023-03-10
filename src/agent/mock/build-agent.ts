import { injectable } from 'inversify'

import { IBuildAgent, IExecResult } from '../../core/models'
import { IRequestOptions } from 'typed-rest-client/Interfaces'

@injectable()
class BuildAgent implements IBuildAgent {
    proxyConfiguration(url: string): IRequestOptions {
        console.log('proxyConfiguration')
        return undefined
    }
    public get agentName(): string {
        console.log('getAgentName')
        return 'Mock'
    }

    public find(toolName: string, versionSpec: string, arch?: string): string {
        console.log('find')
        return 'find'
    }

    public cacheDir(sourceDir: string, tool: string, version: string, arch?: string): Promise<string> {
        console.log('cacheDir')
        return Promise.resolve('cacheDir')
    }

    public createTempDir(): Promise<string> {
        console.log('createTempDir')
        return Promise.resolve('createTempDir')
    }

    public debug(message: string): void {
        console.log('debug')
    }

    public setFailed(message: string, done?: boolean): void {
        console.log('setFailed')
    }

    public setSucceeded(message: string, done?: boolean): void {
        console.log('setSucceeded')
    }

    public exportVariable(name: string, val: string): void {
        console.log('exportVariable')
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

    public exec(exec: string, args: string[]): Promise<IExecResult> {
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
