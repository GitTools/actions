import { type ExecResult } from '@agents/common'
import { DotnetTool, keysFn } from '@tools/common'
import { type GitVersionOutput, type GitVersionSettings } from './models'
import { GitVersionSettingsProvider, IGitVersionSettingsProvider } from './settings'

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

    async run(): Promise<ExecResult> {
        const settings = this.settingsProvider.getGitVersionSettings()
        const workDir = await this.getRepoDir(settings)

        await this.checkShallowClone(settings, workDir)

        const args = await this.getArguments(workDir, settings)

        await this.setDotnetRoot()
        return await this.executeTool(args)
    }

    writeGitVersionToAgent(output: GitVersionOutput): void {
        const keys = keysFn<GitVersionOutput>(output)
        for (const property of keys) {
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
            } catch (error) {
                this.buildAgent.error(`Unable to set output/variable for ${property}`)
            }
        }
    }

    protected async getRepoDir(settings: GitVersionSettings): Promise<string> {
        return await super.getRepoPath(settings.targetPath)
    }

    protected async getArguments(workDir: string, options: GitVersionSettings): Promise<string[]> {
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

        if (additionalArguments) {
            args = args.concat(this.argStringToArray(additionalArguments))
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

    private async checkShallowClone(settings: GitVersionSettings, workDir: string): Promise<void> {
        if (!settings.disableShallowCloneCheck) {
            const isShallowResult = await this.execute('git', ['-C', workDir, 'rev-parse', '--is-shallow-repository'])
            if (isShallowResult.code === 0 && isShallowResult.stdout.trim() === 'true') {
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
