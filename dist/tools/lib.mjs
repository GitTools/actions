import { parseArgs } from 'node:util';
import * as process from 'node:process';

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
  const { code, stdout, stderr } = await runner.run(command);
  if (stdout) {
    process.stdout.write(stdout);
  }
  if (stderr) {
    process.stderr.write(stderr);
  }
  process.exit(code);
}

export { getAgent, getToolRunner, parseCliArgs, run };
//# sourceMappingURL=lib.mjs.map
