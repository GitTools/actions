import { afterEach, describe, expect, it, vi } from 'vitest'
import process from 'node:process'
import { type IBuildAgent } from '@agents/common'
import { BuildAgent } from '@agents/local'
import { type CommandSettings, type ExecuteSettings, GitVersionSettingsProvider } from '@tools/gitversion'
import { expectValidSettings } from '../common/utils'

describe('GitVersion settings', () => {
    afterEach(() => {
        vi.unstubAllEnvs()
    })

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
            updateProjectFiles: true,
            updateWixVersionFile: true,
            buildNumberFormat: 'format',
            verbosity: 'verbose'
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
            arguments: 'args',
            verbosity: 'diagnostic'
        }

        const buildAgent = {
            getInput: (input: keyof CommandSettings) => settings[input] as string,
            getBooleanInput: (input: keyof CommandSettings) => settings[input] as boolean
        } as IBuildAgent

        const settingsProvider = new GitVersionSettingsProvider(buildAgent)

        const commandSettings = settingsProvider.getCommandSettings()

        expectValidSettings(settings, commandSettings)
    })

    it('should read multiline overrideConfig input values', () => {
        vi.stubEnv('INPUT_OVERRIDECONFIG', 'tag-prefix=some.prefix-[vV]?\nnext-version=0.1.0')

        const settingsProvider = new GitVersionSettingsProvider(new BuildAgent())

        const executeSettings = settingsProvider.getExecuteSettings()

        expect(executeSettings.overrideConfig).toEqual(['tag-prefix=some.prefix-[vV]?', 'next-version=0.1.0'])
        expect(process.env['INPUT_OVERRIDECONFIG']).toBe('tag-prefix=some.prefix-[vV]?\nnext-version=0.1.0')
    })
})
