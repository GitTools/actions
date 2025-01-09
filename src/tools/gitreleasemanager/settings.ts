import { type ISettingsProvider, SettingsProvider } from '@tools/common'
import {
    type AddAssetSettings,
    type CloseSettings,
    type CreateSettings,
    type DiscardSettings,
    type OpenSettings,
    type PublishSettings,
    type CommonSettings
} from './models'
export interface IGitReleaseManagerSettingsProvider extends ISettingsProvider {
    getCreateSettings(): CreateSettings

    getDiscardSettings(): DiscardSettings

    getCloseSettings(): CloseSettings

    getOpenSettings(): OpenSettings

    getPublishSettings(): PublishSettings

    getAddAssetSettings(): AddAssetSettings

    getCommonSettings(): CommonSettings
}

export class GitReleaseManagerSettingsProvider extends SettingsProvider implements IGitReleaseManagerSettingsProvider {
    getCreateSettings(): CreateSettings {
        const name = this.buildAgent.getInput<CreateSettings>('name')
        const inputFilePath = this.buildAgent.getInput<CreateSettings>('inputFilePath')
        const isPreRelease = this.buildAgent.getBooleanInput<CreateSettings>('isPreRelease')
        const targetcommitish = this.buildAgent.getInput<CreateSettings>('targetcommitish')
        const assets = this.buildAgent.getListInput<CreateSettings>('assets')

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            name,
            inputFilePath,
            isPreRelease,
            targetcommitish,
            assets
        }
    }

    getDiscardSettings(): DiscardSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }

    getCloseSettings(): CloseSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }

    getOpenSettings(): OpenSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }

    getPublishSettings(): PublishSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }

    getAddAssetSettings(): AddAssetSettings {
        const assets = this.buildAgent.getListInput<AddAssetSettings>('assets')

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            assets
        }
    }

    getCommonSettings(): CommonSettings {
        const milestone = this.buildAgent.getInput<CommonSettings>('milestone')
        const owner = this.buildAgent.getInput<CommonSettings>('owner')
        const repository = this.buildAgent.getInput<CommonSettings>('repository')
        const token = this.buildAgent.getInput<CommonSettings>('token')
        const targetDirectory = this.buildAgent.getInput<CommonSettings>('targetDirectory')
        const logFilePath = this.buildAgent.getInput<CommonSettings>('logFilePath')

        return {
            owner,
            repository,
            token,
            targetDirectory,
            milestone,
            logFilePath
        }
    }
}
