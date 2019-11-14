import * as taskLib from 'azure-pipelines-task-lib/task';

export interface IExecSyncResult {
    /** standard output */
    stdout: string;
    /** error output */
    stderr: string;
    /** return code */
    code: number;
    /** Error on failure */
    error: Error;
}

export async function createTempDir(): Promise<string> {
    let tempDir = taskLib.getVariable('Agent.TempDirectory');
    return Promise.resolve(tempDir);
}

export async function executeDotNet(args: string[]): Promise<IExecSyncResult> {
    let tr = taskLib.tool("dotnet");
    tr.arg(args);

    var result = tr.execSync();
    return {
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr,
        error: result.error
    }
}
