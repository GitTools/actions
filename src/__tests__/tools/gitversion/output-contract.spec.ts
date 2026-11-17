import { afterEach, describe, expect, it, vi } from 'vitest'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import { type IBuildAgent } from '@agents/common'
import { BuildAgent as LocalAgent } from '@agents/local'
import { BuildAgent as GithubAgent } from '@agents/github'
import { BuildAgent as AzureAgent } from '@agents/azure'
import { GitVersionTool, type GitVersionOutput } from '@tools/gitversion'

afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
})

describe('GitVersion 7 output contract', () => {
    it.each([
        { Name: 'full label', output: { PreReleaseLabel: 'beta.99' }, camel: 'preReleaseLabel', prefixed: 'GitVersion_PreReleaseLabel', value: 'beta.99' },
        {
            Name: 'full label with dash',
            output: { PreReleaseLabelWithDash: '-beta.99' },
            camel: 'preReleaseLabelWithDash',
            prefixed: 'GitVersion_PreReleaseLabelWithDash',
            value: '-beta.99'
        },
        {
            Name: 'label name',
            output: { PreReleaseLabelName: 'beta' },
            camel: 'preReleaseLabelName',
            prefixed: 'GitVersion_PreReleaseLabelName',
            value: 'beta'
        },
        {
            Name: 'label name with dash',
            output: { PreReleaseLabelNameWithDash: '-beta' },
            camel: 'preReleaseLabelNameWithDash',
            prefixed: 'GitVersion_PreReleaseLabelNameWithDash',
            value: '-beta'
        },
        {
            Name: 'numeric zero',
            output: { CommitCountSourceDistance: 0 },
            camel: 'commitCountSourceDistance',
            prefixed: 'GitVersion_CommitCountSourceDistance',
            value: '0'
        },
        { Name: 'nullable source', output: { SemVerSourceSha: null }, camel: 'semVerSourceSha', prefixed: 'GitVersion_SemVerSourceSha', value: '' },
        {
            Name: 'custom version',
            output: { CustomVersion: '1.2.3-custom' },
            camel: 'customVersion',
            prefixed: 'GitVersion_CustomVersion',
            value: '1.2.3-custom'
        },
        {
            Name: 'semantic baseline',
            output: { SemVerSourceSemVer: '1.2.3' },
            camel: 'semVerSourceSemVer',
            prefixed: 'GitVersion_SemVerSourceSemVer',
            value: '1.2.3'
        },
        {
            Name: 'semantic increment',
            output: { SemVerSourceIncrement: 'Minor' },
            camel: 'semVerSourceIncrement',
            prefixed: 'GitVersion_SemVerSourceIncrement',
            value: 'Minor'
        },
        {
            Name: 'count anchor',
            output: { CommitCountSourceSha: 'abc123' },
            camel: 'commitCountSourceSha',
            prefixed: 'GitVersion_CommitCountSourceSha',
            value: 'abc123'
        }
    ])('forwards v7 values under both naming conventions: $Name', ({ output, camel, prefixed, value }) => {
        const setOutput = vi.fn()
        const setVariable = vi.fn()
        const error = vi.fn()
        const tool = new GitVersionTool({ setOutput, setVariable, error } as unknown as IBuildAgent)
        tool.writeGitVersionToAgent(output as Partial<GitVersionOutput> as GitVersionOutput)
        expect(setOutput.mock.calls).toEqual([
            [camel, value],
            [prefixed, value]
        ])
        expect(setVariable.mock.calls).toEqual([
            [camel, value],
            [prefixed, value]
        ])
        expect(error).not.toHaveBeenCalled()
    })

    it('writes v7 labels, null sources and zero counts to GitHub environment and output files', async () => {
        const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-outputs-'))
        const outputFile = path.join(root, 'output')
        const envFile = path.join(root, 'env')
        await fs.writeFile(outputFile, '')
        await fs.writeFile(envFile, '')
        vi.stubEnv('GITHUB_OUTPUT', outputFile)
        vi.stubEnv('GITHUB_ENV', envFile)
        for (const name of [
            'preReleaseLabel',
            'GitVersion_PreReleaseLabel',
            'semVerSourceSha',
            'GitVersion_SemVerSourceSha',
            'commitCountSourceDistance',
            'GitVersion_CommitCountSourceDistance'
        ])
            vi.stubEnv(name, '')
        try {
            new GitVersionTool(new GithubAgent()).writeGitVersionToAgent({
                PreReleaseLabel: 'beta.99',
                SemVerSourceSha: null,
                CommitCountSourceDistance: 0
            } as GitVersionOutput)
            for (const file of [outputFile, envFile]) {
                const content = await fs.readFile(file, 'utf8')
                expect(content).toMatch(/GitVersion_PreReleaseLabel<<[^\r\n]+\r?\nbeta\.99\r?\n/)
                expect(content).toMatch(/semVerSourceSha<<[^\r\n]+\r?\n\r?\n/)
                expect(content).toMatch(/commitCountSourceDistance<<[^\r\n]+\r?\n0\r?\n/)
                expect(content).not.toContain('preReleaseTag')
            }
        } finally {
            await fs.rm(root, { recursive: true, force: true })
        }
    })

    it('exports empty nullable values in the local agent instead of the string undefined', () => {
        vi.stubEnv('semVerSourceSha', 'previous')
        vi.stubEnv('GitVersion_SemVerSourceSha', 'previous')
        new GitVersionTool(new LocalAgent()).writeGitVersionToAgent({ SemVerSourceSha: null } as GitVersionOutput)
        expect(process.env.semVerSourceSha).toBe('')
        expect(process.env.GitVersion_SemVerSourceSha).toBe('')
    })

    it('emits Azure output commands and expands build numbers using the v7 label name', () => {
        vi.stubEnv('INPUT_BUILDNUMBERFORMAT', 'v${GitVersion_PreReleaseLabelName}')
        vi.stubEnv('PRERELEASELABELNAME', '')
        vi.stubEnv('GITVERSION_PRERELEASELABELNAME', '')
        const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true)
        const tool = new GitVersionTool(new AzureAgent())
        tool.writeGitVersionToAgent({ PreReleaseLabelName: 'beta' } as GitVersionOutput)
        tool.updateBuildNumber()
        const commands = write.mock.calls.map(([chunk]) => String(chunk)).join('')
        expect(commands).toContain('##vso[task.setvariable variable=preReleaseLabelName;isOutput=true;issecret=false;]beta')
        expect(commands).toContain('##vso[task.setvariable variable=GitVersion_PreReleaseLabelName;isOutput=true;issecret=false;]beta')
        expect(commands).toContain('##vso[build.updatebuildnumber]vbeta')
    })
})
