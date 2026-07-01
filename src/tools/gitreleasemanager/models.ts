export type Commands = 'setup' | 'addasset' | 'close' | 'create' | 'discard' | 'open' | 'publish'

export type CommonSettings = {
    repository: string
    token: string
    targetDirectory: string
    milestone: string
    logFilePath: string
}

export type CreateSettings = CommonSettings & {
    name: string
    inputFilePath: string
    isPreRelease: boolean
    targetcommitish: string
    assets?: string[]
}

export type DiscardSettings = CommonSettings & {} // NOSONAR

export type CloseSettings = CommonSettings & {} // NOSONAR

export type OpenSettings = CommonSettings & {} // NOSONAR

export type PublishSettings = CommonSettings & {} // NOSONAR

export type AddAssetSettings = CommonSettings & {
    assets: string[]
}
