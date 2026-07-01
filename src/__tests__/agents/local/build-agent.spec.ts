import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { BuildAgent } from '@agents/local'
import process from 'node:process'
import os from 'node:os'

describe('build-agent/local', () => {
    let agent: BuildAgent

    beforeEach(() => {
        agent = new BuildAgent()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    it('should return agent name', () => {
        expect(agent.agentName).toBe('Local')
    })

    it('should return cache dir variable', () => {
        expect(agent.cacheDirVariable).toBe('AGENT_TOOLS_DIR')
    })

    it('should return temp dir variable', () => {
        expect(agent.tempDirVariable).toBe('AGENT_TEMP_DIR')
    })

    it('should return source dir variable', () => {
        expect(agent.sourceDirVariable).toBe('AGENT_SOURCE_DIR')
    })

    it('should log debug', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.debug('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`[debug] test${os.EOL}`)
    })

    it('should log info', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.info('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`[info] - test${os.EOL}`)
    })

    it('should log warn', () => {
        const spy = vi.spyOn(process.stderr, 'write')

        agent.warn('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`[warn] - test${os.EOL}`)
    })

    it('should log error', () => {
        const spy = vi.spyOn(process.stderr, 'write')

        agent.error('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`[error] - test${os.EOL}`)
    })

    it('should set succeeded', () => {
        const spy = vi.spyOn(agent, 'info')

        agent.setSucceeded('test', true)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('setSucceeded - test - true')
    })

    it('should set failed', () => {
        const spy = vi.spyOn(agent, 'error')

        agent.setFailed('test', true)
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('setFailed - test - true')
    })

    it('should set environment variable', () => {
        agent.setVariable('test', 'value')
        expect(process.env['test']).toBe('value')
    })

    it('should set output', () => {
        const spy = vi.spyOn(agent, 'debug')

        agent.setOutput('test', 'value')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('setOutput - test - value')
    })

    it('should update build number', () => {
        const spy = vi.spyOn(agent, 'debug')

        agent.updateBuildNumber('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith('updateBuildNumber - test')
    })

    it('should expand both braced and unbraced environment variables', () => {
        process.env['GITVERSION_SEMVER'] = '1.2.3'
        process.env['GITVERSION_FULLSEMVER'] = '1.2.3-beta.1'

        const expanded = agent.getExpandedString('v$GITVERSION_SEMVER (${GitVersion_FullSemVer})')

        expect(expanded).toBe('v1.2.3 (1.2.3-beta.1)')
    })

    it('should ignore invalid or missing environment variable placeholders', () => {
        process.env['VALID_NAME_1'] = 'present'

        const expanded = agent.getExpandedString('$VALID_NAME_1 ${} $1INVALID $MISSING')

        expect(expanded).toBe('present ${} $1INVALID ')
    })
})
