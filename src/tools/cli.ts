import { parseCliArgs, run } from '@lib'

const { agent, tool, command } = parseCliArgs()
await run(agent, tool, command)
