import * as path from 'path';

import * as tl from 'azure-pipelines-task-lib/task';

import { ToolInstaller } from '../ToolInstaller';
import { Proxy as utils }  from './Proxy';

function isValidInputFile(input: string, file: string) {
    return tl.filePathSupplied(input) && fileExists(file);
}

function fileExists(file: string) {
    return tl.exist(file) && tl.stats(file).isFile();
}

function directoryExists(file: string) {
    return tl.exist(file) && tl.stats(file).isDirectory();
}

export class GitVersionTask {
    versionSpec: string;
    includePrerelease: boolean;
    targetPath: string;

    useConfigFile: boolean;
    configFilePath: string;

    updateAssemblyInfo: boolean;
    updateAssemblyInfoFilename: string;

    additionalArguments: string;

    sourcesDirectory: string;

    constructor() {

        this.versionSpec                = tl.getInput('versionSpec', true);
        this.includePrerelease          = tl.getBoolInput('includePrerelease');
        this.targetPath                 = tl.getInput('targetPath');

        this.useConfigFile              = tl.getBoolInput('useConfigFile');
        this.configFilePath             = tl.getInput('configFilePath');

        this.updateAssemblyInfo         = tl.getBoolInput('updateAssemblyInfo');
        this.updateAssemblyInfoFilename = tl.getInput('updateAssemblyInfoFilename');

        this.additionalArguments        = tl.getInput('additionalArguments');

        this.sourcesDirectory           = tl.getVariable('Build.SourcesDirectory').replace(/\\/g, '/');
    }

    public async execute() {
        try {
            let toolPath = await this.installTool(this.versionSpec, this.includePrerelease);

            let workingDirectory = this.getWorkingDirectory(this.targetPath);
            let args = this.getArguments(workingDirectory);
            
            let exe = tl.tool('dotnet-gitversion');
            exe.arg(args);
            if (this.additionalArguments) {
                exe.line(this.additionalArguments);
            }

            const result = await exe.exec();
            if (result) {
                tl.setResult(tl.TaskResult.Failed, "An error occured during GitVersion execution");
            } else {
                tl.setResult(tl.TaskResult.Succeeded, "GitVersion executed successfully");
            }
        }
        catch (err) {
            tl.debug(err.stack);
            tl.setResult(tl.TaskResult.Failed, err, true);
        }
    }

    private getArguments(workingDirectory: string) {
        let args = [
            workingDirectory,
            "/output",
            "buildserver",
            "/nofetch"
        ];

        if (this.useConfigFile) {
            if (isValidInputFile('configFilePath', this.configFilePath)) {
                args.push("/config", this.configFilePath);
            }
            else {
                throw new Error('GitVersion configuration file not found at ' + this.configFilePath);
            }
        }
        if (this.updateAssemblyInfo) {
            args.push("/updateassemblyinfo");
            if (isValidInputFile('updateAssemblyInfoFilename', this.updateAssemblyInfoFilename)) {
                args.push(this.updateAssemblyInfoFilename);
            }
            else {
                throw new Error('AssemblyInfoFilename file not found at ' + this.updateAssemblyInfoFilename);
            }
        }
        return args;
    }

    private async installTool(version: string, includePrerelease: boolean): Promise<string> {
        let installTool = process.env["INSTALL_TOOL"];
        if (installTool === null || installTool === undefined || installTool.toUpperCase() == "TRUE") {
            return await new ToolInstaller(utils).downloadAndInstall("GitVersion.Tool", version, false, includePrerelease);
        }
    }

    private getWorkingDirectory(targetPath: string) {
        let workDir;

        if (!targetPath) {
            workDir = this.sourcesDirectory;
        } else {
            if (directoryExists(targetPath)) {
                workDir = path.join(this.sourcesDirectory, targetPath);
            }
            else {
                throw new Error('Directory not found at ' + targetPath);
            }
        }
        return workDir.replace(/\\/g, '/');
    }
}

var task = new GitVersionTask();
task.execute().catch((reason) => tl.setResult(tl.TaskResult.Failed, reason));
