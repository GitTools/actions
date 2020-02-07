import cmp from "semver-compare";
import * as semver from "semver";
import { injectable, inject } from "inversify";

import { IBuildAgent, TYPES } from "./common";

export interface IVersionManager {
    isExplicitVersion(versionSpec: string): boolean;
    evaluateVersions(versions: string[], versionSpec: string): string;
    cleanVersion(version: string): string;
}

@injectable()
export class VersionManager implements IVersionManager {

    private buildAgent: IBuildAgent;
    constructor(
        @inject(TYPES.IBuildAgent) buildAgent: IBuildAgent,
    ) {
        this.buildAgent = buildAgent;
    }

    public isExplicitVersion(versionSpec: string): boolean {
        const c = semver.clean(versionSpec);
        this.buildAgent.debug("isExplicit: " + c);

        const valid = semver.valid(c) != null;
        this.buildAgent.debug("explicit? " + valid);

        return valid;
    }

    public evaluateVersions(versions: string[], versionSpec: string): string {
        let version: string;
        this.buildAgent.debug("evaluating " + versions.length + " versions");
        versions = versions.sort(cmp);
        for (let i = versions.length - 1; i >= 0; i--) {
        const potential: string = versions[i];
        const satisfied: boolean = semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }

        if (version) {
            this.buildAgent.debug("matched: " + version);
    } else {
        this.buildAgent.debug("match not found");
    }

        return version;
    }

    public cleanVersion(version: string): string {
        this.buildAgent.debug("cleaning: " + version);
        return semver.clean(version);
    }
}