# Example

```yaml
  steps:
  - task: gitreleasemanager/addasset@3.2.1
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      milestone: '0.1.0'
      assets: |
        src/test.txt
        src/test1.txt
```
