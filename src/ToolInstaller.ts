import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import * as httpm from 'typed-rest-client/HttpClient';

import { IProxy } from './Interfaces';

export class ToolInstaller {
    constructor(public utils: IProxy) {
        this.httpClient = new httpm.HttpClient("ToolInstaller");
    }

    public async downloadAndInstall(toolName: string, versionSpec: string, checkLatest: boolean, includePrerelease: boolean): Promise<string> {
        console.log('');
        console.log('--------------------------');
        console.log(`Installing ${toolName} version ` + versionSpec);
        console.log('--------------------------');

        if (this.utils.isExplicitVersion(versionSpec)) {
            checkLatest = false; // check latest doesn't make sense when explicit version
        }

        let toolPath: string;
        if (!checkLatest) {
            //
            // Let's try and resolve the version spec locally first
            //
            toolPath = this.utils.find(toolName, versionSpec);
        }

        if (!toolPath) {
            let version: string;
            if (this.utils.isExplicitVersion(versionSpec)) {
                //
                // Explicit version was specified. No need to query for list of versions.
                //
                version = versionSpec;
            }
            else {
                //
                // Let's query and resolve the latest version for the versionSpec.
                // If the version is an explicit version (1.1.1 or v1.1.1) then no need to query.
                // If your tool doesn't offer a mechanism to query,
                // then it can only support exact version inputs.
                //
                version = await this.queryLatestMatch(toolName, versionSpec, includePrerelease);
                if (!version) {
                    throw new Error(`Unable to find ${toolName} version '${versionSpec}'.`);
                }

                //
                // Check the cache for the resolved version.
                //
                toolPath = this.utils.find(toolName, version)
            }
            if (!toolPath) {
                //
                // Download, extract, cache
                //
                toolPath = await this.acquireTool(toolName, version);
            }
        }

        //
        // Prepend the tools path. This prepends the PATH for the current process and
        // instructs the agent to prepend for each task that follows.
        //
        this.utils.debug(`toolPath: ${toolPath}`);

        if (os.platform() != 'win32') {
            let dotnetRoot = path.dirname(fs.readlinkSync(await this.utils.which("dotnet")));
            this.utils.exportVariable('DOTNET_ROOT', dotnetRoot);
        }
        this.utils.addPath(toolPath);

        return toolPath;
    }

    private async queryLatestMatch(toolName: string, versionSpec: string, includePrerelease: boolean): Promise<string> {
        this.utils.debug(`querying tool versions for ${toolName}${versionSpec ? `@${versionSpec}` : ""} ${includePrerelease ? "including pre-releases" : ""}`);

        var downloadPath = `https://api-v2v3search-0.nuget.org/query?q=${encodeURIComponent(toolName.toLowerCase())}&prerelease=${includePrerelease ? "true" : "false"}&semVerLevel=2.0.0`;
        var res = await this.httpClient.get(downloadPath);

        if (!res || res.message.statusCode != 200)
        {
            return null;
        }

        let body: string = await res.readBody();
        var data = JSON.parse(body).data;

        const versions = (<Array<{ version: string }>>data[0].versions).map(x => x.version);
        if (!versions || !versions.length)
        {
            return null;
        }

        this.utils.debug(`got versions: ${versions.join(", ")}`);

        return this.utils.evaluateVersions(versions, versionSpec);
    }

    private async acquireTool(toolName: string, version: string): Promise<string> {

        let tempDirectory = await this.utils.createTempDir();
        let args = ["tool", "install", toolName, "--tool-path", tempDirectory];

        if (version) {
            version = this.utils.cleanVersion(version);
            args = args.concat(["--version", version]);
        }

        let result = await this.utils.executeDotNet(args);
        let status = result.code === 0 ? "success" : "failure";
        let message = result.code === 0 ? result.stdout : result.stderr;

        this.utils.debug(`tool install result: ${status} ${message}`);

        if (result.code) {
            throw new Error("Error installing tool");
        }

        return await this.utils.cacheDir(tempDirectory, toolName, version);
    }

    private httpClient: httpm.HttpClient;
}
