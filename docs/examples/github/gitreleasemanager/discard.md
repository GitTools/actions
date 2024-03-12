# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/discard@v1.1.1
    name: Discard release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      milestone: '0.1.0'
```
