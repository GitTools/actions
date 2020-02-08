export enum CommonFields {
    repository = "repository",
    owner = "owner",
    token = "token",
}

export enum CreateFields {
    milestone = "milestone",
    releaseName = "releaseName",
    inputFileName = "inputFileName",
    isPreRelease = "isPreRelease",
    commit = "commit",
    targetDirectory = "targetDirectory",
    assets = "assets",
}

export enum DiscardFields {
    milestone = "milestone",
    targetDirectory = "targetDirectory",
}

export interface GitReleaseManagerSettings {
    [CommonFields.repository]: string;
    [CommonFields.owner]: string;
    [CommonFields.token]: string;
}

export interface GitReleaseManagerCreateSettings extends GitReleaseManagerSettings {
    [CreateFields.milestone]: string;
    [CreateFields.releaseName]: string;
    [CreateFields.inputFileName]: string;
    [CreateFields.isPreRelease]: boolean;
    [CreateFields.commit]: string;
    [CreateFields.targetDirectory]: string;
    [CreateFields.assets]?: string[];
}

export interface GitReleaseManagerDiscardSettings extends GitReleaseManagerSettings {
    [DiscardFields.milestone]: string;
    [DiscardFields.targetDirectory]: string;
}