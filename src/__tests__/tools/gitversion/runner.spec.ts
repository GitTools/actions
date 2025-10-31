import * as path from 'node:path'
import * as fs from 'node:fs'

import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { simpleGit } from 'simple-git'

import { type IBuildAgent } from '@agents/common'
import { Runner } from '@tools/gitversion'
import { BuildAgent as AzurePipelinesAgent } from '@agents/azure'
import { BuildAgent as LocalBuildAgent } from '@agents/local'
import { BuildAgent as GitHubActionsAgent } from '@agents/github'
import { getEnv, getLatestVersion, isAzurePipelinesAgent, isGitHubActionsAgent, resetEnv, setEnv, setInputs } from '../common/utils'

describe('GitVersion Runner', () => {
    const baseDir = path.resolve(__dirname, '../../../../.test')

    const toolPathVariable = 'GITVERSION_PATH'
    const toolName = 'dotnet-gitversion'
    const versionSpec = '6.4.x'

    function testOnAgent(agent: IBuildAgent): void {
        let version: string
        let toolPath: string
        let runner: Runner

        beforeAll(async () => {
            version = await getLatestVersion('GitVersion.Tool', versionSpec)
            toolPath = path.resolve(baseDir, 'tools', 'GitVersion.Tool', version)
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
            vi.restoreAllMocks()
        })

        afterAll(() => {
            // Clean up the base directory after all tests
            // if (fs.existsSync(baseDir)) {
            //     fs.rmSync(baseDir, { recursive: true, force: true })
            // }

            resetEnv(agent, '')
        })

        it.sequential('should run setup GitVersion', async () => {
            setInputs({
                versionSpec: versionSpec,
                includePrerelease: false,
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

        it.sequential('should execute GitVersion', async () => {
            setEnv(toolPathVariable, toolPath)

            const result = await runner.run('execute')

            expect(result.code).toBe(0)
            expect(result.error).toBeDefined()
            expect(result.stdout).toBeDefined()
            expect(result.stderr).toBeDefined()

            expect(getEnv('GitVersion_Major')).toBeDefined()
            expect(getEnv('GitVersion_Minor')).toBeDefined()
            expect(getEnv('GitVersion_Patch')).toBeDefined()

            expect(getEnv('major')).toBeDefined()
            expect(getEnv('minor')).toBeDefined()
            expect(getEnv('patch')).toBeDefined()
        })

        it.sequential('should execute GitVersion with build number update', async () => {
            setEnv(toolPathVariable, toolPath)
            setInputs({
                buildNumberFormat: 'v${GitVersion_SemVer}'
            })

            // Spy on the agent's updateBuildNumber method
            const updateBuildNumberSpy = vi.spyOn(agent, 'updateBuildNumber')

            // Mock getExpandedString to return a predictable value
            const getExpandedStringSpy = vi.spyOn(agent, 'getExpandedString')
            getExpandedStringSpy.mockImplementation(format => {
                return format.replace('${GitVersion_SemVer}', '1.2.3')
            })

            const result = await runner.run('execute')

            expect(result.code).toBe(0)
            expect(result.stdout).toBeDefined()

            // Verify updateBuildNumber was called with the expected expanded format
            expect(updateBuildNumberSpy).toHaveBeenCalled()
            expect(updateBuildNumberSpy).toHaveBeenCalledWith('v1.2.3')
        })

        it.sequential('should output Sha variable', async () => {
            setEnv(toolPathVariable, toolPath)

            setInputs({
                arguments: '/showvariable Sha'
            })

            const sha = await simpleGit().revparse(['HEAD'])
            const result = await runner.run('command')

            expect(result.code).toBe(0)
            expect(result.stdout).toBeDefined()
            expect(result.stdout).toContain(sha)
        })

        it.sequential('should output formatted version', async () => {
            setEnv(toolPathVariable, toolPath)

            setInputs({
                arguments: '/format {Sha}'
            })

            const sha = await simpleGit().revparse(['HEAD'])
            const result = await runner.run('command')

            expect(result.code).toBe(0)
            expect(result.stdout).toBeDefined()
            expect(result.stdout).toContain(sha)
        })
    }

    describe('Local Agent', () => {
        testOnAgent(new LocalBuildAgent())
    })

    describe.skipIf(isGitHubActionsAgent()).sequential('GitHub Actions Agent', () => {
        testOnAgent(new GitHubActionsAgent())
    })

    describe.skipIf(isAzurePipelinesAgent()).sequential('Azure Pipelines Agent', () => {
        testOnAgent(new AzurePipelinesAgent())
    })
})
