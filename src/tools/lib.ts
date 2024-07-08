import * as path from 'node:path'
import * as url from 'node:url'
import { parseArgs } from 'node:util'

import { type IBuildAgent } from '@agents/common'
import { type IRunner } from '@tools/common'

type CliArgs = {
    agent: string
    tool: string
    command: string
}

export async function getAgent(buildAgent: string | undefined): Promise<IBuildAgent> {
    const agent = `./${buildAgent}/agent.mjs`
    const module: { BuildAgent: new () => IBuildAgent } = await import(agent)
    return new module.BuildAgent()
}

export async function getToolRunner(buildAgent: string | undefined, tool: string | undefined): Promise<IRunner> {
    const agent = await getAgent(buildAgent)
    const toolRunner = `./${tool}.mjs`
    const module: { Runner: new (buildAgent: IBuildAgent) => IRunner } = await import(toolRunner)
    return new module.Runner(agent)
}

export function parseCliArgs(): CliArgs {
    return parseArgs({
        options: {
            agent: { type: 'string', short: 'a' },
            tool: { type: 'string', short: 't' },
            command: { type: 'string', short: 'c' }
        }
    }).values as CliArgs
}

export async function run(buildAgent: string, scriptUrl: string | url.URL): Promise<number> {
    const filename = url.fileURLToPath(scriptUrl)
    const commandPath = path.dirname(filename)
    const toolPath = path.dirname(commandPath)
    const command = path.parse(commandPath).name
    const toolName = path.parse(toolPath).name

    const runner = await getToolRunner(buildAgent, toolName)
    return await runner.run(command)
}
