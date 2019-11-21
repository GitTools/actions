import * as core from '@actions/core';
import { ToolInstaller } from '../ToolInstaller';
import { Proxy as utils }  from './Proxy';
try {
    let toolInstaller = new ToolInstaller(utils);
    toolInstaller.downloadAndInstall('GitVersion.Tool', '5.1.2', false, false);

    let nocache = (core.getInput('nocache') || 'false').toLowerCase() == 'true';
    let nofetch = (core.getInput('nofetch') || 'false').toLowerCase() == 'true';

    if (nocache) {
        console.log("Using /nocache");
    }

    if (nofetch) {
        console.log("Using /nofetch");
    }

    // Calculate the json payload from GitVersion
    // let json = XYZ();

    // core.setOutput("Major", json.Major);
    // core.setOutput("Minor", json.Minor);
    // core.setOutput("Patch", json.Patch);
    // core.setOutput("PreReleaseTag", json.PreReleaseTag);
    // core.setOutput("PreReleaseTagWithDash", json.PreReleaseTagWithDash);
    // core.setOutput("PreReleaseLabel", json.PreReleaseLabel);
    // core.setOutput("PreReleaseNumber", json.PreReleaseNumber);
    // core.setOutput("WeightedPreReleaseNumber", json.WeightedPreReleaseNumber);
    // core.setOutput("BuildMetaData", json.BuildMetaData);
    // core.setOutput("BuildMetaDataPadded", json.BuildMetaDataPadded);
    // core.setOutput("FullBuildMetaData", json.FullBuildMetaData);
    // core.setOutput("MajorMinorPatch", json.MajorMinorPatch);
    // core.setOutput("SemVer", json.SemVer);
    // core.setOutput("LegacySemVer", json.LegacySemVer);
    // core.setOutput("LegacySemVerPadded", json.LegacySemVerPadded);
    // core.setOutput("AssemblySemVer", json.AssemblySemVer);
    // core.setOutput("AssemblySemFileVer", json.AssemblySemFileVer);
    // core.setOutput("FullSemVer", json.FullSemVer);
    // core.setOutput("InformationalVersion", json.InformationalVersion);
    // core.setOutput("BranchName", json.BranchName);
    // core.setOutput("Sha", json.Sha);
    // core.setOutput("ShortSha", json.ShortSha);
    // core.setOutput("NuGetVersionV2", json.NuGetVersionV2);
    // core.setOutput("NuGetVersion", json.NuGetVersion);
    // core.setOutput("NuGetPreReleaseTagV2", json.NuGetPreReleaseTagV2);
    // core.setOutput("NuGetPreReleaseTag", json.NuGetPreReleaseTag);
    // core.setOutput("VersionSourceSha", json.VersionSourceSha);
    // core.setOutput("CommitsSinceVersionSource", json.CommitsSinceVersionSource);
    // core.setOutput("CommitsSinceVersionSourcePadded", json.CommitsSinceVersionSourcePadded);
    // core.setOutput("CommitDate", json.CommitDate);

    // Get the JSON webhook payload for the event that triggered the workflow
} catch (error) {
    core.setFailed(error.message);
}