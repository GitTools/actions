// A release notification updates the test baseline; it never implements compatibility.
import { readFileSync, writeFileSync } from 'node:fs'
const version = (process.env.GITVERSION_RELEASE_TAG || '').replace(/^v/, '')
if (version.trim() !== version || !/^7\.\d+\.\d+$/.test(version)) throw new Error('Only stable GitVersion 7 notifications belong on the Actions v5 line')
const manifest = new URL('./gitversion-test.json', import.meta.url)
const baseline = JSON.parse(readFileSync(manifest, 'utf8'))
baseline.publishedVersion = version
writeFileSync(manifest, `${JSON.stringify(baseline, null, 2)}\n`)
console.log(`GitVersion published-package validation baseline: ${version}`)
