import * as os from 'node:os'

export class ArgumentsBuilder {
    private readonly args: string[] = []
    private readonly isWindows: boolean = os.platform() === 'win32'

    /**
     * Adds a simple argument without a key
     * @param value The argument value
     */
    addArgument(value: string): this {
        if (value) {
            this.args.push(this.escapeArgument(value))
        }
        return this
    }

    /**
     * Adds multiple arguments
     * @param values The argument values
     */
    addArguments(values: string[]): this {
        for (const value of values) {
            this.addArgument(value)
        }
        return this
    }

    /**
     * Adds a flag argument (--flag)
     * @param key The flag name
     */
    addFlag(key: string): this {
        if (key) {
            this.args.push(`--${key}`)
        }
        return this
    }

    /**
     * Adds a key-value argument (--key value)
     * @param key The argument key
     * @param value The argument value
     */
    addKeyValue(key: string, value?: string | null): this {
        if (key && value !== undefined && value !== null) {
            this.args.push(`--${key}`)
            this.args.push(this.escapeArgument(value))
        }
        return this
    }

    /**
     * Adds an equals-style argument (--key=value)
     * @param key The argument key
     * @param value The argument value
     */
    addKeyValueEquals(key: string, value?: string | null): this {
        if (key && value !== undefined && value !== null) {
            this.args.push(`--${key}=${this.escapeArgument(value)}`)
        }
        return this
    }

    /**
     * Adds a comma-separated list (--key value1,value2,value3)
     * @param key The argument key
     * @param values The list of values
     */
    addCommaList(key: string, values?: string[]): this {
        if (key && values && values.length > 0) {
            const escapedValues = values.map(v => this.escapeArgument(v))
            this.args.push(`--${key}`)
            this.args.push(escapedValues.join(','))
        }
        return this
    }

    /**
     * Escapes an argument value based on the current OS
     * @param value The argument value to escape
     * @returns The escaped argument value
     */
    private escapeArgument(value: string): string {
        if (!value) return value

        // No need to escape if it doesn't contain spaces or special chars
        if (!this.needsEscaping(value)) return value

        if (this.isWindows) {
            // On Windows, wrap in double quotes and escape inner double quotes with backslash
            return `"${value.replace(/"/g, '\\"')}"`
        } else {
            // On Unix, wrap in single quotes and escape inner single quotes
            // Escaping single quotes in bash requires closing the quote, adding an escaped quote, and reopening
            return `'${value.replace(/'/g, "'\\''")}'`
        }
    }

    /**
     * Determines if a value needs to be escaped
     * @param value The value to check
     * @returns True if the value needs escaping
     */
    private needsEscaping(value: string): boolean {
        const windowsNeedsEscaping = /[\s&|<>^(){}[\]"']/
        const unixNeedsEscaping = /[\s$\\`&|<>(){}[\]"']/
        if (this.isWindows) {
            return windowsNeedsEscaping.test(value)
        }
        return unixNeedsEscaping.test(value)
    }

    /**
     * Returns the built argument array
     */
    build(): string[] {
        return [...this.args]
    }

    /**
     * Parses an argument string into an array
     * @param argString The argument string to parse
     * @returns Array of parsed arguments
     */
    static parseArgumentString(argString: string): string[] {
        const args: string[] = []

        let inQuotes = false
        let escaped = false
        let lastCharWasSpace = true
        let arg = ''

        const append = (c: string): void => {
            // Only add a backslash for escaped characters other than quotes or backslashes
            if (escaped && c !== '"' && c !== '\\') {
                arg += '\\'
            }

            arg += c
            escaped = false
        }

        for (let i = 0; i < argString.length; i++) {
            const c = argString.charAt(i)

            if (c === ' ' && !inQuotes) {
                if (!lastCharWasSpace) {
                    args.push(arg)
                    arg = ''
                }
                lastCharWasSpace = true
                continue
            } else {
                lastCharWasSpace = false
            }

            if (c === '"') {
                if (!escaped) {
                    inQuotes = !inQuotes
                } else {
                    append(c)
                }
                continue
            }

            if (c === '\\' && escaped) {
                // Double backslash becomes a single backslash
                arg += '\\'
                escaped = false
                continue
            }

            if (c === '\\' && inQuotes) {
                escaped = true
                continue
            }

            append(c)
            lastCharWasSpace = false
        }

        if (!lastCharWasSpace) {
            args.push(arg.trim())
        }

        return args
    }
}
