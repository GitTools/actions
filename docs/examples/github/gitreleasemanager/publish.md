# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/publish@v1.1.1
    name: Publish release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      owner: 'someOwner'
      repository: 'someRepository'
      tagName: '0.1.0'
```
