import util from 'node:util'
import path from 'node:path'
import url  from 'node:url'
import { execFile } from 'node:child_process'

const execJsFile = util.promisify(execFile)

export async function run(agent, command) {
    try {
        const toolName = folderName(import.meta.url)
        const { stdout, stderr } = await execJsFile('node', [`dist/tools/${toolName}.js`, '--buildAgent', agent, '--command', command])
        console.log(stdout)
        if (stderr) {
            console.error(stderr)
        }
    } catch (error) {
        console.error(error)
    }
}

export function folderName(filePath) {
    const filename = url.fileURLToPath(filePath)
    const directory = path.dirname(filename)
    return path.parse(directory).name
}
