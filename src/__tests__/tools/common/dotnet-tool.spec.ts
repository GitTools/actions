import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as os from 'node:os'
import * as path from 'node:path'
import * as fs from 'node:fs/promises'
import * as process from 'node:process'
import { DotnetTool, ISettingsProvider } from '@tools/common'
import { IBuildAgent } from '@agents/common'
import { Dirent } from 'node:fs'

// Mock modules
vi.mock('node:os')
vi.mock('node:fs/promises')

// Create a test implementation of the abstract class
class TestDotnetTool extends DotnetTool {
    get packageName(): string {
        return 'test-package'
    }

    get toolName(): string {
        return 'test-tool'
    }

    get toolPathVariable(): string {
        return 'TEST_TOOL_PATH'
    }

    async getRepoPath(targetPath: string): Promise<string> {
        return super.getRepoPath(targetPath)
    }

    get versionRange(): string | null {
        return null
    }

    get settingsProvider(): ISettingsProvider {
        return {
            getSetupSettings: () => ({
                versionSpec: '1.0.0',
                includePrerelease: false,
                preferLatestVersion: false,
                ignoreFailedSources: false
            })
        }
    }

    // Expose protected methods for testing
    async testFindToolExecutable(toolBasePath: string): Promise<string | null> {
        return this.findToolExecutable(toolBasePath)
    }
}

// Helper function to mock build agent
function createMockBuildAgent(): IBuildAgent {
    const mockFileExists = vi.fn().mockResolvedValue(false)
    return {
        info: vi.fn(),
        debug: vi.fn(),
        warning: vi.fn(),
        error: vi.fn(),
        setSucceeded: vi.fn(),
        setFailed: vi.fn(),
        getInput: vi.fn(),
        getBooleanInput: vi.fn(),
        setOutput: vi.fn(),
        setVariable: vi.fn(),
        getVariable: vi.fn().mockReturnValue(undefined),
        getVariableAsPath: vi.fn(),
        addPath: vi.fn(),
        which: vi.fn(),
        exec: vi.fn().mockResolvedValue({ code: 0, stdout: '', stderr: '' }),
        getExecOutput: vi.fn(),
        fileExists: mockFileExists,
        directoryExists: vi.fn(),
        findLocalTool: vi.fn(),
        cacheToolDirectory: vi.fn(),
        removeDirectory: vi.fn(),
        sourceDir: '/source',
        tempDir: '/temp',
        workDir: '/work',
        runnerDir: '/runner'
    } as unknown as IBuildAgent
}

describe('DotnetTool', () => {
    let buildAgent: IBuildAgent
    let tool: TestDotnetTool

    beforeEach(() => {
        vi.resetAllMocks()
        buildAgent = createMockBuildAgent()
        tool = new TestDotnetTool(buildAgent)
    })

    describe('findToolExecutable', () => {
        function setupMockFileExists(mockFileExists: ReturnType<typeof vi.fn>, filePath: string): void {
            mockFileExists.mockImplementation(async (path: string) => {
                return Promise.resolve(path === filePath)
            })
            buildAgent.fileExists = mockFileExists as unknown as typeof buildAgent.fileExists
        }

        it('should return tool path when executable exists in base path', async () => {
            const basePath = '/tools/test-tool'
            const toolPath = path.join(basePath, 'test-tool')
            setupMockFileExists(vi.fn(), toolPath)

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBe(toolPath)
        })

        it('should return windows executable path when on windows', async () => {
            vi.mocked(os.platform).mockReturnValue('win32')
            const basePath = '/tools/test-tool'
            const toolPath = path.join(basePath, 'test-tool.exe')
            setupMockFileExists(vi.fn(), toolPath)

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBe(toolPath)
        })

        it('should check architecture-specific paths for x64', async () => {
            vi.mocked(os.arch).mockReturnValue('x64')
            vi.mocked(os.platform).mockReturnValue('linux')

            const basePath = '/tools/test-tool'
            const x64Path = path.join(basePath, 'x64', 'test-tool')
            setupMockFileExists(vi.fn(), x64Path)

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBe(x64Path)
        })

        it('should check architecture-specific paths for arm64', async () => {
            vi.mocked(os.arch).mockReturnValue('arm64')
            vi.mocked(os.platform).mockReturnValue('linux')

            const basePath = '/tools/test-tool'
            const arm64Path = path.join(basePath, 'arm64', 'test-tool')
            setupMockFileExists(vi.fn(), arm64Path)

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBe(arm64Path)
        })

        it('should check macOS-specific paths for x64', async () => {
            vi.mocked(os.arch).mockReturnValue('x64')
            vi.mocked(os.platform).mockReturnValue('darwin')

            const basePath = '/tools/test-tool'
            const osxX64Path = path.join(basePath, 'osx-x64', 'test-tool')
            setupMockFileExists(vi.fn(), osxX64Path)

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBe(osxX64Path)
        })

        it('should check macOS-specific paths for arm64', async () => {
            vi.mocked(os.arch).mockReturnValue('arm64')
            vi.mocked(os.platform).mockReturnValue('darwin')

            const basePath = '/tools/test-tool'
            const osxArm64Path = path.join(basePath, 'osx-arm64', 'test-tool')
            setupMockFileExists(vi.fn(), osxArm64Path)

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBe(osxArm64Path)
        })

        it('should search subdirectories as fallback', async () => {
            vi.mocked(os.arch).mockReturnValue('x64')
            vi.mocked(os.platform).mockReturnValue('linux')

            const basePath = '/tools/test-tool'
            const customDirPath = path.join(basePath, 'custom-dir', 'test-tool')

            const mockFileExists = vi.fn().mockImplementation(async (filePath: string) => {
                return Promise.resolve(filePath === customDirPath)
            })

            buildAgent.fileExists = mockFileExists as unknown as typeof buildAgent.fileExists

            vi.mocked(fs.readdir).mockResolvedValue([
                { name: 'custom-dir', isDirectory: () => true } as unknown as Dirent,
                { name: 'not-a-dir', isDirectory: () => false } as unknown as Dirent
            ])

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBe(customDirPath)
        })

        it('should handle errors when reading subdirectories', async () => {
            vi.mocked(os.arch).mockReturnValue('x64')
            vi.mocked(os.platform).mockReturnValue('linux')

            const basePath = '/tools/test-tool'

            const mockFileExists = vi.fn().mockResolvedValue(false)
            const mockDebug = vi.fn()

            buildAgent.fileExists = mockFileExists as unknown as typeof buildAgent.fileExists
            buildAgent.debug = mockDebug

            vi.mocked(fs.readdir).mockRejectedValue(new Error('Permission denied'))

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBeNull()
        })

        it('should return null when executable not found anywhere', async () => {
            vi.mocked(os.arch).mockReturnValue('x64')
            vi.mocked(os.platform).mockReturnValue('linux')

            const basePath = '/tools/test-tool'

            const mockFileExists = vi.fn().mockResolvedValue(false)
            buildAgent.fileExists = mockFileExists as unknown as typeof buildAgent.fileExists

            vi.mocked(fs.readdir).mockResolvedValue([])

            const result = await tool.testFindToolExecutable(basePath)

            expect(result).toBeNull()
        })
    })

    describe('disableTelemetry', () => {
        it('should set telemetry environment variables', () => {
            const mockInfo = vi.fn()
            const mockSetVariable = vi.fn()

            buildAgent.info = mockInfo
            buildAgent.setVariable = mockSetVariable

            tool.disableTelemetry()

            expect(mockInfo).toHaveBeenCalledWith('Disable Telemetry')
            expect(mockSetVariable).toHaveBeenCalledWith('DOTNET_CLI_TELEMETRY_OPTOUT', 'true')
            expect(mockSetVariable).toHaveBeenCalledWith('DOTNET_NOLOGO', 'true')
        })
    })

    describe('getRepoDir', () => {
        it('should return correct repo dir for empty target path, takes build agent sourceDir', async () => {
            const buildAgent = {
                sourceDir: '/workdir'
            } as IBuildAgent
            tool = new TestDotnetTool(buildAgent)
            const repoDir = await tool.getRepoPath('')
            expect(repoDir).toBe(path.normalize('/workdir'))
        })

        it('should return correct repo dir for empty target path, takes default', async () => {
            const buildAgent = {
                sourceDir: ''
            } as IBuildAgent
            tool = new TestDotnetTool(buildAgent)
            const repoDir = await tool.getRepoPath('')
            expect(repoDir).toBe('.')
        })

        it('should return correct repo dir for existing absolute target path', async () => {
            const buildAgent = {
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(true)
                }
            } as IBuildAgent
            tool = new TestDotnetTool(buildAgent)
            const repoDir = await tool.getRepoPath('/targetDir')
            expect(repoDir).toBe(path.normalize('/targetDir'))
        })

        it('should return correct repo dir for existing relative target path', async () => {
            const targetPath = 'targetDir'
            const buildAgent = {
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(true)
                }
            } as IBuildAgent
            tool = new TestDotnetTool(buildAgent)
            const repoDir = await tool.getRepoPath(targetPath)
            const resolvedPath = path.join(process.cwd(), 'targetDir')
            expect(repoDir).toBe(resolvedPath)
        })

        it('should throw error for non-existing target path', async () => {
            const wrongDir = 'wrongdir'
            const buildAgent = {
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(false)
                }
            } as IBuildAgent
            tool = new TestDotnetTool(buildAgent)

            const resolvedPath = path.join(process.cwd(), wrongDir)
            await expect(tool.getRepoPath(wrongDir)).rejects.toThrowError(`Directory not found at ${resolvedPath}`)
        })
    })
})
