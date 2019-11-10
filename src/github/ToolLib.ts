import * as path from 'path';
import * as semver from 'semver';
import * as uuidV4 from "uuid/v4";

import * as io from '@actions/io';
import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { IExecSyncResult } from '../Interfaces';

const cmp = require('semver-compare');

export async function createTempDir(): Promise<string> {
    const IS_WINDOWS = process.platform === "win32";

    let tempDirectory: string = process.env["RUNNER_TEMP"] || "";

    if (!tempDirectory) {
        let baseLocation: string;
        if (IS_WINDOWS) {
            // On Windows use the USERPROFILE env variable
            baseLocation = process.env["USERPROFILE"] || "C:\\";
        } else {
            if (process.platform === "darwin") {
                baseLocation = "/Users";
            } else {
                baseLocation = "/home";
            }
        }
        tempDirectory = path.join(baseLocation, "actions", "temp");
    }
    const dest = path.join(tempDirectory, uuidV4());
    await io.mkdirP(dest);
    return dest;
}

/**
 * Checks if a version spec is an explicit version (e.g. 1.0.1 or v1.0.1)
 * As opposed to a version spec like 1.x
 *
 * @param versionSpec
 */
export function isExplicitVersion(versionSpec: string): boolean {
    let c = semver.clean(versionSpec);
    core.debug('isExplicit: ' + c);

    let valid = semver.valid(c) != null;
    core.debug('explicit? ' + valid);

    return valid;
}

/**
 * Returns cleaned (removed leading/trailing whitespace, remove '=v' prefix)
 * and parsed version, or null if version is invalid.
 */
export function cleanVersion(version: string): string {
    core.debug('cleaning: ' + version);
    return semver.clean(version);
}

/**
 * evaluates a list of versions and returns the latest version matching the version spec
 *
 * @param versions      an array of versions to evaluate
 * @param versionSpec   a version spec (e.g. 1.x)
 */
export function evaluateVersions(versions: string[], versionSpec: string): string {
    let version: string;
    core.debug('evaluating ' + versions.length + ' versions');
    versions = versions.sort(cmp);
    for (let i = versions.length - 1; i >= 0; i--) {
        let potential: string = versions[i];
        let satisfied: boolean = semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }

    if (version) {
        core.debug('matched: ' + version);
    }
    else {
        core.debug('match not found');
    }

    return version;
}

export async function executeDotNet(args: string[]) : Promise<IExecSyncResult> {
    let dotnetPath = await io.which("dotnet", true);
    let resultCode = 0;
    let stdout = '';
    let stderr = '';
    resultCode = await exec.exec(
        `"${dotnetPath}"`,
        args,
        {
            listeners: {
                stdout: (data: Buffer) => {
                  stdout += data.toString();
                },
                stderr: (data: Buffer) => {
                    stderr += data.toString();
                }
              }
        });
    return {
        code: resultCode,
        stdout: stdout,
        stderr: stderr,
        error: null
    }
}