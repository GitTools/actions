# Example

```yaml
  steps:
  - task: gitreleasemanager/close@3.0.2
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      milestone: '0.1.0'
```
