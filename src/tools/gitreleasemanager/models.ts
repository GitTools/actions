export type Commands = 'setup' | 'addasset' | 'close' | 'create' | 'discard' | 'open' | 'publish'

export type CommonSettings = {
    repository: string
    owner: string
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

export type DiscardSettings = CommonSettings & {}

export type CloseSettings = CommonSettings & {}

export type OpenSettings = CommonSettings & {}

export type PublishSettings = CommonSettings & {}

export type AddAssetSettings = CommonSettings & {
    assets: string[]
}
