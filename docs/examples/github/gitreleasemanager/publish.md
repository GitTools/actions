# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/publish@v3.0.4
    name: Publish release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
