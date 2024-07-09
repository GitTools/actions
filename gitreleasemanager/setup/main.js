import { run, folderName } from '../tool.js'

const command = folderName(import.meta.url)

await run('github', command)
