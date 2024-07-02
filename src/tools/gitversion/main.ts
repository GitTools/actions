import { type Commands, Runner } from '@tools/gitversion'
import { getAgent, parseCliArgs } from '@lib'

const { command, buildAgent } = parseCliArgs()
const agent = await getAgent(buildAgent)
const runner = new Runner(agent)
await runner.run(command as Commands)
