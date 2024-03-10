# Execute GitVersion Action (gitversion/execute) Usage Examples

Find out how to use the **gitversion/execute** action using the examples below.

For the GitVersion workflow to execute successfully, you must checkout your Git repository with `fetch-depth: 0` to fetch all history for all tags and branches.
You must also run the GitVersion Setup step before the Execute step:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2
    with:
      fetch-depth: 0

  - task: gitversion/setup@0
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.x'
```

These steps are omitted from the examples for brevity.

> The examples use version _0.9.7_ of the GitVersion Execute action.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Execute GitVersion action accepts the following inputs:

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
  default: 'GitVersion.yml'
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

The Execute GitVersion action creates the following outputs:

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

The outputs can be accessed using the syntax `${{ steps.<id>.outputs.<outputName> }}` or `${{ steps.<id>.outputs.GitVersion_<OutputName> }}`, where `<id>` is the ID assigned to the step that calls the action, by subsequent steps later in the same job.  See example [5](#example-5).

The action also creates environment variables of the form `${{ env.<outputName> }}` or `${{ env.GitVersion_<OutputName> }}` for use by other steps in the same job.  See example [6](#example-6).

The outputs can be accessed across jobs by mapping them to job outputs and referencing the job outputs using the `needs` context in dependent jobs.  See examples [7](#example-7) and [8](#example-8).

---

## Examples

### Example 1

Calculate the version for the build.

```yaml
steps:
  # gitversion/setup@v0 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v0
```

### Example 2

Calculate the version for the build using a config file with the default name **GitVersion.yml**.

```yaml
steps:
  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v0
    with:
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
  # gitversion/setup@v0 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v0
    with:
      useConfigFile: true
      configFilePath: VersionConfig.yml
```

### Example 4

Show the effective configuration for GitVersion by running the **/showConfig** command (passed as an additional argument).

```yaml
steps:
  # gitversion/setup@v0 action omitted for brevity.

  - name: Display GitVersion config
    uses: gittools/actions/gitversion/execute@v0
    with:
      useConfigFile: true
      additionalArguments: '/showConfig'
```

### Example 5

Calculate the version for the build and display all the calculated variables in the next step.

```yaml
steps:
  # gitversion/setup@v0 action omitted for brevity.

  - name: Determine Version
    id:   gitversion # id to later be referenced
    uses: gittools/actions/gitversion/execute@v0

  - name: Display GitVersion outputs (step output)
    run: |
      echo "Major: ${{ steps.gitversion.outputs.major }}"
      echo "Minor: ${{ steps.gitversion.outputs.minor }}"
      echo "Patch: ${{ steps.gitversion.outputs.patch }}"
      echo "PreReleaseTag: ${{ steps.gitversion.outputs.preReleaseTag }}"
      echo "PreReleaseTagWithDash: ${{ steps.gitversion.outputs.preReleaseTagWithDash }}"
      echo "PreReleaseLabel: ${{ steps.gitversion.outputs.preReleaseLabel }}"
      echo "PreReleaseNumber: ${{ steps.gitversion.outputs.preReleaseNumber }}"
      echo "WeightedPreReleaseNumber: ${{ steps.gitversion.outputs.weightedPreReleaseNumber }}"
      echo "BuildMetaData: ${{ steps.gitversion.outputs.buildMetaData }}"
      echo "BuildMetaDataPadded: ${{ steps.gitversion.outputs.buildMetaDataPadded }}"
      echo "FullBuildMetaData: ${{ steps.gitversion.outputs.fullBuildMetaData }}"
      echo "MajorMinorPatch: ${{ steps.gitversion.outputs.majorMinorPatch }}"
      echo "SemVer: ${{ steps.gitversion.outputs.semVer }}"
      echo "LegacySemVer: ${{ steps.gitversion.outputs.legacySemVer }}"
      echo "LegacySemVerPadded: ${{ steps.gitversion.outputs.legacySemVerPadded }}"
      echo "AssemblySemVer: ${{ steps.gitversion.outputs.assemblySemVer }}"
      echo "AssemblySemFileVer: ${{ steps.gitversion.outputs.assemblySemFileVer }}"
      echo "FullSemVer: ${{ steps.gitversion.outputs.fullSemVer }}"
      echo "InformationalVersion: ${{ steps.gitversion.outputs.informationalVersion }}"
      echo "BranchName: ${{ steps.gitversion.outputs.branchName }}"
      echo "EscapedBranchName: ${{ steps.gitversion.outputs.escapedBranchName }}"
      echo "Sha: ${{ steps.gitversion.outputs.sha }}"
      echo "ShortSha: ${{ steps.gitversion.outputs.shortSha }}"
      echo "NuGetVersionV2: ${{ steps.gitversion.outputs.nuGetVersionV2 }}"
      echo "NuGetVersion: ${{ steps.gitversion.outputs.nuGetVersion }}"
      echo "NuGetPreReleaseTagV2: ${{ steps.gitversion.outputs.nuGetPreReleaseTagV2 }}"
      echo "NuGetPreReleaseTag: ${{ steps.gitversion.outputs.nuGetPreReleaseTag }}"
      echo "VersionSourceSha: ${{ steps.gitversion.outputs.versionSourceSha }}"
      echo "CommitsSinceVersionSource: ${{ steps.gitversion.outputs.commitsSinceVersionSource }}"
      echo "CommitsSinceVersionSourcePadded: ${{ steps.gitversion.outputs.commitsSinceVersionSourcePadded }}"
      echo "UncommittedChanges: ${{ steps.gitversion.outputs.uncommittedChanges }}"
      echo "CommitDate: ${{ steps.gitversion.outputs.commitDate }}"

  - name: Display GitVersion outputs (step output with prefix)
    run: |
      echo "Major: ${{ steps.gitversion.outputs.GitVersion_Major }}"
      echo "Minor: ${{ steps.gitversion.outputs.GitVersion_Minor }}"
      echo "Patch: ${{ steps.gitversion.outputs.GitVersion_Patch }}"
      echo "PreReleaseTag: ${{ steps.gitversion.outputs.GitVersion_PreReleaseTag }}"
      echo "PreReleaseTagWithDash: ${{ steps.gitversion.outputs.GitVersion_PreReleaseTagWithDash }}"
      echo "PreReleaseLabel: ${{ steps.gitversion.outputs.GitVersion_PreReleaseLabel }}"
      echo "PreReleaseNumber: ${{ steps.gitversion.outputs.GitVersion_PreReleaseNumber }}"
      echo "WeightedPreReleaseNumber: ${{ steps.gitversion.outputs.GitVersion_WeightedPreReleaseNumber }}"
      echo "BuildMetaData: ${{ steps.gitversion.outputs.GitVersion_BuildMetaData }}"
      echo "BuildMetaDataPadded: ${{ steps.gitversion.outputs.GitVersion_BuildMetaDataPadded }}"
      echo "FullBuildMetaData: ${{ steps.gitversion.outputs.GitVersion_FullBuildMetaData }}"
      echo "MajorMinorPatch: ${{ steps.gitversion.outputs.GitVersion_MajorMinorPatch }}"
      echo "SemVer: ${{ steps.gitversion.outputs.GitVersion_SemVer }}"
      echo "LegacySemVer: ${{ steps.gitversion.outputs.GitVersion_LegacySemVer }}"
      echo "LegacySemVerPadded: ${{ steps.gitversion.outputs.GitVersion_LegacySemVerPadded }}"
      echo "AssemblySemVer: ${{ steps.gitversion.outputs.GitVersion_AssemblySemVer }}"
      echo "AssemblySemFileVer: ${{ steps.gitversion.outputs.GitVersion_AssemblySemFileVer }}"
      echo "FullSemVer: ${{ steps.gitversion.outputs.GitVersion_FullSemVer }}"
      echo "InformationalVersion: ${{ steps.gitversion.outputs.GitVersion_InformationalVersion }}"
      echo "BranchName: ${{ steps.gitversion.outputs.GitVersion_BranchName }}"
      echo "EscapedBranchName: ${{ steps.gitversion.outputs.GitVersion_EscapedBranchName }}"
      echo "Sha: ${{ steps.gitversion.outputs.GitVersion_Sha }}"
      echo "ShortSha: ${{ steps.gitversion.outputs.GitVersion_ShortSha }}"
      echo "NuGetVersionV2: ${{ steps.gitversion.outputs.GitVersion_NuGetVersionV2 }}"
      echo "NuGetVersion: ${{ steps.gitversion.outputs.GitVersion_NuGetVersion }}"
      echo "NuGetPreReleaseTagV2: ${{ steps.gitversion.outputs.GitVersion_NuGetPreReleaseTagV2 }}"
      echo "NuGetPreReleaseTag: ${{ steps.gitversion.outputs.GitVersion_NuGetPreReleaseTag }}"
      echo "VersionSourceSha: ${{ steps.gitversion.outputs.GitVersion_VersionSourceSha }}"
      echo "CommitsSinceVersionSource: ${{ steps.gitversion.outputs.GitVersion_CommitsSinceVersionSource }}"
      echo "CommitsSinceVersionSourcePadded: ${{ steps.gitversion.outputs.GitVersion_CommitsSinceVersionSourcePadded }}"
      echo "UncommittedChanges: ${{ steps.gitversion.outputs.GitVersion_UncommittedChanges }}"
      echo "CommitDate: ${{ steps.gitversion.outputs.GitVersion_CommitDate }}"
```

### Example 6

Calculate the version for the build and display the value of the `env.GitVersion_SemVer` environment variable.

```yaml
steps:
  # gitversion/setup@v0 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v0


  - name: Display GitVersion variables (without prefix)
    run: |
      echo "Major: ${{ env.major }}"
      echo "Minor: ${{ env.minor }}"
      echo "Patch: ${{ env.patch }}"
      echo "PreReleaseTag: ${{ env.preReleaseTag }}"
      echo "PreReleaseTagWithDash: ${{ env.preReleaseTagWithDash }}"
      echo "PreReleaseLabel: ${{ env.preReleaseLabel }}"
      echo "PreReleaseNumber: ${{ env.preReleaseNumber }}"
      echo "WeightedPreReleaseNumber: ${{ env.weightedPreReleaseNumber }}"
      echo "BuildMetaData: ${{ env.buildMetaData }}"
      echo "BuildMetaDataPadded: ${{ env.buildMetaDataPadded }}"
      echo "FullBuildMetaData: ${{ env.fullBuildMetaData }}"
      echo "MajorMinorPatch: ${{ env.majorMinorPatch }}"
      echo "SemVer: ${{ env.semVer }}"
      echo "LegacySemVer: ${{ env.legacySemVer }}"
      echo "LegacySemVerPadded: ${{ env.legacySemVerPadded }}"
      echo "AssemblySemVer: ${{ env.assemblySemVer }}"
      echo "AssemblySemFileVer: ${{ env.assemblySemFileVer }}"
      echo "FullSemVer: ${{ env.fullSemVer }}"
      echo "InformationalVersion: ${{ env.informationalVersion }}"
      echo "BranchName: ${{ env.branchName }}"
      echo "EscapedBranchName: ${{ env.escapedBranchName }}"
      echo "Sha: ${{ env.sha }}"
      echo "ShortSha: ${{ env.shortSha }}"
      echo "NuGetVersionV2: ${{ env.nuGetVersionV2 }}"
      echo "NuGetVersion: ${{ env.nuGetVersion }}"
      echo "NuGetPreReleaseTagV2: ${{ env.nuGetPreReleaseTagV2 }}"
      echo "NuGetPreReleaseTag: ${{ env.nuGetPreReleaseTag }}"
      echo "VersionSourceSha: ${{ env.versionSourceSha }}"
      echo "CommitsSinceVersionSource: ${{ env.commitsSinceVersionSource }}"
      echo "CommitsSinceVersionSourcePadded: ${{ env.commitsSinceVersionSourcePadded }}"
      echo "UncommittedChanges: ${{ env.uncommittedChanges }}"
      echo "CommitDate: ${{ env.commitDate }}"

  - name: Display GitVersion variables (with prefix)
    run: |
      echo "Major: ${{ env.GitVersion_Major }}"
      echo "Minor: ${{ env.GitVersion_Minor }}"
      echo "Patch: ${{ env.GitVersion_Patch }}"
      echo "PreReleaseTag: ${{ env.GitVersion_PreReleaseTag }}"
      echo "PreReleaseTagWithDash: ${{ env.GitVersion_PreReleaseTagWithDash }}"
      echo "PreReleaseLabel: ${{ env.GitVersion_PreReleaseLabel }}"
      echo "PreReleaseNumber: ${{ env.GitVersion_PreReleaseNumber }}"
      echo "WeightedPreReleaseNumber: ${{ env.GitVersion_WeightedPreReleaseNumber }}"
      echo "BuildMetaData: ${{ env.GitVersion_BuildMetaData }}"
      echo "BuildMetaDataPadded: ${{ env.GitVersion_BuildMetaDataPadded }}"
      echo "FullBuildMetaData: ${{ env.GitVersion_FullBuildMetaData }}"
      echo "MajorMinorPatch: ${{ env.GitVersion_MajorMinorPatch }}"
      echo "SemVer: ${{ env.GitVersion_SemVer }}"
      echo "LegacySemVer: ${{ env.GitVersion_LegacySemVer }}"
      echo "LegacySemVerPadded: ${{ env.GitVersion_LegacySemVerPadded }}"
      echo "AssemblySemVer: ${{ env.GitVersion_AssemblySemVer }}"
      echo "AssemblySemFileVer: ${{ env.GitVersion_AssemblySemFileVer }}"
      echo "FullSemVer: ${{ env.GitVersion_FullSemVer }}"
      echo "InformationalVersion: ${{ env.GitVersion_InformationalVersion }}"
      echo "BranchName: ${{ env.GitVersion_BranchName }}"
      echo "EscapedBranchName: ${{ env.GitVersion_EscapedBranchName }}"
      echo "Sha: ${{ env.GitVersion_Sha }}"
      echo "ShortSha: ${{ env.GitVersion_ShortSha }}"
      echo "NuGetVersionV2: ${{ env.GitVersion_NuGetVersionV2 }}"
      echo "NuGetVersion: ${{ env.GitVersion_NuGetVersion }}"
      echo "NuGetPreReleaseTagV2: ${{ env.GitVersion_NuGetPreReleaseTagV2 }}"
      echo "NuGetPreReleaseTag: ${{ env.GitVersion_NuGetPreReleaseTag }}"
      echo "VersionSourceSha: ${{ env.GitVersion_VersionSourceSha }}"
      echo "CommitsSinceVersionSource: ${{ env.GitVersion_CommitsSinceVersionSource }}"
      echo "CommitsSinceVersionSourcePadded: ${{ env.GitVersion_CommitsSinceVersionSourcePadded }}"
      echo "UncommittedChanges: ${{ env.GitVersion_UncommittedChanges }}"
      echo "CommitDate: ${{ env.GitVersion_CommitDate }}"
```

### Example 7

Calculate the version for the build and use the `branchName` output in a condition for starting another job.

```yaml
jobs:
  calculate-version:
    name: Calculate Version
    runs-on: ubuntu-latest
    outputs:
      branchName: ${{ steps.gitversion.outputs.branchName }} # To use an output in another job, you have to map it to a job output.
    steps:
      # gitversion/execute step omitted for brevity

      - name: Determine Version
        id: gitversion
        uses: gittools/actions/gitversion/execute@v0

  create-release-notes:
    name: Create Release Notes
    runs-on: ubuntu-latest
    needs: calculate-version
    if: contains(needs.calculate-version.outputs.branchName, 'main') # Output variable accessed via `needs` context.
    steps:
      - run: |
          # Output variables can also be accessed in steps, using an expression.
          echo "Creating release notes for ${{ needs.calculate-version.outputs.branchName }} branch."
```

### Example 8

Calculate the version for the build and map the `semVer` output into an environment variable in another job.

```yaml
jobs:
  calculate-version:
    name: Calculate Version
    runs-on: ubuntu-latest
    outputs:
      semVer: ${{ steps.gitversion.outputs.semVer }}
    steps:
      # gitversion/execute step omitted for brevity

      - name: Determine Version
        id: gitversion
        uses: gittools/actions/gitversion/execute@v0

  display-semver:
    name: Display Semantic Version
    runs-on: ubuntu-latest
    needs: calculate-version
    env:
      SEMVER: ${{ needs.calculate-version.outputs.semVer }}
    steps:
      - name: Display version
        run: |
          echo SemVer: $SEMVER
```
