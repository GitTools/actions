import { Container } from 'inversify'
import { TYPES } from './models'
import { BuildAgent } from '../agents/local/build-agent'
import { IBuildAgent } from '../agents/common/build-agent'

const container = new Container()

container.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent)

export default container
