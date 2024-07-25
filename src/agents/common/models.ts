export type ExecResult = {
    code: number
    stdout?: string
    stderr?: string
    error?: Error | null | unknown
}
