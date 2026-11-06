// Build an unpublished, pinned GitVersion 7 tool for compatibility tests only.
import { execFileSync } from 'node:child_process'
import { mkdirSync, existsSync, readFileSync, writeFileSync, appendFileSync, realpathSync } from 'node:fs'
import { resolve, join, delimiter, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const baseline = JSON.parse(readFileSync(new URL('./gitversion-test.json', import.meta.url), 'utf8'))
const source = resolve(process.env.GITVERSION_TEST_SOURCE || join(root, '.test', 'gitversion-source'))
const rid = `${{ win32: 'win', darwin: 'osx', linux: 'linux' }[process.platform]}-${process.arch}`
if (!['win-x64', 'win-arm64', 'osx-arm64', 'linux-x64', 'linux-arm64'].includes(rid)) {
    throw new Error(`Unsupported source-rehearsal RID: ${rid}`)
}
const packages = join(root, '.test', 'packages', baseline.commit, rid)
const executable = name => {
    const filename = process.platform === 'win32' ? `${name}.exe` : name
    const candidate = (process.env.PATH || '').split(delimiter).filter(isAbsolute)
        .map(directory => join(directory, filename)).find(existsSync)
    if (!candidate) throw new Error(`Required executable not found: ${name}`)
    return realpathSync(candidate)
}
const dotnet = process.env.DOTNET_HOST_PATH ? realpathSync(process.env.DOTNET_HOST_PATH) : executable('dotnet')
const git = executable('git')
const run = (command, args, cwd) => {
    if (!isAbsolute(command)) throw new Error('Test commands must use an absolute executable path')
    // NOSONAR: Executables are resolved to absolute paths above; arguments never run through a shell.
    return execFileSync(command, args, { cwd, stdio: 'inherit' })
}
const marker = join(packages, `GitVersion.Tool.${rid}.${baseline.version}.nupkg`)
if (!existsSync(marker)) {
    mkdirSync(packages, { recursive: true })
    if (!existsSync(source)) {
        mkdirSync(source, { recursive: true })
        run(git, ['init'], source)
        run(git, ['fetch', '--depth', '1', baseline.repository, baseline.commit], source)
        run(git, ['checkout', '--detach', 'FETCH_HEAD'], source)
    }
    const actual = execFileSync(git, ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' }).trim()
    if (actual !== baseline.commit) throw new Error(`GitVersion test source must be pinned to ${baseline.commit}`)
    try {
        run(git, ['diff', '--exit-code', '--quiet', '--'], source)
        run(git, ['diff', '--cached', '--exit-code', '--quiet', '--'], source)
    } catch (cause) {
        throw new Error('Pinned GitVersion source has tracked modifications', { cause })
    }
    run(dotnet, ['pack', 'src/GitVersion.App/GitVersion.App.csproj', '-p:PackAsTool=true',
        `-p:PackageVersion=${baseline.version}`, `-p:RuntimeIdentifiers=${rid}`, `-p:ToolPackageRuntimeIdentifiers=${rid}`,
        '-p:DisableAnalyzers=true', '-p:DisableApiAnalyzers=true', '-p:BuildInParallel=false', '--output', packages, '--nologo', '-v', 'quiet'], source)
}
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const config = join(root, '.test', 'gitversion.nuget.config')
writeFileSync(config, `<?xml version="1.0" encoding="utf-8"?>\n<configuration><packageSources><clear/><add key="rehearsal" value="${escapeXml(packages)}"/><add key="nuget.org" value="https://api.nuget.org/v3/index.json"/></packageSources></configuration>\n`)
if (process.env.GITHUB_ENV) appendFileSync(process.env.GITHUB_ENV, `GITVERSION_TEST_VERSION=${baseline.version}\nGITVERSION_TEST_NUGET_CONFIG=${config}\n`)
console.log(`GitVersion source rehearsal: ${baseline.commit} / ${baseline.version} / ${rid}`)
console.log(`Local package source: ${packages}`)
console.log('This does not validate a published release package.')
