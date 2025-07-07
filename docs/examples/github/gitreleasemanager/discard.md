# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/discard@v4.0.1
    name: Discard release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
