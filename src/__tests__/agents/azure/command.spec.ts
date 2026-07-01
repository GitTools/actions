import { afterEach, describe, expect, it, vi } from 'vitest'
import process from 'node:process'
import * as os from 'node:os'
import { issueCommand } from '@agents/azure'

describe('agents/azure/command', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('should stringify property values without adding nested template literal noise', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        issueCommand('task.setvariable', { variable: new String('name') }, 'value')

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`##vso[task.setvariable variable=name;]value${os.EOL}`)
    })
})
