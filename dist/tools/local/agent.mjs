import * as process from 'node:process';
import os from 'node:os';
import { B as BuildAgentBase } from '../libs/agents.mjs';

class BuildAgent extends BuildAgentBase {
  agentName = "Local";
  sourceDirVariable = "AGENT_SOURCE_DIR";
  tempDirVariable = "AGENT_TEMP_DIR";
  cacheDirVariable = "AGENT_TOOLS_DIR";
  debug = (message) => {
    process.stdout.write(`[debug] ${message}${os.EOL}`);
  };
  info = (message) => {
    process.stdout.write(`[info] - ${message}${os.EOL}`);
  };
  warn = (message) => {
    process.stderr.write(`[warn] - ${message}${os.EOL}`);
  };
  error = (message) => {
    process.stderr.write(`[error] - ${message}${os.EOL}`);
  };
  setSucceeded = (message, done) => this.info(`setSucceeded - ${message} - ${done}`);
  setFailed = (message, done) => this.error(`setFailed - ${message} - ${done}`);
  setOutput = (name, value) => this.debug(`setOutput - ${name} - ${value}`);
  setVariable(name, value) {
    this.debug(`setVariable - ${name} - ${value}`);
    process.env[name] = value;
  }
  updateBuildNumber = (version) => this.debug(`updateBuildNumber - ${version}`);
}

export { BuildAgent };
//# sourceMappingURL=agent.mjs.map
