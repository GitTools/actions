import "reflect-metadata";

import { IBuildAgent, IGitVersionTool } from "../interfaces";
import { SetupOptions, TYPES } from "../types";
import { ioc } from "./ioc";

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

export async function run() {
    try {

        buildAgent.exportVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "1");

        const versionSpec = this.buildAgent.getInput(SetupOptions.versionSpec);
        const includePrerelease = this.buildAgent.getBooleanInput(SetupOptions.includePrerelease);

        await gitVersionTool.install(versionSpec, includePrerelease);

        buildAgent.setSucceeded("GitVersion installed successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

run();
