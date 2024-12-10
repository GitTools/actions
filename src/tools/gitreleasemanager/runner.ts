import { type ExecResult, type IBuildAgent } from '@agents/common'
import { type IRunner } from '@tools/common'
import { type Commands } from './models'
import { GitReleaseManagerTool } from './tool'

export class Runner implements IRunner {
    private readonly gitReleaseManagerTool: GitReleaseManagerTool

    constructor(private readonly buildAgent: IBuildAgent) {
        this.gitReleaseManagerTool = new GitReleaseManagerTool(this.buildAgent)
    }

    async run(command: Commands): Promise<ExecResult> {
        switch (command) {
            case 'setup':
                return await this.setup()
            case 'addasset':
                return await this.addAsset()
            case 'open':
                return await this.open()
            case 'close':
                return await this.close()
            case 'create':
                return await this.create()
            case 'discard':
                return await this.discard()
            case 'publish':
                return await this.publish()
        }
    }

    private async setup(): Promise<ExecResult> {
        return this.safeExecute(async () => {
            await this.gitReleaseManagerTool.install()
            return { code: 0 }
        }, 'GitReleaseManager setup successfully')
    }

    private async create(): Promise<ExecResult> {
        return this.safeExecute(async () => this.gitReleaseManagerTool.create(), 'GitReleaseManager created release successfully')
    }

    private async discard(): Promise<ExecResult> {
        return this.safeExecute(async () => this.gitReleaseManagerTool.discard(), 'GitReleaseManager discarded release successfully')
    }

    private async close(): Promise<ExecResult> {
        return this.safeExecute(async () => this.gitReleaseManagerTool.close(), 'GitReleaseManager closed release successfully')
    }

    private async open(): Promise<ExecResult> {
        return this.safeExecute(async () => this.gitReleaseManagerTool.open(), 'GitReleaseManager opened release successfully')
    }

    private async publish(): Promise<ExecResult> {
        return this.safeExecute(async () => this.gitReleaseManagerTool.publish(), 'GitReleaseManager published release successfully')
    }

    private async addAsset(): Promise<ExecResult> {
        return this.safeExecute(async () => this.gitReleaseManagerTool.addAsset(), 'GitReleaseManager added assets to release successfully')
    }

    private async safeExecute(action: () => Promise<ExecResult>, successMessage: string): Promise<ExecResult> {
        try {
            this.disableTelemetry()
            const result = await action()

            if (result.code === 0) {
                this.buildAgent.info('Output:')
                this.buildAgent.info('-------------------')
                this.buildAgent.info(result.stdout as string)
                this.buildAgent.info('-------------------')
                this.buildAgent.setSucceeded(successMessage, true)
                return result
            } else {
                this.buildAgent.error(result.stderr as string)
                this.buildAgent.setFailed(result.stderr as string, true)
                return result
            }
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.error(error.message)
                this.buildAgent.setFailed(error.message, true)
            }
            return {
                code: -1,
                error: error as Error
            }
        }
    }

    private disableTelemetry(): void {
        this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`)
        this.buildAgent.debug('Disabling telemetry')
        this.gitReleaseManagerTool.disableTelemetry()
    }
}
