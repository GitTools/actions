export interface IProxy {
    find: (toolName: string, versionSpec: string, arch?: string) => string;
    debug: (message: string) => void;
    exportVariable: (name: string, val: string) => void;
    addPath: (inputPath: string) => void;
    which: (tool: string, check?: boolean) => Promise<string>;
    cacheDir: (sourceDir: string, tool: string, version: string, arch?: string) => Promise<string>;
    isExplicitVersion: (versionSpec: string) => boolean;
    evaluateVersions: (versions: string[], versionSpec: string) => string;
    cleanVersion: (version: string) => string;
    createTempDir: () => Promise<string>;
    executeDotNet: (args: string[]) => Promise<IExecSyncResult>;
};

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