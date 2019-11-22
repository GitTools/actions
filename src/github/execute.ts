import "reflect-metadata";

import { IBuildAgent, IGitVersionTool } from "../interfaces";
import { ioc } from "../ioc";
import { run } from "../main";
import { TYPES } from "../types";
import { BuildAgent } from "./build-agent";

ioc.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent);

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

run(buildAgent, gitVersionTool);
