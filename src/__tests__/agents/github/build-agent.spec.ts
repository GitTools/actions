import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BuildAgent, prepareKeyValueMessage } from '@agents/github'
import process from 'node:process'
import * as fs from 'node:fs'
import * as crypto from 'node:crypto'

describe('build-agent/github', () => {
    let agent: BuildAgent

    beforeEach(() => {
        vi.resetAllMocks()
        agent = new BuildAgent()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    it('should return agent name', () => {
        expect(agent.agentName).toBe('GitHub Actions')
    })

    it('should return cache dir variable', () => {
        expect(agent.cacheDirVariable).toBe('RUNNER_TOOL_CACHE')
    })

    it('should return temp dir variable', () => {
        expect(agent.tempDirVariable).toBe('RUNNER_TEMP')
    })

    it('should return source dir variable', () => {
        expect(agent.sourceDirVariable).toBe('GITHUB_WORKSPACE')
    })

    it('should log debug', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.debug('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('::debug::test\n')
    })

    it('should log info', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.info('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('test\n')
    })

    it('should log warn', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.warn('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('::warning::test\n')
    })

    it('should log error', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.error('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('::error::test\n')
    })

    it('should set succeeded', () => {
        agent.setSucceeded('test')
        expect(process.exitCode).toBe(0)
    })

    it('should set failed', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.setFailed('test')
        expect(process.exitCode).toBe(1)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('::error::test\n')
    })

    it('should set output', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.setOutput('name', 'value')

        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenCalledWith('::set-output name=name::value\n')

        vi.mock('fs')
        vi.mock('crypto')

        const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
        const appendFileSyncSpy = vi.spyOn(fs, 'appendFileSync')

        const cryptoSpy = vi.spyOn(crypto, 'randomUUID').mockReturnValue('775ae74d-e02a-44b5-a288-52b415a7e823')
        process.env['GITHUB_OUTPUT'] = 'test.env'

        agent.setOutput('name', 'value')

        expect(existsSpy).toHaveBeenCalledTimes(1)
        expect(existsSpy).toHaveBeenCalledWith('test.env')

        expect(cryptoSpy).toHaveBeenCalledTimes(1)

        const expected = prepareKeyValueMessage('name', 'value')

        expect(appendFileSyncSpy).toHaveBeenCalledTimes(1)
        expect(appendFileSyncSpy).toHaveBeenCalledWith('test.env', `${expected}\n`, { encoding: 'utf8' })

        expect(spy).toHaveBeenCalledTimes(2)
        expect(spy).toHaveBeenCalledWith('::set-output name=name::value\n')
    })

    it('should set variable', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.setVariable('name', 'value')
        expect(process.env['name']).toBe('value')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('::set-env name=name::value\n')

        vi.mock('fs')
        vi.mock('crypto')

        const existsSpy = vi.spyOn(fs, 'existsSync').mockReturnValue(true)
        const appendFileSyncSpy = vi.spyOn(fs, 'appendFileSync')

        const cryptoSpy = vi.spyOn(crypto, 'randomUUID').mockReturnValue('775ae74d-e02a-44b5-a288-52b415a7e823')
        process.env['GITHUB_ENV'] = 'test.env'

        agent.setVariable('name', 'value')

        expect(process.env['name']).toBe('value')
        expect(existsSpy).toHaveBeenCalledTimes(1)
        expect(existsSpy).toHaveBeenCalledWith('test.env')

        expect(cryptoSpy).toHaveBeenCalledTimes(1)

        const expected = prepareKeyValueMessage('name', 'value')

        expect(appendFileSyncSpy).toHaveBeenCalledTimes(1)
        expect(appendFileSyncSpy).toHaveBeenCalledWith('test.env', `${expected}\n`, { encoding: 'utf8' })

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('::set-env name=name::value\n')
    })
})
