import { afterEach, beforeEach, expect, it } from 'vitest'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import { execFileSync } from 'node:child_process'

let root: string
let script: string
let manifest: string
beforeEach(async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-release-'))
    script = path.join(root, 'update-gitversion-version.mjs')
    manifest = path.join(root, 'gitversion-test.json')
    await fs.copyFile(path.resolve('scripts/update-gitversion-version.mjs'), script)
    await fs.writeFile(manifest, JSON.stringify({ commit: 'pinned-source', version: '7.0.0-alpha.actions.1', publishedVersion: null }))
})
afterEach(async () => {
    await fs.rm(root, { recursive: true, force: true })
})

it('selects a stable v7 package without changing the pinned source rehearsal', async () => {
    execFileSync(process.execPath, [script], { env: { ...process.env, GITVERSION_RELEASE_TAG: '7.0.1' }, stdio: 'pipe' })
    expect(JSON.parse(await fs.readFile(manifest, 'utf8'))).toEqual({ commit: 'pinned-source', version: '7.0.0-alpha.actions.1', publishedVersion: '7.0.1' })
})

it.each([
    { Name: 'v6', tag: '6.8.3' },
    { Name: 'v8', tag: '8.0.0' },
    { Name: 'prerelease', tag: '7.0.0-rc.1' },
    { Name: 'payload syntax', tag: '7.0.0; echo unexpected' },
    { Name: 'trailing newline', tag: '7.0.0\n' }
])('rejects unsupported release notifications without changing the baseline: $Name', async ({ tag }) => {
    const original = await fs.readFile(manifest, 'utf8')
    expect(() => execFileSync(process.execPath, [script], { env: { ...process.env, GITVERSION_RELEASE_TAG: tag }, stdio: 'pipe' })).toThrow()
    expect(await fs.readFile(manifest, 'utf8')).toBe(original)
})
