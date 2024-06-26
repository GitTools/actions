import { IGitReleaseManagerTool, GitReleaseManagerTool } from './tool'

import container from '../common/ioc'
import { IBuildAgent } from '../../agents/common/build-agent'
import { TYPES } from '../common/models'
import { type Commands } from './models'

container.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool)

const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent)
const gitReleaseManagerTool = container.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool)

export class Runner {
    private buildAgent: IBuildAgent
    private gitReleaseManagerTool: IGitReleaseManagerTool

    constructor() {
        this.buildAgent = buildAgent
        this.gitReleaseManagerTool = gitReleaseManagerTool
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

            this.buildAgent.debug('Installing GitVersion')

            await this.gitReleaseManagerTool.install()

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
