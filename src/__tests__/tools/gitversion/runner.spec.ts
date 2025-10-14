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
    const versionSpec = '6.3.x'

    const cleanBranchName = 'test/delete/me/if/found'
    const jsonBranchName = 'test/delete/me/{if}/found'
    let startBranch = 'main'

    function testOnAgent(agent: IBuildAgent): void {
        let version: string
        let toolPath: string
        let runner: Runner

        beforeAll(async () => {
            version = await getLatestVersion('GitVersion.Tool', versionSpec)
            toolPath = path.resolve(baseDir, 'tools', 'GitVersion.Tool', version)
            runner = new Runner(agent)
            startBranch = await simpleGit().revparse(['--abbrev-ref', 'HEAD'])

            console.log('Started on branch: ' + startBranch)
        })

        beforeEach(async () => {
            resetEnv(agent, toolPathVariable)
            setEnv(agent.sourceDirVariable, path.resolve(baseDir))
            setEnv(agent.tempDirVariable, path.resolve(baseDir, 'temp'))
            setEnv(agent.cacheDirVariable, path.resolve(baseDir, 'tools'))

            await simpleGit()
                .checkout(startBranch)
                .catch(error => {
                    console.log(`Failed to checkout to original branch!\nError: ${error}`)
                })
        })

        afterEach(() => {
            resetEnv(agent, toolPathVariable)
            vi.restoreAllMocks()
        })

        afterAll(async () => {
            // Clean up the base directory after all tests
            // if (fs.existsSync(baseDir)) {
            //     fs.rmSync(baseDir, { recursive: true, force: true })
            // }

            await simpleGit()
                .deleteLocalBranches([cleanBranchName, jsonBranchName])
                .catch(error => {
                    console.log(`Failed to delete test branches!\nError: ${error}`)
                })

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

        it.sequential('should execute GitVersion with a clean branch name containing no JSON brackets', async () => {
            setEnv(toolPathVariable, toolPath)

            await simpleGit().checkoutLocalBranch(cleanBranchName)

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

        it.sequential('should execute GitVersion with a branch name containing JSON brackets', async () => {
            setEnv(toolPathVariable, toolPath)

            await simpleGit().checkoutLocalBranch(jsonBranchName)

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

        it.sequential('git version output extractor should return valid', () => {
            setEnv(toolPathVariable, toolPath)

            const validGitVersionOutputString = `INFO [25-10-14 19:24:57:66] Working directory: /home/test/Projects/git-tool-actions/.test
INFO [25-10-14 19:24:57:67] Project root is: /home/test/Projects/git-tool-actions/
INFO [25-10-14 19:24:57:67] DotGit directory is: /home/test/Projects/git-tool-actions/.git
INFO [25-10-14 19:24:57:67] Branch from build environment: 
INFO [25-10-14 19:24:57:70] -< Begin: Loading version variables from disk cache file /home/test/Projects/git-tool-actions/.git/gitversion_cache/B2958F4EE88E2DD93F5FC632227013D4730ADF80 >-
INFO [25-10-14 19:24:57:81] -< End: Loading version variables from disk cache file /home/test/Projects/git-tool-actions/.git/gitversion_cache/B2958F4EE88E2DD93F5FC632227013D4730ADF80 (Took: 113.64ms) >-
INFO [25-10-14 19:24:57:81] No configuration file found, using default configuration
{
  "AssemblySemFileVer": "0.1.2.3",
  "AssemblySemVer": "0.1.2.3",
  "BranchName": "test/delete/me/{if}/found",
  "BuildMetaData": 2840,
  "CommitDate": "2025-10-14",
  "CommitsSinceVersionSource": 2840,
  "EscapedBranchName": "test-delete-me--if--found",
  "FullBuildMetaData": "2840.Branch.test-delete-me--if--found.Sha.c87a775d03b610759891de381b93211f0dc6eac2",
  "FullSemVer": "1.2.3-test-delete-me--if--found.1+2840",
  "InformationalVersion": "1.2.3-test-delete-me--if--found.1+2840.Branch.test-delete-me--if--found.Sha.c87a775d03b610759891de381b93211f0dc6eac2",
  "Major": 1,
  "MajorMinorPatch": "1.2.3",
  "Minor": 2,
  "Patch": 3,
  "PreReleaseLabel": "test-delete-me--if--found",
  "PreReleaseLabelWithDash": "-test-delete-me--if--found",
  "PreReleaseNumber": 1,
  "PreReleaseTag": "test-delete-me--if--found.1",
  "PreReleaseTagWithDash": "-test-delete-me--if--found.1",
  "SemVer": "1.2.3-test-delete-me--if--found.1",
  "Sha": "c87a775d03b610759891de381b93211f0dc6eac2",
  "ShortSha": "c87a775",
  "UncommittedChanges": 3,
  "VersionSourceSha": "",
  "WeightedPreReleaseNumber": 1
}`

            const validGitVersionOutputObject = {
                AssemblySemFileVer: '0.1.2.3',
                AssemblySemVer: '0.1.2.3',
                BranchName: 'test/delete/me/{if}/found',
                BuildMetaData: 2840,
                CommitDate: '2025-10-14',
                CommitsSinceVersionSource: 2840,
                EscapedBranchName: 'test-delete-me--if--found',
                FullBuildMetaData: '2840.Branch.test-delete-me--if--found.Sha.c87a775d03b610759891de381b93211f0dc6eac2',
                FullSemVer: '1.2.3-test-delete-me--if--found.1+2840',
                InformationalVersion: '1.2.3-test-delete-me--if--found.1+2840.Branch.test-delete-me--if--found.Sha.c87a775d03b610759891de381b93211f0dc6eac2',
                Major: 1,
                MajorMinorPatch: '1.2.3',
                Minor: 2,
                Patch: 3,
                PreReleaseLabel: 'test-delete-me--if--found',
                PreReleaseLabelWithDash: '-test-delete-me--if--found',
                PreReleaseNumber: 1,
                PreReleaseTag: 'test-delete-me--if--found.1',
                PreReleaseTagWithDash: '-test-delete-me--if--found.1',
                SemVer: '1.2.3-test-delete-me--if--found.1',
                Sha: 'c87a775d03b610759891de381b93211f0dc6eac2',
                ShortSha: 'c87a775',
                UncommittedChanges: 3,
                VersionSourceSha: '',
                WeightedPreReleaseNumber: 1
            }

            // Used [] to get private function for testing as it's a vital function that should be covered
            const result = runner['extractGitVersionOutput'](validGitVersionOutputString)

            expect(result).toBeDefined()
            expect(result).toBeTypeOf('object')
            expect(result).toEqual(validGitVersionOutputObject)
        })

        it.sequential('git version output is malformed, extractor should return null', () => {
            setEnv(toolPathVariable, toolPath)

            const invalidGitVersionOutputString = `INFO [25-10-14 19:24:57:66] Working directory: /home/test/Projects/git-tool-actions/.test
INFO [25-10-14 19:24:57:67] Project root is: /home/test/Projects/git-tool-actions/
ERROR [25-10-14 19:24:57:67] Output is malformed! 
  "AssemblySemFileVer": "0.1.0.0",
  "AssemblySemVer": "0.1.0.0",
  "BranchName": "test/delete/me/{if}/found",
  "BuildMetaData": 2840,
  "CommitDate": "2025-10-14",
  "CommitsSinceVersionSource": 2840,
  "EscapedBranchName": "test-delete-me--if--found",
  "FullBuildMetaData": "2840.Branch.test-delete-me--if--found.Sha.c87a775d03b610759891de381b93211f0dc6eac2",
  "FullSemVer": "0.1.0-test-delete-me--if--found.1+2840",
  "InformationalVersion": "0.1.0-test-delete-me--if--found.1+2840.Branch.test-delete-me--if--found.Sha.c87a775d03b610759891de381b93211f0dc6eac2",
  "Major": 0,
  "MajorMinorPatch": "0.1.0",
  "Minor": 1,
  "Patch": 0,
  "PreReleaseLabel": "test-delete-me--if--found",
  "PreReleaseLabelWithDash": "-test-delete-me--if--found",
  "PreReleaseNumber": 1,
  "PreReleaseTag": "test-delete-me--if--found.1",
  "PreReleaseTagWithDash": "-test-delete-me--if--found.1",
  "SemVer": "0.1.0-test-delete-me--if--found.1",
  "Sha": "c87a775d03b610759891de381b93211f0dc6eac2",
  "ShortSha": "c87a775",
  "UncommittedChanges": 3,
  "VersionSourceSha": "",
  "WeightedPreReleaseNumber": 1
}`

            // Used [] to get private function for testing as it's a vital function that should be covered
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
