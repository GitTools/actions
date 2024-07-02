import { getToolRunner, parseCliArgs } from '@lib'

const { buildAgent, tool,  command } = parseCliArgs()
const runner = await getToolRunner(buildAgent, tool)
await runner.run(command)
