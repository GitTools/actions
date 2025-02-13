# Example

```yaml
  steps:
  - task: gitreleasemanager/publish@3.1.11
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
