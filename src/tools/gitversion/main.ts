import { getAgent } from '@agents/common'
import { parseCliArgs } from '@tools/common'
import { type Commands, Runner } from '@tools/gitversion'

const { command, buildAgent } = parseCliArgs()
const agent = await getAgent(buildAgent)
const runner = new Runner(agent)
await runner.run(command as Commands)
