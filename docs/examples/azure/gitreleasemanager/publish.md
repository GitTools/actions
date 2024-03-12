# Example

```yaml
  steps:
  - task: gitreleasemanager/publish@1.1.0
    inputs:
      token: '$(GITHUB_TOKEN)'
      owner: 'someOwner'
      repository: 'someRepo'
      tagName: '0.1.0'
```
