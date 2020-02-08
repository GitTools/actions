import path = require("path");

import { TYPES, IBuildAgent, IExecResult } from "../../core/models";
import { injectable, inject } from "inversify";
import { DotnetTool, IDotnetTool } from "../../core/dotnet-tool";
import { GitReleaseManagerCreateSettings, GitReleaseManagerSettings, CreateFields, CommonFields } from "./models";
import { IVersionManager } from "../../core/versionManager";

export interface IGitReleaseManagerTool extends IDotnetTool {
    install(versionSpec: string, includePrerelease: boolean): Promise<void>;
    create(settings: GitReleaseManagerCreateSettings): Promise<IExecResult>;
}

@injectable()
export class GitReleaseManagerTool extends DotnetTool implements IGitReleaseManagerTool {

    constructor(
        @inject(TYPES.IBuildAgent) buildAgent: IBuildAgent,
        @inject(TYPES.IVersionManager) versionManager: IVersionManager
    ) {
        super(buildAgent, versionManager);
    }

    public async install(versionSpec: string, includePrerelease: boolean): Promise<void> {
        await this.toolInstall("GitReleaseManager.Tool", versionSpec, false, includePrerelease);
    }

    public create(settings: GitReleaseManagerCreateSettings): Promise<IExecResult> {
        const args = this.getCreateArguments(settings);

        return this.execute("dotnet-gitreleasemanager", args);
    }

    getCommonArguments(settings: GitReleaseManagerSettings): string[] {
        const args: string[] = [];

        args.push("--owner", settings.owner);
        args.push("--repository", settings.repository);
        args.push("--token", settings.token);

        return args;
    }

    getCreateArguments(settings: GitReleaseManagerCreateSettings): string[] {
        const args: string[] = ['create', ...this.getCommonArguments(settings)];

        if (settings.milestone) {
            args.push("--milestone", settings.milestone);
        }
        if (settings.releaseName) {
            args.push("--name", settings.releaseName);
        }
        if (settings.commit) {
            args.push("--targetcommitish", settings.commit);
        }
        if (settings.targetDirectory) {
            args.push("--targetDirectory", settings.targetDirectory);
        }
        if (settings.inputFileName) {
            if (this.buildAgent.fileExists(settings.inputFileName)) {
                args.push("--inputFilePath", settings.inputFileName);
            } else {
                throw new Error("GitReleaseManager inputFilePath not found at " + settings.inputFileName);
            }
        }
        if (settings.isPreRelease) {
            args.push("--pre");
        }

        return args;
    }
}
