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
        writeGitVersionToAgent(buildAgent, gitversion);

        if (result.code === 0) {
            buildAgent.setSucceeded("GitVersion executed successfully", true);
        } else {
            buildAgent.setFailed(result.error.message, true);
        }

    } catch (error) {
        buildAgent.setFailed(error, true);
    }
}

function getGitVersionOptions(buildAgent: IBuildAgent): IGitVersionOptions {

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

function writeGitVersionToAgent(buildAgent: IBuildAgent, gitversion: IGitVersion): void {

    buildAgent.setOutput("major",                           gitversion.Major.toString());
    buildAgent.setOutput("minor",                           gitversion.Minor.toString());
    buildAgent.setOutput("patch",                           gitversion.Patch.toString());
    buildAgent.setOutput("preReleaseTag",                   gitversion.PreReleaseTag);
    buildAgent.setOutput("preReleaseTagWithDash",           gitversion.PreReleaseTagWithDash);
    buildAgent.setOutput("preReleaseLabel",                 gitversion.PreReleaseLabel);
    buildAgent.setOutput("preReleaseNumber",                gitversion.PreReleaseNumber.toString());
    buildAgent.setOutput("weightedPreReleaseNumber",        gitversion.WeightedPreReleaseNumber.toString());
    buildAgent.setOutput("buildMetaData",                   gitversion.BuildMetaData.toString());
    buildAgent.setOutput("buildMetaDataPadded",             gitversion.BuildMetaDataPadded);
    buildAgent.setOutput("fullBuildMetaData",               gitversion.FullBuildMetaData);
    buildAgent.setOutput("majorMinorPatch",                 gitversion.MajorMinorPatch);
    buildAgent.setOutput("semVer",                          gitversion.SemVer);
    buildAgent.setOutput("legacySemVer",                    gitversion.LegacySemVer);
    buildAgent.setOutput("legacySemVerPadded",              gitversion.LegacySemVerPadded);
    buildAgent.setOutput("assemblySemVer",                  gitversion.AssemblySemVer);
    buildAgent.setOutput("assemblySemFileVer",              gitversion.AssemblySemFileVer);
    buildAgent.setOutput("fullSemVer",                      gitversion.FullSemVer);
    buildAgent.setOutput("informationalVersion",            gitversion.InformationalVersion);
    buildAgent.setOutput("branchName",                      gitversion.BranchName);
    buildAgent.setOutput("sha",                             gitversion.Sha);
    buildAgent.setOutput("shortSha",                        gitversion.ShortSha);
    buildAgent.setOutput("nuGetVersionV2",                  gitversion.NuGetVersionV2);
    buildAgent.setOutput("nuGetVersion",                    gitversion.NuGetVersion);
    buildAgent.setOutput("nuGetPreReleaseTagV2",            gitversion.NuGetPreReleaseTagV2);
    buildAgent.setOutput("nuGetPreReleaseTag",              gitversion.NuGetPreReleaseTag);
    buildAgent.setOutput("versionSourceSha",                gitversion.VersionSourceSha);
    buildAgent.setOutput("commitsSinceVersionSource",       gitversion.CommitsSinceVersionSource.toString());
    buildAgent.setOutput("commitsSinceVersionSourcePadded", gitversion.CommitsSinceVersionSourcePadded);
    buildAgent.setOutput("commitDate",                      gitversion.CommitDate);

}
