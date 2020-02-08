import { IBuildAgent, TYPES, SetupOptions } from "../../core/common";
import { IGitVersionTool, GitVersionTool } from "../../tools/gitversion/gitversion-tool";
import { GitVersionSettings, GitVersionOutput } from "../../tools/gitversion/models";

import container from "../../core/ioc";
import { Settings } from "../../tools/gitversion/settings";

container.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool);

const gitVersionTool = container.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent);

export async function setup() {
    try {

        gitVersionTool.disableTelemetry();

        const versionSpec = buildAgent.getInput(SetupOptions.versionSpec);
        const includePrerelease = buildAgent.getBooleanInput(SetupOptions.includePrerelease);

        await gitVersionTool.install(versionSpec, includePrerelease);

        buildAgent.setSucceeded("GitVersion installed successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

export async function run() {
    try {

        gitVersionTool.disableTelemetry();

        const settings: GitVersionSettings = Settings.getGitVersionSettings(buildAgent);

        const result = await gitVersionTool.run(settings);

        const gitversion = JSON.parse(result.stdout) as GitVersionOutput;
        gitVersionTool.writeGitVersionToAgent(gitversion);

        if (result.code === 0) {
            buildAgent.setSucceeded("GitVersion executed successfully", true);
        } else {
            buildAgent.setFailed(result.error.message, true);
        }

    } catch (error) {
        buildAgent.setFailed(error, true);
    }
}