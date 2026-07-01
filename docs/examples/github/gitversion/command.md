# Command GitVersion Action (gitversion/command) usage Examples

Find out how to use the **gitversion/command** action using the examples below.

Note that if the pipeline is set up to use a shallow git fetch mode the GitVersion Command action will fail. It is required to use `fetch-depth: 0`.
You must also run the GitVersion Setup step before the Command step:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v6
    with:
      fetch-depth: 0

  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v4.6.0
    with:
      versionSpec: '6.8.x'
```

These steps are omitted from the examples for brevity.

> The examples use version _4.6.0_ of the GitVersion Command action.  It is recommended to use the latest released version in your own workflows.

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
verbosity:
  description: Verbosity for the GitVersion process (quiet, minimal, normal, verbose, diagnostic)
  required: false
  default: 'normal'
```

---

## Execution Examples

### Example 1

<details>
  <summary>Show the effective configuration for GitVersion by running the <b>/showConfig</b> command.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v4.6.0 action omitted for brevity.

  - name: Display GitVersion config
    uses: gittools/actions/gitversion/command@v4.6.0
    with:
      arguments: '/showConfig'
```

</details>

### Example 2

<details>
  <summary>Outputs the <i>FullSemVer</i> variable by running the <b>/showvariable FullSemVer</b> command.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v4.6.0 action omitted for brevity.

  - name: Output the FullSemVer variable
    uses: gittools/actions/gitversion/command@v4.6.0
    with:
      arguments: '/showvariable FullSemVer'
```

</details>

### Example 3

<details>
  <summary>Outputs the formatted version by running the <b>/format {Major}.{Minor}</b> command.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v4.6.0 action omitted for brevity.

  - name: Output the formatted version
    uses: gittools/actions/gitversion/command@v4.6.0
    with:
      arguments: '/format {Major}.{Minor}' # any Output Variable can be used here
```

</details>

### Example 4

<details>
  <summary>Show the effective configuration with reduced verbosity to avoid <b>stdout maxBuffer length exceeded</b> errors on large repositories.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v4.6.0 action omitted for brevity.

  - name: Display GitVersion config
    uses: gittools/actions/gitversion/command@v4.6.0
    with:
      arguments: '/showConfig'
      verbosity: 'minimal'
```

</details>
