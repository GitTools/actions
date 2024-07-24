import { type ISettingsProvider, SettingsProvider } from '@tools/common'
import { CommandFields, ExecuteFields, type GitVersionCommandSettings, type GitVersionExecuteSettings } from './models'

export interface IGitVersionSettingsProvider extends ISettingsProvider {
    getGitVersionExecuteSettings(): GitVersionExecuteSettings

    getGitVersionCommandSettings(): GitVersionCommandSettings
}

export class GitVersionSettingsProvider extends SettingsProvider implements IGitVersionSettingsProvider {
    getGitVersionExecuteSettings(): GitVersionExecuteSettings {
        const targetPath = this.buildAgent.getInput(ExecuteFields.targetPath)

        const disableCache = this.buildAgent.getBooleanInput(ExecuteFields.disableCache)
        const disableNormalization = this.buildAgent.getBooleanInput(ExecuteFields.disableNormalization)
        const disableShallowCloneCheck = this.buildAgent.getBooleanInput(ExecuteFields.disableShallowCloneCheck)

        const useConfigFile = this.buildAgent.getBooleanInput(ExecuteFields.useConfigFile)
        const configFilePath = this.buildAgent.getInput(ExecuteFields.configFilePath)
        const overrideConfig = this.buildAgent.getListInput(ExecuteFields.overrideConfig)

        const updateAssemblyInfo = this.buildAgent.getBooleanInput(ExecuteFields.updateAssemblyInfo)
        const updateAssemblyInfoFilename = this.buildAgent.getInput(ExecuteFields.updateAssemblyInfoFilename)

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

    getGitVersionCommandSettings(): GitVersionCommandSettings {
        const targetPath = this.buildAgent.getInput(CommandFields.targetPath)
        const disableShallowCloneCheck = this.buildAgent.getBooleanInput(CommandFields.disableShallowCloneCheck)
        const args = this.buildAgent.getInput(CommandFields.arguments)

        return {
            targetPath,
            disableShallowCloneCheck,
            arguments: args
        }
    }
}
