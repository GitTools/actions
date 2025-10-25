import { parseArgs } from 'node:util'

import { type ExecResult, type IBuildAgent } from '@agents/common'
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

export async function run(agent: string, tool: string, command: string): Promise<ExecResult> {
    const runner = await getToolRunner(agent, tool)
    return await runner.run(command)
}

/**
 * Returns all indexes of a specified single character within a given string.
 *
 * Iterates through the `searchString` and collects the zero-based indexes
 * where the character `indexOf` appears. Throws an error if `indexOf` is not a single character.
 *
 * @param searchString - The string to search within.
 * @param indexOf - The single character to find in the string.
 * @returns An array of indexes where the character appears in the string.
 * @throws {Error} If `indexOf` is not a single character.
 */
export function allIndexesOf(searchString: string, indexOf: string): number[] {
    if (indexOf.length !== 1) {
        throw new Error('indexOf must be a single character')
    }

    const resultArray: number[] = []

    for (let i = 0; i < searchString.length; i++) {
        if (searchString[i] === indexOf) {
            resultArray.push(i)
        }
    }

    return resultArray
}
