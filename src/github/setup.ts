import "reflect-metadata";

import { IBuildAgent, IGitVersionTool } from "../interfaces";
import { setup } from "../main";
import { TYPES } from "../types";
import { ioc } from "./ioc";

const gitVersionTool = ioc.get<IGitVersionTool>(TYPES.IGitVersionTool);
const buildAgent = ioc.get<IBuildAgent>(TYPES.IBuildAgent);

setup(buildAgent, gitVersionTool);
