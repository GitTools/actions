import { find, cacheDir } from '@actions/tool-cache';
import { debug, exportVariable, addPath } from '@actions/core';
import { which } from '@actions/io';

import { isExplicitVersion, evaluateVersions, createTempDir, cleanVersion, executeDotNet } from './ToolLib';
import { IProxy } from '../Interfaces';

export const Proxy: IProxy = {
    find : find,
    debug: debug,
    exportVariable: exportVariable,
    addPath: addPath,
    which: which,
    cacheDir: cacheDir,
    isExplicitVersion: isExplicitVersion,
    evaluateVersions: evaluateVersions,
    cleanVersion: cleanVersion,
    createTempDir: createTempDir,
    executeDotNet: executeDotNet
}