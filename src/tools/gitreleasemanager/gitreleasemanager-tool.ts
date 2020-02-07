import { TYPES, IBuildAgent } from "../../core/common";
import { injectable, inject } from "inversify";
import { IDotnetTool } from "../../core/dotnet-tool";

export interface IGitReleaseManagerTool {
    install(versionSpec: string, includePrerelease: boolean): Promise<void>;
}

@injectable()
export class GitReleaseManagerTool implements IGitReleaseManagerTool {

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
}
