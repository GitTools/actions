import { resolve } from 'node:path'
import { UserConfig } from 'vite'
import { viteConfig } from '../vite.common.config.mjs'

const config = (): UserConfig => {
    const tools = ['gitversion', 'gitreleasemanager']
        .map(tool => ({
            [`tools/libs/${tool}`]: resolve(__dirname, `${tool}/runner.ts`)
        }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})

    const manualChunks = (id: string): string | undefined => {
        if (id.includes('src/tools/lib.ts')) {
            return 'tools/lib'
        }
        if (id.includes('tools/common')) {
            return `tools/libs/tools`
        }
    }

    const entry = {
        ...tools,
        ['tools/cli']: resolve(__dirname, 'cli.ts')
    }

    return viteConfig(entry, manualChunks)
}

export default config
