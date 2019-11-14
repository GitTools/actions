
import { createTempDir, executeDotNet } from './ToolLib';
import { findLocalTool, prependPath, cacheDir, isExplicitVersion, evaluateVersions, cleanVersion } from 'azure-pipelines-tool-lib/tool';
import { debug, setVariable, which } from 'azure-pipelines-task-lib/task';

function _which(tool: string, check?: boolean) : Promise<string> {
    return Promise.resolve(which(tool, check));
}
import { IProxy } from '../Interfaces';

export const Proxy: IProxy = {
    find: findLocalTool,
    debug: debug,
    exportVariable: setVariable,
    addPath: prependPath,
    which: _which,
    cacheDir: cacheDir,
    isExplicitVersion: isExplicitVersion,
    evaluateVersions: evaluateVersions,
    cleanVersion: cleanVersion,
    createTempDir: createTempDir,
    executeDotNet: executeDotNet
}
