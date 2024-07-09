import { parseArgs } from 'node:util'
import { type CliArgs } from './models'

export * from './models'
export * from './dotnet-tool'
export * from './settings'

export function parseCliArgs(): CliArgs {
    return parseArgs({
        options: {
            command: { type: 'string', short: 'c' },
            buildAgent: { type: 'string', short: 'a' }
        }
    }).values as CliArgs
}

export const keysFn = Object.keys as <T extends object>(obj: T) => (keyof T)[]
