import { type ExecResult } from '@agents/common'
import { DotnetTool, keysOf } from '@tools/common'
import { type CommandSettings, type ExecuteSettings, type GitVersionOutput } from './models'
import { GitVersionSettingsProvider, type IGitVersionSettingsProvider } from './settings'

export class GitVersionTool extends DotnetTool {
    get packageName(): string {
        return 'GitVersion.Tool'
    }

    get toolName(): string {
        return 'dotnet-gitversion'
    }

    get toolPathVariable(): string {
        return 'GITVERSION_PATH'
    }

    get versionRange(): string | null {
        return '>=5.2.0 <6.1.0'
    }

    get settingsProvider(): IGitVersionSettingsProvider {
        return new GitVersionSettingsProvider(this.buildAgent)
    }

    async executeJson(): Promise<ExecResult> {
        const settings = this.settingsProvider.getExecuteSettings()
        const workDir = await this.getRepoDir(settings)

        await this.checkShallowClone(settings, workDir)

        const args = await this.getExecuteArguments(workDir, settings)

        await this.setDotnetRoot()
        return await this.executeTool(args)
    }

    async executeCommand(): Promise<ExecResult> {
        const settings = this.settingsProvider.getCommandSettings()
        const workDir = await this.getRepoDir(settings)

        await this.checkShallowClone(settings, workDir)

        const args = this.getCommandArguments(workDir, settings)

        await this.setDotnetRoot()
        return await this.executeTool(args)
    }

    writeGitVersionToAgent(output: GitVersionOutput): void {
        for (const property of keysOf(output)) {
            const name = this.toCamelCase(property)
            try {
                let value = output[property]?.toString()
                if (value === '0') {
                    value = '0'
                }
                this.buildAgent.setOutput(name, value)
                this.buildAgent.setOutput(`GitVersion_${property}`, value)
                this.buildAgent.setVariable(name, value)
                this.buildAgent.setVariable(`GitVersion_${property}`, value)
            } catch (_error) {
                this.buildAgent.error(`Unable to set output/variable for ${property}`)
            }
        }

        if (output.FullSemVer.endsWith('+0')) {
            output.FullSemVer = output.FullSemVer.slice(0, -2)
        }
        this.buildAgent.updateBuildNumber(output.FullSemVer)
    }

    protected async getRepoDir(settings: ExecuteSettings | CommandSettings): Promise<string> {
        return await super.getRepoPath(settings.targetPath)
    }

    protected async getExecuteArguments(workDir: string, options: ExecuteSettings): Promise<string[]> {
        const args = [workDir, '/output', 'json', '/l', 'console']

        const {
            useConfigFile,
            disableCache,
            disableNormalization,
            configFilePath,
            overrideConfig,
            updateAssemblyInfo,
            updateAssemblyInfoFilename
            //
        } = options

        if (disableCache) {
            args.push('/nocache')
        }

        if (disableNormalization) {
            args.push('/nonormalize')
        }

        if (useConfigFile) {
            if (await this.isValidInputFile('configFilePath', configFilePath)) {
                args.push('/config', configFilePath)
            } else {
                throw new Error(`GitVersion configuration file not found at ${configFilePath}`)
            }
        }

        if (overrideConfig) {
            for (let config of overrideConfig) {
                config = config.trim()
                if (config.match(/([a-zA-Z0-9]+(-[a-zA-Z]+)*=[a-zA-Z0-9\- :.']*)/)) {
                    args.push('/overrideconfig', config)
                }
            }
        }

        if (updateAssemblyInfo) {
            args.push('/updateassemblyinfo')

            // You can specify 'updateAssemblyInfo' without 'updateAssemblyInfoFilename'.
            if (updateAssemblyInfoFilename?.length > 0) {
                if (await this.isValidInputFile('updateAssemblyInfoFilename', updateAssemblyInfoFilename)) {
                    args.push(updateAssemblyInfoFilename)
                } else {
                    throw new Error(`AssemblyInfoFilename file not found at ${updateAssemblyInfoFilename}`)
                }
            }
        }

        return args
    }

    protected getCommandArguments(workDir: string, options: CommandSettings): string[] {
        let args = [workDir]

        if (options.arguments) {
            args = args.concat(this.argStringToArray(options.arguments))
        }
        return args
    }

    private argStringToArray(argString: string): string[] {
        const args: string[] = []

        let inQuotes = false
        let escaped = false
        let lastCharWasSpace = true
        let arg = ''

        const append = (c: string): void => {
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

    private async checkShallowClone(settings: ExecuteSettings | CommandSettings, workDir: string): Promise<void> {
        if (!settings.disableShallowCloneCheck) {
            const isShallowResult = await this.execute('git', ['-C', workDir, 'rev-parse', '--is-shallow-repository'])
            if (isShallowResult.code === 0 && isShallowResult.stdout?.trim() === 'true') {
                throw new Error(
                    'The repository is shallow. Consider disabling shallow clones. See https://github.com/GitTools/actions/blob/main/docs/cloning.md for more information.'
                )
            }
        }
    }

    private toCamelCase(input: string): string {
        return input.replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
            if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase()
        })
    }
}
