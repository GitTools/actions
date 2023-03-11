# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/closev0
    name: Close release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      milestone: '0.1.0'
```
