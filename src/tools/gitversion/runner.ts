import { IGitVersionTool, GitVersionTool } from './tool'
import { type Commands, type GitVersionOutput, type GitVersionSettings } from './models'
import { GitVersionSettingsProvider, IGitVersionSettingsProvider } from './settings'

import container from '../common/ioc'
import { IBuildAgent } from '../../agents/common/build-agent'
import { TYPES } from '../common/models'

container.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool)
container.bind<IGitVersionSettingsProvider>(TYPES.IGitVersionSettingsProvider).to(GitVersionSettingsProvider)

const buildAgent = container.get<IBuildAgent>(TYPES.IBuildAgent)
const gitVersionTool = container.get<IGitVersionTool>(TYPES.IGitVersionTool)
const settingsProvider = container.get<IGitVersionSettingsProvider>(TYPES.IGitVersionSettingsProvider)

export class Runner {
    async run(command: Commands): Promise<number> {
        switch (command) {
            case 'setup':
                return await this.setup()
            case 'execute':
                return await this.execute()
        }
    }

    private async setup(): Promise<number> {
        try {
            gitVersionTool.disableTelemetry()
            console.log(`Agent: '${buildAgent.agentName}'`)

            const settings = settingsProvider.getSetupSettings()

            await gitVersionTool.install(settings)

            buildAgent.setSucceeded('GitVersion installed successfully', true)
            return 0
        } catch (error) {
            buildAgent.setFailed(error.message, true)
            return -1
        }
    }

    private async execute(): Promise<number> {
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

                    const gitVersionOutput = JSON.parse(jsonOutput) as GitVersionOutput
                    gitVersionTool.writeGitVersionToAgent(gitVersionOutput)
                    return 0
                }
            } else {
                buildAgent.setFailed(result.error.message, true)
                return -1
            }
        } catch (error) {
            buildAgent.setFailed(error, true)
            return -1
        }
    }
}
