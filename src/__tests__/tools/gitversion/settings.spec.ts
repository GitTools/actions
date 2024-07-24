import { describe, it } from 'vitest'
import { IBuildAgent } from '@agents/common'
import { type GitVersionExecuteSettings, GitVersionSettingsProvider } from '@tools/gitversion'
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
            updateAssemblyInfoFilename: 'path',
            additionalArguments: 'args'
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
})
