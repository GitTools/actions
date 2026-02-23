# Example

```yaml
  steps:
  - task: gitreleasemanager-open@4.3.3
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
