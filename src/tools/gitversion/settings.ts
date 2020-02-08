import { IBuildAgent } from "../../core/models";

import { GitVersionSettings, ExecuteFields } from "./models";

export class Settings {

    public static getGitVersionSettings(buildAgent: IBuildAgent): GitVersionSettings {
        const targetPath = buildAgent.getInput(ExecuteFields.targetPath);

        const useConfigFile = buildAgent.getBooleanInput(ExecuteFields.useConfigFile);
        const configFilePath = buildAgent.getInput(ExecuteFields.configFilePath);

        const updateAssemblyInfo = buildAgent.getBooleanInput(ExecuteFields.updateAssemblyInfo);
        const updateAssemblyInfoFilename = buildAgent.getInput(ExecuteFields.updateAssemblyInfoFilename);

        const additionalArguments = buildAgent.getInput(ExecuteFields.additionalArguments);

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
}