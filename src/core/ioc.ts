import { Container } from "inversify";

import { BuildAgent } from "../agent/mock/build-agent";
import { DotnetTool, GitReleaseManagerTool, GitVersionTool, VersionManager } from "./common";
import { IBuildAgent, IDotnetTool, IGitReleaseManagerTool, IGitVersionTool, IVersionManager } from "./interfaces";
import { TYPES } from "./types";

const ioc = new Container();

ioc.bind<IVersionManager>(TYPES.IVersionManager).to(VersionManager);
ioc.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent);
ioc.bind<IDotnetTool>(TYPES.IDotnetTool).to(DotnetTool);
ioc.bind<IGitVersionTool>(TYPES.IGitVersionTool).to(GitVersionTool);
ioc.bind<IGitReleaseManagerTool>(TYPES.IGitReleaseManagerTool).to(GitReleaseManagerTool);

export { ioc };
