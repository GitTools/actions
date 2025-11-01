import { type ExecResult, type IBuildAgent } from '@agents/common'
import { type Commands, type GitVersionOutput } from './models'
import { GitVersionTool } from './tool'
import { RunnerBase } from '../common/runner'
import { allIndexesOf } from '@lib'

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
            return this.processGitVersionOutput(result)
        }, 'GitVersion executed successfully')
    }

    private async command(): Promise<ExecResult> {
        return this.safeExecute(async () => await this.tool.executeCommand(), 'GitVersion executed successfully')
    }

    private processGitVersionOutput(result: ExecResult): ExecResult {
        this.buildAgent.debug('Parsing GitVersion output')

        // Return error to be handled by calling function
        if (result.code !== 0) {
            return result
        }

        const stdout = result.stdout as string
        const gitVersionOutput = this.extractGitVersionOutput(stdout)

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

    /**
     * Attempts to extract and parse a JSON object representing `GitVersionOutput` from the given input string.
     * The method assumes the last closing curly brace (`}`) in the input belongs to the end of the JSON object,
     * and iteratively expands the search area backwards from each opening curly brace (`{`) until a valid JSON object is found.
     * If parsing fails, it logs debug information and continues searching until all possible start positions are exhausted.
     *
     * @param input - The string containing the potential JSON output from GitVersion.
     * @returns The parsed `GitVersionOutput` object if extraction and parsing succeed; otherwise, `null`.
     */
    private extractGitVersionOutput(input: string): GitVersionOutput | null {
        const allStartOfJsonIndexes = allIndexesOf(input, '{')
        //Assumed last '}' character will belong to the JSON object
        const endOfJsonIndex = input.lastIndexOf('}') + 1

        //Start from the bottom when searching for the JSON object
        let startIndexArrayPos = allStartOfJsonIndexes.length - 1
        let decodePassCount = 1

        let currSearchString = input.substring(allStartOfJsonIndexes[startIndexArrayPos], endOfJsonIndex)
        let resultJson = null

        while (resultJson === null && startIndexArrayPos >= 0) {
            try {
                this.buildAgent.debug(`Starting JSON extraction at ${allStartOfJsonIndexes[startIndexArrayPos]} to ${endOfJsonIndex}`)

                resultJson = JSON.parse(currSearchString) as GitVersionOutput
            } catch (ex) {
                let exObject = new Error('Unable to parse exception object')

                if (ex instanceof Error) {
                    exObject = ex
                }

                const errorMessage = `Failed to parse JSON object on pass ${decodePassCount}. Expanding search area from string index ${allStartOfJsonIndexes[startIndexArrayPos]} to ${endOfJsonIndex}\nCaught Exception: ${exObject.message}`
                this.buildAgent.debug(errorMessage)

                //Expand search area
                decodePassCount++
                startIndexArrayPos--
                currSearchString = input.substring(allStartOfJsonIndexes[startIndexArrayPos], endOfJsonIndex)
            }
        }

        return resultJson
    }
}
