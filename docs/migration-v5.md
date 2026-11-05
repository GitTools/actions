# Migrating to GitTools Actions v5

GitTools Actions v5 supports GitVersion 7. Keep using v4 for GitVersion 6.
The v5 examples describe the upcoming release; the v5 tag and GitVersion 7 stable
package must be published before they can be used as stable dependencies.

## Output names and meanings

| v4 output | v5 output | Example |
| --- | --- | --- |
| `preReleaseTag` | `preReleaseLabel` | `beta.99` |
| `preReleaseTagWithDash` | `preReleaseLabelWithDash` | `-beta.99` |
| `preReleaseLabel` | `preReleaseLabelName` | `beta` |
| `preReleaseLabelWithDash` | `preReleaseLabelNameWithDash` | `-beta` |
| `commitsSinceVersionSource` | `versionSourceDistance` | same count |

The name `preReleaseLabel` remains available but changes meaning. Update package
names, conditions and build-number formats that previously expected just `beta`.
The mapping also applies to `GitVersion_`-prefixed names such as
`GitVersion_PreReleaseLabelName`. `preReleaseNumber` is unchanged.

The additional outputs are `customVersion`, `semVerSourceSemVer`,
`semVerSourceSha`, `semVerSourceIncrement`, `commitCountSourceSha` and
`commitCountSourceDistance`. `customVersion` is empty unless configured.
Nullable values become empty strings in pipeline outputs and environment
variables; numeric zero remains `0`.

`versionSourceDistance` and `commitCountSourceDistance` describe the same count.
Use `semVerSourceIncrement` for new consumers needing the semantic increment;
the older `versionSourceIncrement` can be `None` after candidate resolution.
Semantic provenance and counting anchors can differ, and a semantic source SHA
can be absent. Avoid deriving the count from `semVerSourceSha`.

Azure tasks continue emitting camel-case and `GitVersion_` names. The upstream
CLI's removal of dotted Azure names requires no extra separator migration for
these wrapper outputs.

## Arguments and configuration

Use POSIX arguments such as `--show-variable FullSemVer`, `--format {SemVer}`
and `--config GitVersion.yml`. The old `-c <commit>` becomes `--commit <commit>`;
`-c` now selects configuration. The command action forwards user arguments and
does not translate legacy switches.

Migrate flat configuration with `gitversion config migrate`, then run
`gitversion config validate --config GitVersion.yml`. Migration can remove YAML
comments, so review the output before replacing the original file. The wrapper
does not rewrite user files. Settings now belong under `calculation` or `output`.
Use nested overrides such as `calculation.tag-prefix=[vV]?` and
`output.custom-version-format={SemVer}`. Invalid override syntax fails instead of
being silently ignored; GitVersion validates supported paths and values.

The temporary v6 parser and configuration selectors are independent and are
scheduled for removal in GitVersion 7.1. V5 uses v7 behavior directly.

## Installation and platforms

Install the .NET 10 SDK before setup. V5 requests the tool's `net10.0` target,
including when a newer SDK is installed, so a cached tool does not unexpectedly
require a .NET 11 runtime. Execution retains major runtime roll-forward. The
pinned source rehearsal currently also needs its exact .NET 11 preview SDK to
build upstream; that is a test-build prerequisite, not a requirement imposed on
all v5 consumers.

GitVersion 7 packages tools per RID. Windows and Linux x64/ARM64, Linux musl
variants, and Apple Silicon macOS are upstream targets. Intel macOS users should
remain on Actions v4 and GitVersion 6. CI currently exercises Windows x64, Linux
x64/ARM64 and Apple Silicon macOS; Windows ARM64 and musl remain release checks.
Tool caches are separated by OS/process architecture. Incomplete installations
are not reused. Installation happens at the final cache path because RID tool
launchers can depend on that location.

Keep Git on PATH for shallow-clone checks, normalization, dynamic repositories
and network/write operations. Use a complete checkout with tags. Disabling the
wrapper's shallow-clone check does not tell GitVersion to allow shallow history.
`GIT_BRANCH` and `Git_Branch` now provide context at the checked-out commit; they
do not select another branch tip. Explicit `--branch` wins over that context.
Check ambient CI variables when calculated versions differ after migration.

GitVersion 7 Docker images run as non-root. Container examples must provide a
writable checkout, and pinned distribution tags need checking against upstream's
migration guide. The normal setup action installs the .NET tool.

## Telemetry

The wrappers retain their existing telemetry opt-out policy. GitVersion steps
set `GITVERSION_TELEMETRY_OPTOUT=true` as well as the existing .NET SDK opt-out.
No collection campaign or caller-identification marker is enabled by this
integration. These pipeline variables also affect later steps that inherit them.
Console diagnostics on stderr are not, by themselves, execution failures.

## GitHub Actions example

After both stable releases are published:

```yaml
steps:
  - uses: actions/checkout@v7
    with:
      fetch-depth: 0
  - uses: actions/setup-dotnet@v6
    with:
      dotnet-version: '10.0.x'
  - uses: gittools/actions/gitversion/setup@v5
    with:
      versionSpec: '7.0.x'
  - uses: gittools/actions/gitversion/execute@v5
    id: version
    with:
      overrideConfig: |
        calculation.semantic-version-format=Loose
  - run: echo '${{ steps.version.outputs.preReleaseLabelName }}'
```

## Azure Pipelines example

After the v5 tasks are available in the installed extension:

```yaml
steps:
  - checkout: self
    fetchDepth: 0
    fetchTags: true
  - task: UseDotNet@2
    inputs:
      packageType: sdk
      version: '10.0.x'
  - task: gitversion-setup@5
    inputs:
      versionSpec: '7.0.x'
  - task: gitversion-execute@5
    name: version
    inputs:
      overrideConfig: |
        calculation.semantic-version-format=Loose
  - pwsh: Write-Host '$(GitVersion_PreReleaseLabelName)'
```

## Validation and release order

The default test baseline builds RID-specific packages from the immutable
upstream commit in `scripts/gitversion-test.json`. Run `npm run test:ci` with the
SDKs required by that baseline. This source rehearsal is not published-package
validation. CI tests the built GitHub entrypoints and the Azure adapter; Azure CI
also packages and executes the local VSIX without publishing it.

Use the CI workflow's `gitversion-version` input to validate an exact published
v7 prerelease or stable version. Locally set `GITVERSION_TEST_VERSION` before
`npm run test:ci` to select that route. It uses NuGet rather than the local source
package feed and must pass before declaring release compatibility.

The release notification workflow accepts stable GitVersion 7 updates only. It
opens a PR updating the published test baseline; it does not implement
compatibility, merge a PR or publish an Actions release. Existing v4 marketplace
example pipelines remain explicit v4/GitVersion 6 regression checks.

Before releasing v5:

1. Review the full stack and establish the v4 maintenance/release boundary.
2. Validate against the final GitVersion 7 RC, then its exact stable package.
3. Complete Windows ARM64/musl checks and any outstanding reviewer findings.
4. Publish v5 only after explicit maintainer approval. Keep the v4 tags available.

NativeAOT and complete LibGit2Sharp removal are not assumed prerequisites for
this integration; the established upstream `src/` CLI is the compatibility target.
