import * as os from 'node:os';
import process__default from 'node:process';
import { B as BuildAgentBase } from '../../common/agents.js';
import * as crypto from 'node:crypto';
import * as fs from 'node:fs';

const CMD_STRING = "::";
function issueCommand(command, properties, message) {
  const cmd = new Command(command, properties, message);
  process.stdout.write(cmd.toString() + os.EOL);
}
function issueFileCommand(command, message) {
  const filePath = process.env[`GITHUB_${command}`];
  if (!filePath) {
    throw new Error(`Unable to find environment variable for file command ${command}`);
  }
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing file at path: ${filePath}`);
  }
  fs.appendFileSync(filePath, `${toCommandValue(message)}${os.EOL}`, {
    encoding: "utf8"
  });
}
var ExitCode = /* @__PURE__ */ ((ExitCode2) => {
  ExitCode2[ExitCode2["Success"] = 0] = "Success";
  ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
  return ExitCode2;
})(ExitCode || {});
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
    let cmdStr = CMD_STRING + this.command;
    if (this.properties && Object.keys(this.properties).length > 0) {
      cmdStr += " ";
      let first = true;
      for (const key in this.properties) {
        if (this.properties.hasOwnProperty(key)) {
          const val = this.properties[key];
          if (val) {
            if (first) {
              first = false;
            } else {
              cmdStr += ",";
            }
            cmdStr += `${key}=${escapeProperty(val)}`;
          }
        }
      }
    }
    cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
    return cmdStr;
  }
}
function escapeData(s) {
  return toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escapeProperty(s) {
  return toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
function toCommandValue(input) {
  if (input === null || input === void 0) {
    return "";
  } else if (typeof input === "string" || input instanceof String) {
    return input;
  }
  return JSON.stringify(input);
}
function prepareKeyValueMessage(key, value) {
  const uuid = crypto.randomUUID();
  const delimiter = `ghadelimiter_${uuid}`;
  const convertedValue = toCommandValue(value);
  if (key.includes(delimiter)) {
    throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
  }
  if (convertedValue.includes(delimiter)) {
    throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
  }
  return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}

class BuildAgent extends BuildAgentBase {
  agentName = "GitHub Actions";
  sourceDirVariable = "GITHUB_WORKSPACE";
  tempDirVariable = "RUNNER_TEMP";
  cacheDirVariable = "RUNNER_TOOL_CACHE";
  addPath(inputPath) {
    super.addPath(inputPath);
    const filePath = process__default.env["GITHUB_PATH"] || "";
    if (filePath) {
      issueFileCommand("PATH", inputPath);
    } else {
      issueCommand("add-path", {}, inputPath);
    }
  }
  debug = (message) => issueCommand("debug", {}, message);
  info = (message) => {
    process__default.stdout.write(message + os.EOL);
  };
  warn = (message) => issueCommand("warning", {}, message);
  error = (message) => issueCommand("error", {}, message);
  setSucceeded(_message, _done) {
    process__default.exitCode = ExitCode.Success;
  }
  setFailed = (message, _done) => {
    process__default.exitCode = ExitCode.Failure;
    this.error(message);
  };
  setOutput = (name, value) => {
    const filePath = process__default.env["GITHUB_OUTPUT"] || "";
    if (filePath) {
      return issueFileCommand("OUTPUT", prepareKeyValueMessage(name, value));
    }
    process__default.stdout.write(os.EOL);
    issueCommand("set-output", { name }, toCommandValue(value));
  };
  setVariable = (name, value) => {
    const convertedVal = toCommandValue(value);
    process__default.env[name] = convertedVal;
    const filePath = process__default.env["GITHUB_ENV"] || "";
    if (filePath) {
      return issueFileCommand("ENV", prepareKeyValueMessage(name, value));
    }
    issueCommand("set-env", { name }, convertedVal);
  };
}

export { BuildAgent };
//# sourceMappingURL=build-agent.js.map
