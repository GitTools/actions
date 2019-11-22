import "reflect-metadata";

import { IBuildAgent, IGitVersionOptions, IGitVersionTool } from "../interfaces";
import { RunOptions, TYPES } from "../types";
import { ioc } from "./ioc";

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

export async function run() {
    try {

        buildAgent.exportVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "1");

        const inputOptions: IGitVersionOptions = getGitVersionOptions();

        await gitVersionTool.run(inputOptions);

        buildAgent.setSucceeded("GitVersion installed successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

function getGitVersionOptions(): IGitVersionOptions {

    const targetPath = buildAgent.getInput(RunOptions.targetPath);

    const useConfigFile = buildAgent.getBooleanInput(RunOptions.useConfigFile);
    const configFilePath = buildAgent.getInput(RunOptions.configFilePath);

    const updateAssemblyInfo = buildAgent.getBooleanInput(RunOptions.updateAssemblyInfo);
    const updateAssemblyInfoFilename = buildAgent.getInput(RunOptions.updateAssemblyInfoFilename);

    const additionalArguments = buildAgent.getInput(RunOptions.additionalArguments);

    return {
        targetPath,
        useConfigFile,
        configFilePath,
        updateAssemblyInfo,
        updateAssemblyInfoFilename,
        additionalArguments,
    };
}

run();
