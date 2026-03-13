import { resolve } from 'node:path'
import { UserConfig } from 'vite'
import { viteConfig } from '../vite.common.config.mjs'

const config = (): UserConfig => {
    const entry = {
        ['tools/cli']: resolve(__dirname, 'cli.ts')
    }

    const manualChunks = (_id: string): string | undefined => {
        return undefined
    }

    return viteConfig(entry, manualChunks)
}

export default config
