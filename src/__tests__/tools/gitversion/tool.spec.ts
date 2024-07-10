import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { IBuildAgent } from '@agents/common'
import { type GitVersionOutput, type GitVersionSettings, GitVersionTool } from '@tools/gitversion'

class TestGitVersionTool extends GitVersionTool {
    private _isValidInputFile = false

    init(isValidInputFile: boolean): void {
        this._isValidInputFile = isValidInputFile
    }

    async isValidInputFile(): Promise<boolean> {
        return Promise.resolve(this._isValidInputFile)
    }

    async getRepoDir(settings: GitVersionSettings): Promise<string> {
        return super.getRepoDir(settings)
    }

    async getArguments(workDir: string, options: GitVersionSettings): Promise<string[]> {
        return super.getArguments(workDir, options)
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
            const outputs: Map<string, string> = new Map()
            const variables: Map<string, string> = new Map()
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
            } as GitVersionSettings)
            expect(repoDir).toBe('workdir')
        })

        it('should return correct repo dir for empty target path, takes default', async () => {
            const buildAgent = {
                sourceDir: ''
            } as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)
            const repoDir = await tool.getRepoDir({
                targetPath: ''
            } as GitVersionSettings)
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
            } as GitVersionSettings)
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
                } as GitVersionSettings)
            ).rejects.toThrowError(`Directory not found at ${wrongDir}`)
        })
    })

    describe('getArguments', () => {
        it('should return correct arguments for empty settings', async () => {
            const args = await tool.getArguments('workdir', {} as GitVersionSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/output', 'buildserver'])
        })

        it('should return correct arguments for settings with cache', async () => {
            const args = await tool.getArguments('workdir', {
                disableCache: true
            } as GitVersionSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/output', 'buildserver', '/nocache'])
        })

        it('should return correct arguments for settings with normalization', async () => {
            const args = await tool.getArguments('workdir', {
                disableNormalization: true
            } as GitVersionSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/output', 'buildserver', '/nonormalize'])
        })

        it('should return correct arguments for settings with config', async () => {
            tool.init(true)
            const args = await tool.getArguments('workdir', {
                useConfigFile: true,
                configFilePath: 'workdir/GitVersion.yml'
            } as GitVersionSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/output', 'buildserver', '/config', 'workdir/GitVersion.yml'])
        })

        it('should return correct arguments for settings with wrong config file', async () => {
            tool.init(false)
            const configFile = 'workdir/WrongConfig.yml'
            await expect(
                tool.getArguments('workdir', {
                    useConfigFile: true,
                    configFilePath: configFile
                } as GitVersionSettings)
            ).rejects.toThrowError(`GitVersion configuration file not found at ${configFile}`)
        })

        it('should return correct arguments for settings with override config', async () => {
            const args = await tool.getArguments('workdir', {
                overrideConfig: ['tag-prefix=release-', 'next-version=1.0.0']
            } as GitVersionSettings)
            expect(args).toEqual([
                'workdir',
                '/output',
                'json',
                '/output',
                'buildserver',
                '/overrideconfig',
                'tag-prefix=release-',
                '/overrideconfig',
                'next-version=1.0.0'
            ])
        })

        it('should return correct arguments for settings with assembly info', async () => {
            tool.init(true)
            const args = await tool.getArguments('workdir', {
                updateAssemblyInfo: true,
                updateAssemblyInfoFilename: 'AssemblyInfo.cs'
            } as GitVersionSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/output', 'buildserver', '/updateassemblyinfo', 'AssemblyInfo.cs'])
        })

        it('should return correct arguments for settings with wrong assembly info', async () => {
            tool.init(false)
            const assemblyInfoFile = 'WrongAssemblyInfo.cs'
            await expect(
                tool.getArguments('workdir', {
                    updateAssemblyInfo: true,
                    updateAssemblyInfoFilename: assemblyInfoFile
                } as GitVersionSettings)
            ).rejects.toThrowError(`AssemblyInfoFilename file not found at ${assemblyInfoFile}`)
        })

        it('should return correct arguments for settings with config and assembly info', async () => {
            tool.init(true)
            const args = await tool.getArguments('workdir', {
                useConfigFile: true,
                configFilePath: 'workdir/GitVersion.yml',
                updateAssemblyInfo: true,
                updateAssemblyInfoFilename: 'AssemblyInfo.cs'
            } as GitVersionSettings)
            expect(args).toEqual([
                'workdir',
                '/output',
                'json',
                '/output',
                'buildserver',
                '/config',
                'workdir/GitVersion.yml',
                '/updateassemblyinfo',
                'AssemblyInfo.cs'
            ])
        })

        it('should return correct arguments for settings with additional arguments', async () => {
            const args = await tool.getArguments('workdir', {
                additionalArguments: '--some-arg --another-arg'
            } as GitVersionSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/output', 'buildserver', '--some-arg', '--another-arg'])
        })
    })
})
