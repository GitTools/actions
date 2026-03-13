import "./semver.mjs";
import { a as ArgumentsBuilder, i as DotnetTool, r as SettingsProvider, t as RunnerBase } from "./tools.mjs";
import * as path from "path";
//#region src/tools/gitreleasemanager/settings.ts
var GitReleaseManagerSettingsProvider = class extends SettingsProvider {
	getCreateSettings() {
		const name = this.buildAgent.getInput("name");
		const inputFilePath = this.buildAgent.getInput("inputFilePath");
		const isPreRelease = this.buildAgent.getBooleanInput("isPreRelease");
		const targetcommitish = this.buildAgent.getInput("targetcommitish");
		const assets = this.buildAgent.getListInput("assets");
		return {
			...this.getCommonSettings(),
			name,
			inputFilePath,
			isPreRelease,
			targetcommitish,
			assets
		};
	}
	getDiscardSettings() {
		return { ...this.getCommonSettings() };
	}
	getCloseSettings() {
		return { ...this.getCommonSettings() };
	}
	getOpenSettings() {
		return { ...this.getCommonSettings() };
	}
	getPublishSettings() {
		return { ...this.getCommonSettings() };
	}
	getAddAssetSettings() {
		const assets = this.buildAgent.getListInput("assets");
		return {
			...this.getCommonSettings(),
			assets
		};
	}
	getCommonSettings() {
		const milestone = this.buildAgent.getInput("milestone");
		return {
			repository: this.buildAgent.getInput("repository"),
			token: this.buildAgent.getInput("token"),
			targetDirectory: this.buildAgent.getInput("targetDirectory"),
			milestone,
			logFilePath: this.buildAgent.getInput("logFilePath")
		};
	}
};
//#endregion
//#region src/tools/gitreleasemanager/tool.ts
var GitReleaseManagerTool = class extends DotnetTool {
	get packageName() {
		return "GitReleaseManager.Tool";
	}
	get toolName() {
		return "dotnet-gitreleasemanager";
	}
	get toolPathVariable() {
		return "GITRELEASEMANAGER_PATH";
	}
	get versionRange() {
		return ">=0.19.0 <0.21.0";
	}
	get settingsProvider() {
		return new GitReleaseManagerSettingsProvider(this.buildAgent);
	}
	async create() {
		const settings = this.settingsProvider.getCreateSettings();
		const args = await this.getCreateArguments(settings);
		return await this.executeTool(args);
	}
	async discard() {
		const settings = this.settingsProvider.getDiscardSettings();
		const args = await this.getDiscardArguments(settings);
		return await this.executeTool(args);
	}
	async close() {
		const settings = this.settingsProvider.getCloseSettings();
		const args = await this.getCloseArguments(settings);
		return await this.executeTool(args);
	}
	async open() {
		const settings = this.settingsProvider.getOpenSettings();
		const args = await this.getOpenArguments(settings);
		return await this.executeTool(args);
	}
	async publish() {
		const settings = this.settingsProvider.getPublishSettings();
		const args = await this.getPublishArguments(settings);
		return await this.executeTool(args);
	}
	async addAsset() {
		const settings = this.settingsProvider.getAddAssetSettings();
		const args = await this.getAddAssetArguments(settings);
		return await this.executeTool(args);
	}
	async getCommonArguments(settings) {
		const builder = new ArgumentsBuilder();
		const [owner, repository] = settings.repository.split("/");
		builder.addKeyValue("owner", owner);
		builder.addKeyValue("repository", repository);
		builder.addKeyValue("token", settings.token);
		settings.targetDirectory = await this.getRepoDir(settings);
		builder.addKeyValue("targetDirectory", settings.targetDirectory);
		if (settings.logFilePath) builder.addKeyValue("logFilePath", settings.logFilePath);
		return builder.build();
	}
	async getCreateArguments(settings) {
		const builder = new ArgumentsBuilder().addArgument("create").addArguments(await this.getCommonArguments(settings));
		if (settings.milestone) builder.addKeyValue("milestone", settings.milestone);
		if (settings.name) builder.addKeyValue("name", settings.name);
		if (settings.targetcommitish) builder.addKeyValue("targetcommitish", settings.targetcommitish);
		if (settings.inputFilePath) if (await this.buildAgent.fileExists(settings.inputFilePath)) builder.addKeyValue("inputFilePath", settings.inputFilePath);
		else throw new Error(`GitReleaseManager inputFilePath not found at ${settings.inputFilePath}`);
		if (settings.isPreRelease) builder.addFlag("pre");
		if (settings.assets && settings.assets.length > 0) {
			settings.assets = settings.assets.map((asset) => {
				return path.join(settings.targetDirectory, asset);
			});
			builder.addKeyValue("assets", settings.assets.join(","));
		}
		return builder.build();
	}
	async getDiscardArguments(settings) {
		const builder = new ArgumentsBuilder().addArgument("discard").addArguments(await this.getCommonArguments(settings));
		if (settings.milestone) builder.addKeyValue("milestone", settings.milestone);
		return builder.build();
	}
	async getCloseArguments(settings) {
		const builder = new ArgumentsBuilder().addArgument("close").addArguments(await this.getCommonArguments(settings));
		if (settings.milestone) builder.addKeyValue("milestone", settings.milestone);
		return builder.build();
	}
	async getOpenArguments(settings) {
		const builder = new ArgumentsBuilder().addArgument("open").addArguments(await this.getCommonArguments(settings));
		if (settings.milestone) builder.addKeyValue("milestone", settings.milestone);
		return builder.build();
	}
	async getPublishArguments(settings) {
		const builder = new ArgumentsBuilder().addArgument("publish").addArguments(await this.getCommonArguments(settings));
		if (settings.milestone) builder.addKeyValue("tagName", settings.milestone);
		return builder.build();
	}
	async getAddAssetArguments(settings) {
		const builder = new ArgumentsBuilder().addArgument("addasset").addArguments(await this.getCommonArguments(settings));
		if (settings.milestone) builder.addKeyValue("tagName", settings.milestone);
		if (settings.assets && settings.assets.length > 0) {
			settings.assets = settings.assets.map((asset) => {
				return path.join(settings.targetDirectory, asset);
			});
			builder.addKeyValue("assets", settings.assets.join(","));
		}
		return builder.build();
	}
	async getRepoDir(settings) {
		return await this.getRepoPath(settings.targetDirectory);
	}
};
//#endregion
//#region src/tools/gitreleasemanager/runner.ts
var Runner = class extends RunnerBase {
	tool;
	constructor(buildAgent) {
		super(buildAgent);
		this.buildAgent = buildAgent;
		this.tool = new GitReleaseManagerTool(this.buildAgent);
	}
	async run(command) {
		switch (command) {
			case "setup": return await this.setup();
			case "addasset": return await this.addAsset();
			case "open": return await this.open();
			case "close": return await this.close();
			case "create": return await this.create();
			case "discard": return await this.discard();
			case "publish": return await this.publish();
		}
	}
	async setup() {
		return this.safeExecute(async () => {
			await this.tool.install();
			return { code: 0 };
		}, "GitReleaseManager setup successfully");
	}
	async create() {
		return this.safeExecute(async () => await this.tool.create(), "GitReleaseManager created release successfully");
	}
	async discard() {
		return this.safeExecute(async () => await this.tool.discard(), "GitReleaseManager discarded release successfully");
	}
	async close() {
		return this.safeExecute(async () => await this.tool.close(), "GitReleaseManager closed release successfully");
	}
	async open() {
		return this.safeExecute(async () => await this.tool.open(), "GitReleaseManager opened release successfully");
	}
	async publish() {
		return this.safeExecute(async () => await this.tool.publish(), "GitReleaseManager published release successfully");
	}
	async addAsset() {
		return this.safeExecute(async () => await this.tool.addAsset(), "GitReleaseManager added assets to release successfully");
	}
};
//#endregion
export { Runner };

//# sourceMappingURL=gitreleasemanager.mjs.map