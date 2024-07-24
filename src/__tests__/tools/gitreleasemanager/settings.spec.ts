import { describe, it } from 'vitest'
import { IBuildAgent } from '@agents/common'
import {
    type GitReleaseManagerCloseSettings,
    type GitReleaseManagerCreateSettings,
    type GitReleaseManagerDiscardSettings,
    type GitReleaseManagerOpenSettings,
    type GitReleaseManagerPublishSettings,
    type GitReleaseManagerAddAssetSettings,
    GitReleaseManagerSettingsProvider
} from '@tools/gitreleasemanager'
import { expectValidSettings } from '../common/utils'

describe('GitReleaseManager settings', () => {
    it('should return GitReleaseManagerCreateSettings', () => {
        const settings: GitReleaseManagerCreateSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            name: 'name',
            inputFileName: 'inputFileName',
            isPreRelease: false,
            commit: 'commit',
            assets: ['asset']
        }

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerCreateSettings) => settings[input] as string,
            getBooleanInput: (input: keyof GitReleaseManagerCreateSettings) => settings[input] as boolean,
            getListInput: (input: keyof GitReleaseManagerCreateSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const createSettings = settingsProvider.getCreateSettings()

        expectValidSettings(settings, createSettings)
    })

    it('should return GitReleaseManagerOpenSettings', () => {
        const settings: GitReleaseManagerOpenSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        }

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerOpenSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const openSettings = settingsProvider.getOpenSettings()

        expectValidSettings(settings, openSettings)
    })

    it('should return GitReleaseManagerCloseSettings', () => {
        const settings: GitReleaseManagerCloseSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        }

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerCloseSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const closeSettings = settingsProvider.getCloseSettings()

        expectValidSettings(settings, closeSettings)
    })

    it('should return GitReleaseManagerDiscardSettings', () => {
        const settings: GitReleaseManagerDiscardSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        }

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerDiscardSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const discardSettings = settingsProvider.getDiscardSettings()

        expectValidSettings(settings, discardSettings)
    })

    it('should return GitReleaseManagerPublishSettings', () => {
        const settings: GitReleaseManagerPublishSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        }

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerPublishSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const publishSettings = settingsProvider.getPublishSettings()

        expectValidSettings(settings, publishSettings)
    })

    it('should return GitReleaseManagerAddAssetSettings', () => {
        const settings: GitReleaseManagerAddAssetSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            assets: ['asset']
        }

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerAddAssetSettings) => settings[input] as string,
            getListInput: (input: keyof GitReleaseManagerAddAssetSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const addAssetSettings = settingsProvider.getAddAssetSettings()

        expectValidSettings(settings, addAssetSettings)
    })
})
