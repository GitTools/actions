# Setup GitVersion Action (gitversion/setup) Usage Examples

Find out how to use the **gitversion/setup** action using the examples below.

> These examples require GitTools Actions v5 with GitVersion 7.0.x. Use Actions v4 with GitVersion 6.

## Inputs

The Setup GitVersion action accepts the following inputs:

```yaml
versionSpec:
  description: Required version in the form of 7.0.x or exact version like 7.0.0.
  required: true
  default: ''
includePrerelease:
  description: Include pre-release versions when matching a version.
  required: false
  default: false
ignoreFailedSources:
  description: Treat package source failures as warnings.
  required: false
  default: false
nugetConfigPath:
  description: Optional path to a NuGet configuration file to use for package sources.
  required: false
  default: ''
```

---

## Usage examples

In order for the gitversion to properly work you need to clone the repository with the entire history:

```yaml
steps:
  -
    name: Checkout
    uses: actions/checkout@v6
    with:
      fetch-depth: 0
```

### Example 1

Install the latest stable GitVersion 7.0.x release.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v4.7.2
    with:
      versionSpec: '7.0.x'
```

### Example 2

Install GitVersion 7.0.0.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v4.7.2
    with:
      versionSpec: '7.0.0'
```

### Example 3

Install the latest matching GitVersion 7.0.x release, allowing prereleases.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v4.7.2
    with:
      versionSpec: '7.0.x'
      includePrerelease: true
```

### Example 4

Install the latest stable GitVersion 7.0.x release even when a matching version is cached.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v4.7.2
    with:
      versionSpec: '7.0.x'
      preferLatestVersion: true
```

### Example 5

Install GitVersion using a custom NuGet configuration file. This is useful in enterprise environments where access to public NuGet feeds is restricted and a private feed (such as Azure Artifacts or Artifactory) is used instead.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v4.7.2
    with:
      versionSpec: '7.0.x'
      nugetConfigPath: '${{ github.workspace }}/nuget.config'
```
