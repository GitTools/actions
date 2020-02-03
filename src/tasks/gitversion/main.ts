import { container, IBuildAgent, TYPES, SetupOptions } from "../../core/common";
import { IGitVersionTool, IGitVersionArguments, IGitVersion, GitVersionTool } from "../../core/gitversion";

container.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool);

const gitVersionTool = container.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent);

export async function setup() {
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

export async function run() {
    try {
        const inputOptions: IGitVersionArguments = gitVersionTool.getGitVersionOptions();

        const result = await gitVersionTool.run(inputOptions);

        const gitversion = JSON.parse(result.stdout) as IGitVersion;
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