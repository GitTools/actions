# Setup GitVersion Action (gitversion/setup) Usage Examples

Find out how to use the **gitversion/setup** action using the examples below.

> The examples use version _3.1.1_ of the GitVersion Setup action.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Setup GitVersion action accepts the following inputs:

```yaml
versionSpec:
  description: Required version in the form of 6.x or exact version like 6.0.0.
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

---

## Usage examples

In order for the gitversion to properly work you need to clone the repository with the entire history:

```yaml
steps:
  -
    name: Checkout
    uses: actions/checkout@v4
    with:
      fetch-depth: 0
```

### Example 1

Install the latest GitVersion 6 version.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v3.1.1
    with:
      versionSpec: '6.0.x'
```

### Example 2

Install GitVersion 6.0.0.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v3.1.1
    with:
      versionSpec: '6.0.0'
```

### Example 3

Install the latest GitVersion 6 pre-release version.  For example **6.0.0-beta.6**.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v3.1.1
    with:
      versionSpec: '6.0.x'
      includePrerelease: true
```

### Example 4

Install the latest GitVersion 6 version even it there is a cached version matching the versionSpec.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v3.1.1
    with:
      versionSpec: '6.0.x'
      preferLatestVersion: true
```
