import { type Commands } from './models'
import { Runner } from './runner'

export async function run(command: Commands) {
    const runner = new Runner()
    await runner.run(command)
}
