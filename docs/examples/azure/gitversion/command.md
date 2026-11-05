# Command GitVersion Task (gitversion-command) usage Examples

Find out how to use the **gitversion-command** task using the examples below.

Note that if the pipeline is set up to use a shallow git fetch mode the GitVersion Command task will fail. It is required to use `fetchDepth: 0`.
You must also run the GitVersion Setup step before the Command step:

```yaml
steps:
  - checkout: self
    fetchDepth: 0

  - task: gitversion-setup@5
    displayName: Install GitVersion
    inputs:
      versionSpec: '7.0.x'
```

These steps are omitted from the examples for brevity.

> The examples use upcoming version _5.x_ of the GitVersion Command task.  Use v4 with GitVersion 6 until both v5 and GitVersion 7 are released.

## Inputs

The Command GitVersion task accepts the following inputs:

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
  <summary>Show the effective configuration for GitVersion by running the <b>--show-config</b> command.</summary>

```yaml
steps:
  # gitversion-setup@5 task omitted for brevity.

  - task: gitversion-command@5
    displayName: Display GitVersion config
    inputs:
      arguments: '--show-config'
```

</details>

### Example 2

<details>
  <summary>Outputs the <i>FullSemVer</i> variable by running the <b>--show-variable FullSemVer</b> command.</summary>

```yaml
steps:
  # gitversion-setup@5 task omitted for brevity.

  - task: gitversion-command@5
    displayName: Output the FullSemVer variable
    inputs:
      arguments: '--show-variable FullSemVer'
```

</details>

### Example 3

<details>
  <summary>Outputs the formatted version by running the <b>--format {Major}.{Minor}</b> command.</summary>

```yaml
steps:
  # gitversion-setup@5 task omitted for brevity.

  - task: gitversion-command@5
    displayName: Output the formatted version
    inputs:
      arguments: '--format {Major}.{Minor}' # any Output Variable can be used here
```

</details>

### Example 4

<details>
  <summary>Show the effective configuration with reduced verbosity to avoid <b>stdout maxBuffer length exceeded</b> errors on large repositories.</summary>

```yaml
steps:
  # gitversion-setup@5 task omitted for brevity.

  - task: gitversion-command@5
    displayName: Display GitVersion config
    inputs:
      arguments: '--show-config'
      verbosity: 'minimal'
```

</details>
