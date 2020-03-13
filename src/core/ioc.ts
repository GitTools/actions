import { Container } from 'inversify'
import { IVersionManager, VersionManager } from './versionManager'
import { TYPES, IBuildAgent } from './models'
import { BuildAgent } from '../agent/mock/build-agent'

const container = new Container()

container.bind<IVersionManager>(TYPES.IVersionManager).to(VersionManager)
container.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent)

export default container
