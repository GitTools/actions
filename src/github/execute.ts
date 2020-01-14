import "reflect-metadata";

import { IBuildAgent, IGitVersionTool } from "../core/interfaces";
import { ioc } from "../core/ioc";
import { run } from "../core/main";
import { TYPES } from "../core/types";
import { BuildAgent } from "./build-agent";

ioc.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent);

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

run(buildAgent, gitVersionTool);
