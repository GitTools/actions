# Example

```yaml
  steps:
  - task: gitreleasemanager-create@4.0.1
    displayName: Create release with GitReleaseManager
    inputs:
      token: $(GITHUB_TOKEN)
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
      name: 'v0.1.0'
      assets: |
        src/test.txt
        src/test1.txt
```
