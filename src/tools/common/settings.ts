import { type IBuildAgent } from '@agents/common'
import { type SetupSettings } from './models'

export interface ISettingsProvider {
    getSetupSettings(): SetupSettings
}

export class SettingsProvider implements ISettingsProvider {
    constructor(protected buildAgent: IBuildAgent) {}

    getSetupSettings(): SetupSettings {
        const versionSpec = this.buildAgent.getInput<SetupSettings>('versionSpec')
        const includePrerelease = this.buildAgent.getBooleanInput<SetupSettings>('includePrerelease')
        const packageSource = this.buildAgent.getInput<SetupSettings>('packageSource')
        const ignoreFailedSources = this.buildAgent.getBooleanInput<SetupSettings>('ignoreFailedSources')
        const preferLatestVersion = this.buildAgent.getBooleanInput<SetupSettings>('preferLatestVersion')

        return {
            versionSpec,
            includePrerelease,
            packageSource,
            ignoreFailedSources,
            preferLatestVersion
        }
    }
}
