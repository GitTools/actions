# Example

```yaml
  steps:
  - task: gitreleasemanager/addasset@4.0.0
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
      assets: |
        src/test.txt
        src/test1.txt
```
