import { IBuildAgent, TYPES, SetupFields } from "../../core/models";
import { IGitReleaseManagerTool, GitReleaseManagerTool } from "../../tools/gitreleasemanager/tool";
import { Settings as CommonSettings } from "../../core/settings";
import { Settings } from "../../tools/gitreleasemanager/settings";

import container from "../../core/ioc";

container.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool);

const gitReleaseManagerTool = container.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool);
const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent);

export async function setup() {
    try {

        gitReleaseManagerTool.disableTelemetry();

        const settings = CommonSettings.getSetupSettings(buildAgent);

        await gitReleaseManagerTool.install(settings.versionSpec, settings.includePrerelease);

        buildAgent.setSucceeded("GitVersionManager installed successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

export async function create() {
    try {

        gitReleaseManagerTool.disableTelemetry();

        const settings = Settings.getCreateSettings(buildAgent);

        await gitReleaseManagerTool.create(settings);

        buildAgent.setSucceeded("GitVersionManager created release successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

export async function discard() {
    try {

        gitReleaseManagerTool.disableTelemetry();

        const settings = Settings.getDiscardSettings(buildAgent);

        await gitReleaseManagerTool.discard(settings);

        buildAgent.setSucceeded("GitVersionManager discarded release successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

export async function close() {
    try {

        gitReleaseManagerTool.disableTelemetry();

        const settings = Settings.getCloseSettings(buildAgent);

        await gitReleaseManagerTool.close(settings);

        buildAgent.setSucceeded("GitVersionManager closed release successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}