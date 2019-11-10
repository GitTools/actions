import * as core from '@actions/core';
import * as github from '@actions/github';
import { ToolInstaller } from '../ToolInstaller';
import { Proxy as utils }  from './Proxy';
try {
    let toolInstaller = new ToolInstaller(utils);
    toolInstaller.downloadAndInstall('GitVersion.Tool', '5.1.2', false, false);
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}