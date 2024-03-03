import { IBuildAgent, TYPES } from '../../core/models'

import { ExecuteFields, GitVersionSettings, IGitVersionSettingsProvider } from './models'
import { SettingsProvider } from '../common/settings'
import { inject, injectable } from 'inversify'

@injectable()
export class GitVersionSettingsProvider extends SettingsProvider implements IGitVersionSettingsProvider {
    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent) {
        super(buildAgent)
    }

    public getGitVersionSettings(): GitVersionSettings {
        const targetPath = this.buildAgent.getInput(ExecuteFields.targetPath)

        const disableCache = this.buildAgent.getBooleanInput(ExecuteFields.disableCache)
        const disableNormalization = this.buildAgent.getBooleanInput(ExecuteFields.disableNormalization)

        const useConfigFile = this.buildAgent.getBooleanInput(ExecuteFields.useConfigFile)
        const configFilePath = this.buildAgent.getInput(ExecuteFields.configFilePath)
        const overrideConfig = this.buildAgent.getListInput(ExecuteFields.overrideConfig)

        const updateAssemblyInfo = this.buildAgent.getBooleanInput(ExecuteFields.updateAssemblyInfo)
        const updateAssemblyInfoFilename = this.buildAgent.getInput(ExecuteFields.updateAssemblyInfoFilename)

        const additionalArguments = this.buildAgent.getInput(ExecuteFields.additionalArguments)

        const srcDir = this.buildAgent.getSourceDir()?.replace(/\\/g, '/')

        return {
            targetPath,
            disableCache,
            disableNormalization,
            useConfigFile,
            configFilePath,
            overrideConfig,
            updateAssemblyInfo,
            updateAssemblyInfoFilename,
            additionalArguments,
            srcDir
        }
    }
}
