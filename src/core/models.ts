import { IRequestOptions } from 'typed-rest-client/Interfaces'

export const TYPES = {
    IBuildAgent: Symbol.for('BuildAgent'),
    IDotnetTool: Symbol.for('DotnetTool'),
    IGitVersionTool: Symbol.for('GitVersionTool'),
    IGitReleaseManagerTool: Symbol.for('GitReleaseManagerTool'),
    IVersionManager: Symbol.for('VersionManager'),
    IGitVersionSettingsProvider: Symbol.for('GitVersionSettingsProvider'),
    IGitReleaseManagerSettingsProvider: Symbol.for('GitReleaseManagerSettingsProvider')
}

export interface IExecResult {
    stdout: string
    stderr: string
    code: number
    error: Error
}
export interface IBuildAgent {
    agentName: string
    proxyConfiguration(url: string): IRequestOptions
    find(toolName: string, versionSpec: string, arch?: string): string
    cacheDir(sourceDir: string, tool: string, version: string, arch?: string): Promise<string>
    createTempDir(): Promise<string>
    debug(message: string): void
    setFailed(message: string, done?: boolean): void
    setSucceeded(message: string, done?: boolean): void
    exportVariable(name: string, val: string): void
    getVariable(name: string): string
    addPath(inputPath: string): void
    which(tool: string, check?: boolean): Promise<string>
    exec(exec: string, args: string[]): Promise<IExecResult>

    getSourceDir(): string
    isValidInputFile(input: string, file: string): boolean
    fileExists(file: string): boolean
    directoryExists(file: string): boolean

    setOutput(name: string, value: string): void
    getInput(input: string, required?: boolean): string
    getListInput(input: string, required?: boolean): string[]
    getBooleanInput(input: string, required?: boolean): boolean
}
