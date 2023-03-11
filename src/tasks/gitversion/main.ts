import { IBuildAgent, TYPES } from '../../core/models'
import { IGitVersionTool, GitVersionTool } from '../../tools/gitversion/tool'
import { GitVersionSettings, GitVersionOutput, IGitVersionSettingsProvider } from '../../tools/gitversion/models'
import { GitVersionSettingsProvider } from '../../tools/gitversion/settings'

import container from '../../core/ioc'

container.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool)
container.bind<IGitVersionSettingsProvider>(TYPES.IGitVersionSettingsProvider).to(GitVersionSettingsProvider)

const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent)
const gitVersionTool = container.get<IGitVersionTool>(TYPES.IGitVersionTool)
const settingsProvider = container.get<IGitVersionSettingsProvider>(TYPES.IGitVersionSettingsProvider)

export async function setup() {
    try {
        gitVersionTool.disableTelemetry()
        console.log(`Agent: '${buildAgent.agentName}'`)

        const settings = settingsProvider.getSetupSettings()

        await gitVersionTool.install(settings)

        buildAgent.setSucceeded('GitVersion installed successfully', true)
    } catch (error) {
        buildAgent.setFailed(error.message, true)
    }
}

export async function run() {
    try {
        gitVersionTool.disableTelemetry()
        console.log(`Agent: '${buildAgent.agentName}'`)

        const settings: GitVersionSettings = settingsProvider.getGitVersionSettings()

        const result = await gitVersionTool.run(settings)

        if (result.code === 0) {
            buildAgent.setSucceeded('GitVersion executed successfully', true)
            const { stdout } = result

            if (stdout.lastIndexOf('{') === -1 || stdout.lastIndexOf('}') === -1) {
                buildAgent.setFailed('GitVersion output is not valid JSON', true)
            } else {
                const jsonOutput = stdout.substring(stdout.lastIndexOf('{'), stdout.lastIndexOf('}') + 1)

                const gitversion = JSON.parse(jsonOutput) as GitVersionOutput
                gitVersionTool.writeGitVersionToAgent(gitversion)
            }
        } else {
            buildAgent.setFailed(result.error.message, true)
        }
    } catch (error) {
        buildAgent.setFailed(error, true)
    }
}
