import { beforeEach, describe, expect, test, vi } from 'vitest'
import { ArgumentsBuilder } from '@tools/common'

// Use vi.hoisted to declare the mock before the vi.mock call is hoisted
const mockPlatform = vi.hoisted(() => vi.fn())

// Mock node:os module
vi.mock('node:os', () => ({
    platform: mockPlatform
}))

describe('ArgumentsBuilder', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    describe('Windows environment', () => {
        beforeEach(() => {
            mockPlatform.mockReturnValue('win32')
        })

        test('basic argument without spaces', () => {
            const args = new ArgumentsBuilder().addArgument('simple').build()

            expect(args).toEqual(['simple'])
        })

        test('argument with spaces', () => {
            const args = new ArgumentsBuilder().addArgument('argument with spaces').build()

            expect(args).toEqual(['"argument with spaces"'])
        })

        test('argument with double quotes', () => {
            const args = new ArgumentsBuilder().addArgument('argument "with" quotes').build()

            expect(args).toEqual(['"argument \\"with\\" quotes"'])
        })

        test('argument with special characters', () => {
            const args = new ArgumentsBuilder().addArgument('argument&with|special<chars>').build()

            expect(args).toEqual(['"argument&with|special<chars>"'])
        })

        test('multiple arguments', () => {
            const args = new ArgumentsBuilder().addArgument('first').addArgument('second with space').addFlag('flag').addKeyValue('key', 'value').build()

            expect(args).toEqual(['first', '"second with space"', '--flag', '--key', 'value'])
        })

        test('addArguments method', () => {
            const args = new ArgumentsBuilder().addArguments(['arg1', 'arg2 with space', 'arg3']).build()

            expect(args).toEqual(['arg1', '"arg2 with space"', 'arg3'])
        })

        test('addFlag method', () => {
            const args = new ArgumentsBuilder().addFlag('flag').addFlag('another-flag').build()

            expect(args).toEqual(['--flag', '--another-flag'])
        })

        test('addKeyValue method', () => {
            const args = new ArgumentsBuilder().addKeyValue('key', 'value').addKeyValue('key2', 'value with spaces').build()

            expect(args).toEqual(['--key', 'value', '--key2', '"value with spaces"'])
        })

        test('addKeyValueEquals method', () => {
            const args = new ArgumentsBuilder().addKeyValueEquals('key', 'value').addKeyValueEquals('key2', 'value with spaces').build()

            expect(args).toEqual(['--key=value', '--key2="value with spaces"'])
        })

        test('addCommaList method', () => {
            const args = new ArgumentsBuilder().addCommaList('list', ['value1', 'value2', 'value with space']).build()

            expect(args).toEqual(['--list', 'value1,value2,"value with space"'])
        })

        test('null or undefined arguments are ignored', () => {
            const args = new ArgumentsBuilder().addKeyValue('key', null).addKeyValue('another', undefined).addCommaList('list', []).build()

            expect(args).toEqual([])
        })

        test('empty string arguments are ignored', () => {
            const args = new ArgumentsBuilder().addArgument('').addFlag('').build()

            expect(args).toEqual([])
        })
    })

    describe('Unix environment', () => {
        beforeEach(() => {
            mockPlatform.mockReturnValue('linux')
        })

        test('basic argument without spaces', () => {
            const args = new ArgumentsBuilder().addArgument('simple').build()

            expect(args).toEqual(['simple'])
        })

        test('argument with spaces', () => {
            const args = new ArgumentsBuilder().addArgument('argument with spaces').build()

            expect(args).toEqual(["'argument with spaces'"])
        })

        test('argument with single quotes', () => {
            const args = new ArgumentsBuilder().addArgument("argument 'with' quotes").build()

            expect(args).toEqual(["'argument '\\''with'\\'' quotes'"])
        })

        test('argument with special characters', () => {
            const args = new ArgumentsBuilder().addArgument('argument&with|special<chars>').build()

            expect(args).toEqual(["'argument&with|special<chars>'"])
        })

        test('addKeyValue with special characters', () => {
            const args = new ArgumentsBuilder().addKeyValue('key', "value with 'quotes'").build()

            expect(args).toEqual(['--key', "'value with '\\''quotes'\\'''"])
        })

        test('addKeyValueEquals with special characters', () => {
            const args = new ArgumentsBuilder().addKeyValueEquals('key', "value with 'quotes'").build()

            expect(args).toEqual(["--key='value with '\\''quotes'\\'''"])
        })
    })

    describe('parseArgumentString', () => {
        test('parses simple arguments', () => {
            const result = ArgumentsBuilder.parseArgumentString('arg1 arg2 arg3')
            expect(result).toEqual(['arg1', 'arg2', 'arg3'])
        })

        test('parses quoted arguments', () => {
            const result = ArgumentsBuilder.parseArgumentString('arg1 "arg with space" arg3')
            expect(result).toEqual(['arg1', 'arg with space', 'arg3'])
        })

        test('handles escaped quotes', () => {
            const result = ArgumentsBuilder.parseArgumentString('arg1 "arg \\"with\\" quotes" arg3')
            expect(result).toEqual(['arg1', 'arg "with" quotes', 'arg3'])
        })

        test('handles escaped backslashes', () => {
            // In JS, '\\\\' represents two backslashes in a string
            // So the input is effectively: arg1 "arg \\ with backslash" arg3
            const result = ArgumentsBuilder.parseArgumentString('arg1 "arg \\\\ with backslash" arg3')

            // Log for debugging
            console.log('Expected:', ['arg1', 'arg \\ with backslash', 'arg3'])
            console.log('Actual:', result)

            expect(result).toEqual(['arg1', 'arg \\ with backslash', 'arg3'])
        })

        // Add more explicit test to verify backslash handling
        test('handles multiple escaped backslashes', () => {
            // This represents: arg1 "arg \\\\ with multiple backslashes" arg3
            const result = ArgumentsBuilder.parseArgumentString('arg1 "arg \\\\\\\\ with multiple backslashes" arg3')
            expect(result).toEqual(['arg1', 'arg \\\\ with multiple backslashes', 'arg3'])
        })

        test('ignores multiple spaces outside quotes', () => {
            const result = ArgumentsBuilder.parseArgumentString('arg1    arg2  arg3')
            expect(result).toEqual(['arg1', 'arg2', 'arg3'])
        })

        test('preserves spaces inside quotes', () => {
            const result = ArgumentsBuilder.parseArgumentString('arg1 "  spaced  out  " arg3')
            expect(result).toEqual(['arg1', '  spaced  out  ', 'arg3'])
        })

        test('handles empty string', () => {
            const result = ArgumentsBuilder.parseArgumentString('')
            expect(result).toEqual([])
        })

        test('handles string with only spaces', () => {
            const result = ArgumentsBuilder.parseArgumentString('   ')
            expect(result).toEqual([])
        })
    })

    describe('complex scenarios', () => {
        beforeEach(() => {
            mockPlatform.mockReturnValue('win32')
        })

        test('complex command with multiple types of arguments', () => {
            const args = new ArgumentsBuilder()
                .addArgument('command')
                .addFlag('verbose')
                .addKeyValue('input', 'file with spaces.txt')
                .addKeyValueEquals('format', 'json')
                .addCommaList('tags', ['tag1', 'tag with space', 'tag with "quotes"'])
                .build()

            expect(args).toEqual([
                'command',
                '--verbose',
                '--input',
                '"file with spaces.txt"',
                '--format=json',
                '--tags',
                'tag1,"tag with space","tag with \\"quotes\\""'
            ])
        })

        test('command with path characters', () => {
            // Test Windows paths
            const args = new ArgumentsBuilder().addArgument('C:\\Program Files\\App\\tool.exe').addKeyValue('output', 'D:\\My Documents\\output.txt').build()

            expect(args).toEqual(['"C:\\\\Program Files\\\\App\\\\tool.exe"', '--output', '"D:\\\\My Documents\\\\output.txt"'])
        })
    })

    describe('Unix paths and commands', () => {
        beforeEach(() => {
            mockPlatform.mockReturnValue('linux')
        })

        test('command with Unix paths', () => {
            const args = new ArgumentsBuilder()
                .addArgument('/usr/local/bin/tool')
                .addKeyValue('config', '/etc/app/config.json')
                .addKeyValue('output', '/home/user/Documents/output file.txt')
                .build()

            expect(args).toEqual(['/usr/local/bin/tool', '--config', '/etc/app/config.json', '--output', "'/home/user/Documents/output file.txt'"])
        })

        test('command with environmental variables', () => {
            const args = new ArgumentsBuilder().addArgument('tool').addKeyValue('home', '$HOME/files').addKeyValue('user', '$(whoami)').build()

            expect(args).toEqual(['tool', '--home', "'$HOME/files'", '--user', "'$(whoami)'"])
        })
    })
})
