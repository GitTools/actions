export class ArgumentsBuilder {
    private readonly args: string[] = []

    /**
     * Adds a simple argument without a key
     * @param value The argument value
     */
    addArgument(value: string): this {
        if (value) {
            this.args.push(value)
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
            this.args.push(`--${key}`, value)
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
            this.args.push(`--${key}=${value}`)
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
            this.args.push(`--${key}`, values.join(','))
        }
        return this
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
