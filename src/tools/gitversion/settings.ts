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

        const configFilePath = this.buildAgent.getInput<ExecuteSettings>('configFilePath', false)
        const overrideConfig = this.buildAgent.getListInput<ExecuteSettings>('overrideConfig', false)

        const updateAssemblyInfo = this.buildAgent.getBooleanInput<ExecuteSettings>('updateAssemblyInfo')
        const updateAssemblyInfoFilename = this.buildAgent.getInput<ExecuteSettings>('updateAssemblyInfoFilename')

        const updateProjectFiles = this.buildAgent.getBooleanInput<ExecuteSettings>('updateProjectFiles')

        const buildNumberFormat = this.buildAgent.getInput<ExecuteSettings>('buildNumberFormat', false)

        return {
            targetPath,
            disableCache,
            disableNormalization,
            disableShallowCloneCheck,
            configFilePath,
            overrideConfig,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            updateProjectFiles,
            buildNumberFormat
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
