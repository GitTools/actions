import { type ISettingsProvider, SettingsProvider } from '@tools/common'
import { type CommandSettings, type ExecuteSettings } from './models'

export interface IGitVersionSettingsProvider extends ISettingsProvider {
    getExecuteSettings(): ExecuteSettings

    getCommandSettings(): CommandSettings
}

export class GitVersionSettingsProvider extends SettingsProvider implements IGitVersionSettingsProvider {
    getExecuteSettings(): ExecuteSettings {
        const targetPath = this.buildAgent.getInput<ExecuteSettings>('targetPath')

        const disableCache = this.buildAgent.getBooleanInput<ExecuteSettings>('disableCache')
        const disableNormalization = this.buildAgent.getBooleanInput<ExecuteSettings>('disableNormalization')
        const disableShallowCloneCheck = this.buildAgent.getBooleanInput<ExecuteSettings>('disableShallowCloneCheck')

        const useConfigFile = this.buildAgent.getBooleanInput<ExecuteSettings>('useConfigFile')
        const configFilePath = this.buildAgent.getInput<ExecuteSettings>('configFilePath')
        const overrideConfig = this.buildAgent.getListInput<ExecuteSettings>('overrideConfig')

        const updateAssemblyInfo = this.buildAgent.getBooleanInput<ExecuteSettings>('updateAssemblyInfo')
        const updateAssemblyInfoFilename = this.buildAgent.getInput<ExecuteSettings>('updateAssemblyInfoFilename')

        return {
            targetPath,
            disableCache,
            disableNormalization,
            disableShallowCloneCheck,
            useConfigFile,
            configFilePath,
            overrideConfig,
            updateAssemblyInfo,
            updateAssemblyInfoFilename
        }
    }

    getCommandSettings(): CommandSettings {
        const targetPath = this.buildAgent.getInput<CommandSettings>('targetPath')
        const disableShallowCloneCheck = this.buildAgent.getBooleanInput<CommandSettings>('disableShallowCloneCheck')
        const args = this.buildAgent.getInput<CommandSettings>('arguments')

        return {
            targetPath,
            disableShallowCloneCheck,
            arguments: args
        }
    }
}
