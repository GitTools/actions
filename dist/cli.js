import { parseCliArgs, getToolRunner } from './libs/lib.js';

const { agent, tool, command } = parseCliArgs();
const runner = await getToolRunner(agent, tool);
await runner.run(command);
//# sourceMappingURL=cli.js.map
