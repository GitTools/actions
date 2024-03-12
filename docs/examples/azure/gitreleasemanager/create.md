# Example

```yaml
  steps:
  - task: gitreleasemanager/create@1.1.1
    displayName: Create release with GitReleaseManager
    inputs:
      token: $(GITHUB_TOKEN)
      owner: 'someOwner'
      repository: 'someRepo'
      milestone: '0.1.0'
      name: 'v0.1.0'
      assets: |
        src/test.txt
        src/test1.txt
```
