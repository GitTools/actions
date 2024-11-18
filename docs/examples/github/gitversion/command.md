# Command GitVersion Action (gitversion/command) usage Examples

Find out how to use the **gitversion/command** action using the examples below.

Note that if the pipeline is set up to use a shallow git fetch mode the GitVersion Command action will fail. It is required to use `fetch-depth: 0`.
You must also run the GitVersion Setup step before the Command step:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
    with:
      fetch-depth: 0

  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v3.0.2
    with:
      versionSpec: '6.x'
```

These steps are omitted from the examples for brevity.

> The examples use version _3.0.2_ of the GitVersion Command action.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Command GitVersion action accepts the following inputs:

```yaml
targetPath:
  description: Optionally supply the path to the working directory
  required: false
  default: ''
disableShallowCloneCheck:
  description: Whether to disable the check for shallow clone
  required: false
  default: 'false'
arguments:
  description: Arguments to send to GitVersion
  required: true
  default: ''
```

---

## Execution Examples

### Example 1

<details>
  <summary>Show the effective configuration for GitVersion by running the <b>/showConfig</b> command.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v3.0.2 action omitted for brevity.

  - name: Display GitVersion config
    uses: gittools/actions/gitversion/command@v3.0.2
    with:
      useConfigFile: true
      arguments: '/showConfig'
```

</details>

### Example 2

<details>
  <summary>Outputs the <i>FullSemVer</i> variable by running the <b>/showvariable FullSemVer</b> command.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v3.0.2 action omitted for brevity.

  - name: Output the FullSemVer variable
    uses: gittools/actions/gitversion/command@v3.0.2
    with:
      arguments: '/showvariable FullSemVer'
```

</details>

### Example 3

<details>
  <summary>Outputs the formatted version by running the <b>/format {Major}.{Minor}</b> command.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v3.0.2 action omitted for brevity.

  - name: Output the formatted version
    uses: gittools/actions/gitversion/command@v3.0.2
    with:
      arguments: '/format {Major}.{Minor}' # any Output Variable can be used here
```

</details>
