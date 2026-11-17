import { describe, expect, it, vi } from 'vitest'
import { type ExecResult, type IBuildAgent } from '@agents/common'
import { RunnerBase } from '../../../tools/common/runner'
import { type IDotnetTool } from '@tools/common'

class TestRunner extends RunnerBase {
    protected tool = { toolName: 'diagnostic-tool', disableTelemetry: vi.fn() } as unknown as IDotnetTool

    async run(): Promise<ExecResult> {
        return this.safeExecute(async () => await Promise.resolve(this.result), 'completed')
    }

    constructor(
        agent: IBuildAgent,
        private result: ExecResult
    ) {
        super(agent)
    }
}

describe('runner diagnostics', () => {
    it('logs successful stderr diagnostics without failing the task', async () => {
        const agent = { info: vi.fn(), debug: vi.fn(), error: vi.fn(), setSucceeded: vi.fn(), setFailed: vi.fn() }
        const result = { code: 0, stdout: 'version output', stderr: 'INFO calculation details' }
        expect(await new TestRunner(agent as unknown as IBuildAgent, result).run()).toBe(result)
        expect(agent.info).toHaveBeenCalledWith(result.stdout)
        expect(agent.info).toHaveBeenCalledWith(result.stderr)
        expect(agent.error).not.toHaveBeenCalled()
        expect(agent.setFailed).not.toHaveBeenCalled()
        expect(agent.setSucceeded).toHaveBeenCalledWith('completed', true)
    })

    it('reports failed stderr as an error instead of successful diagnostics', async () => {
        const agent = { info: vi.fn(), debug: vi.fn(), error: vi.fn(), setSucceeded: vi.fn(), setFailed: vi.fn() }
        const result = { code: 1, stderr: 'invalid configuration' }
        expect(await new TestRunner(agent as unknown as IBuildAgent, result).run()).toBe(result)
        expect(agent.error).toHaveBeenCalledWith(result.stderr)
        expect(agent.setFailed).toHaveBeenCalledWith(result.stderr, true)
        expect(agent.info).not.toHaveBeenCalledWith(result.stderr)
        expect(agent.setSucceeded).not.toHaveBeenCalled()
    })
})
