# Example

```yaml
  steps:
  - task: gitreleasemanager/open@3.0.4
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      milestone: '0.1.0'
```
