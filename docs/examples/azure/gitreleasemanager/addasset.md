# Example

```yaml
  steps:
  - task: gitreleasemanager/addasset@1.1.1
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      tagName: '0.1.0'
      assets: |
        src/test.txt
        src/test1.txt
```
