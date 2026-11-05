import { it, expect } from 'vitest'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import { spawnSync } from 'node:child_process'
import { simpleGit } from 'simple-git'

it.each([
    { Name: 'working tree', staged: false, restored: false },
    { Name: 'index', staged: true, restored: false },
    { Name: 'index with restored working tree', staged: true, restored: true }
])('rejects modified pinned source before packing: $Name', async ({ staged, restored }) => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-source-'))
    try {
        const source = path.join(root, 'source')
        const scripts = path.join(root, 'scripts')
        await fs.mkdir(source)
        await fs.mkdir(scripts)
        const git = simpleGit(source)
        await git.init()
        await git.addConfig('user.name', 'Source test')
        await git.addConfig('user.email', 'source@example.invalid')
        const file = path.join(source, 'tracked.txt')
        await fs.writeFile(file, 'original')
        await git.add('tracked.txt')
        await git.commit('baseline')
        const commit = await git.revparse(['HEAD'])
        await fs.writeFile(file, 'modified')
        if (staged) await git.add('tracked.txt')
        if (restored) await fs.writeFile(file, 'original')
        const script = path.join(scripts, 'prepare-gitversion.mjs')
        await fs.copyFile(path.resolve('scripts/prepare-gitversion.mjs'), script)
        await fs.writeFile(path.join(scripts, 'gitversion-test.json'), JSON.stringify({ commit, version: '7.0.0-alpha.test' }))
        const result = spawnSync(process.execPath, [script], {
            encoding: 'utf8',
            env: {
                ...process.env,
                GITVERSION_TEST_SOURCE: source,
                GITVERSION_TEST_VERSION: '',
                GITVERSION_TEST_MODE: 'source',
                DOTNET_HOST_PATH: process.execPath
            }
        })
        expect(result.status).not.toBe(0)
        expect(result.stderr).toContain('Pinned GitVersion source has tracked modifications')
        expect(await fs.readFile(file, 'utf8')).toBe(restored ? 'original' : 'modified')
        expect(await git.revparse(['HEAD'])).toBe(commit)
    } finally {
        await fs.rm(root, { recursive: true, force: true })
    }
})
