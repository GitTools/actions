import { type ExecResult, type IBuildAgent } from '@agents/common'
import { type Commands, type GitVersionOutput } from './models'
import { GitVersionTool } from './tool'
import { RunnerBase } from '../common/runner'

export class Runner extends RunnerBase {
    protected readonly tool: GitVersionTool

    constructor(protected readonly buildAgent: IBuildAgent) {
        super(buildAgent)
        this.tool = new GitVersionTool(this.buildAgent)
    }

    async run(command: Commands): Promise<ExecResult> {
        switch (command) {
            case 'setup':
                return await this.setup()
            case 'execute':
                return await this.execute()
            case 'command':
                return await this.command()
        }
    }

    private async setup(): Promise<ExecResult> {
        return this.safeExecute(async () => {
            await this.tool.install()
            return { code: 0 }
        }, 'GitVersion setup successfully')
    }

    private async execute(): Promise<ExecResult> {
        return this.safeExecute(async () => {
            const result = await this.tool.executeJson()
            this.buildAgent.debug('Parsing GitVersion output')
            return this.processGitVersionOutput(result)
        }, 'GitVersion executed successfully')
    }

    private async command(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.executeCommand(), 'GitVersion executed successfully')
    }

    private processGitVersionOutput(result: ExecResult): ExecResult {
        // True if task failed
        if (result.code !== 0) {
            return result
        }

        // This gives everything from the output
        const stdout = result.stdout as string

        //TODO: Update JSON parsing to handle {} in branches and commits
        const gitVersionOutput = this.extractValidJsonObject(stdout)

        if (gitVersionOutput === null) {
            const errorMessage = 'GitVersion output is not valid JSON, see output details'
            this.buildAgent.debug(errorMessage)
            this.buildAgent.setFailed(errorMessage, true)
            return {
                code: -1,
                error: new Error(errorMessage)
            }
        }

        this.tool.writeGitVersionToAgent(gitVersionOutput)
        this.tool.updateBuildNumber()
        this.buildAgent.setSucceeded('GitVersion executed successfully', true)
        return result
    }

    private extractValidJsonObject(input: string): GitVersionOutput | null {
        const success = false
        const decodePass = 1

        //Assumed last '}' character will be end of JSON object
        const allStartOfJsonIndexes = this.allIndexesOf(input, '{')
        let startPos = allStartOfJsonIndexes.length - 1
        const endOfJsonIndex = input.lastIndexOf('}') + 1

        //Start from the bottom searching for JSON object
        let currSearchString = input.substring(allStartOfJsonIndexes[startPos], endOfJsonIndex)
        let resultJson = null

        while (!success && resultJson === null) {
            try {
                this.buildAgent.debug(`Starting JSON extraction at ${startPos} to ${endOfJsonIndex}`)

                resultJson = JSON.parse(currSearchString) as GitVersionOutput
            } catch (ex) {
                let exMessage = Error('Unable to parse exception object')

                if (ex instanceof Error) {
                    exMessage = ex
                }

                const errorMessage = `Failed to parse JSON object on pass ${decodePass}. Expanding search area from string index ${allStartOfJsonIndexes[startPos]} to ${endOfJsonIndex}\nCaught Exception: ${exMessage.message}`
                this.buildAgent.debug(errorMessage)

                //Expand search area
                startPos--
                currSearchString = input.substring(allStartOfJsonIndexes[startPos], endOfJsonIndex)
            }
        }

        return resultJson
    }

    private allIndexesOf(searchString: string, indexOf: string): number[] {
        if (indexOf.length !== 1) {
            throw new Error('indexOf must be a single character')
        }

        const resultArray = []
        for (let i = 0; i < searchString.length; i++) {
            if (searchString[i] === indexOf) {
                resultArray.push(i)
            }
        }

        return resultArray
    }
}
