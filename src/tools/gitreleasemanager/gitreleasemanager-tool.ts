import path = require("path");

import { TYPES, IBuildAgent, IExecResult } from "../../core/common";
import { injectable, inject } from "inversify";
import { IDotnetTool } from "../../core/dotnet-tool";
import { GitReleaseManagerCreateSettings, GitReleaseManagerSettings, CreateFields, CommonFields } from "./models";

export interface IGitReleaseManagerTool {
    install(versionSpec: string, includePrerelease: boolean): Promise<void>;
    create(settings: GitReleaseManagerCreateSettings): Promise<IExecResult>;
}

@injectable()
export class GitReleaseManagerTool implements IGitReleaseManagerTool {

    private buildAgent: IBuildAgent;
    private dotnetTool: IDotnetTool;

    constructor(
        @inject(TYPES.IBuildAgent) buildAgent: IBuildAgent,
        @inject(TYPES.IDotnetTool) dotnetTool: IDotnetTool,
    ) {
        this.dotnetTool = dotnetTool;
    }

    public async install(versionSpec: string, includePrerelease: boolean): Promise<void> {
        await this.dotnetTool.toolInstall("GitReleaseManager.Tool", versionSpec, false, includePrerelease);
    }

    public create(settings: GitReleaseManagerCreateSettings): Promise<IExecResult> {
        const args = this.getCreateArguments(settings);

        console.log(args);

        return Promise.resolve(null);

        // return this.buildAgent.exec("dotnet-gitreleasemanager", args);
    }

    getCommonArguments(settings: GitReleaseManagerSettings): string[] {
        const args: string[] = [];

        args.push("--owner", settings.owner);
        args.push("--repository", settings.repository);
        args.push("--token", settings.token);

        return args;
    }

    getCreateArguments(settings: GitReleaseManagerCreateSettings): string[] {
        const args: string[] = [...this.getCommonArguments(settings)];

        args.push("--milestone", settings.milestone);
        args.push("--name", settings.releaseName);
        args.push("--targetcommitish", settings.commit);
        args.push("--targetDirectory", settings.targetDirectory);

        if (this.buildAgent.fileExists(settings.inputFileName)) {
            args.push("--inputFilePath", settings.inputFileName);
        } else {
            throw new Error("GitReleaseManager inputFilePath not found at " + settings.inputFileName);
        }
        if (settings.isPreRelease) {
            args.push("--pre");
        }

        return args;
    }
}
