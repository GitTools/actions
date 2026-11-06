import { beforeAll, beforeEach, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import { pathToFileURL } from 'node:url'
import { simpleGit } from 'simple-git'
import { BuildAgent } from '@agents/local'
import { Runner } from '@tools/gitversion'
import baseline from '../../../../scripts/gitversion-test.json'

describe('installed GitVersion 7 compatibility', () => {
    let root: string
    let repo: string
    let runner: Runner
    let cachedSetupCode: number
    let installArguments: string[]
    let cacheInstallCalls: number
    let installedPath: string
    const inputNames = [
        'targetPath',
        'disableCache',
        'disableNormalization',
        'disableShallowCloneCheck',
        'configFilePath',
        'overrideConfig',
        'updateAssemblyInfo',
        'updateAssemblyInfoFilename',
        'updateProjectFiles',
        'updateWixVersionFile',
        'buildNumberFormat',
        'verbosity',
        'arguments'
    ]

    beforeAll(async () => {
        root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools v7 '))
        const agent = new BuildAgent()
        vi.spyOn(agent, 'tempDir', 'get').mockReturnValue(path.join(root, 'temp'))
        vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(path.join(root, 'cache'))
        const version = process.env.GITVERSION_TEST_VERSION || baseline.publishedVersion || baseline.version
        vi.stubEnv('INPUT_VERSIONSPEC', version)
        vi.stubEnv('INPUT_INCLUDEPRERELEASE', 'true')
        vi.stubEnv('INPUT_NUGETCONFIGPATH', path.resolve('.test/gitversion.nuget.config'))
        vi.stubEnv('INPUT_PREFERLATESTVERSION', 'true')
        vi.stubEnv('GITVERSION_PATH', '')
        runner = new Runner(agent)
        const exec = vi.spyOn(agent, 'exec')
        const result = await runner.run('setup')
        if (result.code !== 0) throw new Error(`Setup failed: ${result.error?.message || result.stderr}`)
        installedPath = process.env.GITVERSION_PATH || ''
        // A second setup must reuse the relocated cache, without invoking dotnet install again.
        installArguments = exec.mock.calls.find(([command]) => command === 'dotnet')?.[1] || []
        exec.mockClear()
        vi.stubEnv('INPUT_PREFERLATESTVERSION', 'false')
        cachedSetupCode = (await runner.run('setup')).code
        cacheInstallCalls = exec.mock.calls.length
        exec.mockRestore()
    })

    beforeEach(async () => {
        for (const name of inputNames) vi.stubEnv(`INPUT_${name.toUpperCase()}`, '')
        for (const name of [
            'GIT_BRANCH',
            'Git_Branch',
            'GITVERSION_CONFIGURATION_VERSION',
            'GITVERSION_ARGUMENT_PARSER_VERSION',
            'GITVERSION_USE_V6_ARGUMENT_PARSER',
            'GITVERSION_GIT_BACKEND'
        ])
            vi.stubEnv(name, '')
        // The retired parser selector errors on presence, even empty.
        vi.stubEnv('GITVERSION_USE_V6_ARGUMENT_PARSER', undefined)
        vi.stubEnv('GITVERSION_PATH', installedPath)
        vi.stubEnv('INPUT_DISABLENORMALIZATION', 'true')
        repo = await fs.mkdtemp(path.join(root, 'repository with spaces '))
        const git = simpleGit(repo)
        await git.init(['--initial-branch=main'])
        await git.addConfig('user.name', 'Compatibility test')
        await git.addConfig('user.email', 'compatibility@example.invalid')
        await git.commit('baseline', undefined, { '--allow-empty': null })
        await git.addTag('1.2.3')
        await git.checkoutLocalBranch('feature/candidate')
        await git.commit('feature change', undefined, { '--allow-empty': null })
        vi.stubEnv('INPUT_TARGETPATH', repo)
    })

    afterEach(async () => {
        await fs.rm(repo, { recursive: true, force: true })
    })

    afterAll(async () => {
        vi.restoreAllMocks()
        vi.unstubAllEnvs()
        await fs.rm(root, { recursive: true, force: true })
    })

    it('installs, relocates and reuses the tool cache before exporting nested custom output', async () => {
        expect(cachedSetupCode).toBe(0)
        expect(cacheInstallCalls).toBe(0)
        expect(installArguments.slice(installArguments.indexOf('--framework'), installArguments.indexOf('--framework') + 2)).toEqual(['--framework', 'net10.0'])
        vi.stubEnv('INPUT_OVERRIDECONFIG', 'output.custom-version-format=release-{SemVer}')
        const result = await runner.run('execute')
        expect(result.code).toBe(0)
        expect(process.env.GitVersion_PreReleaseLabel).toBe('candidate.1')
        expect(process.env.GitVersion_PreReleaseLabelName).toBe('candidate')
        expect(process.env.GitVersion_CustomVersion).toBe('release-1.2.4-candidate.1')
        expect(process.env.GitVersion_CommitCountSourceDistance).toBe('1')
        expect(process.env.GITVERSION_TELEMETRY_OPTOUT).toBe('true')
    })

    it('calculates the tagged commit in detached HEAD without selecting the feature tip', async () => {
        await simpleGit(repo).checkout('1.2.3')
        const sha = await simpleGit(repo).revparse(['HEAD'])
        expect((await runner.run('execute')).code).toBe(0)
        expect(process.env.GitVersion_FullSemVer).toBe('1.2.3')
        expect(process.env.GitVersion_Sha).toBe(sha)
    })

    it('uses branch environment context at the checked-out commit without moving refs', async () => {
        const git = simpleGit(repo)
        const sha = await git.revparse(['HEAD'])
        vi.stubEnv('GIT_BRANCH', 'feature/context')
        expect((await runner.run('execute')).code).toBe(0)
        expect(process.env.GitVersion_BranchName).toBe('feature/context')
        expect(process.env.GitVersion_Sha).toBe(sha)
        expect((await git.branchLocal()).current).toBe('feature/candidate')
        expect((await git.branchLocal()).all).not.toContain('feature/context')
    })

    it('updates assembly, project and WiX files whose directory and filename contain spaces', async () => {
        const assembly = path.join(repo, 'Assembly Info.cs')
        const project = path.join(repo, 'Sample Project.csproj')
        await fs.writeFile(assembly, '[assembly: System.Reflection.AssemblyVersion("0.0.0.0")]\n[assembly: System.Reflection.AssemblyFileVersion("0.0.0.0")]\n')
        await fs.writeFile(
            project,
            '<Project Sdk="Microsoft.NET.Sdk"><PropertyGroup><TargetFramework>net10.0</TargetFramework><Version>0.0.0</Version></PropertyGroup></Project>'
        )
        vi.stubEnv('INPUT_UPDATEASSEMBLYINFO', 'true')
        vi.stubEnv('INPUT_UPDATEASSEMBLYINFOFILENAME', 'Assembly Info.cs')
        vi.stubEnv('INPUT_UPDATEWIXVERSIONFILE', 'true')
        expect((await runner.run('execute')).code).toBe(0)
        expect(await fs.readFile(assembly, 'utf8')).toContain('1.2.4.0')
        vi.stubEnv('INPUT_UPDATEASSEMBLYINFO', 'false')
        vi.stubEnv('INPUT_UPDATEASSEMBLYINFOFILENAME', '')
        vi.stubEnv('INPUT_UPDATEPROJECTFILES', 'true')
        expect((await runner.run('execute')).code).toBe(0)
        expect(await fs.readFile(project, 'utf8')).toContain('<Version>1.2.4-candidate.1</Version>')
        expect(await fs.readFile(path.join(repo, 'GitVersion_WixVersion.wxi'), 'utf8')).toContain('PreReleaseLabelName="candidate"')
    })

    it('migrates and validates a flat configuration through the command wrapper', async () => {
        const config = path.join(repo, 'Legacy Config.yml')
        const migrated = path.join(repo, 'Migrated Config.yml')
        await fs.writeFile(config, 'next-version: 2.0.0\n')
        vi.stubEnv('INPUT_ARGUMENTS', `config migrate --config "${config}" --output "${migrated}"`)
        expect((await runner.run('command')).code).toBe(0)
        expect(await fs.readFile(migrated, 'utf8')).toContain('calculation:')
        vi.stubEnv('INPUT_ARGUMENTS', `config validate --config "${migrated}"`)
        expect((await runner.run('command')).code).toBe(0)
    })

    it('propagates migration diagnostics for flat configuration and flat overrides', async () => {
        const config = path.join(repo, 'Legacy.yml')
        await fs.writeFile(config, 'next-version: 2.0.0\n')
        vi.stubEnv('INPUT_CONFIGFILEPATH', config)
        const flatFile = await runner.run('execute')
        expect(flatFile.code).toBe(1)
        expect(flatFile.stderr).toContain('gitversion config migrate')
        vi.stubEnv('INPUT_CONFIGFILEPATH', '')
        vi.stubEnv('INPUT_OVERRIDECONFIG', 'tag-prefix=v')
        const flatOverride = await runner.run('execute')
        expect(flatOverride.code).toBe(1)
        expect(flatOverride.stderr).toContain('calculation.tag-prefix')
    })

    it('rejects shallow checkouts with the wrapper remediation message', async () => {
        const shallow = path.join(root, 'shallow clone')
        await simpleGit().clone(pathToFileURL(repo).href, shallow, ['--depth', '1'])
        vi.stubEnv('INPUT_TARGETPATH', shallow)
        const result = await runner.run('execute')
        expect(result.code).toBe(-1)
        expect(result.error?.message).toContain('The repository is shallow.')
        await fs.rm(shallow, { recursive: true, force: true })
    })
})
