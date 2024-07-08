import { parseCliArgs, getToolRunner } from './libs/lib.mjs';

const { agent, tool, command } = parseCliArgs();
const runner = await getToolRunner(agent, tool);
await runner.run(command);
//# sourceMappingURL=cli.mjs.map
