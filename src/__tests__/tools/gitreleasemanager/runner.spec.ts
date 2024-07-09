import * as process from 'node:process'
import * as path from 'node:path'
import * as fs from 'node:fs'

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { IBuildAgent } from '@agents/common'
import { Runner } from '@tools/gitreleasemanager'
import { BuildAgent as AzurePipelinesAgent } from '@agents/azure'
import { BuildAgent as LocalBuildAgent } from '@agents/local'
import { BuildAgent as GitHubActionsAgent } from '@agents/github'
import { keysFn, type SetupSettings } from '@tools/common'

describe('GitReleaseManager Runner', () => {
    const baseDir = path.resolve(__dirname, '../../../../.test')
    const envName = process.platform === 'win32' ? 'Path' : 'PATH'
    const version = '0.17.0'
    const toolPath = path.resolve(baseDir, 'tools', 'GitReleaseManager.Tool', version)
    const toolPathVariable = 'GITRELEASEMANAGER_PATH'
    const toolName = 'dotnet-gitreleasemanager'

    function setEnv(key: string, value: string): void {
        process.env[key.toUpperCase()] = value
    }

    function getEnv(key: string): string {
        return process.env[key] || ''
    }

    function setInputs(inputs: Partial<SetupSettings>): void {
        const keys = keysFn<Partial<SetupSettings>>(inputs)
        for (const property of keys) {
            setEnv(`INPUT_${property}`, inputs[property]?.toString() || '')
        }
    }

    function testOnAgent(agent: IBuildAgent): void {
        function resetEnv(): void {
            process.env.PATH = process.env[envName] // workaround for windows
            setEnv(toolPathVariable, '')
            setEnv(agent.sourceDirVariable, '')
            setEnv(agent.tempDirVariable, '')
            setEnv(agent.cacheDirVariable, '')

            setInputs({})
        }

        let runner!: Runner
        beforeEach(() => {
            runner = new Runner(agent)
            resetEnv()
            setEnv(agent.sourceDirVariable, path.resolve(baseDir))
            setEnv(agent.tempDirVariable, path.resolve(baseDir, 'temp'))
            setEnv(agent.cacheDirVariable, path.resolve(baseDir, 'tools'))
        })

        afterEach(() => {
            resetEnv()
        })

        it.sequential('should run setup GitReleaseManager', async () => {
            setInputs({
                versionSpec: '0.17.x',
                includePrerelease: false,
                ignoreFailedSources: false,
                preferLatestVersion: false
            })

            const exitCode = await runner.run('setup')

            expect(exitCode).toBe(0)
            expect(fs.existsSync(path.resolve(baseDir))).toBe(true)
            expect(fs.existsSync(path.resolve(baseDir, 'tools'))).toBe(true)
            expect(fs.existsSync(toolPath)).toBe(true)

            expect(getEnv(toolPathVariable)).toBe(toolPath)

            const foundToolPath = await agent.which(toolName, true)
            expect(foundToolPath).contain(toolPath)
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
