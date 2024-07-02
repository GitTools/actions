import { parseCliArgs, getToolRunner } from './lib.js';

const { buildAgent, tool, command } = parseCliArgs();
const runner = await getToolRunner(buildAgent, tool);
await runner.run(command);
//# sourceMappingURL=cli.js.map
