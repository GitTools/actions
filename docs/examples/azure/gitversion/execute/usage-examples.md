# Execute GitVersion Task (gitversion/execute) usage Examples

Find out how to use the **gitversion/execute** task using the examples below.

Note that if the pipeline is setup to use a shallow git fetch mode the GitVersion Execute task will fail. It is required to use `fetchDepth: 0`.
You must also run the GitVersion Setup step before the Execute step:

```yaml
steps:
  - checkout: self
    fetchDepth: 0

  - task: gitversion/setup@0.13.4
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.x'
```

These steps are omitted from the examples for brevity.

> The examples use version _0.13.4_ of the GitVersion Execute task.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Execute GitVersion task accepts the following inputs:

```yaml
targetPath:
  description: Optionally supply the path to the working directory
  required: false
  default: ''
disableCache:
  description: Whether to disable GitVersion cache
  required: false
  default: 'false'
disableNormalization:
  description: Whether to disable GitVersion normalization
  required: false
  default: 'false'
useConfigFile:
  description: Whether to use a custom configuration file
  required: false
  default: 'false'
configFilePath:
  description: Optional path to config file (defaults to GitVersion.yml)
  required: false
  default: 'GitVersion.yml'
overrideConfig:
  description: |
    Optional override for the configuration file. This should be newline-separated key-value pairs, e.g.:
    update-build-number=false
    next-version=1.0.0
  required: false
  default: ''
updateAssemblyInfo:
  description: Whether to update versions in the AssemblyInfo files
  required: false
  default: 'false'
updateAssemblyInfoFilename:
  description: Update versions in specified file
  required: false
  default: ''
additionalArguments:
  description: Additional arguments to send to GitVersion
  required: false
  default: ''
```

## Outputs

The Execute GitVersion task creates the following job-scoped variables and multi-job output variables:

- major
- minor
- patch
- preReleaseTag
- preReleaseTagWithDash
- preReleaseLabel
- preReleaseNumber
- weightedPreReleaseNumber
- buildMetaData
- buildMetaDataPadded (removed in 6.0.0)
- fullBuildMetaData
- majorMinorPatch
- semVer
- legacySemVer (removed in 6.0.0)
- legacySemVerPadded (removed in 6.0.0)
- assemblySemVer
- assemblySemFileVer
- fullSemVer
- informationalVersion
- branchName
- escapedBranchName (since 5.2.0)
- sha
- shortSha
- nuGetVersionV2 (removed in 6.0.0)
- nuGetVersion (removed in 6.0.0)
- nuGetPreReleaseTagV2 (removed in 6.0.0)
- nuGetPreReleaseTag (removed in 6.0.0)
- versionSourceSha
- commitsSinceVersionSource
- commitsSinceVersionSourcePadded (since 5.2.0, removed in 6.0.0)
- uncommittedChanges (since 5.5.0)
- commitDate
---

## Execution Examples

### Example 1

Calculate the version for the build.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Determine Version
```

### Example 2

Calculate the version for the build using a config file with the default name **GitVersion.yml**.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Determine Version
    inputs:
      useConfigFile: true
```

Example contents of **GitVersion.yml**:

```yaml
mode: Mainline
branches:
  master:
    regex: ^latest$
  pull-request:
    tag: pr
```

### Example 3

Calculate the version for the build using a config file named **VersionConfig.yml** in the root of the working folder.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Determine Version
    inputs:
      useConfigFile: true
      configFilePath: 'VersionConfig.yml'
```

### Example 4

Show the effective configuration for GitVersion by running the **/showConfig** command (passed as an additional argument).

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Display GitVersion config
    inputs:
      additionalArguments: '/showConfig'
```

### Example 5

Calculate the version for the build. Disabling the cache and normalization.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Determine Version
    inputs:
      disableCache: true
      disableNormalization: true
```

### Example 6

Calculate the version for the build. Update the version in the AssemblyInfo files.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Determine Version
    inputs:
      updateAssemblyInfo: true
```

### Example 7

Calculate the version for the build. Override the configuration file with the specified values.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Determine Version
    inputs:
      overrideConfig: |
        update-build-number=false
        next-version=1.0.0
```

## Output usage

The outputs can be accessed using the syntax `$(<id>.<outputName>)` or `$(<id>.GitVersion_<OutputName>)`, where `<id>` is the ID assigned to the step that calls the action, by subsequent steps later in the same job.  See example [5](#example-5).

The action also creates environment variables of the form `$(<outputName>)` or `$(GitVersion_<OutputName>)` for use by other steps in the same job.  See example [6](#example-6).

The multi-job output variables can be accessed across jobs and stages, in both conditions and variables. See examples [7](#example-7) to [10](#example-10).

**GitVersion also automatically updates the pre-defined Build variable `Build.BuildNumber`.**

### Example 8

Calculate the version for the build and use the output in a subsequent steps within the same job.

```yaml
jobs:
  - job: GitVersion_v5_same_job
    displayName: GitVersion v5 (same job)
    pool:
      vmImage: ubuntu-latest
    steps:
      - checkout: self
        fetchDepth: 0

      - task: gitversion/setup@0.13.4
        displayName: Install GitVersion
        inputs:
          versionSpec: '5.x'

      - task: gitversion/execute@0.13.4
        displayName: Determine Version
        name: version_step # step id used as reference for output values
        inputs:
          overrideConfig: |
            update-build-number=false

      - pwsh: |
          echo "FullSemVer (fullSemVer)            : $(fullSemVer)"
        displayName: Display GitVersion variables (without prefix)

      - pwsh: |
          echo "FullSemVer (GitVersion_FullSemVer) : $(GitVersion_FullSemVer)"
        displayName: Display GitVersion variables (with prefix)

      - pwsh: |
          echo "FullSemVer (version_step.fullSemVer)            : $(version_step.fullSemVer)"
        displayName: Display GitVersion outputs (step output without prefix)

      - pwsh: |
          echo "FullSemVer (version_step.GitVersion_FullSemVer) : $(version_step.GitVersion_FullSemVer)"
        displayName: Display GitVersion outputs (step output with prefix)

      - pwsh: |
          echo "FullSemVer (env:myvar_fullSemVer) : $env:myvar_fullSemVer"
        displayName: Display mapped local env (pwsh - outputs without prefix)
        env:
          myvar_fullSemVer: $(version_step.fullSemVer)

      - pwsh: |
          echo "FullSemVer (env:myvar_GitVersion_FullSemVer) : $env:myvar_GitVersion_FullSemVer"
        displayName: Display mapped local env (pwsh - outputs with prefix)
        env:
          myvar_GitVersion_FullSemVer: $(version_step.GitVersion_FullSemVer)

      - bash: |
          echo "FullSemVer (myvar_fullSemVer) : $myvar_fullSemVer"
        displayName: Display mapped local env (bash - outputs without prefix)
        env:
          myvar_fullSemVer: $(version_step.fullSemVer)

      - bash: |
          echo "FullSemVer (myvar_GitVersion_FullSemVer) : $myvar_GitVersion_FullSemVer"
        displayName: Display mapped local env (bash - outputs with prefix)
        env:
          myvar_GitVersion_FullSemVer: $(version_step.GitVersion_FullSemVer)
```
