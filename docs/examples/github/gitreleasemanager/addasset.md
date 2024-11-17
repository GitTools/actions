# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/addasset@v3.0.1
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
