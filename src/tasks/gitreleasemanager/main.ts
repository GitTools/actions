import { IBuildAgent, TYPES, SetupOptions } from "../../core/common";
import { IGitReleaseManagerTool, GitReleaseManagerTool } from "../../tools/gitreleasemanager/gitreleasemanager-tool";

import container from "../../core/ioc";
import { Settings } from "../../tools/gitreleasemanager/settings";

container.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool);

const gitReleaseManagerTool = container.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool);
const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent);

export async function setup() {
    try {

        gitReleaseManagerTool.disableTelemetry();

        const versionSpec = buildAgent.getInput(SetupOptions.versionSpec);
        const includePrerelease = buildAgent.getBooleanInput(SetupOptions.includePrerelease);

        await gitReleaseManagerTool.install(versionSpec, includePrerelease);

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