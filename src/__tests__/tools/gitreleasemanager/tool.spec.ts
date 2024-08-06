import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { IBuildAgent } from '@agents/common'
import {
    type AddAssetSettings,
    type CloseSettings,
    type CreateSettings,
    type DiscardSettings,
    type OpenSettings,
    type PublishSettings,
    type CommonSettings,
    GitReleaseManagerTool
} from '@tools/gitreleasemanager'
import * as path from 'node:path'

class TestGitReleaseManagerTool extends GitReleaseManagerTool {
    private _isValidInputFile = false

    init(isValidInputFile: boolean): void {
        this._isValidInputFile = isValidInputFile
    }

    async isValidInputFile(): Promise<boolean> {
        return Promise.resolve(this._isValidInputFile)
    }

    async getRepoDir(settings: CommonSettings): Promise<string> {
        return super.getRepoDir(settings)
    }

    async getCommonArguments(settings: CommonSettings): Promise<string[]> {
        return super.getCommonArguments(settings)
    }

    async getCreateArguments(settings: CreateSettings): Promise<string[]> {
        return super.getCreateArguments(settings)
    }

    async getDiscardArguments(settings: DiscardSettings): Promise<string[]> {
        return super.getDiscardArguments(settings)
    }

    async getCloseArguments(settings: CloseSettings): Promise<string[]> {
        return super.getCloseArguments(settings)
    }

    async getOpenArguments(settings: OpenSettings): Promise<string[]> {
        return super.getOpenArguments(settings)
    }

    async getPublishArguments(settings: PublishSettings): Promise<string[]> {
        return super.getPublishArguments(settings)
    }

    async getAddAssetArguments(settings: AddAssetSettings): Promise<string[]> {
        return super.getAddAssetArguments(settings)
    }
}

describe('GitReleaseManagerTool', () => {
    let tool: TestGitReleaseManagerTool

    beforeEach(() => {
        tool = new TestGitReleaseManagerTool({} as IBuildAgent)
    })

    afterEach(() => {
        vi.clearAllMocks()
    })

    it('should return correct tool name', () => {
        expect(tool.packageName).toBe('GitReleaseManager.Tool')
    })

    it('should return correct version range', () => {
        expect(tool.versionRange).toBe('>=0.10.0 <0.20.0')
    })

    it('should have settings provider defined', () => {
        expect(tool.settingsProvider).toBeDefined()
    })

    describe('getRepoDir', () => {
        it('should return correct repo dir for empty target path, takes build agent sourceDir', async () => {
            const buildAgent = {
                sourceDir: 'workdir'
            } as IBuildAgent
            tool = new TestGitReleaseManagerTool(buildAgent)
            const repoDir = await tool.getRepoDir({
                targetDirectory: ''
            } as CommonSettings)
            expect(repoDir).toBe('workdir')
        })

        it('should return correct repo dir for empty target path, takes default', async () => {
            const buildAgent = {
                sourceDir: ''
            } as IBuildAgent
            tool = new TestGitReleaseManagerTool(buildAgent)
            const repoDir = await tool.getRepoDir({
                targetDirectory: ''
            } as CommonSettings)
            expect(repoDir).toBe('.')
        })

        it('should return correct repo dir for existing target path', async () => {
            const buildAgent = {
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(true)
                }
            } as IBuildAgent
            tool = new TestGitReleaseManagerTool(buildAgent)
            const repoDir = await tool.getRepoDir({
                targetDirectory: 'targetDir'
            } as CommonSettings)
            expect(repoDir).toBe('targetDir')
        })

        it('should throw error for non-existing target path', async () => {
            const wrongDir = 'wrongdir'
            const buildAgent = {
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(false)
                }
            } as IBuildAgent
            tool = new TestGitReleaseManagerTool(buildAgent)
            await expect(
                tool.getRepoDir({
                    targetDirectory: wrongDir
                } as CommonSettings)
            ).rejects.toThrowError(`Directory not found at ${wrongDir}`)
        })
    })

    describe('getArguments', () => {
        const commonSettings = {
            owner: 'owner',
            repository: 'repo',
            token: 'token',
            targetDirectory: 'targetDirectory'
        } as CommonSettings

        beforeEach(() => {
            tool = new TestGitReleaseManagerTool({
                async directoryExists(_file: string): Promise<boolean> {
                    return Promise.resolve(true)
                },
                async fileExists(_file: string): Promise<boolean> {
                    return Promise.resolve(true)
                }
            } as IBuildAgent)
        })

        describe('getCommonArguments', () => {
            it('should return correct common arguments', async () => {
                tool = new TestGitReleaseManagerTool({
                    async directoryExists(_file: string): Promise<boolean> {
                        return Promise.resolve(true)
                    }
                } as IBuildAgent)

                const args = await tool.getCommonArguments({
                    ...commonSettings
                } as CommonSettings)

                expect(args).toEqual(['--owner', 'owner', '--repository', 'repo', '--token', 'token', '--targetDirectory', 'targetDirectory'])
            })

            it('should throw error for non-existing target path', async () => {
                tool = new TestGitReleaseManagerTool({
                    async directoryExists(_file: string): Promise<boolean> {
                        return Promise.resolve(false)
                    }
                } as IBuildAgent)

                const wrongDir = 'wrongdir'

                await expect(
                    tool.getCommonArguments({
                        ...commonSettings,
                        targetDirectory: wrongDir
                    } as CommonSettings)
                ).rejects.toThrowError(`Directory not found at ${wrongDir}`)
            })
        })

        describe('getCreateArguments', () => {
            it('should return correct create arguments', async () => {
                const args = await tool.getCreateArguments({
                    ...commonSettings,
                    name: 'name',
                    commit: 'commit',
                    milestone: 'milestone',
                    inputFileName: 'inputFileName',
                    isPreRelease: true,
                    assets: ['asset1', 'asset2']
                } as CreateSettings)

                expect(args).toEqual([
                    'create',
                    '--owner',
                    'owner',
                    '--repository',
                    'repo',
                    '--token',
                    'token',
                    '--targetDirectory',
                    'targetDirectory',
                    '--milestone',
                    'milestone',
                    '--name',
                    'name',
                    '--targetcommitish',
                    'commit',
                    '--inputFilePath',
                    'inputFileName',
                    '--pre',
                    '--assets',
                    `${path.join('targetDirectory', 'asset1')},${path.join('targetDirectory', 'asset2')}`
                ])
            })
        })

        describe('getDiscardArguments', () => {
            it('should return correct discard arguments', async () => {
                const args = await tool.getDiscardArguments({
                    ...commonSettings,
                    milestone: 'milestone'
                } as DiscardSettings)

                expect(args).toEqual([
                    'discard',
                    '--owner',
                    'owner',
                    '--repository',
                    'repo',
                    '--token',
                    'token',
                    '--targetDirectory',
                    'targetDirectory',
                    '--milestone',
                    'milestone'
                ])
            })
        })

        describe('getOpenArguments', () => {
            it('should return correct open arguments', async () => {
                const args = await tool.getOpenArguments({
                    ...commonSettings,
                    milestone: 'milestone'
                } as OpenSettings)

                expect(args).toEqual([
                    'open',
                    '--owner',
                    'owner',
                    '--repository',
                    'repo',
                    '--token',
                    'token',
                    '--targetDirectory',
                    'targetDirectory',
                    '--milestone',
                    'milestone'
                ])
            })
        })

        describe('getCloseArguments', () => {
            it('should return correct close arguments', async () => {
                const args = await tool.getCloseArguments({
                    ...commonSettings,
                    milestone: 'milestone'
                } as CloseSettings)

                expect(args).toEqual([
                    'close',
                    '--owner',
                    'owner',
                    '--repository',
                    'repo',
                    '--token',
                    'token',
                    '--targetDirectory',
                    'targetDirectory',
                    '--milestone',
                    'milestone'
                ])
            })
        })

        describe('getPublishArguments', () => {
            it('should return correct publish arguments', async () => {
                const args = await tool.getPublishArguments({
                    ...commonSettings,
                    milestone: 'milestone'
                } as PublishSettings)

                expect(args).toEqual([
                    'publish',
                    '--owner',
                    'owner',
                    '--repository',
                    'repo',
                    '--token',
                    'token',
                    '--targetDirectory',
                    'targetDirectory',
                    '--tagName',
                    'milestone'
                ])
            })
        })

        describe('getAddAssetArguments', () => {
            it('should return correct add asset arguments', async () => {
                const args = await tool.getAddAssetArguments({
                    ...commonSettings,
                    milestone: 'milestone',
                    assets: ['asset1', 'asset2']
                } as AddAssetSettings)

                expect(args).toEqual([
                    'addasset',
                    '--owner',
                    'owner',
                    '--repository',
                    'repo',
                    '--token',
                    'token',
                    '--targetDirectory',
                    'targetDirectory',
                    '--tagName',
                    'milestone',
                    '--assets',
                    `${path.join('targetDirectory', 'asset1')},${path.join('targetDirectory', 'asset2')}`
                ])
            })
        })
    })
})
