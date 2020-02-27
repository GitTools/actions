# Example

```yaml
steps:
- task: gitversion/execute@0
  displayName: Use GitVersion
- script: |
    echo FullSemVer: $(fullSemVer)
    echo ##vso[build.updatebuildnumber]$(fullSemVer)
```
