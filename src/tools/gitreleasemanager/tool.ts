import path = require("path");

import { TYPES, IBuildAgent, IExecResult } from "../../core/models";
import { injectable, inject } from "inversify";
import { DotnetTool, IDotnetTool } from "../../core/dotnet-tool";
import { IVersionManager } from "../../core/versionManager";

import {
    GitReleaseManagerSettings,
    GitReleaseManagerCreateSettings,
    GitReleaseManagerDiscardSettings,
    GitReleaseManagerCloseSettings,
    GitReleaseManagerOpenSettings,
    GitReleaseManagerPublishSettings,
} from "./models";

export interface IGitReleaseManagerTool extends IDotnetTool {
    install(versionSpec: string, includePrerelease: boolean): Promise<void>;
    create(settings: GitReleaseManagerCreateSettings): Promise<IExecResult>;
    discard(settings: GitReleaseManagerDiscardSettings): Promise<IExecResult>;
    close(settings: GitReleaseManagerCloseSettings): Promise<IExecResult>;
    open(settings: GitReleaseManagerOpenSettings): Promise<IExecResult>;
    publish(settings: GitReleaseManagerPublishSettings): Promise<IExecResult>;
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

    public discard(settings: GitReleaseManagerDiscardSettings): Promise<IExecResult> {
        const args = this.getDiscardArguments(settings);

        return this.execute("dotnet-gitreleasemanager", args);
    }

    public close(settings: GitReleaseManagerCloseSettings): Promise<IExecResult> {
        const args = this.getCloseArguments(settings);

        return this.execute("dotnet-gitreleasemanager", args);
    }

    public open(settings: GitReleaseManagerOpenSettings): Promise<IExecResult> {
        const args = this.getOpenArguments(settings);

        return this.execute("dotnet-gitreleasemanager", args);
    }

    public publish(settings: GitReleaseManagerPublishSettings): Promise<IExecResult> {
        const args = this.getPublishArguments(settings);

        return this.execute("dotnet-gitreleasemanager", args);
    }

    getCommonArguments(settings: GitReleaseManagerSettings): string[] {
        const args: string[] = [];

        args.push("--owner", settings.owner);
        args.push("--repository", settings.repository);
        args.push("--token", settings.token);

        settings.targetDirectory = this.getRepoDir(settings.targetDirectory);

        args.push("--targetDirectory", settings.targetDirectory);

        return args;
    }

    getDiscardArguments(settings: GitReleaseManagerDiscardSettings): string[] {
        const args: string[] = ['discard', ...this.getCommonArguments(settings)];

        if (settings.milestone) {
            args.push("--milestone", settings.milestone);
        }

        return args;
    }

    getCloseArguments(settings: GitReleaseManagerCloseSettings): string[] {
        const args: string[] = ['close', ...this.getCommonArguments(settings)];

        if (settings.milestone) {
            args.push("--milestone", settings.milestone);
        }

        return args;
    }

    getOpenArguments(settings: GitReleaseManagerOpenSettings): string[] {
        const args: string[] = ['open', ...this.getCommonArguments(settings)];

        if (settings.milestone) {
            args.push("--milestone", settings.milestone);
        }

        return args;
    }

    getPublishArguments(settings: GitReleaseManagerPublishSettings): string[] {
        const args: string[] = ['publish', ...this.getCommonArguments(settings)];

        if (settings.tagName) {
            args.push("--tagName", settings.tagName);
        }

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
        if (settings.assets && settings.assets.length > 0) {
            settings.assets = settings.assets.map(asset => {
                return path.join(settings.targetDirectory, asset)
            })

            args.push("--assets", settings.assets.join(","));
        }

        return args;
    }

    private getRepoDir(targetPath: string): string {
        let workDir: string;
        const srcDir = this.buildAgent.getSourceDir();
        if (!targetPath) {
            workDir = srcDir;
        } else {
            if (this.buildAgent.directoryExists(targetPath)) {
                workDir = path.join(srcDir, targetPath);
            } else {
                throw new Error("Directory not found at " + targetPath);
            }
        }
        return workDir.replace(/\\/g, "/");
    }
}
