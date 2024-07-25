import { type ExecResult, type IBuildAgent } from '@agents/common'
import { type IRunner } from '@tools/common'
import { type Commands, type GitVersionOutput } from './models'
import { GitVersionTool } from './tool'

export class Runner implements IRunner {
    private readonly gitVersionTool: GitVersionTool

    constructor(private readonly buildAgent: IBuildAgent) {
        this.gitVersionTool = new GitVersionTool(this.buildAgent)
    }

    async run(command: Commands): Promise<ExecResult> {
        switch (command) {
            case 'setup':
                return await this.setup()
            case 'execute':
                return await this.execute()
        }
    }

    private async setup(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Installing GitVersion')
            const toolPath = await this.gitVersionTool.install()

            const pathVariable = this.gitVersionTool.toolPathVariable
            this.buildAgent.info(`Set ${pathVariable} to ${toolPath}`)
            this.buildAgent.setVariable(pathVariable, toolPath)

            this.buildAgent.setSucceeded('GitVersion installed successfully', true)
            return {
                code: 0
            }
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return {
                code: -1,
                error
            }
        }
    }

    private async execute(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.info('Executing GitVersion')

            const result = await this.gitVersionTool.executeJson()

            if (result.code === 0) {
                this.buildAgent.info('GitVersion executed successfully')
                const stdout: string = result.stdout as string

                this.buildAgent.info('GitVersion output:')
                this.buildAgent.info('-------------------')
                this.buildAgent.info(stdout)
                this.buildAgent.info('-------------------')
                this.buildAgent.debug('Parsing GitVersion output')

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
                    this.gitVersionTool.writeGitVersionToAgent(gitVersionOutput)
                    this.buildAgent.setSucceeded('GitVersion executed successfully', true)
                    return result
                }
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
                error
            }
        }
    }

    private disableTelemetry(): void {
        this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`)
        this.buildAgent.debug('Disabling telemetry')
        this.gitVersionTool.disableTelemetry()
    }
}
