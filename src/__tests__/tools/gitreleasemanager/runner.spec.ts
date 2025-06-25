import * as path from 'node:path'
import * as fs from 'node:fs'

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { type IBuildAgent } from '@agents/common'
import { Runner } from '@tools/gitreleasemanager'
import { BuildAgent as AzurePipelinesAgent } from '@agents/azure'
import { BuildAgent as LocalBuildAgent } from '@agents/local'
import { BuildAgent as GitHubActionsAgent } from '@agents/github'
import { getEnv, getLatestVersion, isAzurePipelinesAgent, isGitHubActionsAgent, resetEnv, setEnv, setInputs } from '../common/utils'

describe('GitReleaseManager Runner', () => {
    const baseDir = path.resolve(__dirname, '../../../../.test')

    const toolPathVariable = 'GITRELEASEMANAGER_PATH'
    const toolName = 'dotnet-gitreleasemanager'
    const versionSpec = '0.20.x'
    const packageSource = 'https://azuresearch-usnc.nuget.org'

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
            // Clean up the base directory after all tests
            // if (fs.existsSync(baseDir)) {
            //     fs.rmSync(baseDir, { recursive: true, force: true })
            // }

            resetEnv(agent, '')
        })

        it.sequential('should run setup GitReleaseManager', async () => {
            setInputs({
                versionSpec: versionSpec,
                includePrerelease: false,
                packageSource,
                ignoreFailedSources: false,
                preferLatestVersion: true
            })

            const result = await runner.run('setup')

            expect(result.code).toBe(0)
            expect(result.error).toBeUndefined()
            expect(result.stdout).toBeUndefined()
            expect(result.stderr).toBeUndefined()

            expect(fs.existsSync(path.resolve(baseDir))).toBe(true)
            expect(fs.existsSync(path.resolve(baseDir, 'tools'))).toBe(true)
            expect(fs.existsSync(toolPath)).toBe(true)

            expect(getEnv(toolPathVariable)).toBe(toolPath)

            const foundToolPath = await agent.which(toolName, true)
            expect(foundToolPath).contain(toolPath)
        })
    }

    describe.sequential('Local Agent', () => {
        testOnAgent(new LocalBuildAgent())
    })

    describe.skipIf(isGitHubActionsAgent()).sequential('GitHub Actions Agent', () => {
        testOnAgent(new GitHubActionsAgent())
    })

    describe.skipIf(isAzurePipelinesAgent()).sequential('Azure Pipelines Agent', () => {
        testOnAgent(new AzurePipelinesAgent())
    })
})
