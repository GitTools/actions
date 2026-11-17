# Migrating to GitTools Actions v5

GitTools Actions v5 supports GitVersion 7.0.x. Keep using v4 for GitVersion 6.

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
require a .NET 11 runtime. Execution retains major runtime roll-forward.

GitVersion 7 provides RID-specific tool packages for Windows and Linux x64/ARM64,
Linux musl variants, and Intel/Apple Silicon macOS. Tool caches are separated by
OS/process architecture and Linux libc family. Incomplete installations are not
reused. Installation happens at the final cache path because RID tool
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

The following examples require Actions v5. The release workflow updates the
example references to the published Actions version.

## GitHub Actions example

```yaml
steps:
  - uses: actions/checkout@v7
    with:
      fetch-depth: 0
  - uses: actions/setup-dotnet@v6
    with:
      dotnet-version: '10.0.x'
  - uses: gittools/actions/gitversion/setup@v4.7.2
    with:
      versionSpec: '7.0.x'
  - uses: gittools/actions/gitversion/execute@v4.7.2
    id: version
    with:
      overrideConfig: |
        calculation.semantic-version-format=Loose
  - run: echo '${{ steps.version.outputs.preReleaseLabelName }}'
```

## Azure Pipelines example

Install or update the GitTools extension to use the v5 tasks.

```yaml
steps:
  - checkout: self
    fetchDepth: 0
    fetchTags: true
  - task: UseDotNet@2
    inputs:
      packageType: sdk
      version: '10.0.x'
  - task: gitversion-setup@4.7.2
    inputs:
      versionSpec: '7.0.x'
  - task: gitversion-execute@4.7.2
    name: version
    inputs:
      overrideConfig: |
        calculation.semantic-version-format=Loose
  - pwsh: Write-Host '$(GitVersion_PreReleaseLabelName)'
```

## Integration validation

CI and integration tests use the `7.0.x` range and allow prereleases. Run
`npm run build` before `npm run test:ci` to test the source modules and the built
local agent. GitHub CI exercises the built actions. Azure CI packages and runs
the local VSIX without publishing it. Tests fetch packages from NuGet using the
repository's `nuget.config`.

The release notification workflow proposes version range updates in docs,
workflows, and integration tests. Moving to a new GitVersion minor line also
requires updating the supported range. The output example pipelines use
GitVersion 7.0.x and require the Actions v5.0.0 tag on GitHub or the v5.0.0
tasks in the installed Azure Marketplace extension.

NativeAOT and complete LibGit2Sharp removal are not assumed prerequisites for
this integration; the established upstream `src/` CLI is the compatibility target.
