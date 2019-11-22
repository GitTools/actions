const TYPES = {
    IBuildAgent: Symbol.for("BuildAgent"),
    IDotnetTool: Symbol.for("DotnetTool"),
    IGitVersionTool: Symbol.for("GitVersionTool"),
    IVersionManager: Symbol.for("VersionManager"),
};

const SetupOptions = {
    includePrerelease: "includePrerelease",
    versionSpec: "versionSpec",
};

const RunOptions = {
    targetPath: "targetPath",

    useConfigFile: "useConfigFile",
    configFilePath: "configFilePath",

    updateAssemblyInfo: "configFilePath",
    updateAssemblyInfoFilename: "configFilePath",

    additionalArguments: "additionalArguments",
};

export { SetupOptions, RunOptions, TYPES };
