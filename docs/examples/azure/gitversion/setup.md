# Setup GitVersion Task (gitversion-setup) Usage Examples

Find out how to use the **gitversion-setup** task using the examples below.

> The examples use version _4.7.0_ of the GitVersion Setup task.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Setup GitVersion task accepts the following inputs:

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
preferLatestVersion:
  description: Prefer to download the latest version matching the versionSpec, even if there is a local cached version.
  required: false
  default: 'false'
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
  - checkout: self
    fetchDepth: 0
```

### Example 1

Install the latest GitVersion 7 version.

```yaml
steps:
  - task: gitversion-setup@5
    displayName: Install GitVersion
    inputs:
      versionSpec: '7.0.x'
```

### Example 2

Install GitVersion 7.0.0.

```yaml
steps:
  - task: gitversion-setup@5
    displayName: Install GitVersion
    inputs:
      versionSpec: '7.0.0'
```

### Example 3

Install the latest GitVersion 7 pre-release version.  For example **7.0.0-beta.6**.

```yaml
steps:
  - task: gitversion-setup@5
    displayName: Install GitVersion
    inputs:
      versionSpec: '7.0.x'
      includePrerelease: true
```

### Example 4

Install the latest GitVersion 7 version even if there is a cached version matching the versionSpec.

```yaml
steps:
  - task: gitversion-setup@5
    displayName: Install GitVersion
    inputs:
      versionSpec: '7.0.x'
      preferLatestVersion: true
```

### Example 5

Install GitVersion using a custom NuGet configuration file. This is useful in enterprise environments where access to public NuGet feeds is restricted and a private feed (such as Azure Artifacts or Artifactory) is used instead.

```yaml
steps:
  - task: gitversion-setup@5
    displayName: Install GitVersion
    inputs:
      versionSpec: '7.0.x'
      nugetConfigPath: '$(Build.SourcesDirectory)/nuget.config'
```
