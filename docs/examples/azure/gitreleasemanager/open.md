# Example

```yaml
  steps:
  - task: gitreleasemanager/open@3.3.0
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
