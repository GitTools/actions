import "reflect-metadata";

import { IBuildAgent, IGitVersionTool } from "../interfaces";
import { TYPES } from "../types";
import { ioc } from "./ioc";

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

export async function run() {
    try {

        const version = "5.1.2";
        const includePrerelease = false;

        await gitVersionTool.install(version, includePrerelease);

        buildAgent.setSucceeded("GitVersion executed successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

run();
