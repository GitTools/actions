import { resolve } from 'node:path'
import { UserConfig } from 'vite'
import { viteConfig } from '../vite.common.config.mjs'

const config = ({ mode: agent }: Partial<UserConfig>): UserConfig => {
    if (agent === 'local-agent') {
        agent = 'local'
    }
    console.log(`Building for agent: ${agent}`)

    const entry = {
        [`libs/${agent}/agent`]: resolve(__dirname, `${agent}/build-agent.ts`)
    }

    const manualChunks = (id: string): string | undefined => {
        if (id.includes('agents/common')) {
            return `libs/agents`
        }
    }

    return viteConfig(entry, manualChunks)
}

export default config
