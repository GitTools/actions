import { type ExecResult } from '@agents/common'

export type SetupSettings = {
    versionSpec: string
    includePrerelease: boolean
    ignoreFailedSources: boolean
    preferLatestVersion: boolean
}

export type IRunner = {
    run(command: string): Promise<ExecResult>
}

export type NugetVersions = { data: { versions: { version: string }[] }[] }

/** See the {@link https://learn.microsoft.com/en-us/nuget/api/service-index|NuGet Server API spec}*/
export type NugetServiceIndex = {
    version: string
    resources: {
        '@type': `${NugetServiceType}${`/${string}` | ''}`
        '@id': string
        comment: string | undefined
    }[]
}

export enum NugetServiceType {
    Catalog = 'Catalog',
    PackageBaseAddress = 'PackageBaseAddress',
    PackageDetailsUriTemplate = 'PackageDetailsUriTemplate',
    PackagePublish = 'PackagePublish',
    ReadmeUriTemplate = 'ReadmeUriTemplate',
    RegistrationsBaseUrl = 'RegistrationsBaseUrl',
    ReportAbuseUriTemplate = 'ReportAbuseUriTemplate',
    RepositorySignatures = 'RepositorySignatures',
    SearchAutocompleteService = 'SearchAutocompleteService',
    SearchQueryService = 'SearchQueryService',
    SymbolPackagePublish = 'SymbolPackagePublish',
    VulnerabilityInfo = 'VulnerabilityInfo'
}
