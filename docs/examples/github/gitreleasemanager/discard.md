# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/discard@v0.9.2
    name: Discard release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      milestone: '0.1.0'
```
