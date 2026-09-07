import * as path from 'node:path'

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { type IBuildAgent } from '@agents/common'
import { Runner } from '@tools/gitreleasemanager'
import { BuildAgent as AzurePipelinesAgent } from '@agents/azure'
import { BuildAgent as LocalBuildAgent } from '@agents/local'
import { BuildAgent as GitHubActionsAgent } from '@agents/github'
import { expectToolSetup, getLatestVersion, isAzurePipelinesAgent, isGitHubActionsAgent, resetEnv, setEnv, setInputs } from '../common/utils'

describe('GitReleaseManager Runner', () => {
    const baseDir = path.resolve(__dirname, '../../../../.test')

    const toolPathVariable = 'GITRELEASEMANAGER_PATH'
    const toolName = 'dotnet-gitreleasemanager'
    const versionSpec = '0.20.x'

    function testOnAgent(agent: IBuildAgent): void {
        let version: string
        let toolPath: string
        let runner: Runner

        beforeAll(async () => {
            version = await getLatestVersion('GitReleaseManager.Tool', versionSpec)
            toolPath = path.resolve(baseDir, 'tools', 'GitReleaseManager.Tool', version)
            runner = new Runner(agent)
        })

        beforeEach(() => {
            resetEnv(agent, toolPathVariable)
            setEnv(agent.sourceDirVariable, path.resolve(baseDir))
            setEnv(agent.tempDirVariable, path.resolve(baseDir, 'temp'))
            setEnv(agent.cacheDirVariable, path.resolve(baseDir, 'tools'))
        })

        afterEach(() => {
            resetEnv(agent, toolPathVariable)
        })

        afterAll(() => {
            resetEnv(agent, '')
        })

        it('should run setup GitReleaseManager', { concurrent: false }, async () => {
            setInputs({
                versionSpec: versionSpec,
                includePrerelease: false,
                ignoreFailedSources: false,
                preferLatestVersion: true
            })

            const result = await runner.run('setup')

            expect(result.code).toBe(0)
            await expectToolSetup(result, agent, { baseDir, toolPath, toolPathVariable, toolName })
        })
    }

    describe('Local Agent', { concurrent: false }, () => {
        testOnAgent(new LocalBuildAgent())
    })

    describe.skipIf(isGitHubActionsAgent())('GitHub Actions Agent', { concurrent: false }, () => {
        testOnAgent(new GitHubActionsAgent())
    })

    describe.skipIf(isAzurePipelinesAgent())('Azure Pipelines Agent', { concurrent: false }, () => {
        testOnAgent(new AzurePipelinesAgent())
    })
})
