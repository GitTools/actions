# Example

```yaml
  steps:
  - name: Checkout
    uses: actions/checkout@v2
  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v0.9.2
    with:
        versionSpec: '5.2.x'
```
