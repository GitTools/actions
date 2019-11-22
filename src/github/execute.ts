import "reflect-metadata";

import { IBuildAgent, IGitVersionTool } from "../interface";
import { TYPES } from "../types";
import { ioc } from "./ioc";

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

export async function run() {
    try {

        const version = "5.1.2";
        const includePrerelease = false;

        buildAgent.exportVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "1");
        await gitVersionTool.install(version, includePrerelease);

        buildAgent.setSucceeded("GitVersion installed successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

run();
