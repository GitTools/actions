# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/addasset@v2.0.0
    name: Add asset to a release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      milestone: '0.1.0'
      assets: |
        src/test.txt
        src/test1.txt
```
