import { parseCliArgs, run } from '@lib'
import { type Commands } from '@tools/gitversion'

const { agent, tool, command } = parseCliArgs()
await run(agent, tool, command as Commands)
