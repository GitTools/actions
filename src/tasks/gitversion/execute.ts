import 'reflect-metadata'
import { Runner } from '../../tools/gitversion/runner'

const runner = new Runner()
await runner.run()
