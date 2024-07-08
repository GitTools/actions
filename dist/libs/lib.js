import * as path from 'node:path';
import * as url from 'node:url';
import { parseArgs } from 'node:util';

async function getAgent(buildAgent) {
  const agent = `./${buildAgent}/agent.js`;
  const module = await import(agent);
  return new module.BuildAgent();
}
async function getToolRunner(buildAgent, tool) {
  const agent = await getAgent(buildAgent);
  const toolRunner = `./${tool}.js`;
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
async function run(buildAgent, scriptUrl) {
  const filename = url.fileURLToPath(scriptUrl);
  const commandPath = path.dirname(filename);
  const toolPath = path.dirname(commandPath);
  const command = path.parse(commandPath).name;
  const toolName = path.parse(toolPath).name;
  const runner = await getToolRunner(buildAgent, toolName);
  return await runner.run(command);
}

export { getAgent, getToolRunner, parseCliArgs, run };
//# sourceMappingURL=lib.js.map
