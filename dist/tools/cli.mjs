import { parseCliArgs, run } from "./lib.mjs";
// src/tools/cli.ts
var { agent, tool, command } = parseCliArgs();
await run(agent, tool, command);

//# sourceMappingURL=cli.mjs.map