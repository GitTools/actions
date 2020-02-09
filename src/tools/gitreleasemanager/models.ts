export enum CommonFields {
    repository = "repository",
    owner = "owner",
    token = "token",
    targetDirectory = "targetDirectory",
}

export enum CreateFields {
    milestone = "milestone",
    releaseName = "releaseName",
    inputFileName = "inputFileName",
    isPreRelease = "isPreRelease",
    commit = "commit",
    assets = "assets",
}

export enum DiscardFields {
    milestone = "milestone",
}

export enum CloseFields {
    milestone = "milestone",
}

export interface GitReleaseManagerSettings {
    [CommonFields.repository]: string;
    [CommonFields.owner]: string;
    [CommonFields.token]: string;
    [CommonFields.targetDirectory]: string;
}

export interface GitReleaseManagerCreateSettings extends GitReleaseManagerSettings {
    [CreateFields.milestone]: string;
    [CreateFields.releaseName]: string;
    [CreateFields.inputFileName]: string;
    [CreateFields.isPreRelease]: boolean;
    [CreateFields.commit]: string;
    [CreateFields.assets]?: string[];
}

export interface GitReleaseManagerDiscardSettings extends GitReleaseManagerSettings {
    [DiscardFields.milestone]: string;
}

export interface GitReleaseManagerCloseSettings extends GitReleaseManagerSettings {
    [CloseFields.milestone]: string;
}