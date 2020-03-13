import { IBuildAgent, SetupFields, ISetupSettings } from './models'

export class Settings {
    public static getSetupSettings(buildAgent: IBuildAgent): ISetupSettings {
        const versionSpec = buildAgent.getInput(SetupFields.versionSpec)
        const includePrerelease = buildAgent.getBooleanInput(
            SetupFields.includePrerelease
        )

        return {
            versionSpec,
            includePrerelease
        }
    }
}
