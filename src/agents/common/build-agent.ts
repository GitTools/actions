import { IRequestOptions } from 'typed-rest-client/Interfaces'
import { type ExecResult } from './models'

export interface IBuildAgent {
    agentName: string

    proxyConfiguration(url: string): IRequestOptions

    find(toolName: string, versionSpec: string, arch?: string): string

    cacheToolDirectory(sourceDir: string, tool: string, version: string, arch?: string): Promise<string>

    createTempDirectory(): Promise<string>

    removeDirectory(dir: string): Promise<void>

    debug(message: string): void

    info(message: string): void

    error(message: string): void

    setFailed(message: string, done?: boolean): void

    setSucceeded(message: string, done?: boolean): void

    setVariable(name: string, val: string): void

    getVariable(name: string): string

    addPath(inputPath: string): void

    which(tool: string, check?: boolean): Promise<string>

    exec(exec: string, args: string[]): Promise<ExecResult>

    getSourceDir(): string

    isValidInputFile(input: string, file: string): boolean

    fileExists(file: string): boolean

    directoryExists(file: string): boolean

    setOutput(name: string, value: string): void

    getInput(input: string, required?: boolean): string

    getListInput(input: string, required?: boolean): string[]

    getBooleanInput(input: string, required?: boolean): boolean
}
