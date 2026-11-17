type TestBaseline = { version: string; publishedVersion?: string | null }

export function selectTestVersion(baseline: TestBaseline, env: NodeJS.ProcessEnv = process.env): string {
    if (env.GITVERSION_TEST_MODE === 'source') return baseline.version
    return env.GITVERSION_TEST_VERSION || baseline.publishedVersion || baseline.version
}
