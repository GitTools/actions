import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import * as fs from 'node:fs/promises'
import { type IBuildAgent } from '@agents/common'
import { type GitVersionOutput, type CommandSettings, type ExecuteSettings, GitVersionTool, IGitVersionSettingsProvider } from '@tools/gitversion'

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

    async getExecuteArguments(workDir: string, options: ExecuteSettings, outputFile?: string): Promise<string[]> {
        return super.getExecuteArguments(workDir, options, outputFile)
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
        expect(tool.versionRange).toBe('>=6.1.0 <7.0.0')
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
                },
                updateBuildNumber(_version: string): void {
                    return
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

    describe('updateBuildNumber', () => {
        it('should update build number when buildNumberFormat is provided', () => {
            // Setup
            let updatedBuildNumber: string | undefined
            const buildAgent = {
                updateBuildNumber(version: string): void {
                    updatedBuildNumber = version
                },
                getExpandedString(format: string): string {
                    return format.replace('${GitVersion_SemVer}', '2.3.4-beta.5')
                }
            } as IBuildAgent

            tool = new TestGitVersionTool(buildAgent)

            // Mock the settings provider to return a buildNumberFormat
            const mockSettingsProvider = {
                getExecuteSettings: () =>
                    ({
                        buildNumberFormat: 'v${GitVersion_SemVer}'
                    }) as ExecuteSettings
            } as IGitVersionSettingsProvider

            // Override the settingsProvider getter
            vi.spyOn(tool, 'settingsProvider', 'get').mockReturnValue(mockSettingsProvider)

            // Act
            tool.updateBuildNumber()

            // Assert
            expect(updatedBuildNumber).toBe('v2.3.4-beta.5')
        })

        it('should not update build number when buildNumberFormat is not provided', () => {
            // Setup
            let wasCalled = false
            const buildAgent = {
                updateBuildNumber(_: string): void {
                    wasCalled = true
                },
                getExpandedString(format: string): string {
                    return format
                },
                debug(_: string): void {}
            } as IBuildAgent

            tool = new TestGitVersionTool(buildAgent)

            // Mock the settings provider to return empty settings
            const mockSettingsProvider = {
                getExecuteSettings: () => ({}) as ExecuteSettings
            } as IGitVersionSettingsProvider

            // Override the settingsProvider getter
            vi.spyOn(tool, 'settingsProvider', 'get').mockReturnValue(mockSettingsProvider)

            // Act
            tool.updateBuildNumber()

            // Assert
            expect(wasCalled).toBe(false)
        })
    })

    describe('getExecuteArguments', () => {
        it('should return correct arguments for empty settings', async () => {
            const args = await tool.getExecuteArguments('workdir', {} as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console'])
        })

        it('should return correct arguments for settings with cache', async () => {
            const args = await tool.getExecuteArguments('workdir', {
                disableCache: true
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console', '/nocache'])
        })

        it('should return correct arguments for settings with normalization', async () => {
            const args = await tool.getExecuteArguments('workdir', {
                disableNormalization: true
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console', '/nonormalize'])
        })

        it('should return correct arguments for settings with config', async () => {
            tool.init(true)
            const args = await tool.getExecuteArguments('workdir', {
                configFilePath: 'workdir/GitVersion.yml'
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console', '/config', 'workdir/GitVersion.yml'])
        })

        it('should return correct arguments for settings with wrong config file', async () => {
            tool.init(false)
            const configFile = 'workdir/WrongConfig.yml'
            await expect(
                tool.getExecuteArguments('workdir', {
                    configFilePath: configFile
                } as ExecuteSettings)
            ).rejects.toThrowError(`GitVersion configuration file not found at ${configFile}`)
        })

        it('should return correct arguments for settings with no config file', async () => {
            tool.init(false)
            await expect(
                tool.getExecuteArguments('workdir', {
                    configFilePath: undefined
                } as ExecuteSettings)
            ).resolves.toEqual(['workdir', '/output', 'json', '/l', 'console'])
        })

        it('should return correct arguments for settings with override config', async () => {
            const args = await tool.getExecuteArguments('workdir', {
                overrideConfig: ['tag-prefix=release-', 'next-version=1.0.0']
            } as ExecuteSettings)
            expect(args).toEqual([
                'workdir',
                '/output',
                'json',
                '/l',
                'console',
                '/overrideconfig',
                'tag-prefix=release-',
                '/overrideconfig',
                'next-version=1.0.0'
            ])
        })

        it('should return correct arguments for settings with assembly info', async () => {
            tool.init(true)
            const args = await tool.getExecuteArguments('workdir', {
                updateAssemblyInfo: true,
                updateAssemblyInfoFilename: 'AssemblyInfo.cs'
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console', '/updateassemblyinfo', 'AssemblyInfo.cs'])
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
                configFilePath: 'workdir/GitVersion.yml',
                updateAssemblyInfo: true,
                updateAssemblyInfoFilename: 'AssemblyInfo.cs'
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console', '/config', 'workdir/GitVersion.yml', '/updateassemblyinfo', 'AssemblyInfo.cs'])
        })

        it('should return correct arguments for settings with project files', async () => {
            tool.init(true)
            const args = await tool.getExecuteArguments('workdir', {
                updateProjectFiles: true
            } as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console', '/updateprojectfiles'])
        })

        it('should include outputfile argument when output file is provided', async () => {
            const outputFile = '/tmp/gitversion-123.json'
            const args = await tool.getExecuteArguments('workdir', {} as ExecuteSettings, outputFile)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console', '/outputfile', outputFile])
        })

        it('should not include outputfile argument when output file is not provided', async () => {
            const args = await tool.getExecuteArguments('workdir', {} as ExecuteSettings)
            expect(args).toEqual(['workdir', '/output', 'json', '/l', 'console'])
        })
    })

    describe('readGitVersionOutput', () => {
        it('should read and parse JSON file correctly', async () => {
            const outputFile = '/tmp/test-gitversion-output.json'
            const expectedOutput: Partial<GitVersionOutput> = {
                Major: 1,
                Minor: 2,
                Patch: 3,
                SemVer: '1.2.3'
            }

            const buildAgent = {} as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)

            // Write test file
            await fs.writeFile(outputFile, JSON.stringify(expectedOutput))

            try {
                const result = await tool.readGitVersionOutput(outputFile)
                expect(result).toEqual(expectedOutput)

                // Verify file was deleted
                const fileExists = await fs
                    .access(outputFile)
                    .then(() => true)
                    .catch(() => false)
                expect(fileExists).toBe(false)
            } finally {
                // Cleanup in case test failed
                await fs.unlink(outputFile).catch(() => {})
            }
        })

        it('should throw error for invalid JSON file', async () => {
            const outputFile = '/tmp/test-gitversion-invalid.json'
            const buildAgent = {} as IBuildAgent
            tool = new TestGitVersionTool(buildAgent)

            // Write invalid JSON
            await fs.writeFile(outputFile, 'invalid json content')

            try {
                await expect(tool.readGitVersionOutput(outputFile)).rejects.toThrow()
            } finally {
                // Cleanup
                await fs.unlink(outputFile).catch(() => {})
            }
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
