import { parseCliArgs, run } from './lib.mjs';

const { agent, tool, command } = parseCliArgs();
await run(agent, tool, command);
//# sourceMappingURL=cli.mjs.map
