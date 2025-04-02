# Setup GitReleaseManager Action (gitreleasemanager/setup) Usage Examples

Find out how to use the **gitreleasemanager/setup** action using the examples below.

> The examples use version _3.2.0_ of the GitReleaseManager Setup action.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Setup GitReleaseManager action accepts the following inputs:

```yaml
versionSpec:
  description: Required version in the form of 0.19.x or exact version like 0.19.0.
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

Install the latest GitReleaseManager 0.19.x version.

```yaml
steps:
  - name: Install GitReleaseManager
    uses: gittools/actions/gitreleasemanager/setup@v3.2.0
    with:
      versionSpec: '0.19.x'
```

### Example 2

Install specific GitReleaseManager version 0.19.0.

```yaml
steps:
  - name: Install GitReleaseManager
    uses: gittools/actions/gitreleasemanager/setup@v3.2.0
    with:
      versionSpec: '0.19.0'
```

### Example 3

Install the latest GitReleaseManager 0.19.x version even it there is a cached version matching the versionSpec.~~~~

```yaml
steps:
  - name: Install GitReleaseManager
    uses: gittools/actions/gitreleasemanager/setup@v3.2.0
    with:
      versionSpec: '0.19.x'
      preferLatestVersion: true
```
