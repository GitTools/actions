# Execute GitVersion Task (gitversion/execute) Usage Examples

Find out how to use the **gitversion/execute** task using the examples below.

> The examples use the latest _0.x_ version of the GitVersion Execute task.  It is recommended to use the latest released version in your own pipelines.

Note that if the pipeline is setup to use a shallow git fetch mode the GitVersion Execute task will fail. It is required to use fetchDepth of 0 like so:

```yaml
- checkout: self
  fetchDepth: 0
```

## Inputs

The Execute GitVersion task accepts the following inputs:

```yaml
targetPath:
  description: Optionally supply the path to the working directory.
  required: false
  default: ''
useConfigFile:
  description: Whether to use a custom configuration file.
  required: false
  default: false
configFilePath:
  description: Optional path to config file (defaults to GitVersion.yml).
  required: false
  default: ''
updateAssemblyInfo:
  description: Whether to update versions in the AssemblyInfo files.
  required: false
  default: false
updateAssemblyInfoFilename:
  description: Update versions in specified file.
  required: false
  default: ''
additionalArguments:
  description: Additional arguments to send to GitVersion.
  required: false
  default: ''
```

## Outputs

The Execute GitVersion task creates the following job-scoped variables and multi-job output variables:

- GitVersion.Major
- GitVersion.Minor
- GitVersion.Patch
- GitVersion.PreReleaseTag
- GitVersion.PreReleaseTagWithDash
- GitVersion.PreReleaseLabel
- GitVersion.PreReleaseNumber
- GitVersion.WeightedPreReleaseNumber
- GitVersion.BuildMetaData
- GitVersion.BuildMetaDataPadded
- GitVersion.FullBuildMetaData
- GitVersion.MajorMinorPatch
- GitVersion.SemVer
- GitVersion.LegacySemVer
- GitVersion.LegacySemVerPadded
- GitVersion.AssemblySemVer
- GitVersion.AssemblySemFileVer
- GitVersion.FullSemVer
- GitVersion.InformationalVersion
- GitVersion.BranchName
- GitVersion.EscapedBranchName (since 5.2.0)
- GitVersion.Sha
- GitVersion.ShortSha
- GitVersion.NuGetVersionV2
- GitVersion.NuGetVersion
- GitVersion.NuGetPreReleaseTagV2
- GitVersion.NuGetPreReleaseTag
- GitVersion.VersionSourceSha
- GitVersion.CommitsSinceVersionSource
- GitVersion.CommitsSinceVersionSourcePadded (since 5.2.0)
- GitVersion.UncommittedChanges (since 5.5.0)
- GitVersion.CommitDate

The job-scoped variables can be accessed using the macro syntax `$(GitVersion.<variableName>)` in subsequent steps in the same job.  Azure Pipelines also creates environment variables of the form `GITVERSION_<VARIABLENAME>`.  See examples [5](#example-5) and [6](#example-6).

The multi-job output variables can be accessed across jobs and stages, in both conditions and variables.  See examples [7](#example-7) to [10](#example-10).

**GitVersion also automatically updates the pre-defined Build variable `Build.BuildNumber`.**

---

## Examples

### Example 1

Calculate the version for the build.

```yaml
steps:
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
    displayName: Determine Version
```

### Example 2

Calculate the version for the build using a config file with the default name **GitVersion.yml**.

```yaml
steps:
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
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
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
    displayName: Determine Version
    inputs:
      useConfigFile: true
      configFilePath: 'VersionConfig.yml'
```

### Example 4

Show the effective configuration for GitVersion by running the **/showConfig** command (passed as an additional argument).

```yaml
steps:
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
    displayName: Display GitVersion config
    inputs:
      additionalArguments: '/showConfig'
```

### Example 5

Calculate the version for the build and display all the calculated variables in the next step.

```yaml
steps:
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
    displayName: Determine Version

  - script: |
      echo Major: $(GitVersion.Major)
      echo Minor: $(GitVersion.Minor)
      echo Patch: $(GitVersion.Patch)
      echo PreReleaseTag: $(GitVersion.PreReleaseTag)
      echo PreReleaseTagWithDash: $(GitVersion.PreReleaseTagWithDash)
      echo PreReleaseLabel: $(GitVersion.PreReleaseLabel)
      echo PreReleaseNumber: $(GitVersion.PreReleaseNumber)
      echo WeightedPreReleaseNumber: $(GitVersion.WeightedPreReleaseNumber)
      echo BuildMetaData: $(GitVersion.BuildMetaData)
      echo BuildMetaDataPadded: $(GitVersion.BuildMetaDataPadded)
      echo FullBuildMetaData: $(GitVersion.FullBuildMetaData)
      echo MajorMinorPatch: $(GitVersion.MajorMinorPatch)
      echo SemVer: $(GitVersion.SemVer)
      echo LegacySemVer: $(GitVersion.LegacySemVer)
      echo LegacySemVerPadded: $(GitVersion.LegacySemVerPadded)
      echo AssemblySemVer: $(GitVersion.AssemblySemVer)
      echo AssemblySemFileVer: $(GitVersion.AssemblySemFileVer)
      echo FullSemVer: $(GitVersion.FullSemVer)
      echo InformationalVersion: $(GitVersion.InformationalVersion)
      echo BranchName: $(GitVersion.BranchName)
      echo EscapedBranchName: $(GitVersion.EscapedBranchName)
      echo Sha: $(GitVersion.Sha)
      echo ShortSha: $(GitVersion.ShortSha)
      echo NuGetVersionV2: $(GitVersion.NuGetVersionV2)
      echo NuGetVersion: $(GitVersion.NuGetVersion)
      echo NuGetPreReleaseTagV2: $(GitVersion.NuGetPreReleaseTagV2)
      echo NuGetPreReleaseTag: $(GitVersion.NuGetPreReleaseTag)
      echo VersionSourceSha: $(GitVersion.VersionSourceSha)
      echo CommitsSinceVersionSource: $(GitVersion.CommitsSinceVersionSource)
      echo CommitsSinceVersionSourcePadded: $(GitVersion.CommitsSinceVersionSourcePadded)
      echo UncommittedChanges: $(GitVersion.UncommittedChanges)
      echo CommitDate: $(GitVersion.CommitDate)
```

### Example 6

Calculate the version for the build and use the `GitVersion.NuGetVersion` variable to set the NuGet package version.

```yaml
steps:
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
    displayName: Determine Version

  - task: DotNetCoreCLI@2
    displayName: Pack Example
    inputs:
      command: pack
      packagesToPack: src/Example/LibExample.csproj
      versioningScheme: byEnvVar
      versionEnvVar: GitVersion.NuGetVersion # alternative syntax GITVERSION_NUGETVERSION (the former gets converted into the latter internally)
```

### Example 7

Calculate the version for the build and use the `GitVersion.BranchName` variable in a condition for starting another job.

```yaml
job: CalculateVersion
displayName: Calculate version using GitVersion
steps:
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
    displayName: Use GitVersion
    name: Version # the step MUST be named to access its output variables in another job.

job: CreateReleaseNotes
condition: and(succeeded(), eq(dependencies.CalculateVersion.outputs['Version.GitVersion.BranchName'], 'main'))
dependsOn: CalculateVersion
```

### Example 8

Calculate the version for the build and map the `GitVersion.SemVer` variable into a variable in another job.

```yaml
job: CalculateVersion
displayName: Calculate version using GitVersion
steps:
  # gitversion/setup@0 task omitted for brevity.

  - task: gitversion/execute@0
    displayName: Use GitVersion
    name: Version # the step MUST be named to access its output variables in another job.

job: BuildAndPack
variables:
  Ver.MajorMinorPatch: $[ dependencies.CalculateVersion.outputs['Version.GitVersion.MajorMinorPatch'] ]
```

### Example 9

Calculate the version for the build and use the `GitVersion.Major` output variable in a condition for starting another stage.

```yaml
stages:
  - stage: S1
    jobs:
      - job: CalculateVersion
        displayName: Calculate version number using GitVersion
        steps:
          # gitversion/setup@0 task omitted for brevity.

          - task: gitversion/execute@0
            displayName: Use GitVersion
            name: Version # the step MUST be named to access its output variables in another stage.

  - stage: S2
    condition: and(succeeded(), gt(dependencies.S1.outputs['CalculateVersion.Version.GitVersion.Major'], 0))
    dependsOn: S1
```

### Example 10

Calculate the version for the build and map the `GitVersion.AssemblySemVer` variable into a variable in another job for a different stage.

```yaml
stages:
  - stage: S1
    jobs:
      - job: CalculateVersion
        displayName: Calculate version number using GitVersion
        steps:
          # gitversion/setup@0 task omitted for brevity.

          - task: gitversion/execute@0
            displayName: Use GitVersion
            name: Version # the step MUST be named to access its output variables in another stage.
  - stage: S2
    dependsOn: S1
    jobs:
      - job: UpdateAssemblyVersions
        variables:
          Ver.AssemblyVer: $[ stageDependencies.S1.CalculateVersion.outputs['Version.GitVersion.AssemblySemVer'] ] # Note the 'stageDependencies.<jobName>' syntax.
```
