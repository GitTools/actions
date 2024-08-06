import { type ISettingsProvider, SettingsProvider } from '@tools/common'
import {
    AddAssetFields,
    CommonFields,
    CreateFields,
    type GitReleaseManagerAddAssetSettings,
    type GitReleaseManagerCloseSettings,
    type GitReleaseManagerCreateSettings,
    type GitReleaseManagerDiscardSettings,
    type GitReleaseManagerOpenSettings,
    type GitReleaseManagerPublishSettings,
    type GitReleaseManagerCommonSettings
} from './models'
export interface IGitReleaseManagerSettingsProvider extends ISettingsProvider {
    getCreateSettings(): GitReleaseManagerCreateSettings

    getDiscardSettings(): GitReleaseManagerDiscardSettings

    getCloseSettings(): GitReleaseManagerCloseSettings

    getOpenSettings(): GitReleaseManagerOpenSettings

    getPublishSettings(): GitReleaseManagerPublishSettings

    getAddAssetSettings(): GitReleaseManagerAddAssetSettings

    getCommonSettings(): GitReleaseManagerCommonSettings
}

export class GitReleaseManagerSettingsProvider extends SettingsProvider implements IGitReleaseManagerSettingsProvider {
    getCreateSettings(): GitReleaseManagerCreateSettings {
        const name = this.buildAgent.getInput(CreateFields.name)
        const inputFileName = this.buildAgent.getInput(CreateFields.inputFileName)
        const isPreRelease = this.buildAgent.getBooleanInput(CreateFields.isPreRelease)
        const commit = this.buildAgent.getInput(CreateFields.commit)
        const assets = this.buildAgent.getListInput(CreateFields.assets)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            name,
            inputFileName,
            isPreRelease,
            commit,
            assets
        }
    }

    getDiscardSettings(): GitReleaseManagerDiscardSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }

    getCloseSettings(): GitReleaseManagerCloseSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }

    getOpenSettings(): GitReleaseManagerOpenSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }
    getPublishSettings(): GitReleaseManagerPublishSettings {
        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings
        }
    }

    getAddAssetSettings(): GitReleaseManagerAddAssetSettings {
        const assets = this.buildAgent.getListInput(AddAssetFields.assets)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            assets
        }
    }

    getCommonSettings(): GitReleaseManagerCommonSettings {
        const milestone = this.buildAgent.getInput(CommonFields.milestone)
        const owner = this.buildAgent.getInput(CommonFields.owner, true)
        const repository = this.buildAgent.getInput(CommonFields.repository, true)
        const token = this.buildAgent.getInput(CommonFields.token, true)
        const targetDirectory = this.buildAgent.getInput(CommonFields.targetDirectory)

        return {
            owner,
            repository,
            token,
            targetDirectory,
            milestone
        }
    }
}
