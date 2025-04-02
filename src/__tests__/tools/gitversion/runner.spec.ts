import * as path from 'node:path'
import * as fs from 'node:fs'

import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { simpleGit } from 'simple-git'

import { type IBuildAgent } from '@agents/common'
import { Runner } from '@tools/gitversion'
import { BuildAgent as AzurePipelinesAgent } from '@agents/azure'
import { BuildAgent as LocalBuildAgent } from '@agents/local'
import { BuildAgent as GitHubActionsAgent } from '@agents/github'
import { getEnv, getLatestVersion, resetEnv, setEnv, setInputs } from '../common/utils'

describe('GitVersion Runner', () => {
    const baseDir = path.resolve(__dirname, '../../../../.test')

    const toolPathVariable = 'GITVERSION_PATH'
    const toolName = 'dotnet-gitversion'
    const versionSpec = '6.0.x'

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

            expect(getEnv('GitVersion_Major')).toBeDefined()
            expect(getEnv('GitVersion_Minor')).toBeDefined()
            expect(getEnv('GitVersion_Patch')).toBeDefined()
            expect(getEnv('GitVersion.Major')).toBeDefined()
            expect(getEnv('GitVersion.Minor')).toBeDefined()
            expect(getEnv('GitVersion.Patch')).toBeDefined()

            expect(getEnv('major')).toBeDefined()
            expect(getEnv('minor')).toBeDefined()
            expect(getEnv('patch')).toBeDefined()
        })

        it.sequential('should output Sha variable', async () => {
            setEnv(toolPathVariable, toolPath)

            setInputs({
                arguments: '/showvariable Sha'
            })

            const sha = await simpleGit().revparse(['HEAD'])
            const result = await runner.run('command')

            expect(result.code).toBe(0)
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
            expect(result.stdout).toContain(sha)
        })
    }

    describe('Local Agent', () => {
        testOnAgent(new LocalBuildAgent())
    })

    describe('GitHub Actions Agent', () => {
        testOnAgent(new GitHubActionsAgent())
    })

    describe('Azure Pipelines Agent', () => {
        testOnAgent(new AzurePipelinesAgent())
    })
})
