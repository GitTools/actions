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
