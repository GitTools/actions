# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/create@v3.2.0
    name: Create release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
      name: 'v0.1.0'
      assets:  |
        src/test.txt
        src/test1.txt
```
