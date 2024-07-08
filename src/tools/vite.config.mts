import { resolve } from 'node:path'
import { UserConfig } from 'vite'
import { viteConfig } from '../vite.common.config.mjs'

const config = (): UserConfig => {
    const tools = ['gitversion', 'gitreleasemanager']
        .map(tool => ({
            [`libs/${tool}`]: resolve(__dirname, `${tool}/runner.ts`)
        }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {})

    const entry = {
        ...tools,
        ['libs/lib']: resolve(__dirname, 'lib.ts'),
        //['cli']: resolve(__dirname, 'cli.ts')
    }

    const manualChunks = (id: string): string | undefined => {
        if (id.includes('tools/common')) {
            return `libs/tools`
        }
    }

    return viteConfig(entry, manualChunks)
}

export default config
