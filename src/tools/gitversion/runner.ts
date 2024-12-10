import { type ExecResult, type IBuildAgent } from '@agents/common'
import { type Commands, type GitVersionOutput } from './models'
import { GitVersionTool } from './tool'
import { RunnerBase } from '../common/RunnerBase.ts'

export class Runner extends RunnerBase {
    protected readonly tool: GitVersionTool

    constructor(protected readonly buildAgent: IBuildAgent) {
        super(buildAgent)
        this.tool = new GitVersionTool(this.buildAgent)
    }

    async run(command: Commands): Promise<ExecResult> {
        switch (command) {
            case 'setup':
                return await this.setup()
            case 'execute':
                return await this.execute()
            case 'command':
                return await this.command()
        }
    }

    private async setup(): Promise<ExecResult> {
        return this.safeExecute(async () => {
            await this.tool.install()
            return { code: 0 }
        }, 'GitVersion setup successfully')
    }

    private async execute(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.info('Executing GitVersion')

            const result = await this.tool.executeJson()

            if (result.code === 0) {
                this.buildAgent.info('GitVersion executed successfully')
                const stdout: string = result.stdout as string

                this.buildAgent.info('GitVersion output:')
                this.buildAgent.info('-------------------')
                this.buildAgent.info(stdout)
                this.buildAgent.info('-------------------')
                this.buildAgent.debug('Parsing GitVersion output')

                return this.processGitVersionOutput(result)
            } else {
                this.buildAgent.debug('GitVersion failed')
                const error = result.error
                if (error instanceof Error) {
                    this.buildAgent.setFailed(error.message, true)
                }
                return result
            }
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return {
                code: -1,
                error: error as Error
            }
        }
    }

    private async command(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.info('Executing GitVersion')

            const result = await this.tool.executeCommand()

            if (result.code === 0) {
                this.buildAgent.info('GitVersion executed successfully')
                const stdout = result.stdout as string

                this.buildAgent.info('GitVersion output:')
                this.buildAgent.info('-------------------')
                this.buildAgent.info(stdout)
                this.buildAgent.info('-------------------')

                this.buildAgent.setSucceeded('GitVersion executed successfully', true)
                return result
            } else {
                this.buildAgent.debug('GitVersion failed')
                const error = result.error
                if (error instanceof Error) {
                    this.buildAgent.setFailed(error.message, true)
                }
                return result
            }
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return {
                code: -1,
                error: error as Error
            }
        }
    }

    private processGitVersionOutput(result: ExecResult): ExecResult {
        const stdout = result.stdout as string
        if (stdout.lastIndexOf('{') === -1 || stdout.lastIndexOf('}') === -1) {
            this.buildAgent.debug('GitVersion output is not valid JSON')
            this.buildAgent.setFailed('GitVersion output is not valid JSON', true)
            return {
                code: -1,
                error: new Error('GitVersion output is not valid JSON')
            }
        } else {
            const jsonOutput = stdout.substring(stdout.lastIndexOf('{'), stdout.lastIndexOf('}') + 1)

            const gitVersionOutput = JSON.parse(jsonOutput) as GitVersionOutput
            this.tool.writeGitVersionToAgent(gitVersionOutput)
            this.buildAgent.setSucceeded('GitVersion executed successfully', true)
            return result
        }
    }
}
