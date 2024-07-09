import * as crypto from 'node:crypto'
import * as os from 'node:os'
import * as fs from 'node:fs'

const CMD_STRING = '::'

export interface CommandProperties {
    [key: string]: string | object
}

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
export function issueCommand(command: string, properties: CommandProperties, message: string): void {
    const cmd = new Command(command, properties, message)
    process.stdout.write(cmd.toString() + os.EOL)
}

export function issueFileCommand(command: string, message: string | object): void {
    const filePath = process.env[`GITHUB_${command}`]
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`)
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`)
    }

    fs.appendFileSync(filePath, `${toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    })
}

export enum ExitCode {
    /**
     * A code indicating that the action was successful
     */
    Success = 0,

    /**
     * A code indicating that the action was a failure
     */
    Failure = 1
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
        let cmdStr = CMD_STRING + this.command

        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' '
            let first = true
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key]
                    if (val) {
                        if (first) {
                            first = false
                        } else {
                            cmdStr += ','
                        }

                        cmdStr += `${key}=${escapeProperty(val)}`
                    }
                }
            }
        }

        cmdStr += `${CMD_STRING}${escapeData(this.message)}`
        return cmdStr
    }
}

function escapeData(s: string | object): string {
    return toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')
}

function escapeProperty(s: string | object): string {
    return toCommandValue(s).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A').replace(/:/g, '%3A').replace(/,/g, '%2C')
}

export function toCommandValue(input: string | object): string {
    if (input === null || input === undefined) {
        return ''
    } else if (typeof input === 'string' || input instanceof String) {
        return input as string
    }
    return JSON.stringify(input)
}

export function prepareKeyValueMessage(key: string, value: string | object): string {
    const uuid = crypto.randomUUID()
    const delimiter = `ghadelimiter_${uuid}`
    const convertedValue = toCommandValue(value)

    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`)
    }

    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`)
    }

    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`
}
