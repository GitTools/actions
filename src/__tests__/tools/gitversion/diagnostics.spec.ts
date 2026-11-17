import { afterEach, expect, it, vi } from 'vitest'
import { type IBuildAgent } from '@agents/common'
import { GitVersionTool, Runner } from '@tools/gitversion'

afterEach(() => vi.restoreAllMocks())

it('preserves successful tool diagnostics when output parsing fails', async () => {
    const agent = { info: vi.fn(), debug: vi.fn(), error: vi.fn(), setVariable: vi.fn(), setSucceeded: vi.fn(), setFailed: vi.fn() }
    vi.spyOn(GitVersionTool.prototype, 'executeJson').mockResolvedValue({
        code: 0,
        stderr: 'INFO version calculation details',
        outputFile: 'variables.json'
    })
    vi.spyOn(GitVersionTool.prototype, 'readGitVersionOutput').mockRejectedValue(new Error('invalid JSON fixture'))
    const result = await new Runner(agent as unknown as IBuildAgent).run('execute')
    expect(result.code).toBe(-1)
    expect(result.stderr).toContain('INFO version calculation details')
    expect(result.stderr).toContain('Failed to read or parse GitVersion variables file: invalid JSON fixture')
    expect(agent.error).toHaveBeenCalledWith(result.stderr)
    expect(agent.setFailed).toHaveBeenCalledWith(result.stderr, true)
    expect(agent.setSucceeded).not.toHaveBeenCalled()
})
