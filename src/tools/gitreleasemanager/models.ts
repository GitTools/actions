import { Fields } from '@tools/common'

export type Commands = 'setup' | 'addasset' | 'close' | 'create' | 'discard' | 'open' | 'publish'

export type GitReleaseManagerCommonSettings = {
    repository: string
    owner: string
    token: string
    targetDirectory: string
    milestone: string
}

export type GitReleaseManagerCreateSettings = GitReleaseManagerCommonSettings & {
    name: string
    inputFileName: string
    isPreRelease: boolean
    commit: string
    assets?: string[]
}

export type GitReleaseManagerDiscardSettings = GitReleaseManagerCommonSettings & {}

export type GitReleaseManagerCloseSettings = GitReleaseManagerCommonSettings & {}

export type GitReleaseManagerOpenSettings = GitReleaseManagerCommonSettings & {}

export type GitReleaseManagerPublishSettings = GitReleaseManagerCommonSettings & {}

export type GitReleaseManagerAddAssetSettings = GitReleaseManagerCommonSettings & {
    assets: string[]
}

export const CommonFields: Fields<GitReleaseManagerCommonSettings> = {
    repository: 'repository',
    owner: 'owner',
    token: 'token',
    targetDirectory: 'targetDirectory',
    milestone: 'milestone'
}

export const CreateFields: Fields<GitReleaseManagerCreateSettings & GitReleaseManagerCommonSettings> = {
    ...CommonFields,
    name: 'name',
    inputFileName: 'inputFileName',
    isPreRelease: 'isPreRelease',
    commit: 'commit',
    assets: 'assets'
}

export const DiscardFields: Fields<GitReleaseManagerDiscardSettings & GitReleaseManagerCommonSettings> = {
    ...CommonFields
}

export const CloseFields: Fields<GitReleaseManagerCloseSettings & GitReleaseManagerCommonSettings> = {
    ...CommonFields
}

export const OpenFields: Fields<GitReleaseManagerOpenSettings & GitReleaseManagerCommonSettings> = {
    ...CommonFields
}

export const PublishFields: Fields<GitReleaseManagerPublishSettings & GitReleaseManagerCommonSettings> = {
    ...CommonFields
}

export const AddAssetFields: Fields<GitReleaseManagerAddAssetSettings & GitReleaseManagerCommonSettings> = {
    ...CommonFields,
    assets: 'assets'
}
