# Example

```yaml
  steps:
  - task: gitversion/setup@0
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.1.3'
```

# Example

```yaml
steps:
- task: gitversion/execute@0
  displayName: Use GitVersion
- script: |
    echo FullSemVer: $(fullSemVer)
    echo ##vso[build.updatebuildnumber]$(fullSemVer)
```
