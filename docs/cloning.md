# Cloning

In order for the GitVersion to properly work you need to clone the repository with the entire history:

## GitHub Actions

```yaml
steps:
  -
    name: Checkout
    uses: actions/checkout@v4
    with:
      fetch-depth: 0
```

## Azure DevOps

```yaml
steps:
  - checkout: self
    displayName: Checkout
    fetchDepth: 0
```

For self-hosted agents you probably also need `clean: all`

```yaml
  - job: myJob
    workspace:
      clean: all
```
