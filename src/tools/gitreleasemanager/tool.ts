import * as path from 'path'

import { inject, injectable } from 'inversify'

import {
    type GitReleaseManagerAddAssetSettings,
    type GitReleaseManagerCloseSettings,
    type GitReleaseManagerCreateSettings,
    type GitReleaseManagerDiscardSettings,
    type GitReleaseManagerOpenSettings,
    type GitReleaseManagerPublishSettings,
    type GitReleaseManagerSettings
} from './models'
import { TYPES } from '../common/models'
import { DotnetTool, IDotnetTool } from '../common/dotnet-tool'
import { type ExecResult } from '../../agents/common/models'
import { IBuildAgent } from '../../agents/common/build-agent'
import container from '../common/ioc'
import { IGitReleaseManagerSettingsProvider } from './settings'

export interface IGitReleaseManagerTool extends IDotnetTool {
    install(): Promise<void>
    create(): Promise<ExecResult>
    discard(): Promise<ExecResult>
    close(): Promise<ExecResult>
    open(): Promise<ExecResult>
    publish(): Promise<ExecResult>
    addAsset(): Promise<ExecResult>
}

const settingsProvider = container.get<IGitReleaseManagerSettingsProvider>(TYPES.IGitReleaseManagerSettingsProvider)

@injectable()
export class GitReleaseManagerTool extends DotnetTool implements IGitReleaseManagerTool {
    private settingsProvider: IGitReleaseManagerSettingsProvider
    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent) {
        super(buildAgent)
        this.settingsProvider = settingsProvider
    }

    public async install(): Promise<void> {
        const settings = this.settingsProvider.getSetupSettings()
        await this.toolInstall('GitReleaseManager.Tool', '>=0.10.0 <0.18.0', settings)
    }

    public create(): Promise<ExecResult> {
        const settings = this.settingsProvider.getCreateSettings()
        const args = this.getCreateArguments(settings)

        return this.executeTool(args)
    }

    public discard(): Promise<ExecResult> {
        const settings = this.settingsProvider.getDiscardSettings()
        const args = this.getDiscardArguments(settings)

        return this.executeTool(args)
    }

    public close(): Promise<ExecResult> {
        const settings = this.settingsProvider.getCloseSettings()
        const args = this.getCloseArguments(settings)

        return this.executeTool(args)
    }

    public open(): Promise<ExecResult> {
        const settings = this.settingsProvider.getOpenSettings()
        const args = this.getOpenArguments(settings)

        return this.executeTool(args)
    }

    public publish(): Promise<ExecResult> {
        const settings = this.settingsProvider.getPublishSettings()
        const args = this.getPublishArguments(settings)

        return this.executeTool(args)
    }

    public addAsset(): Promise<ExecResult> {
        const settings = this.settingsProvider.getAddAssetSettings()
        const args = this.getAddAssetArguments(settings)

        return this.executeTool(args)
    }

    private async executeTool(args: string[]): Promise<ExecResult> {
        return this.execute('dotnet-gitreleasemanager', args)
    }

    private getCommonArguments(settings: GitReleaseManagerSettings): string[] {
        const args: string[] = []

        args.push('--owner', settings.owner)
        args.push('--repository', settings.repository)
        args.push('--token', settings.token)

        settings.targetDirectory = this.getRepoDir(settings.targetDirectory)

        args.push('--targetDirectory', settings.targetDirectory)

        return args
    }

    private getCreateArguments(settings: GitReleaseManagerCreateSettings): string[] {
        const args: string[] = ['create', ...this.getCommonArguments(settings)]

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
            if (this.buildAgent.fileExists(settings.inputFileName)) {
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

    private getDiscardArguments(settings: GitReleaseManagerDiscardSettings): string[] {
        const args: string[] = ['discard', ...this.getCommonArguments(settings)]

        if (settings.milestone) {
            args.push('--milestone', settings.milestone)
        }

        return args
    }

    private getCloseArguments(settings: GitReleaseManagerCloseSettings): string[] {
        const args: string[] = ['close', ...this.getCommonArguments(settings)]

        if (settings.milestone) {
            args.push('--milestone', settings.milestone)
        }

        return args
    }

    private getOpenArguments(settings: GitReleaseManagerOpenSettings): string[] {
        const args: string[] = ['open', ...this.getCommonArguments(settings)]

        if (settings.milestone) {
            args.push('--milestone', settings.milestone)
        }

        return args
    }

    private getPublishArguments(settings: GitReleaseManagerPublishSettings): string[] {
        const args: string[] = ['publish', ...this.getCommonArguments(settings)]

        if (settings.tagName) {
            args.push('--tagName', settings.tagName)
        }

        return args
    }

    private getAddAssetArguments(settings: GitReleaseManagerAddAssetSettings): string[] {
        const args: string[] = ['addasset', ...this.getCommonArguments(settings)]

        if (settings.tagName) {
            args.push('--tagName', settings.tagName)
        }
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset)
            })

            args.push('--assets', settings.assets.join(','))
        }

        return args
    }

    private getRepoDir(targetPath: string): string {
        let workDir: string
        const srcDir = this.buildAgent.getSourceDir()
        if (!targetPath) {
            workDir = srcDir
        } else {
            if (this.buildAgent.directoryExists(targetPath)) {
                workDir = path.join(srcDir, targetPath)
            } else {
                throw new Error('Directory not found at ' + targetPath)
            }
        }
        return workDir.replace(/\\/g, '/')
    }
}
