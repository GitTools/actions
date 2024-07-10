import { parseCliArgs, getToolRunner } from './lib.mjs';

const { agent, tool, command } = parseCliArgs();
const runner = await getToolRunner(agent, tool);
await runner.run(command);
//# sourceMappingURL=cli.mjs.map
