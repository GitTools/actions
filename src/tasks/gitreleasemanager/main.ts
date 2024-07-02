import { TYPES } from '../../core/models'
import { IGitReleaseManagerTool, GitReleaseManagerTool } from '../../tools/gitreleasemanager/tool'
import { IGitReleaseManagerSettingsProvider } from '../../tools/gitreleasemanager/models'
import { GitReleaseManagerSettingsProvider } from '../../tools/gitreleasemanager/settings'

import container from '../../core/ioc'
import { IBuildAgent } from '../../agents/common/build-agent'

container.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool)
container.bind<IGitReleaseManagerSettingsProvider>(TYPES.IGitReleaseManagerSettingsProvider).to(GitReleaseManagerSettingsProvider)

const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent)
const gitReleaseManagerTool = container.get<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool)
const settingsProvider = container.get<IGitReleaseManagerSettingsProvider>(TYPES.IGitReleaseManagerSettingsProvider)

export async function setup() {
    try {
        gitReleaseManagerTool.disableTelemetry()

        const settings = settingsProvider.getSetupSettings()

        await gitReleaseManagerTool.install(settings)

        buildAgent.setSucceeded('GitReleaseManager installed successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function create() {
    try {
        gitReleaseManagerTool.disableTelemetry()

        const settings = settingsProvider.getCreateSettings()

        await gitReleaseManagerTool.create(settings)

        buildAgent.setSucceeded('GitReleaseManager created release successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function discard() {
    try {
        gitReleaseManagerTool.disableTelemetry()

        const settings = settingsProvider.getDiscardSettings()

        await gitReleaseManagerTool.discard(settings)

        buildAgent.setSucceeded('GitReleaseManager discarded release successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function close() {
    try {
        gitReleaseManagerTool.disableTelemetry()

        const settings = settingsProvider.getCloseSettings()

        await gitReleaseManagerTool.close(settings)

        buildAgent.setSucceeded('GitReleaseManager closed release successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function open() {
    try {
        gitReleaseManagerTool.disableTelemetry()

        const settings = settingsProvider.getOpenSettings()

        await gitReleaseManagerTool.open(settings)

        buildAgent.setSucceeded('GitReleaseManager opened release successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function publish() {
    try {
        gitReleaseManagerTool.disableTelemetry()

        const settings = settingsProvider.getPublishSettings()

        await gitReleaseManagerTool.publish(settings)

        buildAgent.setSucceeded('GitReleaseManager published release successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function addAsset() {
    try {
        gitReleaseManagerTool.disableTelemetry()

        const settings = settingsProvider.getAddAssetSettings()

        await gitReleaseManagerTool.addAsset(settings)

        buildAgent.setSucceeded('GitReleaseManager added assets to release successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}
