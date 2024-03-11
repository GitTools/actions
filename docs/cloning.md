In order for the gitversion to properly work you need to clone the repository with the entire history:

```yaml
# GitHub Actions syntax
steps:
  -
    name: Checkout
    uses: actions/checkout@v4
    with:
      fetch-depth: 0
```

```yaml
# Azure DevOps syntax
steps:
  - checkout: self
    displayName: Checkout
    fetchDepth: '0'
```
