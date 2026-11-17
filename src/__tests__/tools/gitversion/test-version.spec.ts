import { it, expect, vi } from 'vitest'
import { selectTestVersion } from './test-version'

vi.mock('../../../../package.json', () => ({ config: { gitversionVersion: '7.0.0-beta.fixture' } }))

it('selects the published baseline by default', () => {
    expect(selectTestVersion({})).toBe('7.0.0-beta.fixture')
})

it('lets an explicit published version override the published baseline', () => {
    expect(selectTestVersion({ GITVERSION_TEST_VERSION: '7.0.0-rc.1' })).toBe('7.0.0-rc.1')
})

it('uses the published baseline when the workflow version input is empty', () => {
    expect(selectTestVersion({ GITVERSION_TEST_VERSION: '' })).toBe('7.0.0-beta.fixture')
})
