import { IBuildAgent } from "../../core/models";
import { GitReleaseManagerSettings, CommonFields, CreateFields, GitReleaseManagerCreateSettings, DiscardFields, GitReleaseManagerDiscardSettings } from "./models";

export class Settings {

    public static getCreateSettings(buildAgent: IBuildAgent) : GitReleaseManagerCreateSettings {
        const milestone = buildAgent.getInput(CreateFields.milestone);
        const releaseName = buildAgent.getInput(CreateFields.releaseName);
        const inputFileName = buildAgent.getInput(CreateFields.inputFileName);
        const isPreRelease = buildAgent.getBooleanInput(CreateFields.isPreRelease);
        const commit = buildAgent.getInput(CreateFields.commit);
        const targetDirectory = buildAgent.getInput(CreateFields.targetDirectory);
        const assets = buildAgent.getListInput(CreateFields.assets);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            milestone,
            releaseName,
            inputFileName,
            isPreRelease,
            commit,
            targetDirectory,
            assets
        }
    }

    public static getDiscardSettings(buildAgent: IBuildAgent) : GitReleaseManagerDiscardSettings {
        const milestone = buildAgent.getInput(DiscardFields.milestone);
        const targetDirectory = buildAgent.getInput(CreateFields.targetDirectory);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            milestone,
            targetDirectory,
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