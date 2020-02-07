import { Container } from "inversify";
import { IVersionManager, VersionManager } from "./versionManager";
import { TYPES, IBuildAgent } from "./common";
import { BuildAgent } from "../agent/mock/build-agent";
import { IDotnetTool, DotnetTool } from "./dotnet-tool";

const container = new Container();

container.bind<IVersionManager>(TYPES.IVersionManager).to(VersionManager);
container.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent);
container.bind<IDotnetTool>(TYPES.IDotnetTool).to(DotnetTool);

export default container;
