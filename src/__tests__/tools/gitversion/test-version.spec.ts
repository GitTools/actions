import { it, expect } from 'vitest'
import { selectTestVersion } from './test-version'

const baseline = { version: '7.0.0-alpha.source', publishedVersion: '7.0.0-beta.1' }

it('selects the pinned source version when source mode is requested', () => {
    expect(selectTestVersion(baseline, { GITVERSION_TEST_MODE: 'source' })).toBe('7.0.0-alpha.source')
})

it('keeps source mode pinned even when a published version override is present', () => {
    expect(selectTestVersion(baseline, { GITVERSION_TEST_MODE: 'source', GITVERSION_TEST_VERSION: '7.0.0-rc.1' })).toBe('7.0.0-alpha.source')
})

it('selects the published baseline by default', () => {
    expect(selectTestVersion(baseline, {})).toBe('7.0.0-beta.1')
})

it('lets an explicit published version override the published baseline', () => {
    expect(selectTestVersion(baseline, { GITVERSION_TEST_VERSION: '7.0.0-rc.1' })).toBe('7.0.0-rc.1')
})

it('uses the published baseline when the workflow version input is empty', () => {
    expect(selectTestVersion(baseline, { GITVERSION_TEST_VERSION: '' })).toBe('7.0.0-beta.1')
})

it('falls back to source when no published baseline or override exists', () => {
    expect(selectTestVersion({ version: '7.0.0-alpha.source', publishedVersion: null }, {})).toBe('7.0.0-alpha.source')
})
