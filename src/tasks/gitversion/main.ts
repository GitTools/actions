import { IBuildAgent, TYPES } from '../../core/models'
import { Settings as CommonSettings } from '../../core/settings'
import { Settings } from '../../tools/gitversion/settings'
import { IGitVersionTool, GitVersionTool } from '../../tools/gitversion/tool'
import {
    GitVersionSettings,
    GitVersionOutput
} from '../../tools/gitversion/models'

import container from '../../core/ioc'

container.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool)

const gitVersionTool = container.get<IGitVersionTool>(TYPES.IGitVersionTool)
const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent)

export async function setup() {
    try {
        gitVersionTool.disableTelemetry()

        const settings = CommonSettings.getSetupSettings(buildAgent)

        await gitVersionTool.install(
            settings.versionSpec,
            settings.includePrerelease
        )

        buildAgent.setSucceeded('GitVersion installed successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function run() {
    try {
        gitVersionTool.disableTelemetry()

        const settings: GitVersionSettings = Settings.getGitVersionSettings(
            buildAgent
        )

        const result = await gitVersionTool.run(settings)
        const { stdout } = result
        const jsonOutput = stdout.substring(stdout.indexOf('{'), stdout.indexOf('}') + 1)

        const gitversion = JSON.parse(jsonOutput) as GitVersionOutput
        gitVersionTool.writeGitVersionToAgent(gitversion)

        if (result.code === 0) {
            buildAgent.setSucceeded('GitVersion executed successfully', true)
        } else {
            buildAgent.setFailed(result.error.message, true)
        }
    } catch (error) {
        buildAgent.setFailed(error, true)
    }
}
