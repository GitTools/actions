import { describe, expect, it } from 'vitest'
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

describe('GitReleaseManager settings', () => {
    it('should return GitReleaseManagerCreateSettings', () => {
        const settings = {
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
        } as GitReleaseManagerCreateSettings

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerCreateSettings) => settings[input] as string,
            getBooleanInput: (input: keyof GitReleaseManagerCreateSettings) => settings[input] as boolean,
            getListInput: (input: keyof GitReleaseManagerCreateSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const createSettings = settingsProvider.getCreateSettings()

        expect(createSettings.repository).toBe(settings.repository)
        expect(createSettings.owner).toBe(settings.owner)
        expect(createSettings.token).toBe(settings.token)
        expect(createSettings.targetDirectory).toBe(settings.targetDirectory)
        expect(createSettings.milestone).toBe(settings.milestone)
        expect(createSettings.name).toBe(settings.name)
        expect(createSettings.inputFileName).toBe(settings.inputFileName)
        expect(createSettings.isPreRelease).toBe(settings.isPreRelease)
        expect(createSettings.commit).toBe(settings.commit)
        expect(createSettings.assets).toBe(settings.assets)
    })

    it('should return GitReleaseManagerOpenSettings', () => {
        const settings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        } as GitReleaseManagerOpenSettings

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerOpenSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const openSettings = settingsProvider.getOpenSettings()

        expect(openSettings.repository).toBe(settings.repository)
        expect(openSettings.owner).toBe(settings.owner)
        expect(openSettings.token).toBe(settings.token)
        expect(openSettings.targetDirectory).toBe(settings.targetDirectory)
        expect(openSettings.milestone).toBe(settings.milestone)
    })

    it('should return GitReleaseManagerCloseSettings', () => {
        const settings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        } as GitReleaseManagerCloseSettings

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerCloseSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const closeSettings = settingsProvider.getCloseSettings()

        expect(closeSettings.repository).toBe(settings.repository)
        expect(closeSettings.owner).toBe(settings.owner)
        expect(closeSettings.token).toBe(settings.token)
        expect(closeSettings.targetDirectory).toBe(settings.targetDirectory)
        expect(closeSettings.milestone).toBe(settings.milestone)
    })

    it('should return GitReleaseManagerDiscardSettings', () => {
        const settings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        } as GitReleaseManagerDiscardSettings

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerDiscardSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const discardSettings = settingsProvider.getDiscardSettings()

        expect(discardSettings.repository).toBe(settings.repository)
        expect(discardSettings.owner).toBe(settings.owner)
        expect(discardSettings.token).toBe(settings.token)
        expect(discardSettings.targetDirectory).toBe(settings.targetDirectory)
        expect(discardSettings.milestone).toBe(settings.milestone)
    })

    it('should return GitReleaseManagerPublishSettings', () => {
        const settings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone'
        } as GitReleaseManagerPublishSettings

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerPublishSettings) => settings[input]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const publishSettings = settingsProvider.getPublishSettings()

        expect(publishSettings.repository).toBe(settings.repository)
        expect(publishSettings.owner).toBe(settings.owner)
        expect(publishSettings.token).toBe(settings.token)
        expect(publishSettings.targetDirectory).toBe(settings.targetDirectory)
        expect(publishSettings.milestone).toBe(settings.milestone)
    })

    it('should return GitReleaseManagerAddAssetSettings', () => {
        const settings = {
            repository: 'repo',
            owner: 'owner',
            token: 'token',
            targetDirectory: 'path',
            milestone: 'milestone',
            assets: ['asset']
        } as GitReleaseManagerAddAssetSettings

        const buildAgent = {
            getInput: (input: keyof GitReleaseManagerAddAssetSettings) => settings[input] as string,
            getListInput: (input: keyof GitReleaseManagerAddAssetSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitReleaseManagerSettingsProvider(buildAgent)

        const addAssetSettings = settingsProvider.getAddAssetSettings()

        expect(addAssetSettings.repository).toBe(settings.repository)
        expect(addAssetSettings.owner).toBe(settings.owner)
        expect(addAssetSettings.token).toBe(settings.token)
        expect(addAssetSettings.targetDirectory).toBe(settings.targetDirectory)
        expect(addAssetSettings.milestone).toBe(settings.milestone)
        expect(addAssetSettings.assets).toBe(settings.assets)
    })
})
