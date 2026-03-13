import { t as BuildAgentBase } from "../libs/agents.mjs";
import * as os from "node:os";
import process$1 from "node:process";
import * as crypto from "node:crypto";
import * as fs from "node:fs";
//#region src/agents/github/command.ts
var CMD_STRING = "::";
/**
* Commands
*
* Command Format:
*   ::name key=value,key=value::message
*
* Examples:
*   ::warning::This is the message
*   ::set-env name=MY_VAR::some value
*/
function issueCommand(command, properties, message) {
	const cmd = new Command(command, properties, message);
	process.stdout.write(`${cmd.toString()}${os.EOL}`);
}
function issueFileCommand(command, message) {
	const filePath = process.env[`GITHUB_${command}`];
	if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`);
	if (!fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`);
	fs.appendFileSync(filePath, `${toCommandValue(message)}${os.EOL}`, { encoding: "utf8" });
}
var ExitCode = /* @__PURE__ */ function(ExitCode) {
	/**
	* A code indicating that the action was successful
	*/
	ExitCode[ExitCode["Success"] = 0] = "Success";
	/**
	* A code indicating that the action was a failure
	*/
	ExitCode[ExitCode["Failure"] = 1] = "Failure";
	return ExitCode;
}({});
var Command = class {
	command;
	message;
	properties;
	constructor(command, properties, message) {
		if (!command) command = "missing.command";
		this.command = command;
		this.properties = properties;
		this.message = message;
	}
	toString() {
		let cmdStr = CMD_STRING + this.command;
		if (this.properties && Object.keys(this.properties).length > 0) {
			cmdStr += " ";
			let first = true;
			for (const key in this.properties) if (Object.prototype.hasOwnProperty.call(this.properties, key)) {
				const val = this.properties[key];
				if (val) {
					if (first) first = false;
					else cmdStr += ",";
					cmdStr += `${key}=${escapeProperty(val)}`;
				}
			}
		}
		cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
		return cmdStr;
	}
};
function escapeData(s) {
	return toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function escapeProperty(s) {
	return toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}
function toCommandValue(input) {
	if (input === null || input === void 0) return "";
	else if (typeof input === "string" || input instanceof String) return input;
	return JSON.stringify(input);
}
function prepareKeyValueMessage(key, value) {
	const delimiter = `ghadelimiter_${crypto.randomUUID()}`;
	const convertedValue = toCommandValue(value);
	if (key.includes(delimiter)) throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
	if (convertedValue.includes(delimiter)) throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
	return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
//#endregion
//#region src/agents/github/build-agent.ts
var BuildAgent = class extends BuildAgentBase {
	agentName = "GitHub Actions";
	sourceDirVariable = "GITHUB_WORKSPACE";
	tempDirVariable = "RUNNER_TEMP";
	cacheDirVariable = "RUNNER_TOOL_CACHE";
	addPath(inputPath) {
		super.addPath(inputPath);
		if (process$1.env["GITHUB_PATH"] || "") issueFileCommand("PATH", inputPath);
		else issueCommand("add-path", {}, inputPath);
	}
	debug = (message) => issueCommand("debug", {}, message);
	info = (message) => {
		process$1.stdout.write(`${message}${os.EOL}`);
	};
	warn = (message) => issueCommand("warning", {}, message);
	error = (message) => issueCommand("error", {}, message);
	setSucceeded(_message, _done) {
		process$1.exitCode = ExitCode.Success;
	}
	setFailed = (message, _done) => {
		process$1.exitCode = ExitCode.Failure;
		this.error(message);
	};
	setOutput = (name, value) => {
		if (process$1.env["GITHUB_OUTPUT"] || "") return issueFileCommand("OUTPUT", prepareKeyValueMessage(name, value));
		process$1.stdout.write(os.EOL);
		issueCommand("set-output", { name }, toCommandValue(value));
	};
	setVariable = (name, value) => {
		const convertedVal = toCommandValue(value);
		process$1.env[name] = convertedVal;
		if (process$1.env["GITHUB_ENV"] || "") return issueFileCommand("ENV", prepareKeyValueMessage(name, value));
		issueCommand("set-env", { name }, convertedVal);
	};
	updateBuildNumber = (version) => this.debug(`updateBuildNumber - ${version}`);
};
//#endregion
export { BuildAgent };

//# sourceMappingURL=agent.mjs.map