import { injectable } from 'inversify'
import { ISettingsProvider, SetupSettings, SetupFields } from './models'

import { IBuildAgent } from '../../agents/common/build-agent'

@injectable()
export class SettingsProvider implements ISettingsProvider {
    constructor(protected buildAgent: IBuildAgent) {}

    public getSetupSettings(): SetupSettings {
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
