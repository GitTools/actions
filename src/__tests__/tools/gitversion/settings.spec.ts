import { describe, expect, it } from 'vitest'
import { IBuildAgent } from '@agents/common'
import { type GitVersionExecuteSettings, GitVersionSettingsProvider } from '@tools/gitversion'

describe('GitVersion settings', () => {
    it('should return GitVersionExecuteSettings', () => {
        const settings = {
            targetPath: 'path',
            disableCache: true,
            disableNormalization: true,
            disableShallowCloneCheck: true,
            useConfigFile: true,
            configFilePath: 'path',
            overrideConfig: ['update-build-number=false'],
            updateAssemblyInfo: true,
            updateAssemblyInfoFilename: 'path',
            additionalArguments: 'args'
        } as GitVersionExecuteSettings

        const buildAgent = {
            getInput: (input: keyof GitVersionExecuteSettings) => settings[input] as string,
            getBooleanInput: (input: keyof GitVersionExecuteSettings) => settings[input] as boolean,
            getListInput: (input: keyof GitVersionExecuteSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitVersionSettingsProvider(buildAgent)

        const gitVersionSettings = settingsProvider.getGitVersionExecuteSettings()

        expect(gitVersionSettings.targetPath).toBe(settings.targetPath)
        expect(gitVersionSettings.disableCache).toBe(settings.disableCache)
        expect(gitVersionSettings.disableNormalization).toBe(settings.disableNormalization)
        expect(gitVersionSettings.disableShallowCloneCheck).toBe(settings.disableShallowCloneCheck)
        expect(gitVersionSettings.useConfigFile).toBe(settings.useConfigFile)
        expect(gitVersionSettings.configFilePath).toBe(settings.configFilePath)
        expect(gitVersionSettings.overrideConfig).toBe(settings.overrideConfig)
        expect(gitVersionSettings.updateAssemblyInfo).toBe(settings.updateAssemblyInfo)
        expect(gitVersionSettings.updateAssemblyInfoFilename).toBe(settings.updateAssemblyInfoFilename)
        expect(gitVersionSettings.additionalArguments).toBe(settings.additionalArguments)
    })
})
