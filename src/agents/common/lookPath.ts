import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as process from 'node:process'

/**
 * Sometimes, people want to look for local executable files
 * which are specified with either relative or absolute file path.
 * @private
 * @param cmd
 * @return {string} An absolute path of given command, or undefined.
 */
const isFilePath = (cmd: string): string | undefined => {
    return cmd.includes(path.sep) ? path.resolve(cmd) : undefined
}

/**
 * Just promisifies "fs.access"
 * @private
 * @param {string} filePath An absolute file path with an applicable extension appended.
 * @return {Promise<string>} Resolves absolute path or empty string.
 */
const access = async (filePath: string): Promise<string | undefined> => {
    try {
        await fs.access(filePath)
        return filePath
    } catch (e) {
        return undefined
    }
}

/**
 * Resolves if the given file is executable or not, regarding "PATHEXT" to be applied.
 * @private
 * @param {string} absPath A file path to be checked.
 * @param {LookPathOption} options Options for lookPath.
 * @return {Promise<string>} Resolves the absolute file path just checked, or undefined.
 */
const isExecutable = async (absPath: string, options: LookPathOption = {}): Promise<string | undefined> => {
    const envVars = options.env || process.env
    const extension = (envVars.PATHEXT || '').split(path.delimiter).concat('')
    const bins = await Promise.all(extension.map(async ext => access(absPath + ext.toLowerCase())))
    return bins.find(bin => !!bin)
}

/**
 * Returns a list of directories on which the target command should be looked for.
 * @private
 * @param {string[]} options.include Will be added to "PATH" env.
 * @param {string[]} options.exclude Will be filtered from "PATH" env.
 * @return {string[]} Directories to dig into.
 */
const getDirsToWalkThrough = (options: LookPathOption): string[] => {
    const envVars = options.env || process.env
    const envName = process.platform === 'win32' ? 'Path' : 'PATH'
    const envPath = envVars[envName] || ''
    return envPath
        .split(path.delimiter)
        .concat(options.include || [])
        .filter(p => !(options.exclude || []).includes(p))
}

/**
 * Returns async promise with absolute file path of given command,
 * and resolves with undefined if the command not found.
 * @param {string} command Command name to look for.
 * @param {LookPathOption} opt Options for lookPath.
 * @return {Promise<string|undefined>} Resolves absolute file path, or undefined if not found.
 */
export async function lookPath(command: string, opt: LookPathOption = {}): Promise<string | undefined> {
    const directPath = isFilePath(command)
    if (directPath) return isExecutable(directPath, opt)

    const dirs = getDirsToWalkThrough(opt)
    const bins = await Promise.all(dirs.map(async dir => isExecutable(path.join(dir, command), opt)))
    return bins.find(bin => !!bin)
}

/**
 * Options for lookPath.
 */
export interface LookPathOption {
    /**
     * Additional paths to look for, would be dealt same as PATH env.
     * Example: ['/tmp/bin', 'usr/local/bin']
     */
    include?: string[]
    /**
     * Paths to exclude to look for.
     * Example: ['/mnt']
     */
    exclude?: string[]
    /**
     * Set of env var to be used ON BEHALF OF the existing env of your runtime.
     * If `include` or `exclude` are given, they will be applied to this env set.
     */
    env?: NodeJS.ProcessEnv
}
