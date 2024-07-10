import { getToolRunner, parseCliArgs } from '@lib'

const { agent, tool, command } = parseCliArgs()
const runner = await getToolRunner(agent, tool)
await runner.run(command)
