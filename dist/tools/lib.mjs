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
/**
* Returns all indexes of a specified single character within a given string.
*
* Iterates through the `searchString` and collects the zero-based indexes
* where the character `indexOf` appears. Throws an error if `indexOf` is not a single character.
*
* @param searchString - The string to search within.
* @param indexOf - The single character to find in the string.
* @returns An array of indexes where the character appears in the string.
* @throws {Error} If `indexOf` is not a single character.
*/
function allIndexesOf(searchString, indexOf) {
	if (indexOf.length !== 1) throw new Error("indexOf must be a single character");
	const resultArray = [];
	for (let i = 0; i < searchString.length; i++) if (searchString[i] === indexOf) resultArray.push(i);
	return resultArray;
}
//#endregion
export { allIndexesOf, getAgent, getToolRunner, parseCliArgs, run };

//# sourceMappingURL=lib.mjs.map