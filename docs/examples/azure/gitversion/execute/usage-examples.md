# Execute GitVersion Task (gitversion/execute) usage Examples

Find out how to use the **gitversion/execute** task using the examples below.

Note that if the pipeline is set up to use a shallow git fetch mode the GitVersion Execute task will fail. It is required to use `fetchDepth: 0`.
You must also run the GitVersion Setup step before the Execute step:

```yaml
steps:
  - checkout: self
    fetchDepth: 0

  - task: gitversion/setup@1.1.1
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.x'
```

These steps are omitted from the examples for brevity.

> The examples use version _1.1.1_ of the GitVersion Execute task.  It is recommended to use the latest released version in your own workflows.

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
disableShallowCloneCheck:
  description: Whether to disable the check for shallow clone
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
    next-version=1.1.1
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
<details>
  <summary>Calculate the version for the build.</summary>

```yaml
steps:
  # gitversion/setup@1.1.1 task omitted for brevity.

  - task: gitversion/execute@1.1.1
    displayName: Determine Version
```
</details>

### Example 2

<details>
  <summary>Calculate the version for the build using a config file with the default name **GitVersion.yml**.</summary>
```yaml
steps:
  # gitversion/setup@1.1.1 task omitted for brevity.

  - task: gitversion/execute@1.1.1
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
</details>

### Example 3

<details>
  <summary>Calculate the version for the build using a config file named **VersionConfig.yml** in the root of the working folder.</summary>

```yaml
steps:
  # gitversion/setup@1.1.1 task omitted for brevity.

  - task: gitversion/execute@1.1.1
    displayName: Determine Version
    inputs:
      useConfigFile: true
      configFilePath: 'VersionConfig.yml'
```
</details>

### Example 4

<details>
  <summary>Show the effective configuration for GitVersion by running the **/showConfig** command (passed as an additional argument).</summary>

```yaml
steps:
  # gitversion/setup@1.1.1 task omitted for brevity.

  - task: gitversion/execute@1.1.1
    displayName: Display GitVersion config
    inputs:
      additionalArguments: '/showConfig'
```
</details>

### Example 5

<details>
  <summary>Calculate the version for the build. Disabling the cache and normalization.</summary>

```yaml
steps:
  # gitversion/setup@1.1.1 task omitted for brevity.

  - task: gitversion/execute@1.1.1
    displayName: Determine Version
    inputs:
      disableCache: true
      disableNormalization: true
```
</details>

### Example 6

<details>
  <summary>Calculate the version for the build. Update the version in the AssemblyInfo files.</summary>

```yaml
steps:
  # gitversion/setup@1.1.1 task omitted for brevity.

  - task: gitversion/execute@1.1.1
    displayName: Determine Version
    inputs:
      updateAssemblyInfo: true
```
</details>

### Example 7

<details>
  <summary>Calculate the version for the build. Override the configuration file with the specified values.</summary>

```yaml
steps:
  # gitversion/setup@1.1.1 task omitted for brevity.

  - task: gitversion/execute@1.1.1
    displayName: Determine Version
    inputs:
      overrideConfig: |
        update-build-number=false
        next-version=1.1.1
```
</details>

## Output usage

The outputs can be accessed using the syntax `$(<id>.<outputName>)` or `$(<id>.GitVersion_<OutputName>)`, where `<id>` is the ID assigned to the step that calls the action, by subsequent steps later in the same job.

The action also creates environment variables of the form `$(<outputName>)` or `$(GitVersion_<OutputName>)` for use by other steps in the same job.

The multi-job output variables can be accessed across jobs and stages, in both conditions and variables.

**GitVersion also automatically updates the pre-defined Build variable `Build.BuildNumber`.** You can disable the default behavior by setting the `update-build-number` to `false` in the configuration file or by using the `overrideConfig` input.

### Example 8

<details>
  <summary>Calculate the version for the build and use the output in a subsequent steps within the same job.</summary>

```yaml
jobs:
  - job: GitVersion_v5_same_job
    displayName: GitVersion v5 (same job)
    pool:
      vmImage: ubuntu-latest
    steps:
      - checkout: self
        fetchDepth: 0

      - task: gitversion/setup@1.1.1
        displayName: Install GitVersion
        inputs:
          versionSpec: '5.x'

      - task: gitversion/execute@1.1.1
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
</details>

### Example 9
<details>
  <summary>Calculate the version for the build and use the output in a subsequent job.</summary>

```yaml
jobs:
  - job: GitVersion_v5_cross_job
    displayName: GitVersion v5 (cross job)
    pool:
      vmImage: ubuntu-latest
    steps:
      - checkout: self
        fetchDepth: 0

      - task: gitversion/setup@1.1.1
        displayName: Install GitVersion
        inputs:
          versionSpec: '5.x'

      - task: gitversion/execute@1.1.1
        displayName: Determine Version
        name: version_step # step id used as reference for output values
        inputs:
          overrideConfig: |
            update-build-number=false

  - job: GitVersion_v5_cross_job_consumer_without_prefix
    displayName: GitVersion v5 (cross job consumer) - without prefix
    dependsOn: GitVersion_v5_cross_job
    condition: and(succeeded(), eq(dependencies.GitVersion_v5_cross_job.outputs['version_step.branchName'], 'main')) # use in condition
    variables:
      myvar_fullSemVer: $[ dependencies.GitVersion_v5_cross_job.outputs['version_step.fullSemVer'] ]
    pool:
      vmImage: ubuntu-latest
    steps:
      - pwsh: |
          echo "FullSemVer (myvar_fullSemVer)          : $(myvar_fullSemVer)"
        displayName: Use mapped job variables (pwsh - outputs without prefix)

      - pwsh: |
          echo "FullSemVer (env:localvar_fullSemVer)   : $env:localvar_fullSemVer"
        displayName: Use mapped local env from job variables (pwsh - outputs without prefix)
        env:
          localvar_fullSemVer: $(myvar_fullSemVer)

      - bash: |
          echo "FullSemVer (myvar_fullSemVer)   : $(myvar_fullSemVer)"
        displayName: Use mapped job variables (bash - outputs without prefix)

      - bash: |
          echo "FullSemVer (localvar_fullSemVer)   : $localvar_fullSemVer"
        displayName: Use mapped local env from job variables (bash - outputs without prefix)
        env:
          localvar_fullSemVer: $(myvar_fullSemVer)

  - job: GitVersion_v5_cross_job_consumer_with_prefix
    displayName: GitVersion v5 (cross job consumer) - with prefix
    dependsOn: GitVersion_v5_cross_job
    condition: and(succeeded(), eq(dependencies.GitVersion_v5_cross_job.outputs['version_step.GitVersion_BranchName'], 'main')) # use in condition
    variables:
      myvar_GitVersion_FullSemVer: $[ dependencies.GitVersion_v5_cross_job.outputs['version_step.GitVersion_FullSemVer'] ]
    pool:
      vmImage: ubuntu-latest
    steps:
      - pwsh: |
          echo "FullSemVer (myvar_GitVersion_FullSemVer)          : $(myvar_GitVersion_FullSemVer)"
        displayName: Use mapped job variables (pwsh - outputs with prefix)

      - pwsh: |
          echo "FullSemVer (env:localvar_GitVersion_FullSemVer)   : $env:localvar_GitVersion_FullSemVer"
        displayName: Use mapped local env from job variables (pwsh - outputs with prefix)
        env:
          localvar_GitVersion_FullSemVer: $(myvar_GitVersion_FullSemVer)

      - bash: |
          echo "FullSemVer (myvar_GitVersion_FullSemVer)   : $(myvar_GitVersion_FullSemVer)"
        displayName: Use mapped job variables (bash - outputs with prefix)

      - bash: |
          echo "FullSemVer (localvar_GitVersion_FullSemVer)   : $localvar_GitVersion_FullSemVer"
        displayName: Use mapped local env from job variables (bash - outputs with prefix)
        env:
          localvar_GitVersion_FullSemVer: $(myvar_GitVersion_FullSemVer)
```
</details>

### Example 10
<details>
  <summary>Calculate the version for the build and use the output in a subsequent stage.</summary>

```yaml
stages:
  - stage: GitVersion_v5_cross_stage
    displayName: GitVersion v5 (cross stage)
    jobs:
      - job: GitVersion_v5_cross_stage_producer
        displayName: GitVersion v5 (cross stage producer)
        pool:
          vmImage: ubuntu-latest
        steps:
          - checkout: self
            fetchDepth: 0

          - task: gitversion/setup@1.1.1
            displayName: Install GitVersion
            inputs:
              versionSpec: '5.x'

          - task: gitversion/execute@1.1.1
            displayName: Determine Version
            name: version_step # step id used as reference for output values
            inputs:
              overrideConfig: |
                update-build-number=false
  - stage: GitVersion_v5_cross_stage_consumer_without_prefix
    displayName: GitVersion v5 (cross stage consumer) - without prefix
    dependsOn: GitVersion_v5_cross_stage
    condition: and(succeeded(), eq(dependencies.GitVersion_v5_cross_stage.outputs['GitVersion_v5_cross_stage_producer.version_step.branchName'], 'main')) # use in condition
    jobs:
      - job: GitVersion_v5_cross_stage_consumer_without_prefix
        displayName: GitVersion v5 (cross stage consumer) - without prefix
        variables:
          myvar_fullSemVer: $[ stageDependencies.GitVersion_v5_cross_stage.GitVersion_v5_cross_stage_producer.outputs['version_step.fullSemVer'] ]
        pool:
          vmImage: ubuntu-latest
        steps:
          - pwsh: |
              echo "FullSemVer (myvar_fullSemVer)          : $(myvar_fullSemVer)"
            displayName: Use mapped job variables (pwsh - outputs without prefix)

          - pwsh: |
              echo "FullSemVer (env:localvar_fullSemVer)   : $env:localvar_fullSemVer"
            displayName: Use mapped local env from job variables (pwsh - outputs without prefix)
            env:
              localvar_fullSemVer: $(myvar_fullSemVer)

          - bash: |
              echo "FullSemVer (myvar_fullSemVer)   : $(myvar_fullSemVer)"
            displayName: Use mapped job variables (bash - outputs without prefix)

          - bash: |
              echo "FullSemVer (localvar_fullSemVer)   : $localvar_fullSemVer"
            displayName: Use mapped local env from job variables (bash - outputs without prefix)
            env:
              localvar_fullSemVer: $(myvar_fullSemVer)
  - stage: GitVersion_v5_cross_stage_consumer_with_prefix
    displayName: GitVersion v5 (cross stage consumer) - with prefix
    dependsOn: GitVersion_v5_cross_stage
    condition: and(succeeded(), eq(dependencies.GitVersion_v5_cross_stage.outputs['GitVersion_v5_cross_stage_producer.version_step.GitVersion_BranchName'], 'main')) # use in condition
    jobs:
      - job: GitVersion_v5_cross_stage_consumer_with_prefix
        displayName: GitVersion v5 (cross stage consumer) - with prefix
        variables:
          myvar_GitVersion_FullSemVer: $[ stageDependencies.GitVersion_v5_cross_stage.GitVersion_v5_cross_stage_producer.outputs['version_step.GitVersion_FullSemVer'] ]
        pool:
          vmImage: ubuntu-latest
        steps:
          - pwsh: |
              echo "FullSemVer (myvar_GitVersion_FullSemVer)          : $(myvar_GitVersion_FullSemVer)"
            displayName: Use mapped job variables (pwsh - outputs with prefix)

          - pwsh: |
              echo "FullSemVer (env:localvar_GitVersion_FullSemVer)   : $env:localvar_GitVersion_FullSemVer"
            displayName: Use mapped local env from job variables (pwsh - outputs with prefix)
            env:
              localvar_GitVersion_FullSemVer: $(myvar_GitVersion_FullSemVer)

          - bash: |
              echo "FullSemVer (localvar_GitVersion_FullSemVer)   : $localvar_GitVersion_FullSemVer"
            displayName: Use mapped job variables (bash - outputs with prefix)

          - bash: |
              echo "FullSemVer (localvar_GitVersion_FullSemVer)   : $localvar_GitVersion_FullSemVer"
            displayName: Use mapped local env from job variables (bash - outputs with prefix)
            env:
              localvar_GitVersion_FullSemVer: $(myvar_GitVersion_FullSemVer)
```
</details>
