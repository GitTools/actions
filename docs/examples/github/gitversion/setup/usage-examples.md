# Setup GitVersion Action (gitversion/setup) Usage Examples

Find out how to use the **gitversion/setup** action using the examples below.

> The examples use version _0.9.6_ of the GitVersion Execute action.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Setup GitVersion action accepts the following inputs:

```yaml
versionSpec:
  description: Required version in the form of 5.x or exact version like 5.0.0.
  required: true
  default: ''
includePrerelease:
  description: Include pre-release versions when matching a version.
  required: false
  default: false
```

---

## Usage examples

### Example 1

Install the latest GitVersion 5 version.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v0.9.6
    with:
      versionSpec: '5.x'
```

### Example 2

Install GitVersion 5.5.0.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v0.9.6
    with:
      versionSpec: '5.5.0'
```

### Example 3

Install the latest GitVersion 6 pre-release version.  For example **6.0.0-beta1.1**.

```yaml
steps:
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v0.9.6
    with:
      versionSpec: '6.x'
      includePrerelease: true
```
