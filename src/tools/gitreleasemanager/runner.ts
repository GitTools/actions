import { IGitReleaseManagerTool, GitReleaseManagerTool } from './tool'
import { GitReleaseManagerSettingsProvider, IGitReleaseManagerSettingsProvider } from './settings'

import container from '../common/ioc'
import { IBuildAgent } from '../../agents/common/build-agent'
import { TYPES } from '../common/models'

container.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool)
container.bind<IGitReleaseManagerSettingsProvider>(TYPES.IGitReleaseManagerSettingsProvider).to(GitReleaseManagerSettingsProvider)

const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent)
const gitReleaseManagerTool = container.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool)
const settingsProvider = container.get<IGitReleaseManagerSettingsProvider>(TYPES.IGitReleaseManagerSettingsProvider)

export class Runner {

    async setup() {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getSetupSettings()

            await gitReleaseManagerTool.install(settings)

            buildAgent.setSucceeded('GitReleaseManager installed successfully', true)
        } catch (error) {
            buildAgent.setFailed(error.message, true)
        }
    }

    async create() {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getCreateSettings()

            await gitReleaseManagerTool.create(settings)

            buildAgent.setSucceeded('GitReleaseManager created release successfully', true)
        } catch (error) {
            buildAgent.setFailed(error.message, true)
        }
    }

    async discard() {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getDiscardSettings()

            await gitReleaseManagerTool.discard(settings)

            buildAgent.setSucceeded('GitReleaseManager discarded release successfully', true)
        } catch (error) {
            buildAgent.setFailed(error.message, true)
        }
    }

    async close() {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getCloseSettings()

            await gitReleaseManagerTool.close(settings)

            buildAgent.setSucceeded('GitReleaseManager closed release successfully', true)
        } catch (error) {
            buildAgent.setFailed(error.message, true)
        }
    }

    async open() {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getOpenSettings()

            await gitReleaseManagerTool.open(settings)

            buildAgent.setSucceeded('GitReleaseManager opened release successfully', true)
        } catch (error) {
            buildAgent.setFailed(error.message, true)
        }
    }

    async publish() {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getPublishSettings()

            await gitReleaseManagerTool.publish(settings)

            buildAgent.setSucceeded('GitReleaseManager published release successfully', true)
        } catch (error) {
            buildAgent.setFailed(error.message, true)
        }
    }

    async addAsset() {
        try {
            gitReleaseManagerTool.disableTelemetry()

            const settings = settingsProvider.getAddAssetSettings()

            await gitReleaseManagerTool.addAsset(settings)

            buildAgent.setSucceeded('GitReleaseManager added assets to release successfully', true)
        } catch (error) {
            buildAgent.setFailed(error.message, true)
        }
    }
}
