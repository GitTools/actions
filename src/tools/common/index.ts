export * from './models'
export * from './dotnet-tool'
export * from './settings'

export const keysOf = Object.keys as <T extends object>(obj: T) => (keyof T)[]
