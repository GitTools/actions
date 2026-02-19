# Example

```yaml
  steps:
  - task: gitreleasemanager-close@4.3.0
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
