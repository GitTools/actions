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
            overrideConfig: ['semantic-version-format=Loose'],
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

        const executeSettings = settingsProvider.getExecuteSettings()

        expectValidSettings(settings, executeSettings)
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

        const commandSettings = settingsProvider.getCommandSettings()

        expectValidSettings(settings, commandSettings)
    })
})
