export * from './models'
export * from './dotnet-tool'
export * from './settings'

export const keysFn = Object.keys as <T extends object>(obj: T) => (keyof T)[]
