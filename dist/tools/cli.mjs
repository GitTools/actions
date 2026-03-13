import { a as run, i as parseCliArgs } from "../lib.mjs";
//#region src/tools/cli.ts
var { agent, tool, command } = parseCliArgs();
await run(agent, tool, command);
//#endregion

//# sourceMappingURL=cli.mjs.map