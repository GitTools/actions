import { IBuildAgent, IGitReleaseManagerTool } from "./interfaces";
import { ioc } from "./ioc";
import { SetupOptions, TYPES } from "./types";

const gitReleaseManagerTool = ioc.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

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
