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

export { SetupOptions, TYPES };
