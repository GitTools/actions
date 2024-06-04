import { IGitReleaseManagerTool, GitReleaseManagerTool } from './tool'
import { GitReleaseManagerSettingsProvider, IGitReleaseManagerSettingsProvider } from './settings'

import container from '../common/ioc'
import { IBuildAgent } from '../../agents/common/build-agent'
import { TYPES } from '../common/models'
import { type Commands } from './models'

container.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool)
container.bind<IGitReleaseManagerSettingsProvider>(TYPES.IGitReleaseManagerSettingsProvider).to(GitReleaseManagerSettingsProvider)

const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent)
const gitReleaseManagerTool = container.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool)
const settingsProvider = container.get<IGitReleaseManagerSettingsProvider>(TYPES.IGitReleaseManagerSettingsProvider)

export class Runner {
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
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getSetupSettings()

            await gitReleaseManagerTool.install(settings)

            buildAgent.setSucceeded('GitReleaseManager installed successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }

    private async create(): Promise<number> {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getCreateSettings()

            await gitReleaseManagerTool.create(settings)

            buildAgent.setSucceeded('GitReleaseManager created release successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }

    private async discard(): Promise<number> {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getDiscardSettings()

            await gitReleaseManagerTool.discard(settings)

            buildAgent.setSucceeded('GitReleaseManager discarded release successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }

    private async close(): Promise<number> {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getCloseSettings()

            await gitReleaseManagerTool.close(settings)

            buildAgent.setSucceeded('GitReleaseManager closed release successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }

    private async open(): Promise<number> {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getOpenSettings()

            await gitReleaseManagerTool.open(settings)

            buildAgent.setSucceeded('GitReleaseManager opened release successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }

    private async publish(): Promise<number> {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getPublishSettings()

            await gitReleaseManagerTool.publish(settings)

            buildAgent.setSucceeded('GitReleaseManager published release successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }

    private async addAsset(): Promise<number> {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getAddAssetSettings()

            await gitReleaseManagerTool.addAsset(settings)

            buildAgent.setSucceeded('GitReleaseManager added assets to release successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }
}
