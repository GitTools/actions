import { parseArgs } from "node:util";
//#region src/tools/lib.ts
async function getAgent(buildAgent) {
	return new (await (import(`./${buildAgent}/agent.mjs`))).BuildAgent();
}
async function getToolRunner(buildAgent, tool) {
	const agent = await getAgent(buildAgent);
	return new (await (import(`./libs/${tool}.mjs`))).Runner(agent);
}
function parseCliArgs() {
	return parseArgs({ options: {
		agent: {
			type: "string",
			short: "a"
		},
		tool: {
			type: "string",
			short: "t"
		},
		command: {
			type: "string",
			short: "c"
		}
	} }).values;
}
async function run(agent, tool, command) {
	return await (await getToolRunner(agent, tool)).run(command);
}
//#endregion
//#region src/tools/cli.ts
var { agent, tool, command } = parseCliArgs();
await run(agent, tool, command);
//#endregion

//# sourceMappingURL=cli.mjs.map