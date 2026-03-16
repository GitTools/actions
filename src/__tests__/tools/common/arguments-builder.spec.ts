import { describe, expect, test } from 'vitest'
import { ArgumentsBuilder } from '@tools/common'

describe('ArgumentsBuilder', () => {
    describe('addArgument', () => {
        test.each([
            ['basic argument without spaces', 'simple', ['simple']],
            ['argument with spaces is passed as-is', 'argument with spaces', ['argument with spaces']],
            ['argument with double quotes is passed as-is', 'argument "with" quotes', ['argument "with" quotes']],
            ['argument with single quotes is passed as-is', "argument 'with' quotes", ["argument 'with' quotes"]],
            ['argument with special characters is passed as-is', 'argument&with|special<chars>', ['argument&with|special<chars>']],
            ['empty string argument is ignored', '', []]
        ])('%s', (_, input, expected) => {
            expect(new ArgumentsBuilder().addArgument(input).build()).toEqual(expected)
        })
    })

    describe('addArguments', () => {
        test('adds multiple arguments as-is', () => {
            const args = new ArgumentsBuilder().addArguments(['arg1', 'arg2 with space', 'arg3']).build()

            expect(args).toEqual(['arg1', 'arg2 with space', 'arg3'])
        })
    })

    describe('addFlag', () => {
        test('adds flags with -- prefix', () => {
            const args = new ArgumentsBuilder().addFlag('flag').addFlag('another-flag').build()

            expect(args).toEqual(['--flag', '--another-flag'])
        })

        test('empty flag is ignored', () => {
            const args = new ArgumentsBuilder().addFlag('').build()

            expect(args).toEqual([])
        })
    })

    describe('addKeyValue', () => {
        test('adds key-value pair as-is', () => {
            const args = new ArgumentsBuilder().addKeyValue('key', 'value').addKeyValue('key2', 'value with spaces').build()

            expect(args).toEqual(['--key', 'value', '--key2', 'value with spaces'])
        })

        test('value with special characters is passed as-is', () => {
            const args = new ArgumentsBuilder().addKeyValue('key', "value with 'quotes'").build()

            expect(args).toEqual(['--key', "value with 'quotes'"])
        })

        test('null or undefined value is ignored', () => {
            const args = new ArgumentsBuilder().addKeyValue('key', null).addKeyValue('another').build()

            expect(args).toEqual([])
        })
    })

    describe('addKeyValueEquals', () => {
        test('adds equals-style key-value pair as-is', () => {
            const args = new ArgumentsBuilder().addKeyValueEquals('key', 'value').addKeyValueEquals('key2', 'value with spaces').build()

            expect(args).toEqual(['--key=value', '--key2=value with spaces'])
        })

        test('value with special characters is passed as-is', () => {
            const args = new ArgumentsBuilder().addKeyValueEquals('key', "value with 'quotes'").build()

            expect(args).toEqual(["--key=value with 'quotes'"])
        })
    })

    describe('addCommaList', () => {
        test('adds comma-separated list as-is', () => {
            const args = new ArgumentsBuilder().addCommaList('list', ['value1', 'value2', 'value with space']).build()

            expect(args).toEqual(['--list', 'value1,value2,value with space'])
        })

        test('empty list is ignored', () => {
            const args = new ArgumentsBuilder().addCommaList('list', []).build()

            expect(args).toEqual([])
        })
    })

    describe('multiple methods combined', () => {
        test('multiple argument types produce correct output', () => {
            const args = new ArgumentsBuilder().addArgument('first').addArgument('second with space').addFlag('flag').addKeyValue('key', 'value').build()

            expect(args).toEqual(['first', 'second with space', '--flag', '--key', 'value'])
        })
    })

    describe('parseArgumentString', () => {
        test.each([
            ['parses simple arguments', 'arg1 arg2 arg3', ['arg1', 'arg2', 'arg3']],
            ['parses quoted arguments', 'arg1 "arg with space" arg3', ['arg1', 'arg with space', 'arg3']],
            ['handles escaped quotes', String.raw`arg1 "arg \"with\" quotes" arg3`, ['arg1', 'arg "with" quotes', 'arg3']],
            ['handles escaped backslashes', String.raw`arg1 "arg \\ with backslash" arg3`, ['arg1', String.raw`arg \ with backslash`, 'arg3']],
            [
                'handles multiple escaped backslashes',
                String.raw`arg1 "arg \\\\ with multiple backslashes" arg3`,
                ['arg1', String.raw`arg \\ with multiple backslashes`, 'arg3']
            ],
            ['ignores multiple spaces outside quotes', 'arg1    arg2  arg3', ['arg1', 'arg2', 'arg3']],
            ['preserves spaces inside quotes', 'arg1 "  spaced  out  " arg3', ['arg1', '  spaced  out  ', 'arg3']],
            ['handles empty string', '', []],
            ['handles string with only spaces', '   ', []]
        ])('%s', (_, input, expected) => {
            expect(ArgumentsBuilder.parseArgumentString(input)).toEqual(expected)
        })
    })

    describe('complex scenarios', () => {
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
                'file with spaces.txt',
                '--format=json',
                '--tags',
                'tag1,tag with space,tag with "quotes"'
            ])
        })

        test('command with Windows paths', () => {
            const args = new ArgumentsBuilder()
                .addArgument(String.raw`C:\Program Files\App\tool.exe`)
                .addKeyValue('output', String.raw`D:\My Documents\output.txt`)
                .build()

            expect(args).toEqual([String.raw`C:\Program Files\App\tool.exe`, '--output', String.raw`D:\My Documents\output.txt`])
        })

        test('command with Unix paths', () => {
            const args = new ArgumentsBuilder()
                .addArgument('/usr/local/bin/tool')
                .addKeyValue('config', '/etc/app/config.json')
                .addKeyValue('output', '/home/user/Documents/output file.txt')
                .build()

            expect(args).toEqual(['/usr/local/bin/tool', '--config', '/etc/app/config.json', '--output', '/home/user/Documents/output file.txt'])
        })

        test('command with environment variables', () => {
            const args = new ArgumentsBuilder().addArgument('tool').addKeyValue('home', '$HOME/files').addKeyValue('user', '$(whoami)').build()

            expect(args).toEqual(['tool', '--home', '$HOME/files', '--user', '$(whoami)'])
        })
    })
})
