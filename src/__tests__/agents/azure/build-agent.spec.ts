import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { BuildAgent } from '@agents/azure'
import process from 'node:process'
import * as os from 'node:os'
import { isAzurePipelinesAgent } from '../../tools/common/utils.ts'

describe.skipIf(isAzurePipelinesAgent())('build-agent/azure', () => {
    let agent: BuildAgent

    beforeEach(() => {
        agent = new BuildAgent()
    })

    afterEach(() => {
        vi.resetAllMocks()
    })

    it('should return agent name', () => {
        expect(agent.agentName).toBe('Azure Pipelines')
    })

    it('should return cache dir variable', () => {
        expect(agent.cacheDirVariable).toBe('AGENT_TOOLSDIRECTORY')
    })

    it('should return temp dir variable', () => {
        expect(agent.tempDirVariable).toBe('AGENT_TEMPDIRECTORY')
    })

    it('should return source dir variable', () => {
        expect(agent.sourceDirVariable).toBe('BUILD_SOURCESDIRECTORY')
    })

    it('should log debug', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.debug('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`##vso[task.debug]test${os.EOL}`)
    })

    it('should log info', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.info('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`test${os.EOL}`)
    })

    it('should log warn', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.warn('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`##vso[task.issue type=warning;]test${os.EOL}`)
    })

    it('should log error', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.error('test')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`##vso[task.issue type=error;]test${os.EOL}`)
    })

    it('should set succeeded', () => {
        const spyInfo = vi.spyOn(agent, 'info')
        const spyDebug = vi.spyOn(agent, 'debug')
        const spyWrite = vi.spyOn(process.stdout, 'write')

        agent.setSucceeded('test', true)

        expect(spyDebug).toHaveBeenCalledTimes(1)
        expect(spyDebug).toHaveBeenCalledWith('task result: Succeeded')

        expect(spyInfo).toHaveBeenCalledTimes(1)
        expect(spyInfo).toHaveBeenCalledWith('test')

        expect(spyWrite).toHaveBeenCalledTimes(3)

        expect(spyWrite).toHaveBeenCalledWith(`##vso[task.debug]task result: Succeeded${os.EOL}`)
        expect(spyWrite).toHaveBeenCalledWith(`##vso[task.complete result=Succeeded;done=true;]test${os.EOL}`)
    })

    it('should set failed', () => {
        const spyError = vi.spyOn(agent, 'error')
        const spyDebug = vi.spyOn(agent, 'debug')
        const spyWrite = vi.spyOn(process.stdout, 'write')

        agent.setFailed('test', true)

        expect(spyDebug).toHaveBeenCalledTimes(1)
        expect(spyDebug).toHaveBeenCalledWith('task result: Failed')

        expect(spyError).toHaveBeenCalledTimes(1)
        expect(spyError).toHaveBeenCalledWith('test')

        expect(spyWrite).toHaveBeenCalledTimes(3)

        expect(spyWrite).toHaveBeenCalledWith(`##vso[task.debug]task result: Failed${os.EOL}`)
        expect(spyWrite).toHaveBeenCalledWith(`##vso[task.issue type=error;]test${os.EOL}`)
        expect(spyWrite).toHaveBeenCalledWith(`##vso[task.complete result=Failed;done=true;]test${os.EOL}`)
    })

    it('should set environment variable', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.setVariable('test', 'value')
        expect(process.env['TEST']).toBe('value')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`##vso[task.setvariable variable=test;isOutput=false;issecret=false;]value${os.EOL}`)
    })

    it('should set output', () => {
        const spy = vi.spyOn(process.stdout, 'write')

        agent.setOutput('test', 'value')
        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(`##vso[task.setvariable variable=test;isOutput=true;issecret=false;]value${os.EOL}`)
    })

    it('should update build number', () => {
        const spyDebug = vi.spyOn(agent, 'debug')
        const spyWrite = vi.spyOn(process.stdout, 'write')

        agent.updateBuildNumber('test')
        expect(spyDebug).toHaveBeenCalledTimes(1)
        expect(spyDebug).toHaveBeenCalledWith('build number: test')
        expect(spyWrite).toHaveBeenCalledWith(`##vso[build.updatebuildnumber]test${os.EOL}`)
    })
})
