# Example

```yaml
  steps:
  - task: gitreleasemanager/discard@3.1.6
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      milestone: '0.1.0'
```
