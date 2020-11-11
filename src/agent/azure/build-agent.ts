import { injectable } from 'inversify'

import * as taskLib from 'azure-pipelines-task-lib/task'
import * as toolLib from 'azure-pipelines-tool-lib/tool'

import { IBuildAgent, IExecResult } from '../../core/models'
import { IRequestOptions } from 'typed-rest-client/Interfaces'

@injectable()
class BuildAgent implements IBuildAgent {
    public get agentName(): string {
        return 'Azure Pipelines'
    }

    public proxyConfiguration(url: string): IRequestOptions {
        return {
            proxy: taskLib.getHttpProxyConfiguration(url),
            cert: taskLib.getHttpCertConfiguration(),
            ignoreSslError: !!taskLib.getVariable('Agent.SkipCertValidation')
        }
    }

    public find(toolName: string, versionSpec: string, arch?: string): string {
        return toolLib.findLocalTool(toolName, versionSpec, arch)
    }

    public cacheDir(
        sourceDir: string,
        tool: string,
        version: string,
        arch?: string
    ): Promise<string> {
        return toolLib.cacheDir(sourceDir, tool, version, arch)
    }

    public createTempDir(): Promise<string> {
        return Promise.resolve(taskLib.getVariable('Agent.TempDirectory'))
    }

    public debug(message: string): void {
        taskLib.debug(message)
    }

    public setFailed(message: string, done?: boolean): void {
        taskLib.setResult(taskLib.TaskResult.Failed, message, done)
    }

    public setSucceeded(message: string, done?: boolean): void {
        taskLib.setResult(taskLib.TaskResult.Succeeded, message, done)
    }

    public exportVariable(name: string, val: string): void {
        taskLib.setVariable(name, val)
    }

    public getVariable(name: string): string {
        return taskLib.getVariable(name)
    }

    public addPath(inputPath: string): void {
        toolLib.prependPath(inputPath)
    }

    public which(tool: string, check?: boolean): Promise<string> {
        return Promise.resolve(taskLib.which(tool, check))
    }

    public exec(
        exec: string,
        args: string[],
        additionalArguments?: string
    ): Promise<IExecResult> {
        const tr = taskLib.tool(exec)
        tr.arg(args)
        if (additionalArguments) {
            tr.line(additionalArguments)
        }

        const result = tr.execSync()
        return Promise.resolve({
            code: result.code,
            error: result.error,
            stderr: result.stderr,
            stdout: result.stdout
        })
    }

    public getSourceDir(): string {
        return this.getVariable('Build.SourcesDirectory')
    }

    public setOutput(name: string, value: string): void {
        taskLib.setVariable(name, value)
    }

    public getInput(input: string, required?: boolean): string {
        return taskLib.getInput(input, required)?.trim()
    }

    public getListInput(input: string, required?: boolean): string[] {
        return taskLib
            .getInput(input, required)
            .split('\n')
            .filter(x => x !== '')
    }

    public getBooleanInput(input: string, required?: boolean): boolean {
        return taskLib.getBoolInput(input, required)
    }

    public isValidInputFile(input: string, file: string): boolean {
        return taskLib.filePathSupplied(input) && this.fileExists(file)
    }

    public fileExists(file: string): boolean {
        return taskLib.exist(file) && taskLib.stats(file).isFile()
    }

    public directoryExists(file: string): boolean {
        return taskLib.exist(file) && taskLib.stats(file).isDirectory()
    }
}

export { BuildAgent }
