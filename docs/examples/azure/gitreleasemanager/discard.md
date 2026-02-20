# Example

```yaml
  steps:
  - task: gitreleasemanager-discard@4.3.1
    inputs:
      token: '$(GITHUB_TOKEN)'
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
