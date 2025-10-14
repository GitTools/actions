import { parseArgs } from 'node:util';

async function getAgent(buildAgent) {
  const agent = `./${buildAgent}/agent.mjs`;
  const module = await import(agent);
  return new module.BuildAgent();
}
async function getToolRunner(buildAgent, tool) {
  const agent = await getAgent(buildAgent);
  const toolRunner = `./libs/${tool}.mjs`;
  const module = await import(toolRunner);
  return new module.Runner(agent);
}
function parseCliArgs() {
  return parseArgs({
    options: {
      agent: { type: "string", short: "a" },
      tool: { type: "string", short: "t" },
      command: { type: "string", short: "c" }
    }
  }).values;
}
async function run(agent, tool, command) {
  const runner = await getToolRunner(agent, tool);
  return await runner.run(command);
}
function allIndexesOf(searchString, indexOf) {
  if (indexOf.length !== 1) {
    throw new Error("indexOf must be a single character");
  }
  const resultArray = [];
  for (let i = 0; i < searchString.length; i++) {
    if (searchString[i] === indexOf) {
      resultArray.push(i);
    }
  }
  return resultArray;
}

export { allIndexesOf, getAgent, getToolRunner, parseCliArgs, run };
//# sourceMappingURL=lib.mjs.map
