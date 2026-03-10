import { execFile as execFileNonPromise, ExecFileOptions } from 'node:child_process'
import * as fs from 'node:fs/promises'
import * as process from 'node:process'
import * as path from 'node:path'
import * as util from 'node:util'
import * as semver from 'semver'
import { lookPath } from './lookPath'
import { type ExecResult } from './models'

export interface IBuildAgent {
    agentName: string
    sourceDirVariable: string
    tempDirVariable: string
    cacheDirVariable: string

    sourceDir: string
    tempDir: string
    cacheDir: string

    addPath(inputPath: string): void

    debug(message: string): void

    info(message: string): void

    warn(message: string): void

    error(message: string): void

    exec(exec: string, args: string[]): Promise<ExecResult>

    cacheToolDirectory(sourceDir: string, tool: string, version: string): Promise<string>

    directoryExists(dir: string): Promise<boolean>

    removeDirectory(dir: string): Promise<void>

    fileExists(file: string): Promise<boolean>

    findLocalTool(toolName: string, versionSpec: string): Promise<string | null>

    getInput(input: string, required?: boolean): string

    getInput<T>(input: Extract<keyof T, string>, required?: boolean): string

    getBooleanInput<T>(input: Extract<keyof T, string>, required?: boolean): boolean

    getDelimitedInput<T>(input: Extract<keyof T, string>, delimiter: string, required?: boolean): string[]

    getListInput<T>(input: Extract<keyof T, string>, required?: boolean): string[]

    setSucceeded(message: string, done?: boolean): void

    setFailed(message: string, done?: boolean): void

    setOutput(name: string, value: string): void

    getVariable(name: string): string | undefined

    getVariableAsPath(name: string): string

    getExpandedString(pattern: string): string

    setVariable(name: string, value: string): void

    updateBuildNumber: (version: string) => void

    which(tool: string, check?: boolean): Promise<string>
}

export abstract class BuildAgentBase implements IBuildAgent {
    abstract agentName: string
    abstract sourceDirVariable: string
    abstract tempDirVariable: string
    abstract cacheDirVariable: string

    abstract debug(message: string): void

    abstract info(message: string): void

    abstract warn(message: string): void

    abstract error(message: string): void

    abstract setSucceeded(message: string, done?: boolean): void

    abstract setFailed(message: string, done?: boolean): void

    abstract setOutput(name: string, value: string): void

    abstract setVariable(name: string, value: string): void

    abstract updateBuildNumber: (version: string) => void

    get sourceDir(): string {
        return this.getVariableAsPath(this.sourceDirVariable)?.replace(/\\/g, '/')
    }

    get tempDir(): string {
        return this.getVariableAsPath(this.tempDirVariable)
    }

    get cacheDir(): string {
        return this.getVariableAsPath(this.cacheDirVariable)
    }

    addPath(inputPath: string): void {
        const envName = process.platform === 'win32' ? 'Path' : 'PATH'
        const newPath = inputPath + path.delimiter + process.env[envName]
        this.debug(`new Path: ${newPath}`)
        process.env[envName] = newPath
        process.env.Path = newPath
        this.info(`Updated PATH: ${process.env[envName]}`)
    }

    getInput<T>(input: Extract<keyof T, string>, required?: boolean): string {
        const inputProp = input.replace(/ /g, '_').toUpperCase()
        const val = this.getVariable(`INPUT_${inputProp}`)
        if (required && !val) {
            throw new Error(`Input required and not supplied: ${inputProp}`)
        }
        return val.trim()
    }

    getBooleanInput<T>(input: Extract<keyof T, string>, required?: boolean): boolean {
        const inputValue = this.getInput(input, required)
        return (inputValue || 'false').toLowerCase() === 'true'
    }

    getDelimitedInput<T>(input: Extract<keyof T, string>, delimiter: string, required?: boolean): string[] {
        return this.getInput(input, required)
            .split(delimiter)
            .filter(x => {
                if (x) {
                    return x.trim()
                }
            })
    }

    getListInput<T>(input: Extract<keyof T, string>, required?: boolean): string[] {
        return this.getDelimitedInput(input, '\n', required)
    }

    getVariable(name: string): string {
        const value = (process.env[name] || '').trim()
        this.debug(`getVariable - ${name}: ${value}`)
        return value.trim()
    }

    getVariableAsPath(name: string): string {
        return path.resolve(path.normalize(this.getVariable(name)))
    }

    /**
     * Replaces environment variable references in a string with their values.
     * Supports both $VAR and ${VAR} formats.
     * Ignores invalid patterns like ${} or non-existing variables (replaced with empty string).
     *
     * @param pattern - The input string containing env variable placeholders.
     * @returns The string with env variables expanded.
     */
    getExpandedString(pattern: string): string {
        const expanded = pattern.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*|{([a-zA-Z_][a-zA-Z0-9_]*)})/g, (_, whole: string, braced?: string) => {
            const name = braced ?? whole
            const value = process.env[name.toUpperCase()]
            return value !== undefined ? value : ''
        })
        this.debug(`getExpandedString - ${pattern}: ${expanded}`)
        return expanded
    }

    async directoryExists(dir: string): Promise<boolean> {
        try {
            await fs.access(dir)
            return (await fs.stat(dir)).isDirectory()
        } catch (_error) {
            return false
        }
    }

    async removeDirectory(dir: string): Promise<void> {
        await fs.rm(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 1000 })
    }

    async fileExists(file: string): Promise<boolean> {
        try {
            await fs.access(file)
            return (await fs.stat(file)).isFile()
        } catch (_error) {
            return false
        }
    }

    async cacheToolDirectory(sourceDir: string, tool: string, version: string): Promise<string> {
        if (!tool) {
            throw new Error('tool is a required parameter')
        }
        if (!version) {
            throw new Error('version is a required parameter')
        }
        if (!sourceDir) {
            throw new Error('sourceDir is a required parameter')
        }

        const cacheRoot = this.cacheDir
        if (!cacheRoot) {
            this.debug('cache root not set')
            return ''
        }

        version = semver.clean(version) || version
        const destPath = path.join(cacheRoot, tool, version)
        if (await this.directoryExists(destPath)) {
            this.debug(`Destination directory ${destPath} already exists, removing`)
            await this.removeDirectory(destPath)
        }

        this.debug(`Copying ${sourceDir} to ${destPath}`)
        await fs.mkdir(destPath, { recursive: true })
        await fs.cp(sourceDir, destPath, { recursive: true, force: true })

        this.debug(`Caching ${tool}@${version} from ${sourceDir}`)
        return destPath
    }

    async findLocalTool(toolName: string, versionSpec: string): Promise<string | null> {
        if (!toolName) {
            throw new Error('toolName is a required parameter')
        }
        if (!versionSpec) {
            throw new Error('versionSpec is a required parameter')
        }

        const cacheRoot = this.cacheDir
        if (!cacheRoot) {
            this.debug('cache root not set')
            return null
        }

        versionSpec = semver.clean(versionSpec) || versionSpec
        this.info(`Looking for local tool ${toolName}@${versionSpec}`)
        const toolPath = path.join(cacheRoot, toolName, versionSpec)
        if (!(await this.directoryExists(toolPath))) {
            this.info(`Directory ${toolPath} not found`)
            return null
        } else {
            this.info(`Found tool ${toolName}@${versionSpec} at ${toolPath}`)
        }

        return toolPath
    }

    async exec(cmd: string, args: string[]): Promise<ExecResult> {
        const execFile = util.promisify(execFileNonPromise)

        try {
            const commandOptions: ExecFileOptions = { maxBuffer: 1024 * 1024 * 10 } // 10MB
            const { stdout, stderr } = await execFile(cmd, args, commandOptions)
            const normalizedStdout = typeof stdout === 'string' ? stdout : stdout?.toString()
            const normalizedStderr = typeof stderr === 'string' ? stderr : stderr?.toString()
            return {
                code: 0,
                error: null,
                stderr: normalizedStderr,
                stdout: normalizedStdout
            }
        } catch (e) {
            const error = e as Error & { code: number; stderr?: string | Buffer; stdout?: string | Buffer }
            const normalizedStdout = typeof error.stdout === 'string' ? error.stdout : error.stdout?.toString()
            const normalizedStderr = typeof error.stderr === 'string' ? error.stderr : error.stderr?.toString()
            return {
                code: error.code,
                error,
                stderr: normalizedStderr,
                stdout: normalizedStdout
            }
        }
    }

    async which(tool: string, _check?: boolean): Promise<string> {
        this.debug(`looking for tool '${tool}' in PATH`)
        let toolPath = await lookPath(tool)
        if (toolPath) {
            toolPath = path.resolve(toolPath)
            this.debug(`found tool '${tool}' in PATH: ${toolPath}`)
            return toolPath
        }
        throw new Error(`Unable to locate executable file: ${tool}`)
    }
}
