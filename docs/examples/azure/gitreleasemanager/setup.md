# Setup GitReleaseManager Task (gitreleasemanager-setup) Usage Examples

Find out how to use the **gitreleasemanager-setup** task using the examples below.

> The examples use version _4.3.3_ of the GitReleaseManager Setup task.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Setup GitReleaseManager action accepts the following inputs:

```yaml
versionSpec:
  description: Required version in the form of 0.20.x or exact version like 0.20.0.
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

### Example 1

Install the latest GitReleaseManager 0.20.x version.

```yaml
steps:
  - task: gitreleasemanager-setup@4.3.3
    displayName: Install GitReleaseManager
    inputs:
      versionSpec: '0.20.x'
```

### Example 2

Install specific GitReleaseManager version 0.20.0.

```yaml
steps:
  - task: gitreleasemanager-setup@4.3.3
    displayName: Install GitReleaseManager
    inputs:
      versionSpec: '0.20.0'
```

### Example 3

Install the latest GitReleaseManager 0.20.x version even if there is a cached version matching the versionSpec.

```yaml
steps:
  - task: gitreleasemanager-setup@4.3.3
    displayName: Install GitReleaseManager
    inputs:
      versionSpec: '0.20.x'
      preferLatestVersion: true
```

### Example 4

Install GitReleaseManager using a custom NuGet configuration file. This is useful in enterprise environments where access to public NuGet feeds is restricted and a private feed (such as Azure Artifacts or Artifactory) is used instead.

```yaml
steps:
  - task: gitreleasemanager-setup@4.3.3
    displayName: Install GitReleaseManager
    inputs:
      versionSpec: '0.20.x'
      nugetConfigPath: '$(Build.SourcesDirectory)/nuget.config'
```
