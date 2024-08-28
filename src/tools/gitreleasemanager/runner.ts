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
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Installing GitReleaseManager')
            const toolPath = await this.gitReleaseManagerTool.install()

            const pathVariable = this.gitReleaseManagerTool.toolPathVariable
            this.buildAgent.info(`Set ${pathVariable} to ${toolPath}`)
            this.buildAgent.setVariable(pathVariable, toolPath)

            this.buildAgent.setSucceeded('GitReleaseManager installed successfully', true)
            return {
                code: 0
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

    private async create(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Creating release')

            const result = await this.gitReleaseManagerTool.create()

            this.buildAgent.setSucceeded('GitReleaseManager created release successfully', true)
            return result
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

    private async discard(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Discarding release')

            const result = await this.gitReleaseManagerTool.discard()

            this.buildAgent.setSucceeded('GitReleaseManager discarded release successfully', true)
            return result
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

    private async close(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Closing release')

            const result = await this.gitReleaseManagerTool.close()

            this.buildAgent.setSucceeded('GitReleaseManager closed release successfully', true)
            return result
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

    private async open(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Opening release')

            const result = await this.gitReleaseManagerTool.open()

            this.buildAgent.setSucceeded('GitReleaseManager opened release successfully', true)
            return result
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

    private async publish(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Publishing release')

            const result = await this.gitReleaseManagerTool.publish()

            this.buildAgent.setSucceeded('GitReleaseManager published release successfully', true)
            return result
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

    private async addAsset(): Promise<ExecResult> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Adding asset to release')

            const result = await this.gitReleaseManagerTool.addAsset()

            this.buildAgent.setSucceeded('GitReleaseManager added assets to release successfully', true)
            return result
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

    private disableTelemetry(): void {
        this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`)
        this.buildAgent.debug('Disabling telemetry')
        this.gitReleaseManagerTool.disableTelemetry()
    }
}
