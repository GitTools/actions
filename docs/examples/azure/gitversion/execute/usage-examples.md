# Execute GitVersion Task (gitversion/execute) Usage Examples

Find out how to use the **gitversion/execute** task using the examples below.

> The examples use the latest _0.x_ version of the GitVersion Execute task.  It is recommended to use the latest released version in your own pipelines.

Note that if the pipeline is setup to use a shallow git fetch mode the GitVersion Execute task will fail. It is required to use `fetchDepth: 0`.
You must also run the GitVersion Setup step before the Execute step:

```yaml
- checkout: self
  fetchDepth: 0

- task: gitversion/setup@0.13.4
  displayName: Install GitVersion
  inputs:
    versionSpec: '5.x'
```

These steps are omitted from the examples for brevity.

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

The outputs can be accessed using the syntax `$(<id>.<outputName>)` or `$(<id>.GitVersion_<OutputName>)`, where `<id>` is the ID assigned to the step that calls the action, by subsequent steps later in the same job.  See example [5](#example-5).

The action also creates environment variables of the form `$(<outputName>)` or `$(GitVersion_<OutputName>)` for use by other steps in the same job.  See example [6](#example-6).

The multi-job output variables can be accessed across jobs and stages, in both conditions and variables. See examples [7](#example-7) to [10](#example-10).

**GitVersion also automatically updates the pre-defined Build variable `Build.BuildNumber`.**

---

## Examples

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

Calculate the version for the build and display all the calculated variables in the next step.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    name: version # id to later be referenced
    displayName: Determine Version

  - displayName: Display GitVersion outputs (step output)
    script: |
      echo "Major: $(version.major)"
      echo "Minor: $(version.minor)"
      echo "Patch: $(version.patch)"
      echo "PreReleaseTag: $(version.preReleaseTag)"
      echo "PreReleaseTagWithDash: $(version.preReleaseTagWithDash)"
      echo "PreReleaseLabel: $(version.preReleaseLabel)"
      echo "PreReleaseNumber: $(version.preReleaseNumber)"
      echo "WeightedPreReleaseNumber: $(version.weightedPreReleaseNumber)"
      echo "BuildMetaData: $(version.buildMetaData)"
      echo "BuildMetaDataPadded: $(version.buildMetaDataPadded)"
      echo "FullBuildMetaData: $(version.fullBuildMetaData)"
      echo "MajorMinorPatch: $(version.majorMinorPatch)"
      echo "SemVer: $(version.semVer)"
      echo "LegacySemVer: $(version.legacySemVer)"
      echo "LegacySemVerPadded: $(version.legacySemVerPadded)"
      echo "AssemblySemVer: $(version.assemblySemVer)"
      echo "AssemblySemFileVer: $(version.assemblySemFileVer)"
      echo "FullSemVer: $(version.fullSemVer)"
      echo "InformationalVersion: $(version.informationalVersion)"
      echo "BranchName: $(version.branchName)"
      echo "EscapedBranchName: $(version.escapedBranchName)"
      echo "Sha: $(version.sha)"
      echo "ShortSha: $(version.shortSha)"
      echo "NuGetVersionV2: $(version.nuGetVersionV2)"
      echo "NuGetVersion: $(version.nuGetVersion)"
      echo "NuGetPreReleaseTagV2: $(version.nuGetPreReleaseTagV2)"
      echo "NuGetPreReleaseTag: $(version.nuGetPreReleaseTag)"
      echo "VersionSourceSha: $(version.versionSourceSha)"
      echo "CommitsSinceVersionSource: $(version.commitsSinceVersionSource)"
      echo "CommitsSinceVersionSourcePadded: $(version.commitsSinceVersionSourcePadded)"
      echo "UncommittedChanges: $(version.uncommittedChanges)"
      echo "CommitDate: $(version.commitDate)"

  - displayName: Display GitVersion outputs (step output with prefix)
    script: |
      echo "Major: $(version.GitVersion_Major)"
      echo "Minor: $(version.GitVersion_Minor)"
      echo "Patch: $(version.GitVersion_Patch)"
      echo "PreReleaseTag: $(version.GitVersion_PreReleaseTag)"
      echo "PreReleaseTagWithDash: $(version.GitVersion_PreReleaseTagWithDash)"
      echo "PreReleaseLabel: $(version.GitVersion_PreReleaseLabel)"
      echo "PreReleaseNumber: $(version.GitVersion_PreReleaseNumber)"
      echo "WeightedPreReleaseNumber: $(version.GitVersion_WeightedPreReleaseNumber)"
      echo "BuildMetaData: $(version.GitVersion_BuildMetaData)"
      echo "BuildMetaDataPadded: $(version.GitVersion_BuildMetaDataPadded)"
      echo "FullBuildMetaData: $(version.GitVersion_FullBuildMetaData)"
      echo "MajorMinorPatch: $(version.GitVersion_MajorMinorPatch)"
      echo "SemVer: $(version.GitVersion_SemVer)"
      echo "LegacySemVer: $(version.GitVersion_LegacySemVer)"
      echo "LegacySemVerPadded: $(version.GitVersion_LegacySemVerPadded)"
      echo "AssemblySemVer: $(version.GitVersion_AssemblySemVer)"
      echo "AssemblySemFileVer: $(version.GitVersion_AssemblySemFileVer)"
      echo "FullSemVer: $(version.GitVersion_FullSemVer)"
      echo "InformationalVersion: $(version.GitVersion_InformationalVersion)"
      echo "BranchName: $(version.GitVersion_BranchName)"
      echo "EscapedBranchName: $(version.GitVersion_EscapedBranchName)"
      echo "Sha: $(version.GitVersion_Sha)"
      echo "ShortSha: $(version.GitVersion_ShortSha)"
      echo "NuGetVersionV2: $(version.GitVersion_NuGetVersionV2)"
      echo "NuGetVersion: $(version.GitVersion_NuGetVersion)"
      echo "NuGetPreReleaseTagV2: $(version.GitVersion_NuGetPreReleaseTagV2)"
      echo "NuGetPreReleaseTag: $(version.GitVersion_NuGetPreReleaseTag)"
      echo "VersionSourceSha: $(version.GitVersion_VersionSourceSha)"
      echo "CommitsSinceVersionSource: $(version.GitVersion_CommitsSinceVersionSource)"
      echo "CommitsSinceVersionSourcePadded: $(version.GitVersion_CommitsSinceVersionSourcePadded)"
      echo "UncommittedChanges: $(version.GitVersion_UncommittedChanges)"
      echo "CommitDate: $(version.GitVersion_CommitDate)"
```

### Example 6

Calculate the version for the build and use the `GitVersion.NuGetVersion` variable to set the NuGet package version.

```yaml
steps:
  # gitversion/setup@0.13.4 task omitted for brevity.

  - task: gitversion/execute@0.13.4
    displayName: Determine Version

  - displayName: Display GitVersion variables (without prefix)
    script: |
      echo "Major: $(major)"
      echo "Minor: $(minor)"
      echo "Patch: $(patch)"
      echo "PreReleaseTag: $(preReleaseTag)"
      echo "PreReleaseTagWithDash: $(preReleaseTagWithDash)"
      echo "PreReleaseLabel: $(preReleaseLabel)"
      echo "PreReleaseNumber: $(preReleaseNumber)"
      echo "WeightedPreReleaseNumber: $(weightedPreReleaseNumber)"
      echo "BuildMetaData: $(buildMetaData)"
      echo "BuildMetaDataPadded: $(buildMetaDataPadded)"
      echo "FullBuildMetaData: $(fullBuildMetaData)"
      echo "MajorMinorPatch: $(majorMinorPatch)"
      echo "SemVer: $(semVer)"
      echo "LegacySemVer: $(legacySemVer)"
      echo "LegacySemVerPadded: $(legacySemVerPadded)"
      echo "AssemblySemVer: $(assemblySemVer)"
      echo "AssemblySemFileVer: $(assemblySemFileVer)"
      echo "FullSemVer: $(fullSemVer)"
      echo "InformationalVersion: $(informationalVersion)"
      echo "BranchName: $(branchName)"
      echo "EscapedBranchName: $(escapedBranchName)"
      echo "Sha: $(sha)"
      echo "ShortSha: $(shortSha)"
      echo "NuGetVersionV2: $(nuGetVersionV2)"
      echo "NuGetVersion: $(nuGetVersion)"
      echo "NuGetPreReleaseTagV2: $(nuGetPreReleaseTagV2)"
      echo "NuGetPreReleaseTag: $(nuGetPreReleaseTag)"
      echo "VersionSourceSha: $(versionSourceSha)"
      echo "CommitsSinceVersionSource: $(commitsSinceVersionSource)"
      echo "CommitsSinceVersionSourcePadded: $(commitsSinceVersionSourcePadded)"
      echo "UncommittedChanges: $(uncommittedChanges)"
      echo "CommitDate: $(commitDate)"

  - displayName: Display GitVersion variables (with prefix)
    script: |
      echo "Major: $(GitVersion_Major)"
      echo "Minor: $(GitVersion_Minor)"
      echo "Patch: $(GitVersion_Patch)"
      echo "PreReleaseTag: $(GitVersion_PreReleaseTag)"
      echo "PreReleaseTagWithDash: $(GitVersion_PreReleaseTagWithDash)"
      echo "PreReleaseLabel: $(GitVersion_PreReleaseLabel)"
      echo "PreReleaseNumber: $(GitVersion_PreReleaseNumber)"
      echo "WeightedPreReleaseNumber: $(GitVersion_WeightedPreReleaseNumber)"
      echo "BuildMetaData: $(GitVersion_BuildMetaData)"
      echo "BuildMetaDataPadded: $(GitVersion_BuildMetaDataPadded)"
      echo "FullBuildMetaData: $(GitVersion_FullBuildMetaData)"
      echo "MajorMinorPatch: $(GitVersion_MajorMinorPatch)"
      echo "SemVer: $(GitVersion_SemVer)"
      echo "LegacySemVer: $(GitVersion_LegacySemVer)"
      echo "LegacySemVerPadded: $(GitVersion_LegacySemVerPadded)"
      echo "AssemblySemVer: $(GitVersion_AssemblySemVer)"
      echo "AssemblySemFileVer: $(GitVersion_AssemblySemFileVer)"
      echo "FullSemVer: $(GitVersion_FullSemVer)"
      echo "InformationalVersion: $(GitVersion_InformationalVersion)"
      echo "BranchName: $(GitVersion_BranchName)"
      echo "EscapedBranchName: $(GitVersion_EscapedBranchName)"
      echo "Sha: $(GitVersion_Sha)"
      echo "ShortSha: $(GitVersion_ShortSha)"
      echo "NuGetVersionV2: $(GitVersion_NuGetVersionV2)"
      echo "NuGetVersion: $(GitVersion_NuGetVersion)"
      echo "NuGetPreReleaseTagV2: $(GitVersion_NuGetPreReleaseTagV2)"
      echo "NuGetPreReleaseTag: $(GitVersion_NuGetPreReleaseTag)"
      echo "VersionSourceSha: $(GitVersion_VersionSourceSha)"
      echo "CommitsSinceVersionSource: $(GitVersion_CommitsSinceVersionSource)"
      echo "CommitsSinceVersionSourcePadded: $(GitVersion_CommitsSinceVersionSourcePadded)"
      echo "UncommittedChanges: $(GitVersion_UncommittedChanges)"
      echo "CommitDate: $(GitVersion_CommitDate)"

  - task: DotNetCoreCLI@2
    displayName: Pack Example
    inputs:
      command: pack
      packagesToPack: src/Example/LibExample.csproj
      versioningScheme: byEnvVar
      versionEnvVar: GitVersion_SemVer # alternative syntax GITVERSION_SEMVER (the former gets converted into the latter internally)
```

### Example 7

Calculate the version for the build and use the `GitVersion_BranchName` variable in a condition for starting another job.

```yaml
jobs:
  - job: CalculateVersion
    displayName: Calculate version using GitVersion
    steps:
      # gitversion/setup@0.13.4 task omitted for brevity.

      - task: gitversion/execute@0.13.4
        displayName: Use GitVersion
        name: Version # the step MUST be named to access its output variables in another job.

  - job: CreateReleaseNotes
    condition: and(succeeded(), eq(dependencies.CalculateVersion.outputs['Version.GitVersion_BranchName'], 'main'))
    dependsOn: CalculateVersion
```

### Example 8

Calculate the version for the build and map the `GitVersion_SemVer` variable into a variable in another job.

```yaml
jobs:
  - job: CalculateVersion
    displayName: Calculate version using GitVersion
    steps:
      # gitversion/setup@0.13.4 task omitted for brevity.

      - task: gitversion/execute@0.13.4
        displayName: Use GitVersion
        name: Version # the step MUST be named to access its output variables in another job.

  - job: BuildAndPack
    variables:
      Ver.MajorMinorPatch: $[ dependencies.CalculateVersion.outputs['Version.GitVersion_MajorMinorPatch'] ]
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
          # gitversion/setup@0.13.4 task omitted for brevity.

          - task: gitversion/execute@0.13.4
            displayName: Use GitVersion
            name: Version # the step MUST be named to access its output variables in another stage.

  - stage: S2
    condition: and(succeeded(), gt(dependencies.S1.outputs['CalculateVersion.Version.GitVersion_Major'], 0))
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
          # gitversion/setup@0.13.4 task omitted for brevity.

          - task: gitversion/execute@0.13.4
            displayName: Use GitVersion
            name: Version # the step MUST be named to access its output variables in another stage.
  - stage: S2
    dependsOn: S1
    jobs:
      - job: UpdateAssemblyVersions
        variables:
          Ver.AssemblyVer: $[ stageDependencies.S1.CalculateVersion.outputs['Version.GitVersion_AssemblySemVer'] ] # Note the 'stageDependencies.<jobName>' syntax.
```
