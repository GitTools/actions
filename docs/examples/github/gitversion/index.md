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

# Example

```yaml
  steps:
  - name: Fetch all history for all tags and branches
    run: git fetch --prune --unshallow
  - name: Use GitVersion
    id: gitversion # step id used as reference for output values
    uses: gittools/actions/gitversion/execute@v0.9.2
  - run: |
      echo "Major: ${{ steps.gitversion.outputs.major }}"
      echo "Minor: ${{ steps.gitversion.outputs.minor }}"
      echo "Patch: ${{ steps.gitversion.outputs.patch }}"
    name: Output
```
