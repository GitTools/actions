import { ISettingsProvider } from '../common/models'

export enum CommonFields {
    repository = 'repository',
    owner = 'owner',
    token = 'token',
    targetDirectory = 'targetDirectory'
}

export enum CreateFields {
    milestone = 'milestone',
    name = 'name',
    inputFileName = 'inputFileName',
    isPreRelease = 'isPreRelease',
    commit = 'commit',
    assets = 'assets'
}

export enum DiscardFields {
    milestone = 'milestone'
}

export enum CloseFields {
    milestone = 'milestone'
}

export enum OpenFields {
    milestone = 'milestone'
}

export enum PublishFields {
    tagName = 'tagName'
}

export enum AddAssetFields {
    tagName = 'tagName',
    assets = 'assets'
}

export interface IGitReleaseManagerSettingsProvider extends ISettingsProvider {
    getCreateSettings(): GitReleaseManagerCreateSettings

    getDiscardSettings(): GitReleaseManagerDiscardSettings

    getCloseSettings(): GitReleaseManagerCloseSettings

    getOpenSettings(): GitReleaseManagerOpenSettings

    getPublishSettings(): GitReleaseManagerPublishSettings

    getAddAssetSettings(): GitReleaseManagerAddAssetSettings

    getCommonSettings(): GitReleaseManagerSettings
}

export interface GitReleaseManagerSettings {
    [CommonFields.repository]: string
    [CommonFields.owner]: string
    [CommonFields.token]: string
    [CommonFields.targetDirectory]: string
}

export interface GitReleaseManagerCreateSettings extends GitReleaseManagerSettings {
    [CreateFields.milestone]: string
    [CreateFields.name]: string
    [CreateFields.inputFileName]: string
    [CreateFields.isPreRelease]: boolean
    [CreateFields.commit]: string
    [CreateFields.assets]?: string[]
}

export interface GitReleaseManagerDiscardSettings extends GitReleaseManagerSettings {
    [DiscardFields.milestone]: string
}

export interface GitReleaseManagerCloseSettings extends GitReleaseManagerSettings {
    [CloseFields.milestone]: string
}

export interface GitReleaseManagerOpenSettings extends GitReleaseManagerSettings {
    [OpenFields.milestone]: string
}

export interface GitReleaseManagerPublishSettings extends GitReleaseManagerSettings {
    [PublishFields.tagName]: string
}

export interface GitReleaseManagerAddAssetSettings extends GitReleaseManagerSettings {
    [AddAssetFields.tagName]: string
    [AddAssetFields.assets]: string[]
}
