import { describe, it } from 'vitest'
import { type IBuildAgent } from '@agents/common'
import { SettingsProvider, type SetupSettings } from '@tools/common'
import { expectValidSettings } from './utils'

describe('SettingsProvider', () => {
    it('should return SetupSettings', () => {
        const settings: SetupSettings = {
            versionSpec: '6.4.x',
            includePrerelease: false,
            ignoreFailedSources: true,
            preferLatestVersion: false
        }

        const buildAgent = {
            getInput: (input: keyof SetupSettings) => settings[input] as string,
            getBooleanInput: (input: keyof SetupSettings) => settings[input] as boolean
        } as IBuildAgent

        const settingsProvider = new SettingsProvider(buildAgent)

        const setupSettings = settingsProvider.getSetupSettings()

        expectValidSettings(settings, setupSettings)
    })
})
