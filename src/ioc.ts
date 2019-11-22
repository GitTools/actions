import { Container } from "inversify";

import { DotnetTool, GitVersionTool, VersionManager } from "./common";
import { IDotnetTool, IGitVersionTool, IVersionManager } from "./interfaces";
import { TYPES } from "./types";

const ioc = new Container();

ioc.bind<IVersionManager>(TYPES.IVersionManager).to(VersionManager);
ioc.bind<IDotnetTool>(TYPES.IDotnetTool).to(DotnetTool);
ioc.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool);

export { ioc };
