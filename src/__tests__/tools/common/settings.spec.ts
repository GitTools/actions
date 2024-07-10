import { describe, expect, it } from 'vitest'
import { IBuildAgent } from '@agents/common'
import { SettingsProvider, type SetupSettings } from '@tools/common'

describe('SettingsProvider', () => {
    it('should return SetupSettings', () => {
        const settings = {
            versionSpec: '5.x',
            includePrerelease: false,
            ignoreFailedSources: true,
            preferLatestVersion: false
        } as SetupSettings

        const buildAgent = {
            getInput: (input: keyof SetupSettings) => settings[input] as string,
            getBooleanInput: (input: keyof SetupSettings) => settings[input] as boolean
        } as IBuildAgent

        const settingsProvider = new SettingsProvider(buildAgent)

        const setupSettings = settingsProvider.getSetupSettings()

        expect(setupSettings.versionSpec).toBe(settings.versionSpec)
        expect(setupSettings.includePrerelease).toBe(settings.includePrerelease)
        expect(setupSettings.ignoreFailedSources).toBe(settings.ignoreFailedSources)
        expect(setupSettings.preferLatestVersion).toBe(settings.preferLatestVersion)
    })
})
