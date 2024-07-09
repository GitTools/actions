import * as os from 'node:os'
import * as process from 'node:process'

const CMD_PREFIX = '##vso['

export interface CommandProperties {
    [key: string]: string | object
}

export enum TaskResult {
    Succeeded = 0,
    SucceededWithIssues = 1,
    Failed = 2,
    Cancelled = 3,
    Skipped = 4
}

/**
 *  Command Format:
 *    ##vso[artifact.command key=value;key=value]user message
 *
 *  Examples:
 *    ##vso[task.progress value=58]
 *    ##vso[task.issue type=warning;]This is the user warning message
 **/
export function issueCommand(command: string, properties: CommandProperties, message: string): void {
    const cmd = new Command(command, properties, message)
    process.stdout.write(cmd.toString() + os.EOL)
}

class Command {
    private readonly command: string
    private readonly message: string
    private readonly properties: CommandProperties

    constructor(command: string, properties: CommandProperties, message: string) {
        if (!command) {
            command = 'missing.command'
        }

        this.command = command
        this.properties = properties
        this.message = message
    }

    toString(): string {
        let cmdStr = CMD_PREFIX + this.command

        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' '
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key]
                    if (val) {
                        // safely append the val - avoid blowing up when attempting to
                        // call .replace() if message is not a string for some reason
                        cmdStr += `${key}=${escapeProperty(`${val || ''}`)};`
                    }
                }
            }
        }

        cmdStr += ']'

        // safely append the message - avoid blowing up when attempting to
        // call .replace() if message is not a string for some reason
        const message = `${this.message || ''}`
        cmdStr += escapeData(message)

        return cmdStr
    }
}

function escapeData(s: string | object): string {
    return toCommandValue(s).replace(/%/g, '%AZP25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')
}

function escapeProperty(s: string | object): string {
    return toCommandValue(s).replace(/%/g, '%AZP25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/]/g, '%5D').replace(/;/g, '%3B')
}

function toCommandValue(input: string | object): string {
    if (input === null || input === undefined) {
        return ''
    } else if (typeof input === 'string' || input instanceof String) {
        return input as string
    }
    return JSON.stringify(input)
}
