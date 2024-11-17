# Example

```yaml
  steps:
  - task: gitreleasemanager/publish@3.0.1
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      milestone: '0.1.0'
```
