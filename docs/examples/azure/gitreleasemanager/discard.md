# Example

```yaml
  steps:
  - task: gitreleasemanager/discard@4.0.0
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
