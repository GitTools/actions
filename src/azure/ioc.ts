import { Container } from "inversify";

import { DotnetTool, GitVersionTool, VersionManager } from "../common";
import { IBuildAgent, IDotnetTool, IGitVersionTool, IVersionManager } from "../interfaces";
import { TYPES } from "../types";
import { BuildAgent } from "./build-agent";

const ioc = new Container();

ioc.bind<IVersionManager>(TYPES.IVersionManager).to(VersionManager);
ioc.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent);
ioc.bind<IDotnetTool>(TYPES.IDotnetTool).to(DotnetTool);
ioc.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool);

export { ioc };
