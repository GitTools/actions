# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/close@v3.1.11
    name: Close release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      milestone: '0.1.0'
```
