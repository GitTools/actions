import { container, IBuildAgent, TYPES, SetupOptions } from "../../core/common";
import { IGitReleaseManagerTool, GitReleaseManagerTool } from "../../core/gitreleasemanager";

container.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool);

const gitReleaseManagerTool = container.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool);
const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent);

export async function setup() {
    try {

        buildAgent.exportVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "1");

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

        buildAgent.exportVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "1");

        buildAgent.setSucceeded("GitVersionManager created release successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}