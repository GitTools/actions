import * as path from 'path'

import { TYPES } from '../../core/models'
import { inject, injectable } from 'inversify'
import { DotnetTool, IDotnetTool } from '../../core/dotnet-tool'

import {
    GitReleaseManagerAddAssetSettings,
    GitReleaseManagerCloseSettings,
    GitReleaseManagerCreateSettings,
    GitReleaseManagerDiscardSettings,
    GitReleaseManagerOpenSettings,
    GitReleaseManagerPublishSettings,
    GitReleaseManagerSettings
} from './models'
import { ISetupSettings } from '../common/models'
import { IExecResult } from '../../agents/common/models'
import { IBuildAgent } from '../../agents/common/build-agent'

export interface IGitReleaseManagerTool extends IDotnetTool {
    install(setupSettings: ISetupSettings): Promise<void>
    create(settings: GitReleaseManagerCreateSettings): Promise<IExecResult>
    discard(settings: GitReleaseManagerDiscardSettings): Promise<IExecResult>
    close(settings: GitReleaseManagerCloseSettings): Promise<IExecResult>
    open(settings: GitReleaseManagerOpenSettings): Promise<IExecResult>
    publish(settings: GitReleaseManagerPublishSettings): Promise<IExecResult>
    addAsset(settings: GitReleaseManagerAddAssetSettings): Promise<IExecResult>
}

@injectable()
export class GitReleaseManagerTool extends DotnetTool implements IGitReleaseManagerTool {
    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent) {
        super(buildAgent)
    }

    public async install(setupSettings: ISetupSettings): Promise<void> {
        await this.toolInstall('GitReleaseManager.Tool', '>=0.10.0 <0.18.0', setupSettings)
    }

    public create(settings: GitReleaseManagerCreateSettings): Promise<IExecResult> {
        const args = this.getCreateArguments(settings)

        return this.execute('dotnet-gitreleasemanager', args)
    }

    public discard(settings: GitReleaseManagerDiscardSettings): Promise<IExecResult> {
        const args = this.getDiscardArguments(settings)

        return this.execute('dotnet-gitreleasemanager', args)
    }

    public close(settings: GitReleaseManagerCloseSettings): Promise<IExecResult> {
        const args = this.getCloseArguments(settings)

        return this.execute('dotnet-gitreleasemanager', args)
    }

    public open(settings: GitReleaseManagerOpenSettings): Promise<IExecResult> {
        const args = this.getOpenArguments(settings)

        return this.execute('dotnet-gitreleasemanager', args)
    }

    public publish(settings: GitReleaseManagerPublishSettings): Promise<IExecResult> {
        const args = this.getPublishArguments(settings)

        return this.execute('dotnet-gitreleasemanager', args)
    }

    public addAsset(settings: GitReleaseManagerAddAssetSettings): Promise<IExecResult> {
        const args = this.getAddAssetArguments(settings)

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
                throw new Error('GitReleaseManager inputFilePath not found at ' + settings.inputFileName)
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
