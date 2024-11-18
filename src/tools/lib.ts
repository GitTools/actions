import { parseArgs } from 'node:util'
import process from 'node:process'

import { type IBuildAgent } from '@agents/common'
import { type IRunner } from '@tools/common'

type CliArgs = {
    agent: string
    tool: string
    command: string
}

export async function getAgent(buildAgent: string | undefined): Promise<IBuildAgent> {
    const agent = `./${buildAgent}/agent.mjs`
    const module = (await import(agent)) as { BuildAgent: new () => IBuildAgent }
    return new module.BuildAgent()
}

export async function getToolRunner(buildAgent: string | undefined, tool: string | undefined): Promise<IRunner> {
    const agent = await getAgent(buildAgent)
    const toolRunner = `./libs/${tool}.mjs`
    const module = (await import(toolRunner)) as { Runner: new (buildAgent: IBuildAgent) => IRunner }
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

export async function run(agent: string, tool: string, command: string): Promise<void> {
    const runner = await getToolRunner(agent, tool)
    const { code, stdout, stderr } = await runner.run(command)
    if (stdout) {
        process.stdout.write(stdout)
    }
    if (stderr) {
        process.stderr.write(stderr)
    }
    process.exitCode = code
}
