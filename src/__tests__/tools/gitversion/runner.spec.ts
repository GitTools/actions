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

            const shaHash = await simpleGit().revparse(['HEAD'])

            const result = await runner.run('command')

            expect(result.code).toBe(0)
            expect(result.stdout).toBeDefined()
            expect(result.stdout).toContain(shaHash)
        })

        it.sequential('should output formatted version', async () => {
            setEnv(toolPathVariable, toolPath)

            setInputs({
                arguments: '/format {Sha}'
            })

            const shaHash = await simpleGit().revparse(['HEAD'])

            const result = await runner.run('command')

            expect(result.code).toBe(0)
            expect(result.stdout).toBeDefined()
            expect(result.stdout).toContain(shaHash)
        })

        it.sequential('git version output extractor with no {} in branch name should return valid output', () => {
            setEnv(toolPathVariable, toolPath)

            const gitVersionFixture = createGitVersionFixture({
                branchName: 'test/example/clean/branch',
                assemblySemFileVer: '0.1.4.9',
                assemblySemVer: '0.1.4.9',
                buildMetaData: 2840,
                commitDate: '2025-12-08',
                escapedBranchName: 'test-example-clean-branch',
                fullBuildMetaData: '2840.Branch.test-example-clean-branch.Sha.c87a775d03b610759891de381b93211f0dc6eac2',
                fullSemVer: '1.4.9-test-example-clean-branch.1+2840'
            })

            const result = runner['extractGitVersionOutput'](gitVersionFixture.log)

            expect(result).toBeDefined()
            expect(result).toBeTypeOf('object')
            expect(result).toEqual(gitVersionFixture.expected)
        })

        it.sequential('git version output extractor with {} in branch name should return valid output', () => {
            setEnv(toolPathVariable, toolPath)

            const gitVersionFixture = createGitVersionFixture({
                branchName: 'test/branch/{with}/brackets',
                assemblySemFileVer: '0.1.2.3',
                assemblySemVer: '0.1.2.3',
                buildMetaData: 2841,
                commitDate: '2025-10-14',
                escapedBranchName: 'test-branch--with--brackets',
                fullBuildMetaData: '2840.Branch.test-branch--with--brackets.Sha.c87a775d03b610759891de381b93211f0dc6eac2',
                fullSemVer: '1.2.3-test-branch--with--brackets.1+2840'
            })

            const result = runner['extractGitVersionOutput'](gitVersionFixture.log)

            expect(result).toBeDefined()
            expect(result).toBeTypeOf('object')
            expect(result).toEqual(gitVersionFixture.expected)
        })

        it.sequential('git version output is malformed, extractor should return null', () => {
            setEnv(toolPathVariable, toolPath)

            // Example GitVersion logs with an error
            const invalidGitVersionOutputString = `INFO [25-10-14 19:24:57:66] Working directory: /home/test/Projects/git-tool-actions/.test
INFO [25-10-14 19:24:57:67] Project root is: /home/test/Projects/git-tool-actions/
INFO [25-10-14 19:24:57:67] This is a crafted example log for testing malformed output
ERROR [25-10-14 19:24:57:67] Output is malformed!
  "AssemblySemFileVer": "0.1.0.0",
  "AssemblySemVer": "0.1.0.0",
  "BranchName": "test/branch/{with}/brackets",
  "BuildMetaData": 2840,
  "CommitDate": "2025-10-14",
  "CommitsSinceVersionSource": 2840,
  "EscapedBranchName": "test-branch--with--brackets",
  "FullBuildMetaData": "2840.Branch.test-branch--with--brackets.Sha.c87a775d03b610759891de381b93211f0dc6eac2",
  "FullSemVer": "0.1.0-test-branch--with--brackets.1+2840",
  "InformationalVersion": "0.1.0-test-branch--with--brackets.1+2840.Branch.test-branch--with--brackets.Sha.c87a775d03b610759891de381b93211f0dc6eac2",
  "Major": 0,
  "MajorMinorPatch": "0.1.0",
  "Minor": 1,
  "Patch": 0,
  "PreReleaseLabel": "test-branch--with--brackets",
  "PreReleaseLabelWithDash": "-test-branch--with--brackets",
  "PreReleaseNumber": 1,
  "PreReleaseTag": "test-branch--with--brackets.1",
  "PreReleaseTagWithDash": "-test-branch--with--brackets.1",
  "SemVer": "0.1.0-test-branch--with--brackets.1",
  "Sha": "c87a775d03b610759891de381b93211f0dc6eac2",
  "ShortSha": "c87a775",
  "UncommittedChanges": 3,
  "VersionSourceSha": "",
  "WeightedPreReleaseNumber": 1
}`

            const result = runner['extractGitVersionOutput'](invalidGitVersionOutputString)

            expect(result).toBeNull()
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

// Helper to create fixture (log + expected object)
function createGitVersionFixture(params: {
    branchName: string
    assemblySemFileVer: string
    assemblySemVer: string
    buildMetaData: number
    commitDate: string
    escapedBranchName: string
    fullBuildMetaData: string
    fullSemVer: string
    sha?: string
}): { log: string; expected: object } {
    const {
        branchName,
        assemblySemFileVer,
        assemblySemVer,
        buildMetaData,
        commitDate,
        escapedBranchName,
        fullBuildMetaData,
        fullSemVer,
        sha = 'c87a775d03b610759891de381b93211f0dc6eac2'
    } = params

    const jsonObj = {
        AssemblySemFileVer: assemblySemFileVer,
        AssemblySemVer: assemblySemVer,
        BranchName: branchName,
        BuildMetaData: buildMetaData,
        CommitDate: commitDate,
        CommitsSinceVersionSource: buildMetaData,
        VersionSourceSemVer: '1.2.3',
        VersionSourceDistance: buildMetaData,
        EscapedBranchName: escapedBranchName,
        FullBuildMetaData: fullBuildMetaData,
        FullSemVer: fullSemVer,
        InformationalVersion: `${fullSemVer}.Branch.${escapedBranchName}.Sha.${sha}`,
        Major: 1,
        MajorMinorPatch: fullSemVer.split('-')[0],
        Minor: 2,
        Patch: 3,
        PreReleaseLabel: escapedBranchName,
        PreReleaseLabelWithDash: `-${escapedBranchName}`,
        PreReleaseNumber: 1,
        PreReleaseTag: `${escapedBranchName}.1`,
        PreReleaseTagWithDash: `-${escapedBranchName}.1`,
        SemVer: fullSemVer.split('+')[0],
        Sha: sha,
        ShortSha: sha.substring(0, 7),
        UncommittedChanges: 3,
        VersionSourceSha: '',
        WeightedPreReleaseNumber: 1
    }

    const log = [
        'INFO [25-10-14 19:24:57:67] Working directory: /home/test/Projects/git-tool-actions/.test',
        'INFO [25-10-14 19:24:57:67] Project root is: /home/test/Projects/git-tool-actions/',
        'INFO [25-10-14 19:24:57:67] DotGit directory is: /home/test/Projects/git-tool-actions/.git',
        'INFO [25-10-14 19:24:57:67] Branch from build environment: ',
        'INFO [25-10-14 19:24:57:70] -< Begin: Loading version variables from disk cache file /home/test/Projects/git-tool-actions/.git/gitversion_cache/... >-',
        'INFO [25-10-14 19:24:57:81] No configuration file found, using default configuration',
        JSON.stringify(jsonObj, null, 2)
    ].join('\n')

    return { log, expected: jsonObj }
}
