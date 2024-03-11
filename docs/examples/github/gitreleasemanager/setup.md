### Example 1

Install the latest GitReleaseManager version.

```yaml
steps:
  - name: Install GitReleaseManager
    uses: gittools/actions/gitreleasemanager/setup@v0.13.4
    with:
      versionSpec: '0.17.x'
```

### Example 2

Install specific GitReleaseManager version 0.17.0.

```yaml
steps:
  - name: Install GitReleaseManager
    uses: gittools/actions/gitreleasemanager/setup@v0.13.4
    with:
      versionSpec: '0.17.0'
```

### Example 3

Install the latest GitReleaseManager version 0.17.x even it there is a cached version matching the versionSpec.

```yaml
steps:
  - name: Install GitReleaseManager
    uses: gittools/actions/gitreleasemanager/setup@v0.13.4
    with:
      versionSpec: '0.17.x'
      preferLatestVersion: true
```
