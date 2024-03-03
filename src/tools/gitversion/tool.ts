import { inject, injectable } from 'inversify'
import { IBuildAgent, IExecResult, TYPES } from '../../core/models'
import { DotnetTool, IDotnetTool } from '../../core/dotnet-tool'
import { GitVersionOutput, GitVersionSettings } from './models'
import { IVersionManager } from '../../core/versionManager'
import { ISetupSettings } from '../common/models'

export interface IGitVersionTool extends IDotnetTool {
    install(setupSettings: ISetupSettings): Promise<void>

    run(options: GitVersionSettings): Promise<IExecResult>

    writeGitVersionToAgent(gitversion: GitVersionOutput): void
}

@injectable()
export class GitVersionTool extends DotnetTool implements IGitVersionTool {
    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent, @inject(TYPES.IVersionManager) versionManager: IVersionManager) {
        super(buildAgent, versionManager)
    }

    public async install(setupSettings: ISetupSettings): Promise<void> {
        await this.toolInstall('GitVersion.Tool', '>=5.10.0 <6.1.0', setupSettings)
    }

    public run(options: GitVersionSettings): Promise<IExecResult> {
        const workDir = this.getRepoDir(options)

        const args = this.getArguments(workDir, options)

        return this.execute('dotnet-gitversion', args)
    }

    private getRepoDir(options: GitVersionSettings): string {
        const targetPath = options.targetPath
        const srcDir = options.srcDir || '.'
        let workDir: string
        if (!targetPath) {
            workDir = srcDir
        } else {
            if (this.buildAgent.directoryExists(targetPath)) {
                workDir = targetPath
            } else {
                throw new Error('Directory not found at ' + targetPath)
            }
        }
        return workDir.replace(/\\/g, '/')
    }

    private getArguments(workDir: string, options: GitVersionSettings): string[] {
        let args = [workDir, '/output', 'json', '/output', 'buildserver']

        const {
            useConfigFile,
            disableCache,
            disableNormalization,
            configFilePath,
            overrideConfig,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            additionalArguments
            //
        } = options

        if (disableCache) {
            args.push('/nocache')
        }

        if (disableNormalization) {
            args.push('/nonormalize')
        }

        if (useConfigFile) {
            if (this.buildAgent.isValidInputFile('configFilePath', configFilePath)) {
                args.push('/config', configFilePath)
            } else {
                throw new Error('GitVersion configuration file not found at ' + configFilePath)
            }
        }

        if (overrideConfig) {
            overrideConfig.forEach(config => {
                config = config.trim()
                if (config.match(/([a-zA-Z0-9]+(-[a-zA-Z]+)*=[a-zA-Z0-9\- :.']*)/)) {
                    args.push('/overrideconfig', config)
                }
            })
        }

        if (updateAssemblyInfo) {
            args.push('/updateassemblyinfo')

            // You can specify 'updateAssemblyInfo' without 'updateAssemblyInfoFilename'.
            if (updateAssemblyInfoFilename?.length > 0) {
                if (this.buildAgent.isValidInputFile('updateAssemblyInfoFilename', updateAssemblyInfoFilename)) {
                    args.push(updateAssemblyInfoFilename)
                } else {
                    throw new Error('AssemblyInfoFilename file not found at ' + updateAssemblyInfoFilename)
                }
            }
        }

        if (additionalArguments) {
            args = args.concat(this.argStringToArray(additionalArguments))
        }
        return args
    }

    public writeGitVersionToAgent(gitversion: GitVersionOutput): void {
        let properties = Object.keys(gitversion)
        let gitversionOutput = <any>gitversion

        properties.forEach(property => {
            const name = this.toCamelCase(property)
            let value = gitversionOutput[property]
            if (value === 0) {
                value = '0'
            }
            this.buildAgent.setOutput(name, value)
            this.buildAgent.setOutput(`GitVersion_${name}`, value)
            this.buildAgent.setVariable(name, value)
            this.buildAgent.setVariable(`GitVersion_${name}`, value)
        })
    }

    private argStringToArray(argString: string): string[] {
        const args: string[] = []

        let inQuotes = false
        let escaped = false
        let lastCharWasSpace = true
        let arg = ''

        const append = function (c: string) {
            // we only escape double quotes.
            if (escaped && c !== '"') {
                arg += '\\'
            }

            arg += c
            escaped = false
        }

        for (let i = 0; i < argString.length; i++) {
            const c = argString.charAt(i)

            if (c === ' ' && !inQuotes) {
                if (!lastCharWasSpace) {
                    args.push(arg)
                    arg = ''
                }
                lastCharWasSpace = true
                continue
            } else {
                lastCharWasSpace = false
            }

            if (c === '"') {
                if (!escaped) {
                    inQuotes = !inQuotes
                } else {
                    append(c)
                }
                continue
            }

            if (c === '\\' && escaped) {
                append(c)
                continue
            }

            if (c === '\\' && inQuotes) {
                escaped = true
                continue
            }

            append(c)
            lastCharWasSpace = false
        }

        if (!lastCharWasSpace) {
            args.push(arg.trim())
        }

        return args
    }

    private toCamelCase(input: string): string {
        return input.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
            if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
            return index == 0 ? match.toLowerCase() : match.toUpperCase()
        })
    }
}
