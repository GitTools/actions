import "reflect-metadata";

import { IBuildAgent, IGitVersionOptions, IGitVersionTool } from "../interfaces";
import { RunOptions, TYPES } from "../types";
import { ioc } from "./ioc";

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

export async function run() {
    try {
        const inputOptions: IGitVersionOptions = getGitVersionOptions();

        const result = await gitVersionTool.run(inputOptions);
        console.log(result.stdout);

        if (result.code === 0) {
            buildAgent.setSucceeded("GitVersion executed successfully", true);
        } else {
            buildAgent.setFailed(result.error.message, true);
        }

    } catch (error) {
        buildAgent.setFailed(error, true);
    }
}

function getGitVersionOptions(): IGitVersionOptions {

    const targetPath = buildAgent.getInput(RunOptions.targetPath);

    const useConfigFile = buildAgent.getBooleanInput(RunOptions.useConfigFile);
    const configFilePath = buildAgent.getInput(RunOptions.configFilePath);

    const updateAssemblyInfo = buildAgent.getBooleanInput(RunOptions.updateAssemblyInfo);
    const updateAssemblyInfoFilename = buildAgent.getInput(RunOptions.updateAssemblyInfoFilename);

    const additionalArguments = buildAgent.getInput(RunOptions.additionalArguments);

    const srcDir = buildAgent.getSourceDir().replace(/\\/g, "/");

    return {
        targetPath,
        useConfigFile,
        configFilePath,
        updateAssemblyInfo,
        updateAssemblyInfoFilename,
        additionalArguments,
        srcDir,
    };
}

run();
