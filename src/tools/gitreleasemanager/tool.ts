import * as path from 'path'

import { ArgumentsBuilder, DotnetTool } from '@tools/common'
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
        return '>=0.19.0 <0.21.0'
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
        const builder = new ArgumentsBuilder()

        builder.addKeyValue('owner', settings.owner)
        builder.addKeyValue('repository', settings.repository)
        builder.addKeyValue('token', settings.token)

        settings.targetDirectory = await this.getRepoDir(settings)

        builder.addKeyValue('targetDirectory', settings.targetDirectory)

        if (settings.logFilePath) {
            builder.addKeyValue('logFilePath', settings.logFilePath)
        }

        return builder.build()
    }

    protected async getCreateArguments(settings: CreateSettings): Promise<string[]> {
        const builder = new ArgumentsBuilder().addArgument('create').addArguments(await this.getCommonArguments(settings))

        if (settings.milestone) {
            builder.addKeyValue('milestone', settings.milestone)
        }
        if (settings.name) {
            builder.addKeyValue('name', settings.name)
        }
        if (settings.targetcommitish) {
            builder.addKeyValue('targetcommitish', settings.targetcommitish)
        }

        if (settings.inputFilePath) {
            if (await this.buildAgent.fileExists(settings.inputFilePath)) {
                builder.addKeyValue('inputFilePath', settings.inputFilePath)
            } else {
                throw new Error(`GitReleaseManager inputFilePath not found at ${settings.inputFilePath}`)
            }
        }
        if (settings.isPreRelease) {
            builder.addFlag('pre')
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset)
            })

            builder.addKeyValue('assets', settings.assets.join(','))
        }

        return builder.build()
    }

    protected async getDiscardArguments(settings: DiscardSettings): Promise<string[]> {
        const builder = new ArgumentsBuilder().addArgument('discard').addArguments(await this.getCommonArguments(settings))

        if (settings.milestone) {
            builder.addKeyValue('milestone', settings.milestone)
        }

        return builder.build()
    }

    protected async getCloseArguments(settings: CloseSettings): Promise<string[]> {
        const builder = new ArgumentsBuilder().addArgument('close').addArguments(await this.getCommonArguments(settings))

        if (settings.milestone) {
            builder.addKeyValue('milestone', settings.milestone)
        }

        return builder.build()
    }

    protected async getOpenArguments(settings: OpenSettings): Promise<string[]> {
        const builder = new ArgumentsBuilder().addArgument('open').addArguments(await this.getCommonArguments(settings))

        if (settings.milestone) {
            builder.addKeyValue('milestone', settings.milestone)
        }

        return builder.build()
    }

    protected async getPublishArguments(settings: PublishSettings): Promise<string[]> {
        const builder = new ArgumentsBuilder().addArgument('publish').addArguments(await this.getCommonArguments(settings))

        if (settings.milestone) {
            builder.addKeyValue('tagName', settings.milestone)
        }

        return builder.build()
    }

    protected async getAddAssetArguments(settings: AddAssetSettings): Promise<string[]> {
        const builder = new ArgumentsBuilder().addArgument('addasset').addArguments(await this.getCommonArguments(settings))

        if (settings.milestone) {
            builder.addKeyValue('tagName', settings.milestone)
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset)
            })

            builder.addKeyValue('assets', settings.assets.join(','))
        }

        return builder.build()
    }

    protected async getRepoDir(settings: CommonSettings): Promise<string> {
        return await this.getRepoPath(settings.targetDirectory)
    }
}
