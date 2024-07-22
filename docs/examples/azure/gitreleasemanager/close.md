# Example

```yaml
  steps:
  - task: gitreleasemanager/close@2.0.0
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      milestone: '0.1.0'
```
