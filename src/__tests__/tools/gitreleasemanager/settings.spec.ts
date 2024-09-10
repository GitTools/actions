import { describe, it } from 'vitest'
import { type IBuildAgent } from '@agents/common'
import {
    type CreateSettings,
    type DiscardSettings,
    type OpenSettings,
    type CloseSettings,
    type PublishSettings,
    type AddAssetSettings,
    GitReleaseManagerSettingsProvider
} from '@tools/gitreleasemanager'
import { expectValidSettings } from '../common/utils'

describe('GitReleaseManager settings', () => {
    it('should return GitReleaseManagerCreateSettings', () => {
        const settings: CreateSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            name: 'name',
            inputFileName: 'inputFileName',
            isPreRelease: false,
            commit: 'commit',
            assets: ['asset'],
            logFilePath: './output.log'
        }

        const buildAgent = {
            getInput: (input: keyof CreateSettings) => settings[input] as string,
            getBooleanInput: (input: keyof CreateSettings) => settings[input] as boolean,
            getListInput: (input: keyof CreateSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const createSettings = settingsProvider.getCreateSettings()

        expectValidSettings(settings, createSettings)
    })

    it('should return OpenSettings', () => {
        const settings: OpenSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            logFilePath: './output.log'
        }

        const buildAgent = {
            getInput: (input: keyof OpenSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const openSettings = settingsProvider.getOpenSettings()

        expectValidSettings(settings, openSettings)
    })

    it('should return GitReleaseManagerCloseSettings', () => {
        const settings: CloseSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            logFilePath: './output.log'
        }

        const buildAgent = {
            getInput: (input: keyof CloseSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const closeSettings = settingsProvider.getCloseSettings()

        expectValidSettings(settings, closeSettings)
    })

    it('should return DiscardSettings', () => {
        const settings: DiscardSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            logFilePath: './output.log'
        }

        const buildAgent = {
            getInput: (input: keyof DiscardSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const discardSettings = settingsProvider.getDiscardSettings()

        expectValidSettings(settings, discardSettings)
    })

    it('should return PublishSettings', () => {
        const settings: PublishSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            logFilePath: './output.log'
        }

        const buildAgent = {
            getInput: (input: keyof PublishSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const publishSettings = settingsProvider.getPublishSettings()

        expectValidSettings(settings, publishSettings)
    })

    it('should return AddAssetSettings', () => {
        const settings: AddAssetSettings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            assets: ['asset'],
            logFilePath: './output.log'
        }

        const buildAgent = {
            getInput: (input: keyof AddAssetSettings) => settings[input] as string,
            getListInput: (input: keyof AddAssetSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const addAssetSettings = settingsProvider.getAddAssetSettings()

        expectValidSettings(settings, addAssetSettings)
    })
})
