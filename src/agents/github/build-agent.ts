import * as os from 'node:os'
import process from 'node:process'
import { BuildAgentBase, IBuildAgent } from '@agents/common'
import { ExitCode, issueCommand, issueFileCommand, prepareKeyValueMessage, toCommandValue } from './command'

export class BuildAgent extends BuildAgentBase implements IBuildAgent {
    agentName = 'GitHub Actions'

    sourceDirVariable = 'GITHUB_WORKSPACE'
    tempDirVariable = 'RUNNER_TEMP'
    cacheDirVariable = 'RUNNER_TOOL_CACHE'

    addPath(inputPath: string): void {
        super.addPath(inputPath)
        const filePath = process.env['GITHUB_PATH'] || ''
        if (filePath) {
            issueFileCommand('PATH', inputPath)
        } else {
            issueCommand('add-path', {}, inputPath)
        }
    }

    debug = (message: string): void => issueCommand('debug', {}, message)

    info = (message: string): void => {
        process.stdout.write(message + os.EOL)
    }

    warn = (message: string): void => issueCommand('warning', {}, message)

    error = (message: string): void => issueCommand('error', {}, message)

    setSucceeded(_message: string, _done?: boolean): void {
        process.exitCode = ExitCode.Success
    }

    setFailed = (message: string, _done?: boolean): void => {
        process.exitCode = ExitCode.Failure
        this.error(message)
    }

    setOutput = (name: string, value: string): void => {
        const filePath = process.env['GITHUB_OUTPUT'] || ''
        if (filePath) {
            return issueFileCommand('OUTPUT', prepareKeyValueMessage(name, value))
        }

        process.stdout.write(os.EOL)
        issueCommand('set-output', { name }, toCommandValue(value))
    }

    setVariable = (name: string, value: string): void => {
        const convertedVal = toCommandValue(value)
        process.env[name] = convertedVal

        const filePath = process.env['GITHUB_ENV'] || ''
        if (filePath) {
            return issueFileCommand('ENV', prepareKeyValueMessage(name, value))
        }

        issueCommand('set-env', { name }, convertedVal)
    }
}
