import { ISettingsProvider, SettingsProvider } from '@tools/common'
import { ExecuteFields, type GitVersionSettings } from './models'

export interface IGitVersionSettingsProvider extends ISettingsProvider {
    getGitVersionSettings(): GitVersionSettings
}

export class GitVersionSettingsProvider extends SettingsProvider implements IGitVersionSettingsProvider {
    getGitVersionSettings(): GitVersionSettings {
        const targetPath = this.buildAgent.getInput(ExecuteFields.targetPath)

        const disableCache = this.buildAgent.getBooleanInput(ExecuteFields.disableCache)
        const disableNormalization = this.buildAgent.getBooleanInput(ExecuteFields.disableNormalization)
        const disableShallowCloneCheck = this.buildAgent.getBooleanInput(ExecuteFields.disableShallowCloneCheck)

        const useConfigFile = this.buildAgent.getBooleanInput(ExecuteFields.useConfigFile)
        const configFilePath = this.buildAgent.getInput(ExecuteFields.configFilePath)
        const overrideConfig = this.buildAgent.getListInput(ExecuteFields.overrideConfig)

        const updateAssemblyInfo = this.buildAgent.getBooleanInput(ExecuteFields.updateAssemblyInfo)
        const updateAssemblyInfoFilename = this.buildAgent.getInput(ExecuteFields.updateAssemblyInfoFilename)

        const additionalArguments = this.buildAgent.getInput(ExecuteFields.additionalArguments)

        return {
            targetPath,
            disableCache,
            disableNormalization,
            disableShallowCloneCheck,
            useConfigFile,
            configFilePath,
            overrideConfig,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            additionalArguments
        }
    }
}
