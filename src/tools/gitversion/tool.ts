import { type ExecResult } from '@agents/common'
import { ArgumentsBuilder, DotnetTool, keysOf } from '@tools/common'
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
        return '>=6.1.0 <7.0.0'
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
                this.buildAgent.setOutput(`GitVersion.${property}`, value)
                this.buildAgent.setVariable(name, value)
                this.buildAgent.setVariable(`GitVersion_${property}`, value)
                this.buildAgent.setVariable(`GitVersion.${property}`, value)
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
        const builder = new ArgumentsBuilder().addArgument(workDir).addArgument('/output').addArgument('json').addArgument('/l').addArgument('console')

        const {
            useConfigFile,
            disableCache,
            disableNormalization,
            configFilePath,
            overrideConfig,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            updateProjectFiles
            //
        } = options

        if (disableCache) {
            builder.addArgument('/nocache')
        }

        if (disableNormalization) {
            builder.addArgument('/nonormalize')
        }

        if (useConfigFile) {
            if (await this.isValidInputFile('configFilePath', configFilePath)) {
                builder.addArgument('/config').addArgument(configFilePath)
            } else {
                throw new Error(`GitVersion configuration file not found at ${configFilePath}`)
            }
        }

        if (overrideConfig) {
            for (let config of overrideConfig) {
                config = config.trim()
                if (config.match(/([a-zA-Z0-9]+(-[a-zA-Z]+)*=[a-zA-Z0-9\- :.']*)/)) {
                    builder.addArgument('/overrideconfig').addArgument(config)
                }
            }
        }

        if (updateAssemblyInfo) {
            builder.addArgument('/updateassemblyinfo')

            // You can specify 'updateAssemblyInfo' without 'updateAssemblyInfoFilename'.
            if (updateAssemblyInfoFilename?.length > 0) {
                if (await this.isValidInputFile('updateAssemblyInfoFilename', updateAssemblyInfoFilename)) {
                    builder.addArgument(updateAssemblyInfoFilename)
                } else {
                    throw new Error(`AssemblyInfoFilename file not found at ${updateAssemblyInfoFilename}`)
                }
            }
        }

        if (updateProjectFiles) {
            builder.addArgument('/updateprojectfiles')
        }

        return builder.build()
    }

    protected getCommandArguments(workDir: string, options: CommandSettings): string[] {
        const builder = new ArgumentsBuilder().addArgument(workDir)

        if (options.arguments) {
            builder.addArguments(ArgumentsBuilder.parseArgumentString(options.arguments))
        }

        return builder.build()
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
