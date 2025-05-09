import type { IRunner } from './models.ts'
import { ExecResult, IBuildAgent } from '@agents/common'
import { IDotnetTool } from './dotnet-tool.ts'

export abstract class RunnerBase implements IRunner {
    protected abstract tool: IDotnetTool

    abstract run(command: string): Promise<ExecResult>

    protected constructor(protected readonly buildAgent: IBuildAgent) {}

    protected disableTelemetry(): void {
        this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`)
        this.buildAgent.debug('Disabling telemetry')
        this.tool.disableTelemetry()
    }

    protected async safeExecute(action: () => Promise<ExecResult>, successMessage: string): Promise<ExecResult> {
        try {
            this.disableTelemetry()
            const result = await action()

            if (result.stdout) {
                this.buildAgent.info(`${this.tool.toolName} Output:`)
                this.buildAgent.info('-------------------')
                this.buildAgent.info(result.stdout)
                this.buildAgent.info('-------------------')
            }
            if (result.code === 0) {
                this.buildAgent.debug(`${this.tool.toolName} succeeded`)
                this.buildAgent.setSucceeded(successMessage, true)
                return result
            } else {
                this.buildAgent.debug(`${this.tool.toolName} failed`)
                this.buildAgent.error(result.stderr as string)
                this.buildAgent.setFailed(result.stderr as string, true)
                return result
            }
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.debug(`${this.tool.toolName} failed`)
                this.buildAgent.error(error.message)
                this.buildAgent.setFailed(error.message, true)
            }
            return {
                code: -1,
                error: error as Error
            }
        }
    }
}
