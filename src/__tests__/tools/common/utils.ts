import process from 'node:process'
import { expect } from 'vitest'
import { keysOf } from '@tools/common'
import { type IBuildAgent } from '@agents/common'
import * as semver from 'semver'

export function setEnv(key: string, value: string): void {
    process.env[key.toUpperCase()] = value
}

export function getEnv(key: string): string {
    return process.env[key] || ''
}

export function isAzurePipelinesAgent(): boolean {
    return !!process.env.AGENT_NAME
}

export function isGitHubActionsAgent(): boolean {
    return process.env.GITHUB_ACTIONS === 'true'
}

export function resetEnv(agent: IBuildAgent, toolPathVariable: string): void {
    const envName = process.platform === 'win32' ? 'Path' : 'PATH'
    process.env.PATH = process.env[envName] // workaround for windows
    setEnv(toolPathVariable, '')
    setEnv(agent.sourceDirVariable, '')
    setEnv(agent.tempDirVariable, '')
    setEnv(agent.cacheDirVariable, '')

    setInputs({})
}

export function setInputs<T extends object>(inputs: Partial<T>): void {
    for (const property of keysOf(inputs)) {
        setEnv(`INPUT_${property as string}`, inputs[property]?.toString() || '')
    }
}

export const expectValidSettings = <T extends object>(expectedSettings: T, actualSettings: T): void => {
    for (const key of keysOf(expectedSettings)) {
        expect(actualSettings[key]).toBe(expectedSettings[key])
    }
}

export async function getLatestVersion(toolName: string, versionSpec: string): Promise<string> {
    const response = await fetch(`https://api.nuget.org/v3-flatcontainer/${toolName.toLowerCase()}/index.json`)
    const json = (await response.json()) as { versions: string[] }
    const filteredVersions = json.versions.filter(v => semver.satisfies(v, versionSpec))
    return filteredVersions.reverse()[0]
}
