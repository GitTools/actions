import { Container } from 'inversify'
import { BuildAgent } from '../../agents/local/build-agent'
import { IBuildAgent } from '../../agents/common/build-agent'
import { TYPES } from './models'

const container = new Container()

container.bind<IBuildAgent>(TYPES.IBuildAgent).to(BuildAgent)

export default container
