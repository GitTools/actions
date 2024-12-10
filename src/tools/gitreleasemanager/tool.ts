import * as path from 'path'

import { DotnetTool } from '@tools/common'
import { type ExecResult } from '@agents/common'

import {
    type AddAssetSettings,
    type CloseSettings,
    type CreateSettings,
    type DiscardSettings,
    type OpenSettings,
    type PublishSettings,
    type CommonSettings
} from './models'
import { GitReleaseManagerSettingsProvider, IGitReleaseManagerSettingsProvider } from './settings'

export class GitReleaseManagerTool extends DotnetTool {
    get packageName(): string {
        return 'GitReleaseManager.Tool'
    }

    get toolName(): string {
        return 'dotnet-gitreleasemanager'
    }

    get toolPathVariable(): string {
        return 'GITRELEASEMANAGER_PATH'
    }

    get versionRange(): string | null {
        return '>=0.10.0 <0.20.0'
    }

    get settingsProvider(): IGitReleaseManagerSettingsProvider {
        return new GitReleaseManagerSettingsProvider(this.buildAgent)
    }

    async create(): Promise<ExecResult> {
        const settings = this.settingsProvider.getCreateSettings()
        const args = await this.getCreateArguments(settings)

        return await this.executeTool(args)
    }

    async discard(): Promise<ExecResult> {
        const settings = this.settingsProvider.getDiscardSettings()
        const args = await this.getDiscardArguments(settings)

        return await this.executeTool(args)
    }

    async close(): Promise<ExecResult> {
        const settings = this.settingsProvider.getCloseSettings()
        const args = await this.getCloseArguments(settings)

        return await this.executeTool(args)
    }

    async open(): Promise<ExecResult> {
        const settings = this.settingsProvider.getOpenSettings()
        const args = await this.getOpenArguments(settings)

        return await this.executeTool(args)
    }

    async publish(): Promise<ExecResult> {
        const settings = this.settingsProvider.getPublishSettings()
        const args = await this.getPublishArguments(settings)

        return await this.executeTool(args)
    }

    async addAsset(): Promise<ExecResult> {
        const settings = this.settingsProvider.getAddAssetSettings()
        const args = await this.getAddAssetArguments(settings)

        return await this.executeTool(args)
    }

    protected async getCommonArguments(settings: CommonSettings): Promise<string[]> {
        const args: string[] = []

        args.push('--owner', settings.owner)
        args.push('--repository', settings.repository)
        args.push('--token', settings.token)

        settings.targetDirectory = await this.getRepoDir(settings)

        args.push('--targetDirectory', settings.targetDirectory)

        if (settings.logFilePath) {
            args.push('--logFilePath', settings.logFilePath)
        }
        return args
    }

    protected async getCreateArguments(settings: CreateSettings): Promise<string[]> {
        const args: string[] = ['create', ...(await this.getCommonArguments(settings))]

        if (settings.milestone) {
            args.push('--milestone', settings.milestone)
        }
        if (settings.name) {
            args.push('--name', settings.name)
        }
        if (settings.commit) {
            args.push('--targetcommitish', settings.commit)
        }

        if (settings.inputFileName) {
            if (await this.buildAgent.fileExists(settings.inputFileName)) {
                args.push('--inputFilePath', settings.inputFileName)
            } else {
                throw new Error(`GitReleaseManager inputFilePath not found at ${settings.inputFileName}`)
            }
        }
        if (settings.isPreRelease) {
            args.push('--pre')
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset)
            })

            args.push('--assets', settings.assets.join(','))
        }

        return args
    }

    protected async getDiscardArguments(settings: DiscardSettings): Promise<string[]> {
        const args: string[] = ['discard', ...(await this.getCommonArguments(settings))]

        if (settings.milestone) {
            args.push('--milestone', settings.milestone)
        }

        return args
    }

    protected async getCloseArguments(settings: CloseSettings): Promise<string[]> {
        const args: string[] = ['close', ...(await this.getCommonArguments(settings))]

        if (settings.milestone) {
            args.push('--milestone', settings.milestone)
        }

        return args
    }

    protected async getOpenArguments(settings: OpenSettings): Promise<string[]> {
        const args: string[] = ['open', ...(await this.getCommonArguments(settings))]

        if (settings.milestone) {
            args.push('--milestone', settings.milestone)
        }

        return args
    }

    protected async getPublishArguments(settings: PublishSettings): Promise<string[]> {
        const args: string[] = ['publish', ...(await this.getCommonArguments(settings))]

        if (settings.milestone) {
            args.push('--tagName', settings.milestone)
        }

        return args
    }

    protected async getAddAssetArguments(settings: AddAssetSettings): Promise<string[]> {
        const args: string[] = ['addasset', ...(await this.getCommonArguments(settings))]

        if (settings.milestone) {
            args.push('--tagName', settings.milestone)
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset)
            })

            args.push('--assets', settings.assets.join(','))
        }

        return args
    }

    protected async getRepoDir(settings: CommonSettings): Promise<string> {
        return await this.getRepoPath(settings.targetDirectory)
    }
}
