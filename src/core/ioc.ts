import { Container } from 'inversify'
import { TYPES, IBuildAgent } from './models'
import { BuildAgent } from '../agents/local/build-agent'

const container = new Container()

container.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent)

export default container
