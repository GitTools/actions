import { describe, it } from 'vitest'
import { IBuildAgent } from '@agents/common'
import { type GitVersionCommandSettings, type GitVersionExecuteSettings, GitVersionSettingsProvider } from '@tools/gitversion'
import { expectValidSettings } from '../common/utils'

describe('GitVersion settings', () => {
    it('should return GitVersionExecuteSettings', () => {
        const settings: GitVersionExecuteSettings = {
            targetPath: 'path',
            disableCache: true,
            disableNormalization: true,
            disableShallowCloneCheck: true,
            useConfigFile: true,
            configFilePath: 'path',
            overrideConfig: ['update-build-number=false'],
            updateAssemblyInfo: true,
            updateAssemblyInfoFilename: 'path'
        }

        const buildAgent = {
            getInput: (input: keyof GitVersionExecuteSettings) => settings[input] as string,
            getBooleanInput: (input: keyof GitVersionExecuteSettings) => settings[input] as boolean,
            getListInput: (input: keyof GitVersionExecuteSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitVersionSettingsProvider(buildAgent)

        const gitVersionExecuteSettings = settingsProvider.getGitVersionExecuteSettings()

        expectValidSettings(settings, gitVersionExecuteSettings)
    })

    it('should return GitVersionCommandSettings', () => {
        const settings: GitVersionCommandSettings = {
            targetPath: 'path',
            disableShallowCloneCheck: true,
            arguments: 'args'
        }

        const buildAgent = {
            getInput: (input: keyof GitVersionCommandSettings) => settings[input] as string,
            getBooleanInput: (input: keyof GitVersionCommandSettings) => settings[input] as boolean
        } as IBuildAgent

        const settingsProvider = new GitVersionSettingsProvider(buildAgent)

        const gitVersionCommandSettings = settingsProvider.getGitVersionCommandSettings()

        expectValidSettings(settings, gitVersionCommandSettings)
    })
})
