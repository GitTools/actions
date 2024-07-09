import { IBuildAgent } from './build-agent'

export * from './models'
export * from './build-agent'

export async function getAgent(buildAgent: string | undefined): Promise<IBuildAgent> {
    const agent = `../agents/${buildAgent}/build-agent.js`
    const module: { BuildAgent: new () => IBuildAgent } = await import(agent)
    return new module.BuildAgent()
}
