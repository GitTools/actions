import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { type IBuildAgent } from '@agents/common'
import { type GitVersionOutput, type CommandSettings, type ExecuteSettings, GitVersionTool } from '@tools/gitversion'

class TestGitVersionTool extends GitVersionTool {
    private _isValidInputFile = false

    init(isValidInputFile: boolean): void {
        this._isValidInputFile = isValidInputFile
    }

    async isValidInputFile(): Promise<boolean> {
        return Promise.resolve(this._isValidInputFile)
    }

    async getRepoDir(settings: ExecuteSettings | CommandSettings): Promise<string> {
        return super.getRepoDir(settings)
    }

    async getExecuteArguments(workDir: string, options: ExecuteSettings): Promise<string[]> {
        return super.getExecuteArguments(workDir, options)
    }

    getCommandArguments(workDir: string, options: CommandSettings): string[] {
        return super.getCommandArguments(workDir, options)
    }
}

describe('GitVersionTool', () => {
    let tool: TestGitVersionTool
    beforeEach(() => {
        tool = new TestGitVersionTool({} as IBuildAgent)
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should return correct tool name', () => {
        expect(tool.packageName).toBe('GitVersion.Tool')
    })

    it('should return correct version range', () => {
        expect(tool.versionRange).toBe('>=5.2.0 <6.1.0')
    })

    it('should have settings provider defined', () => {
        expect(tool.settingsProvider).toBeDefined()
    })

    describe('writeGitVersionToAgent', () => {
        it('should write correct output and variables to agent', () => {
            const outputs = new Map<string, string>()
            const variables = new Map<string, string>()
            const buildAgent = {
                setOutput(name: string, value: string) {
                    outputs.set(name, value)
                },
                setVariable(name: string, value: string) {
                    variables.set(name, value)
                }
            } as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)

            const output: Partial<GitVersionOutput> = {
                Major: 1,
                Minor: 2,
                Patch: 3,
                SemVer: '1.2.3-alpha.1',
                FullSemVer: '1.2.3-alpha.1'
            }
            tool.writeGitVersionToAgent(output as GitVersionOutput)

            expect(outputs.get('major')).toBe('1')
            expect(outputs.get('minor')).toBe('2')
            expect(outputs.get('patch')).toBe('3')
            expect(outputs.get('semVer')).toBe('1.2.3-alpha.1')
            expect(outputs.get('fullSemVer')).toBe('1.2.3-alpha.1')

            expect(outputs.get('GitVersion_Major')).toBe('1')
            expect(outputs.get('GitVersion_Minor')).toBe('2')
            expect(outputs.get('GitVersion_Patch')).toBe('3')
            expect(outputs.get('GitVersion_SemVer')).toBe('1.2.3-alpha.1')
            expect(outputs.get('GitVersion_FullSemVer')).toBe('1.2.3-alpha.1')

            expect(variables.get('major')).toBe('1')
            expect(variables.get('minor')).toBe('2')
            expect(variables.get('patch')).toBe('3')
            expect(variables.get('semVer')).toBe('1.2.3-alpha.1')
            expect(variables.get('fullSemVer')).toBe('1.2.3-alpha.1')

            expect(variables.get('GitVersion_Major')).toBe('1')
            expect(variables.get('GitVersion_Minor')).toBe('2')
            expect(variables.get('GitVersion_Patch')).toBe('3')
            expect(variables.get('GitVersion_SemVer')).toBe('1.2.3-alpha.1')
            expect(variables.get('GitVersion_FullSemVer')).toBe('1.2.3-alpha.1')
        })
    })

    describe('getRepoDir', () => {
        it('should return correct repo dir for empty target path, takes build agent sourceDir', async () => {
            const buildAgent = {
                sourceDir: 'workdir'
            } as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)
            const repoDir = await tool.getRepoDir({
                targetPath: ''
            } as ExecuteSettings | CommandSettings)
            expect(repoDir).toBe('workdir')
        })

        it('should return correct repo dir for empty target path, takes default', async () => {
            const buildAgent = {
                sourceDir: ''
            } as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)
            const repoDir = await tool.getRepoDir({
                targetPath: ''
            } as ExecuteSettings | CommandSettings)
            expect(repoDir).toBe('.')
        })

        it('should return correct repo dir for existing target path', async () => {
            const buildAgent = {
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(true)
                }
            } as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)
            const repoDir = await tool.getRepoDir({
                targetPath: 'targetDir'
            } as ExecuteSettings | CommandSettings)
            expect(repoDir).toBe('targetDir')
        })

        it('should throw error for non-existing target path', async () => {
            const wrongDir = 'wrongdir'
            const buildAgent = {
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(false)
                }
            } as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)
            await expect(
                tool.getRepoDir({
                    targetPath: wrongDir
                } as ExecuteSettings | CommandSettings)
            ).rejects.toThrowError(`Directory not found at ${wrongDir}`)
        })
    })

    describe('getExecuteArguments', () => {
        it('should return correct arguments for empty settings', async () => {
            const args = await tool.getExecuteArguments('workdir', {} as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json'])
        })

        it('should return correct arguments for settings with cache', async () => {
            const args = await tool.getExecuteArguments('workdir', {
                disableCache: true
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/nocache'])
        })

        it('should return correct arguments for settings with normalization', async () => {
            const args = await tool.getExecuteArguments('workdir', {
                disableNormalization: true
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/nonormalize'])
        })

        it('should return correct arguments for settings with config', async () => {
            tool.init(true)
            const args = await tool.getExecuteArguments('workdir', {
                useConfigFile: true,
                configFilePath: 'workdir/GitVersion.yml'
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/config', 'workdir/GitVersion.yml'])
        })

        it('should return correct arguments for settings with wrong config file', async () => {
            tool.init(false)
            const configFile = 'workdir/WrongConfig.yml'
            await expect(
                tool.getExecuteArguments('workdir', {
                    useConfigFile: true,
                    configFilePath: configFile
                } as ExecuteSettings)
            ).rejects.toThrowError(`GitVersion configuration file not found at ${configFile}`)
        })

        it('should return correct arguments for settings with override config', async () => {
            const args = await tool.getExecuteArguments('workdir', {
                overrideConfig: ['tag-prefix=release-', 'next-version=1.0.0']
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/overrideconfig', 'tag-prefix=release-', '/overrideconfig', 'next-version=1.0.0'])
        })

        it('should return correct arguments for settings with assembly info', async () => {
            tool.init(true)
            const args = await tool.getExecuteArguments('workdir', {
                updateAssemblyInfo: true,
                updateAssemblyInfoFilename: 'AssemblyInfo.cs'
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/updateassemblyinfo', 'AssemblyInfo.cs'])
        })

        it('should return correct arguments for settings with wrong assembly info', async () => {
            tool.init(false)
            const assemblyInfoFile = 'WrongAssemblyInfo.cs'
            await expect(
                tool.getExecuteArguments('workdir', {
                    updateAssemblyInfo: true,
                    updateAssemblyInfoFilename: assemblyInfoFile
                } as ExecuteSettings)
            ).rejects.toThrowError(`AssemblyInfoFilename file not found at ${assemblyInfoFile}`)
        })

        it('should return correct arguments for settings with config and assembly info', async () => {
            tool.init(true)
            const args = await tool.getExecuteArguments('workdir', {
                useConfigFile: true,
                configFilePath: 'workdir/GitVersion.yml',
                updateAssemblyInfo: true,
                updateAssemblyInfoFilename: 'AssemblyInfo.cs'
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/config', 'workdir/GitVersion.yml', '/updateassemblyinfo', 'AssemblyInfo.cs'])
        })
    })

    describe('getCommandArguments', () => {
        it('should return correct arguments for empty settings', () => {
            const args = tool.getCommandArguments('workdir', {} as CommandSettings)
            expect(args).toEqual(['workdir'])
        })

        it('should return correct arguments for settings with additional arguments', () => {
            const args = tool.getCommandArguments('workdir', {
                arguments: '--some-arg --another-arg'
            } as CommandSettings)
            expect(args).toEqual(['workdir', '--some-arg', '--another-arg'])
        })
    })
})
