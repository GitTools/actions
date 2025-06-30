# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/open@v4.0.0
    name: Open release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
