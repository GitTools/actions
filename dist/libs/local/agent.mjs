import * as process from 'node:process';
import { B as BuildAgentBase } from '../agents.mjs';

class BuildAgent extends BuildAgentBase {
  agentName = "Local";
  sourceDirVariable = "AGENT_SOURCE_DIR";
  tempDirVariable = "AGENT_TEMP_DIR";
  cacheDirVariable = "AGENT_TOOLS_DIR";
  debug = (message) => {
    process.stdout.write(`[debug] ${message}`);
  };
  info = (message) => {
    process.stdout.write(`[info] - ${message}`);
  };
  warn = (message) => {
    process.stderr.write(`[warn] - ${message}`);
  };
  error = (message) => {
    process.stderr.write(`[error] - ${message}`);
  };
  setSucceeded = (message, done) => this.info(`setSucceeded - ${message} - ${done}`);
  setFailed = (message, done) => this.error(`setFailed - ${message} - ${done}`);
  setOutput = (name, value) => this.debug(`setOutput - ${name} - ${value}`);
  setVariable(name, value) {
    this.debug(`setVariable - ${name} - ${value}`);
    process.env[name] = value;
  }
}

export { BuildAgent };
//# sourceMappingURL=agent.mjs.map
