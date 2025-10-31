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
        const ignoreFailedSources = this.buildAgent.getBooleanInput<SetupSettings>('ignoreFailedSources')
        const preferLatestVersion = this.buildAgent.getBooleanInput<SetupSettings>('preferLatestVersion')
        const nugetConfigPath = this.buildAgent.getInput<SetupSettings>('nugetConfigPath', false)

        return {
            versionSpec,
            includePrerelease,
            ignoreFailedSources,
            preferLatestVersion,
            nugetConfigPath: nugetConfigPath || undefined
        }
    }
}
