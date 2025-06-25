# Example

```yaml
  steps:
  - task: gitreleasemanager/close@3.2.1
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
