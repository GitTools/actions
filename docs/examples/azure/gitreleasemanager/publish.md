# Example

```yaml
  steps:
  - task: gitreleasemanager-publish@4.4.2
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
