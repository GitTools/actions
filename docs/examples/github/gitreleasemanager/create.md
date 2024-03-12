# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/create@v1.1.1
    name: Create release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      milestone: '0.1.0'
      name: 'v0.1.0'
      assets:  |
        src/test.txt
        src/test1.txt
```
