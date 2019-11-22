import { IBuildAgent, IGitVersion, IGitVersionOptions, IGitVersionTool } from "./interfaces";

import { RunOptions, SetupOptions } from "./types";

export async function setup(buildAgent: IBuildAgent, gitVersionTool: IGitVersionTool) {
    try {

        buildAgent.exportVariable("DOTNET_CLI_TELEMETRY_OPTOUT", "1");

        const versionSpec = buildAgent.getInput(SetupOptions.versionSpec);
        const includePrerelease = buildAgent.getBooleanInput(SetupOptions.includePrerelease);

        await gitVersionTool.install(versionSpec, includePrerelease);

        buildAgent.setSucceeded("GitVersion installed successfully", true);
    } catch (error) {
        buildAgent.setFailed(error.message, true);
    }
}

export async function run(buildAgent: IBuildAgent, gitVersionTool: IGitVersionTool) {
    try {
        const inputOptions: IGitVersionOptions = getGitVersionOptions(buildAgent);

        const result = await gitVersionTool.run(inputOptions);

        const gitversion = JSON.parse(result.stdout) as IGitVersion;
        console.log(gitversion.FullSemVer);

        if (result.code === 0) {
            buildAgent.setSucceeded("GitVersion executed successfully", true);
        } else {
            buildAgent.setFailed(result.error.message, true);
        }

    } catch (error) {
        buildAgent.setFailed(error, true);
    }
}

function getGitVersionOptions(buildAgent: IBuildAgent ): IGitVersionOptions {

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
