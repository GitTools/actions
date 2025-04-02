import { describe, it } from 'vitest'
import { type IBuildAgent } from '@agents/common'
import { type CommandSettings, type ExecuteSettings, GitVersionSettingsProvider } from '@tools/gitversion'
import { expectValidSettings } from '../common/utils'

describe('GitVersion settings', () => {
    it('should return ExecuteSettings', () => {
        const settings: ExecuteSettings = {
            targetPath: 'path',
            disableCache: true,
            disableNormalization: true,
            disableShallowCloneCheck: true,
            configFilePath: 'path',
            overrideConfig: ['update-build-number=false'],
            updateAssemblyInfo: true,
            updateAssemblyInfoFilename: 'path',
            updateProjectFiles: true
        }

        const buildAgent = {
            getInput: (input: keyof ExecuteSettings) => settings[input] as string,
            getBooleanInput: (input: keyof ExecuteSettings) => settings[input] as boolean,
            getListInput: (input: keyof ExecuteSettings) => settings[input] as string[]
        } as IBuildAgent

        const settingsProvider = new GitVersionSettingsProvider(buildAgent)

        const ExecuteSettings = settingsProvider.getExecuteSettings()

        expectValidSettings(settings, ExecuteSettings)
    })

    it('should return CommandSettings', () => {
        const settings: CommandSettings = {
            targetPath: 'path',
            disableShallowCloneCheck: true,
            arguments: 'args'
        }

        const buildAgent = {
            getInput: (input: keyof CommandSettings) => settings[input] as string,
            getBooleanInput: (input: keyof CommandSettings) => settings[input] as boolean
        } as IBuildAgent

        const settingsProvider = new GitVersionSettingsProvider(buildAgent)

        const CommandSettings = settingsProvider.getCommandSettings()

        expectValidSettings(settings, CommandSettings)
    })
})
