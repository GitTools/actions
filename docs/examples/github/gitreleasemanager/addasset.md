# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/addasset@v0.9.2
    name: Add asset to a release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      tagName: '0.1.0'
      assets: |
        src/test.txt
        src/test1.txt
```
