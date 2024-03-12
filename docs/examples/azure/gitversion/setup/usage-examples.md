# Setup GitVersion Task (gitversion/setup) Usage Examples

Find out how to use the **gitversion/setup** task using the examples below.

> The examples use version _1.1.1_ of the GitVersion Execute task.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Setup GitVersion task accepts the following inputs:

```yaml
versionSpec:
  description: Required version in the form of 5.x or exact version like 5.12.0.
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

Install the latest GitVersion 5 version.

```yaml
steps:
  - task: gitversion/setup@1.1.1
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.x'
```

### Example 2

Install GitVersion 5.12.0.

```yaml
steps:
  - task: gitversion/setup@1.1.1
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.12.0'
```

### Example 3

Install the latest GitVersion 6 pre-release version.  For example **6.0.0-beta.6**.

```yaml
steps:
  - task: gitversion/setup@1.1.1
    displayName: Install GitVersion
    inputs:
      versionSpec: '6.x'
      includePrerelease: true
```

### Example 4

Install the latest GitVersion 5 version even it there is a cached version matching the versionSpec.

```yaml
steps:
  - task: gitversion/setup@1.1.1
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.x'
      preferLatestVersion: true
```
