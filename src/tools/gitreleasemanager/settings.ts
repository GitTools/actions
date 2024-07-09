import {
    AddAssetFields,
    CloseFields,
    CommonFields,
    CreateFields,
    DiscardFields,
    type GitReleaseManagerAddAssetSettings,
    type GitReleaseManagerCloseSettings,
    type GitReleaseManagerCreateSettings,
    type GitReleaseManagerDiscardSettings,
    type GitReleaseManagerOpenSettings,
    type GitReleaseManagerPublishSettings,
    type GitReleaseManagerSettings,
    OpenFields,
    PublishFields
} from './models'
import { ISettingsProvider, SettingsProvider } from '../common/settings'
import { inject, injectable } from 'inversify'
import { IBuildAgent } from '../../agents/common/build-agent'
import { TYPES } from '../common/models'

export interface IGitReleaseManagerSettingsProvider extends ISettingsProvider {
    getCreateSettings(): GitReleaseManagerCreateSettings

    getDiscardSettings(): GitReleaseManagerDiscardSettings

    getCloseSettings(): GitReleaseManagerCloseSettings

    getOpenSettings(): GitReleaseManagerOpenSettings

    getPublishSettings(): GitReleaseManagerPublishSettings

    getAddAssetSettings(): GitReleaseManagerAddAssetSettings
}

@injectable()
export class GitReleaseManagerSettingsProvider extends SettingsProvider implements IGitReleaseManagerSettingsProvider {
    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent) {
        super(buildAgent)
    }

    public getCreateSettings(): GitReleaseManagerCreateSettings {
        const milestone = this.buildAgent.getInput(CreateFields.milestone)
        const name = this.buildAgent.getInput(CreateFields.name)
        const inputFileName = this.buildAgent.getInput(CreateFields.inputFileName)
        const isPreRelease = this.buildAgent.getBooleanInput(CreateFields.isPreRelease)
        const commit = this.buildAgent.getInput(CreateFields.commit)
        const assets = this.buildAgent.getListInput(CreateFields.assets)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            milestone,
            name,
            inputFileName,
            isPreRelease,
            commit,
            assets
        }
    }

    public getDiscardSettings(): GitReleaseManagerDiscardSettings {
        const milestone = this.buildAgent.getInput(DiscardFields.milestone)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            milestone
        }
    }

    public getCloseSettings(): GitReleaseManagerCloseSettings {
        const milestone = this.buildAgent.getInput(CloseFields.milestone)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            milestone
        }
    }

    public getOpenSettings(): GitReleaseManagerOpenSettings {
        const milestone = this.buildAgent.getInput(OpenFields.milestone)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            milestone
        }
    }

    public getPublishSettings(): GitReleaseManagerPublishSettings {
        const tagName = this.buildAgent.getInput(PublishFields.tagName)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            tagName
        }
    }

    public getAddAssetSettings(): GitReleaseManagerAddAssetSettings {
        const tagName = this.buildAgent.getInput(AddAssetFields.tagName)
        const assets = this.buildAgent.getListInput(AddAssetFields.assets)

        const commonSettings = this.getCommonSettings()
        return {
            ...commonSettings,
            tagName,
            assets
        }
    }

    private getCommonSettings(): GitReleaseManagerSettings {
        const owner = this.buildAgent.getInput(CommonFields.owner, true)
        const repository = this.buildAgent.getInput(CommonFields.repository, true)
        const token = this.buildAgent.getInput(CommonFields.token, true)
        const targetDirectory = this.buildAgent.getInput(CommonFields.targetDirectory)

        return {
            owner,
            repository,
            token,
            targetDirectory
        }
    }
}
