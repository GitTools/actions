import { IBuildAgent } from '@agents/common'
import { type Commands } from './models'
import { GitReleaseManagerTool } from './tool'

export class Runner {
    private readonly gitReleaseManagerTool: GitReleaseManagerTool

    constructor(private readonly buildAgent: IBuildAgent) {
        this.gitReleaseManagerTool = new GitReleaseManagerTool(this.buildAgent)
    }

    async run(command: Commands): Promise<number> {
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

    private async setup(): Promise<number> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Installing GitReleaseManager')
            const toolPath = await this.gitReleaseManagerTool.install()

            const pathVariable = this.gitReleaseManagerTool.toolPathVariable
            this.buildAgent.info(`Set ${pathVariable} to ${toolPath}`)
            this.buildAgent.setVariable(pathVariable, toolPath)

            this.buildAgent.setSucceeded('GitReleaseManager installed successfully', true)
            return 0
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return -1
        }
    }

    private async create(): Promise<number> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Creating release')

            await this.gitReleaseManagerTool.create()

            this.buildAgent.setSucceeded('GitReleaseManager created release successfully', true)
            return 0
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return -1
        }
    }

    private async discard(): Promise<number> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Discarding release')

            await this.gitReleaseManagerTool.discard()

            this.buildAgent.setSucceeded('GitReleaseManager discarded release successfully', true)
            return 0
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return -1
        }
    }

    private async close(): Promise<number> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Closing release')

            await this.gitReleaseManagerTool.close()

            this.buildAgent.setSucceeded('GitReleaseManager closed release successfully', true)
            return 0
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return -1
        }
    }

    private async open(): Promise<number> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Opening release')

            await this.gitReleaseManagerTool.open()

            this.buildAgent.setSucceeded('GitReleaseManager opened release successfully', true)
            return 0
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return -1
        }
    }

    private async publish(): Promise<number> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Publishing release')

            await this.gitReleaseManagerTool.publish()

            this.buildAgent.setSucceeded('GitReleaseManager published release successfully', true)
            return 0
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return -1
        }
    }

    private async addAsset(): Promise<number> {
        try {
            this.disableTelemetry()

            this.buildAgent.debug('Adding asset to release')

            await this.gitReleaseManagerTool.addAsset()

            this.buildAgent.setSucceeded('GitReleaseManager added assets to release successfully', true)
            return 0
        } catch (error) {
            if (error instanceof Error) {
                this.buildAgent.setFailed(error.message, true)
            }
            return -1
        }
    }

    private disableTelemetry(): void {
        this.buildAgent.info(`Running on: '${this.buildAgent.agentName}'`)
        this.buildAgent.debug('Disabling telemetry')
        this.gitReleaseManagerTool.disableTelemetry()
    }
}
