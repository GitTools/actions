import { resolve } from 'node:path'
import { UserConfig } from 'vite'
import { viteConfig } from '../vite.common.config'

const config = ({ mode: agent }: Partial<UserConfig>): UserConfig => {
    if (agent === 'local-agent') {
        agent = 'local'
    }
    console.log(`Building for agent: ${agent}`)

    const entry = {
        [`agents/${agent}/build-agent`]: resolve(__dirname, `${agent}/build-agent.ts`)
    }

    const manualChunks = (id: string): string | undefined => {
        // console.log(`id: ${id}`)
        if (id.includes('agents/common')) {
            return `common/agents`
        }
        if (id.includes('node_modules/semver') || id.includes('node_modules/lru-cache') || id.includes('node_modules/yallist')) {
            return `common/semver`
        }
        if (id.includes('node_modules')) {
            return `agents/${agent}/vendor`
        }
    }

    return viteConfig(entry, manualChunks)
}

export default config
