import { IBuildAgent } from "../../core/models";
import { GitReleaseManagerSettings, CommonFields, CreateFields } from "./models";

export class Settings {

    public static getCreateSettings(buildAgent: IBuildAgent) {
        const milestone = buildAgent.getInput(CreateFields.milestone);
        const releaseName = buildAgent.getInput(CreateFields.releaseName);
        const inputFileName = buildAgent.getInput(CreateFields.inputFileName);
        const isPreRelease = buildAgent.getBooleanInput(CreateFields.isPreRelease);
        const commit = buildAgent.getInput(CreateFields.commit);
        const targetDirectory = buildAgent.getInput(CreateFields.targetDirectory);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            milestone,
            releaseName,
            inputFileName,
            isPreRelease,
            commit,
            targetDirectory
        }
    }

    private static getCommonSettings(buildAgent: IBuildAgent): GitReleaseManagerSettings {
        const owner = buildAgent.getInput(CommonFields.owner, true);
        const repository = buildAgent.getInput(CommonFields.repository, true);
        const token = buildAgent.getInput(CommonFields.token, true);

        return {
            owner,
            repository,
            token
        };
    }
}