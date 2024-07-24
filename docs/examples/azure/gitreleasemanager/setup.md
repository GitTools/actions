# Setup GitReleaseManager Task (gitreleasemanager/setup) Usage Examples

Find out how to use the **gitreleasemanager/setup** task using the examples below.

> The examples use version _2.0.1_ of the GitReleaseManager Setup task.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Setup GitReleaseManager action accepts the following inputs:

```yaml
versionSpec:
  description: Required version in the form of 0.18.x or exact version like 0.18.0.
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
```

### Example 1

Install the latest GitReleaseManager 0.18.x version.

```yaml
steps:
  - task: gitreleasemanager/setup@2.0.1
    displayName: Install GitReleaseManager
    inputs:
      versionSpec: '0.18.x'
```

### Example 2

Install specific GitReleaseManager version 0.18.0.

```yaml
steps:
  - task: gitreleasemanager/setup@2.0.1
    displayName: Install GitReleaseManager
    inputs:
      versionSpec: '0.18.0'
```

### Example 3

Install the latest GitReleaseManager 0.18.x version even it there is a cached version matching the versionSpec.

```yaml
steps:
  - task: gitreleasemanager/setup@2.0.1
    displayName: Install GitReleaseManager
    inputs:
      versionSpec: '0.18.x'
      preferLatestVersion: true
```
