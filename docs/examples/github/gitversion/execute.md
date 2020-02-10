# Example

```yaml
  steps:
  - name: Fetch all history for all tags and branches
    run: git fetch --prune --unshallow
  - name: Use GitVersion
    id: gitversion # step id used as reference for output values
    uses: gittools/actions/gitversion/execute@v0.9
  - run: |
      echo "Major: ${{ steps.gitversion.outputs.major }}"
      echo "Minor: ${{ steps.gitversion.outputs.minor }}"
      echo "Patch: ${{ steps.gitversion.outputs.patch }}"
    name: Output
```
