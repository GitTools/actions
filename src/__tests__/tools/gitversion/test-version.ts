import { config } from '../../../../package.json'

export function selectTestVersion(env: NodeJS.ProcessEnv = process.env): string {
    return env.GITVERSION_TEST_VERSION || config.gitversionVersion
}
