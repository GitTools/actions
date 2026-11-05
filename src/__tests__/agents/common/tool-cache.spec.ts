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
