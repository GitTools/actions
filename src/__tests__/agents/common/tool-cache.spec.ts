import { it, expect, vi } from 'vitest'
import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as os from 'node:os'
import { BuildAgent } from '@agents/local'

it.skipIf(process.platform === 'win32')('keeps a relative tool symlink executable after the installation directory is removed', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-cache-'))
    try {
        const source = path.join(root, 'install')
        await fs.mkdir(path.join(source, '.store', 'bin'), { recursive: true })
        await fs.writeFile(path.join(source, '.store', 'bin', 'tool'), 'cached tool')
        await fs.symlink('.store/bin/tool', path.join(source, 'dotnet-gitversion'))
        const agent = new BuildAgent()
        vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(path.join(root, 'cache'))
        const cached = await agent.cacheToolDirectory(source, 'GitVersion.Tool', '7.0.0')
        await fs.rm(source, { recursive: true })
        expect(await fs.readlink(path.join(cached, 'dotnet-gitversion'))).toBe('.store/bin/tool')
        expect(await fs.readFile(path.join(cached, 'dotnet-gitversion'), 'utf8')).toBe('cached tool')
    } finally {
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})

it('restores a completed cache when a forced reinstall fails', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-rollback-'))
    const agent = new BuildAgent()
    vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(root)
    try {
        const directory = await agent.installToolInCache('tool', '1.0.0', async dir => {
            await fs.writeFile(path.join(dir, 'payload'), 'original')
        })
        await expect(
            agent.installToolInCache(
                'tool',
                '1.0.0',
                async dir => {
                    await fs.writeFile(path.join(dir, 'payload'), 'partial')
                    throw new Error('offline')
                },
                true
            )
        ).rejects.toThrow('offline')
        expect(await fs.readFile(path.join(directory, 'payload'), 'utf8')).toBe('original')
        expect(await agent.findLocalTool('tool', '1.0.0')).toBe(directory)
        expect(await agent.directoryExists(`${directory}.lock`)).toBe(false)
    } finally {
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})

it('serializes concurrent installs of the same tool version', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-concurrent-'))
    const agent = new BuildAgent()
    vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(root)
    let active = 0
    let maxActive = 0
    try {
        const paths = await Promise.all(
            [1, 2, 3].map(async index =>
                agent.installToolInCache(
                    'tool',
                    '1.0.0',
                    async dir => {
                        active++
                        maxActive = Math.max(maxActive, active)
                        await fs.writeFile(path.join(dir, 'payload'), String(index))
                        expect(await fs.readFile(path.join(dir, 'payload'), 'utf8')).toBe(String(index))
                        active--
                    },
                    true
                )
            )
        )
        expect(maxActive).toBe(1)
        expect(new Set(paths).size).toBe(1)
        expect(await agent.findLocalTool('tool', '1.0.0')).toBe(paths[0])
    } finally {
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})

it('restores a completed backup after an interrupted replacement', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-interrupted-'))
    const agent = new BuildAgent()
    vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(root)
    try {
        const directory = agent.getToolCachePath('tool', '1.0.0')
        const backup = `${directory}.backup-00000000-0000-4000-8000-000000000000`
        await fs.mkdir(backup, { recursive: true })
        await fs.writeFile(path.join(backup, '.complete'), '')
        await fs.writeFile(path.join(backup, 'payload'), 'original')
        await fs.mkdir(directory, { recursive: true })
        await fs.writeFile(path.join(directory, 'payload'), 'partial')
        const install = vi.fn()
        expect(await agent.installToolInCache('tool', '1.0.0', install)).toBe(directory)
        expect(install).not.toHaveBeenCalled()
        expect(await fs.readFile(path.join(directory, 'payload'), 'utf8')).toBe('original')
        expect(await agent.findLocalTool('tool', '1.0.0')).toBe(directory)
        expect(await agent.directoryExists(backup)).toBe(false)
    } finally {
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})

it('reclaims a stale lock left by a killed installer', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-stale-'))
    const agent = new BuildAgent()
    vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(root)
    try {
        const directory = agent.getToolCachePath('tool', '1.0.0')
        await fs.mkdir(`${directory}.lock`, { recursive: true })
        const stale = new Date(Date.now() - 60000)
        await fs.utimes(`${directory}.lock`, stale, stale)
        const installed = await agent.installToolInCache('tool', '1.0.0', async dir => {
            await fs.writeFile(path.join(dir, 'payload'), 'recovered')
        })
        expect(await fs.readFile(path.join(installed, 'payload'), 'utf8')).toBe('recovered')
        expect(await agent.findLocalTool('tool', '1.0.0')).toBe(installed)
        expect(await agent.directoryExists(`${directory}.lock`)).toBe(false)
    } finally {
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})

it('renews a live installer lock while another installer waits', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-heartbeat-'))
    const agent = new BuildAgent()
    vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(root)
    let start!: () => void
    const started = new Promise<void>(resolve => {
        start = resolve
    })
    let finish!: () => void
    const finished = new Promise<void>(resolve => {
        finish = resolve
    })
    const first = agent.installToolInCache('tool', '1.0.0', async dir => {
        start()
        await finished
        await fs.writeFile(path.join(dir, 'payload'), 'first')
    })
    let second: Promise<string> | undefined
    try {
        await started
        const directory = agent.getToolCachePath('tool', '1.0.0')
        const before = (await fs.stat(`${directory}.lock`)).mtimeMs
        const install = vi.fn()
        second = agent.installToolInCache('tool', '1.0.0', install)
        await vi.waitFor(async () => expect((await fs.stat(`${directory}.lock`)).mtimeMs).toBeGreaterThan(before), { timeout: 5000 })
        expect(install).not.toHaveBeenCalled()
        finish()
        expect(await second).toBe(await first)
        expect(install).not.toHaveBeenCalled()
        expect(await fs.readFile(path.join(directory, 'payload'), 'utf8')).toBe('first')
    } finally {
        finish()
        await Promise.allSettled([first, second])
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})

it('preserves a completed cache and ignores incomplete backups', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-backups-'))
    const agent = new BuildAgent()
    vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(root)
    try {
        const directory = agent.getToolCachePath('tool', '1.0.0')
        const backup = `${directory}.backup-incomplete`
        await fs.mkdir(backup, { recursive: true })
        await fs.writeFile(path.join(backup, 'payload'), 'partial')
        const install = vi.fn(async (dir: string) => {
            await fs.writeFile(path.join(dir, 'payload'), 'fresh')
        })
        await agent.installToolInCache('tool', '1.0.0', install)
        await fs.writeFile(path.join(backup, '.complete'), '')
        await agent.installToolInCache('tool', '1.0.0', install)
        expect(install).toHaveBeenCalledExactlyOnceWith(directory)
        expect(await fs.readFile(path.join(directory, 'payload'), 'utf8')).toBe('fresh')
        expect(await agent.directoryExists(backup)).toBe(true)
    } finally {
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})

it('ignores another platform cache and incomplete installations', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-cache-key-'))
    try {
        const agent = new BuildAgent()
        vi.spyOn(agent, 'cacheDir', 'get').mockReturnValue(root)
        const otherPlatform = path.join(root, 'GitVersion.Tool', '7.0.0', 'other-platform')
        await fs.mkdir(otherPlatform, { recursive: true })
        await fs.writeFile(path.join(otherPlatform, '.complete'), '')
        expect(await agent.findLocalTool('GitVersion.Tool', '7.0.0')).toBeNull()
        const native = path.join(root, 'GitVersion.Tool', '7.0.0', `${os.platform()}-${os.arch()}`)
        await fs.mkdir(native, { recursive: true })
        expect(await agent.findLocalTool('GitVersion.Tool', '7.0.0')).toBeNull()
        await fs.writeFile(path.join(native, '.complete'), '')
        expect(await agent.findLocalTool('GitVersion.Tool', '7.0.0')).toBe(native)
    } finally {
        vi.restoreAllMocks()
        await fs.rm(root, { recursive: true, force: true })
    }
})
