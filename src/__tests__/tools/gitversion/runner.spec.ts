import * as path from 'node:path'
import * as fs from 'node:fs'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { IBuildAgent } from '@agents/common'
import { Runner } from '@tools/gitversion'
import { BuildAgent as AzurePipelinesAgent } from '@agents/azure'
import { BuildAgent as LocalBuildAgent } from '@agents/local'
import { BuildAgent as GitHubActionsAgent } from '@agents/github'
import { getEnv, resetEnv, setEnv, setInputs } from '../common/utils'

describe('GitVersion Runner', () => {
    const baseDir = path.resolve(__dirname, '../../../../.test')
    const version = '6.0.0'
    const toolPath = path.resolve(baseDir, 'tools', 'GitVersion.Tool', version)
    const toolPathVariable = 'GITVERSION_PATH'
    const toolName = 'dotnet-gitversion'

    function testOnAgent(agent: IBuildAgent): void {
        let runner!: Runner
        beforeEach(() => {
            runner = new Runner(agent)
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
                versionSpec: '6.x',
                includePrerelease: false,
                ignoreFailedSources: false,
                preferLatestVersion: false
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

            expect(getEnv('major')).toBeDefined()
            expect(getEnv('minor')).toBeDefined()
            expect(getEnv('patch')).toBeDefined()

            expect(result.stdout).toContain('Executing GenerateSetVersionMessage')
            expect(result.stdout).toContain('Executing GenerateBuildLogOutput')
        })

        it.sequential('should output Major variable', async () => {
            setEnv(toolPathVariable, toolPath)

            setInputs({
                arguments: '/showvariable major'
            })

            const result = await runner.run('command')

            expect(result.code).toBe(0)
            expect(result.stdout).toContain('2')
        })

        it.sequential('should output formatted version', async () => {
            setEnv(toolPathVariable, toolPath)

            setInputs({
                arguments: '/format {Major}.{Minor}'
            })

            const result = await runner.run('command')

            expect(result.code).toBe(0)
            expect(result.stdout).toContain('2.0')
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
