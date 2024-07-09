import * as os from 'node:os'
import * as process from 'node:process'
import { BuildAgentBase, IBuildAgent } from '@agents/common'
import { issueCommand, TaskResult } from './command'

export class BuildAgent extends BuildAgentBase implements IBuildAgent {
    agentName = 'Azure Pipelines'

    sourceDirVariable = 'BUILD_SOURCESDIRECTORY'
    tempDirVariable = 'AGENT_TEMPDIRECTORY'
    cacheDirVariable = 'AGENT_TOOLSDIRECTORY'

    addPath(inputPath: string): void {
        super.addPath(inputPath)
        issueCommand('task.prependpath', {}, inputPath)
    }

    info = (message: string): void => {
        process.stdout.write(message + os.EOL)
    }

    debug = (message: string): void => issueCommand('task.debug', {}, message)

    warn = (message: string): void => issueCommand('task.issue', { type: 'warning' }, message)

    error = (message: string): void => issueCommand('task.issue', { type: 'error' }, message)

    setSucceeded = (message: string, done?: boolean): void => this._setResult(TaskResult.Succeeded, message, done)

    setFailed = (message: string, done?: boolean): void => this._setResult(TaskResult.Failed, message, done)

    setOutput = (name: string, value: string): void => this._setVariable(name, value, true)

    setVariable = (name: string, value: string): void => this._setVariable(name, value)

    private _setResult(result: TaskResult, message: string, done?: boolean): void {
        this.debug(`task result: ${TaskResult[result]}`)
        // add an error issue
        if (result === TaskResult.Failed && message) {
            this.error(message)
        } else if (result === TaskResult.SucceededWithIssues && message) {
            this.warn(message)
        } else {
            this.info(message)
        }
        // task.complete
        const properties: Record<string, string> = { result: TaskResult[result] }
        if (done) {
            properties['done'] = 'true'
        }
        issueCommand('task.complete', properties, message)
    }

    private _setVariable(name: string, val: string, isOutput = false): void {
        const key: string = this._getVariableKey(name)
        const varValue = val || ''
        process.env[key] = varValue

        issueCommand(
            'task.setvariable',
            {
                variable: name || '',
                isOutput: (isOutput || false).toString(),
                issecret: 'false'
            },
            varValue
        )
    }

    private _getVariableKey(name: string): string {
        return name.replace(/\./g, '_').replace(/ /g, '_').toUpperCase()
    }
}
