import { injectable } from 'inversify'
import { type SetupSettings, SetupFields } from './models'

import { IBuildAgent } from '../../agents/common/build-agent'

export interface ISettingsProvider {
    getSetupSettings(): SetupSettings
}

@injectable()
export class SettingsProvider implements ISettingsProvider {
    constructor(protected buildAgent: IBuildAgent) {}

    getSetupSettings(): SetupSettings {
        const versionSpec = this.buildAgent.getInput(SetupFields.versionSpec)
        const includePrerelease = this.buildAgent.getBooleanInput(SetupFields.includePrerelease)
        const ignoreFailedSources = this.buildAgent.getBooleanInput(SetupFields.ignoreFailedSources)
        const preferLatestVersion = this.buildAgent.getBooleanInput(SetupFields.preferLatestVersion)

        return {
            versionSpec,
            includePrerelease,
            ignoreFailedSources,
            preferLatestVersion
        }
    }
}
