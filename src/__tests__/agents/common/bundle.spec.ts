import { it, expect } from 'vitest'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'
import { pathToFileURL } from 'node:url'

it('installs and reuses a cache through the shipped ES module agent', async () => {
    const root = await fs.mkdtemp(path.join(os.tmpdir(), 'gittools-bundle-'))
    try {
        const agentUrl = pathToFileURL(path.resolve('dist/tools/local/agent.mjs')).href
        const script = `
            import { BuildAgent } from ${JSON.stringify(agentUrl)};
            import { writeFile, readFile } from 'node:fs/promises';
            import { join } from 'node:path';
            const agent = new BuildAgent();
            const installed = await agent.installToolInCache('tool', '1.0.0', async directory => {
                await writeFile(join(directory, 'payload'), 'bundled cache');
            });
            const cached = await agent.findLocalTool('tool', '1.0.0');
            console.log(JSON.stringify({ reused: cached === installed, payload: await readFile(join(cached, 'payload'), 'utf8') }));
        `
        const { stdout } = await promisify(execFile)(process.execPath, ['--input-type=module', '--eval', script], {
            env: { ...process.env, AGENT_TOOLS_DIR: root }
        })
        const result: unknown = JSON.parse(stdout.trim().split('\n').at(-1) || '')
        expect(result).toEqual({ reused: true, payload: 'bundled cache' })
    } finally {
        await fs.rm(root, { recursive: true, force: true })
    }
})
