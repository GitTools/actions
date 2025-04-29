import { type ExecResult, type IBuildAgent } from '@agents/common'
import { type Commands, type GitVersionOutput } from './models'
import { GitVersionTool } from './tool'
import { RunnerBase } from '../common/runner'

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
        return this.safeExecute(async () => {
            const result = await this.tool.executeJson()
            this.buildAgent.debug('Parsing GitVersion output')
            return this.processGitVersionOutput(result)
        }, 'GitVersion executed successfully')
    }

    private async command(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.executeCommand(), 'GitVersion executed successfully')
    }

    private processGitVersionOutput(result: ExecResult): ExecResult {
        const stdout = result.stdout as string
        if (stdout.lastIndexOf('{') === -1 || stdout.lastIndexOf('}') === -1) {
            const errorMessage = 'GitVersion output is not valid JSON, see output details'
            this.buildAgent.debug(errorMessage)
            this.buildAgent.setFailed(errorMessage, true)
            return {
                code: -1,
                error: new Error(errorMessage)
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
