import * as process from 'node:process'
import os from 'node:os'

import { BuildAgentBase, type IBuildAgent } from '@agents/common'

export class BuildAgent extends BuildAgentBase implements IBuildAgent {
    agentName = 'Local'

    sourceDirVariable = 'AGENT_SOURCE_DIR'
    tempDirVariable = 'AGENT_TEMP_DIR'
    cacheDirVariable = 'AGENT_TOOLS_DIR'

    debug = (message: string): void => {
        process.stdout.write(`[debug] ${message}` + os.EOL)
    }

    info = (message: string): void => {
        process.stdout.write(`[info] - ${message}` + os.EOL)
    }

    warn = (message: string): void => {
        process.stderr.write(`[warn] - ${message}` + os.EOL)
    }

    error = (message: string): void => {
        process.stderr.write(`[error] - ${message}` + os.EOL)
    }

    setSucceeded = (message: string, done?: boolean): void => this.info(`setSucceeded - ${message} - ${done}`)

    setFailed = (message: string, done?: boolean): void => this.error(`setFailed - ${message} - ${done}`)

    setOutput = (name: string, value: string): void => this.debug(`setOutput - ${name} - ${value}`)

    setVariable(name: string, value: string): void {
        this.debug(`setVariable - ${name} - ${value}`)
        process.env[name] = value
    }

    updateBuildNumber = (version: string): void => this.debug(`updateBuildNumber - ${version}`)
}
