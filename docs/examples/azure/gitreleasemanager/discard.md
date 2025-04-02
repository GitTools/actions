# Example

```yaml
  steps:
  - task: gitreleasemanager/discard@3.2.0
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
