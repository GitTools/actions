export type ExecResult = {
    stdout: string
    stderr: string
    code: number
    error?: Error | null
}
