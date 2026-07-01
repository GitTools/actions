import { describe, expect, it, vi } from 'vitest'
import * as os from 'node:os'
import process from 'node:process'
import { issueCommand } from '@agents/github'

describe('github command', () => {
    it('formats properties without trailing separators', () => {
        const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)

        issueCommand(
            'set-output',
            {
                name: 'example',
                empty: '',
                another: 'value,with:chars'
            },
            'payload'
        )

        expect(spy).toHaveBeenCalledWith(`::set-output name=example,another=value%2Cwith%3Achars::payload${os.EOL}`)
    })
})
