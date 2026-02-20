# Example

```yaml
  steps:
  - uses: gittools/actions/gitreleasemanager/close@v4.3.1
    name: Close release with GitReleaseManager
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      repository: 'someOwner/someRepo'
      milestone: '0.1.0'
```
