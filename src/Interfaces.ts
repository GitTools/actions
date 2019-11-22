export interface IVersionManager {
    isExplicitVersion: (versionSpec: string) => boolean;
    evaluateVersions: (versions: string[], versionSpec: string) => string;
    cleanVersion: (version: string) => string;
}

export interface IBuildAgent {
    find: (toolName: string, versionSpec: string, arch?: string) => string;
    cacheDir: (sourceDir: string, tool: string, version: string, arch?: string) => Promise<string>;
    createTempDir: () => Promise<string>;
    debug: (message: string) => void;
    setFailed: (message: string, done?: boolean) => void;
    setSucceeded: (message: string, done?: boolean) => void;
    exportVariable: (name: string, val: string) => void;
    addPath: (inputPath: string) => void;
    which: (tool: string, check?: boolean) => Promise<string>;
    exec: (exec: string, args: string[]) => Promise<IExecResult>;
}

export interface IDotnetTool {
    run: (args: string[]) => Promise<IExecResult>;
    toolInstall: (toolName: string, versionSpec: string, checkLatest: boolean, includePre: boolean) => Promise<string>;
}

export class Argument {
    constructor(public readonly name: string, public readonly value: string) {
    }
}
export interface IGitVersionTool {
    install: (versionSpec: string, includePrerelease: boolean) => Promise<void>;
    run: (...params: Argument[]) => Promise<IExecResult>;
}
export interface IExecResult {
    stdout: string;
    stderr: string;
    code: number;
    error: Error;
}
