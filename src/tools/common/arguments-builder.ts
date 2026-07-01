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

        const flushArg = (): void => {
            if (!lastCharWasSpace) {
                args.push(arg)
                arg = ''
            }
            lastCharWasSpace = true
        }

        for (const c of argString) {
            if (c === ' ' && !inQuotes) {
                flushArg()
                continue
            }

            lastCharWasSpace = false

            const quoteResult = ArgumentsBuilder.processQuotedCharacter(c, escaped, inQuotes, append)
            escaped = quoteResult.escaped
            inQuotes = quoteResult.inQuotes
            if (quoteResult.handled) {
                continue
            }

            const backslashResult = ArgumentsBuilder.processBackslashCharacter(c, escaped, inQuotes)
            escaped = backslashResult.escaped
            if (backslashResult.appendBackslash) {
                arg += '\\'
            }
            if (backslashResult.handled) {
                continue
            }

            append(c)
        }

        if (!lastCharWasSpace) {
            args.push(arg.trim())
        }

        return args
    }

    private static processQuotedCharacter(
        c: string,
        escaped: boolean,
        inQuotes: boolean,
        append: (c: string) => void
    ): { handled: boolean; escaped: boolean; inQuotes: boolean } {
        if (c !== '"') {
            return { handled: false, escaped, inQuotes }
        }

        if (escaped) {
            append(c)
            return { handled: true, escaped: false, inQuotes }
        }

        return { handled: true, escaped: false, inQuotes: !inQuotes }
    }

    private static processBackslashCharacter(c: string, escaped: boolean, inQuotes: boolean): { handled: boolean; escaped: boolean; appendBackslash: boolean } {
        if (c !== '\\') {
            return { handled: false, escaped, appendBackslash: false }
        }

        if (escaped) {
            return {
                // Double backslash becomes a single backslash
                handled: true,
                escaped: false,
                appendBackslash: true
            }
        }

        if (inQuotes) {
            return { handled: true, escaped: true, appendBackslash: false }
        }

        return { handled: false, escaped, appendBackslash: false }
    }
}
