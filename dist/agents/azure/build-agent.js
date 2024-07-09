import * as os from 'node:os';
import * as process from 'node:process';
import { B as BuildAgentBase } from '../../common/agents.js';

const CMD_PREFIX = "##vso[";
var TaskResult = /* @__PURE__ */ ((TaskResult2) => {
  TaskResult2[TaskResult2["Succeeded"] = 0] = "Succeeded";
  TaskResult2[TaskResult2["SucceededWithIssues"] = 1] = "SucceededWithIssues";
  TaskResult2[TaskResult2["Failed"] = 2] = "Failed";
  TaskResult2[TaskResult2["Cancelled"] = 3] = "Cancelled";
  TaskResult2[TaskResult2["Skipped"] = 4] = "Skipped";
  return TaskResult2;
})(TaskResult || {});
function issueCommand(command, properties, message) {
  const cmd = new Command(command, properties, message);
  process.stdout.write(cmd.toString() + os.EOL);
}
class Command {
  command;
  message;
  properties;
  constructor(command, properties, message) {
    if (!command) {
      command = "missing.command";
    }
    this.command = command;
    this.properties = properties;
    this.message = message;
  }
  toString() {
    let cmdStr = CMD_PREFIX + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      cmdStr += " ";
      for (const key in this.properties) {
        if (this.properties.hasOwnProperty(key)) {
          const val = this.properties[key];
          if (val) {
            cmdStr += `${key}=${escapeProperty(`${val || ""}`)};`;
          }
        }
      }
    }
    cmdStr += "]";
    const message = `${this.message || ""}`;
    cmdStr += escapeData(message);
    return cmdStr;
  }
}
function escapeData(s) {
  return toCommandValue(s).replace(/%/g, "%AZP25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escapeProperty(s) {
  return toCommandValue(s).replace(/%/g, "%AZP25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/]/g, "%5D").replace(/;/g, "%3B");
}
function toCommandValue(input) {
  if (input === null || input === void 0) {
    return "";
  } else if (typeof input === "string" || input instanceof String) {
    return input;
  }
  return JSON.stringify(input);
}

class BuildAgent extends BuildAgentBase {
  agentName = "Azure Pipelines";
  sourceDirVariable = "BUILD_SOURCESDIRECTORY";
  tempDirVariable = "AGENT_TEMPDIRECTORY";
  cacheDirVariable = "AGENT_TOOLSDIRECTORY";
  addPath(inputPath) {
    super.addPath(inputPath);
    issueCommand("task.prependpath", {}, inputPath);
  }
  info = (message) => {
    process.stdout.write(message + os.EOL);
  };
  debug = (message) => issueCommand("task.debug", {}, message);
  warn = (message) => issueCommand("task.issue", { type: "warning" }, message);
  error = (message) => issueCommand("task.issue", { type: "error" }, message);
  setSucceeded = (message, done) => this._setResult(TaskResult.Succeeded, message, done);
  setFailed = (message, done) => this._setResult(TaskResult.Failed, message, done);
  setOutput = (name, value) => this._setVariable(name, value, true);
  setVariable = (name, value) => this._setVariable(name, value);
  _setResult(result, message, done) {
    this.debug(`task result: ${TaskResult[result]}`);
    if (result === TaskResult.Failed && message) {
      this.error(message);
    } else if (result === TaskResult.SucceededWithIssues && message) {
      this.warn(message);
    } else {
      this.info(message);
    }
    const properties = { result: TaskResult[result] };
    if (done) {
      properties["done"] = "true";
    }
    issueCommand("task.complete", properties, message);
  }
  _setVariable(name, val, isOutput = false) {
    const key = this._getVariableKey(name);
    const varValue = val || "";
    process.env[key] = varValue;
    issueCommand(
      "task.setvariable",
      {
        variable: name || "",
        isOutput: (isOutput || false).toString(),
        issecret: "false"
      },
      varValue
    );
  }
  _getVariableKey(name) {
    return name.replace(/\./g, "_").replace(/ /g, "_").toUpperCase();
  }
}

export { BuildAgent };
//# sourceMappingURL=build-agent.js.map
