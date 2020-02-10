import { IBuildAgent } from "../../core/models";
import {
    GitReleaseManagerSettings,
    CommonFields, CreateFields, DiscardFields,
    CloseFields, OpenFields, PublishFields,

    GitReleaseManagerCreateSettings,
    GitReleaseManagerDiscardSettings,
    GitReleaseManagerCloseSettings,
    GitReleaseManagerOpenSettings,
    GitReleaseManagerPublishSettings,
} from "./models";

export class Settings {

    public static getCreateSettings(buildAgent: IBuildAgent): GitReleaseManagerCreateSettings {
        const milestone = buildAgent.getInput(CreateFields.milestone);
        const releaseName = buildAgent.getInput(CreateFields.releaseName);
        const inputFileName = buildAgent.getInput(CreateFields.inputFileName);
        const isPreRelease = buildAgent.getBooleanInput(CreateFields.isPreRelease);
        const commit = buildAgent.getInput(CreateFields.commit);
        const assets = buildAgent.getListInput(CreateFields.assets);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            milestone,
            releaseName,
            inputFileName,
            isPreRelease,
            commit,
            assets
        }
    }

    public static getDiscardSettings(buildAgent: IBuildAgent): GitReleaseManagerDiscardSettings {
        const milestone = buildAgent.getInput(DiscardFields.milestone);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            milestone,
        }
    }

    public static getCloseSettings(buildAgent: IBuildAgent): GitReleaseManagerCloseSettings {
        const milestone = buildAgent.getInput(CloseFields.milestone);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            milestone,
        }
    }

    public static getOpenSettings(buildAgent: IBuildAgent): GitReleaseManagerOpenSettings {
        const milestone = buildAgent.getInput(OpenFields.milestone);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            milestone,
        }
    }

    public static getPublishSettings(buildAgent: IBuildAgent): GitReleaseManagerPublishSettings {
        const tagName = buildAgent.getInput(PublishFields.tagName);

        const commonSettings = Settings.getCommonSettings(buildAgent);
        return {
            ...commonSettings,
            tagName,
        }
    }

    private static getCommonSettings(buildAgent: IBuildAgent): GitReleaseManagerSettings {
        const owner = buildAgent.getInput(CommonFields.owner, true);
        const repository = buildAgent.getInput(CommonFields.repository, true);
        const token = buildAgent.getInput(CommonFields.token, true);
        const targetDirectory = buildAgent.getInput(CommonFields.targetDirectory);

        return {
            owner,
            repository,
            token,
            targetDirectory,
        };
    }
}