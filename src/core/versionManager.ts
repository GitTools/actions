import * as semver from 'semver'
import { injectable, inject } from 'inversify'

import { IBuildAgent, TYPES } from './models'

export interface IVersionManager {
    isExplicitVersion(versionSpec: string): boolean
    evaluateVersions(versions: string[], versionSpec: string, optionsOrLoose?: boolean | semver.RangeOptions): string
    cleanVersion(version: string): string
    satisfies(version: string, versionSpec: string, optionsOrLoose?: boolean | semver.RangeOptions): boolean
}

@injectable()
export class VersionManager implements IVersionManager {
    private buildAgent: IBuildAgent
    constructor(@inject(TYPES.IBuildAgent) buildAgent: IBuildAgent) {
        this.buildAgent = buildAgent
    }

    public isExplicitVersion(versionSpec: string): boolean {
        const cleanedVersionSpec = semver.clean(versionSpec)
        const valid = semver.valid(cleanedVersionSpec) != null
        this.buildAgent.debug(`Is version explicit? ${valid}`)

        return valid
    }

    public evaluateVersions(versions: string[], versionSpec: string, optionsOrLoose?: boolean | semver.RangeOptions): string {
        const version = semver.maxSatisfying(versions, versionSpec, optionsOrLoose)
        if (version) {
            this.buildAgent.info(`Found matching version: ${version}`)
        } else {
            this.buildAgent.info('match not found')
        }

        return version
    }

    public cleanVersion(version: string): string {
        return semver.clean(version)
    }

    public satisfies(version: string, versionSpec: string, optionsOrLoose?: boolean | semver.RangeOptions): boolean {
        return semver.satisfies(version, versionSpec, optionsOrLoose)
    }
}
