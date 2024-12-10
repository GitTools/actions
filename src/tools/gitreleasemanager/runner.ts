import { type ExecResult, type IBuildAgent } from '@agents/common'
import { type Commands } from './models'
import { GitReleaseManagerTool } from './tool'
import { RunnerBase } from '../common/runner'

export class Runner extends RunnerBase {
    protected readonly tool: GitReleaseManagerTool

    constructor(protected readonly buildAgent: IBuildAgent) {
        super(buildAgent)
        this.tool = new GitReleaseManagerTool(this.buildAgent)
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
            await this.tool.install()
            return { code: 0 }
        }, 'GitReleaseManager setup successfully')
    }

    private async create(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.create(), 'GitReleaseManager created release successfully')
    }

    private async discard(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.discard(), 'GitReleaseManager discarded release successfully')
    }

    private async close(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.close(), 'GitReleaseManager closed release successfully')
    }

    private async open(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.open(), 'GitReleaseManager opened release successfully')
    }

    private async publish(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.publish(), 'GitReleaseManager published release successfully')
    }

    private async addAsset(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.addAsset(), 'GitReleaseManager added assets to release successfully')
    }
}
