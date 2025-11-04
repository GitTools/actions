# Command GitVersion Task (gitversion-command) usage Examples

Find out how to use the **gitversion-command** task using the examples below.

Note that if the pipeline is set up to use a shallow git fetch mode the GitVersion Command task will fail. It is required to use `fetchDepth: 0`.
You must also run the GitVersion Setup step before the Command step:

```yaml
steps:
  - checkout: self
    fetchDepth: 0

  - task: gitversion-setup@4.2.0
    displayName: Install GitVersion
    inputs:
      versionSpec: '6.4.x'
```

These steps are omitted from the examples for brevity.

> The examples use version _4.2.0_ of the GitVersion Command task.  It is recommended to use the latest released version in your own workflows.

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
```

---

## Execution Examples

### Example 1

<details>
  <summary>Show the effective configuration for GitVersion by running the <b>/showConfig</b> command.</summary>

```yaml
steps:
  # gitversion-setup@4.2.0 task omitted for brevity.

  - task: gitversion-command@4.2.0
    displayName: Display GitVersion config
    inputs:
      arguments: '/showConfig'
```

</details>

### Example 2

<details>
  <summary>Outputs the <i>FullSemVer</i> variable by running the <b>/showvariable FullSemVer</b> command.</summary>

```yaml
steps:
  # gitversion-setup@4.2.0 task omitted for brevity.

  - task: gitversion-command@4.2.0
    displayName: Output the FullSemVer variable
    inputs:
      arguments: '/showvariable FullSemVer'
```

</details>

### Example 3

<details>
  <summary>Outputs the formatted version by running the <b>/format {Major}.{Minor}</b> command.</summary>

```yaml
steps:
  # gitversion-setup@4.2.0 task omitted for brevity.

  - task: gitversion-command@4.2.0
    displayName: Output the formatted version
    inputs:
      arguments: '/format {Major}.{Minor}' # any Output Variable can be used here
```

</details>
