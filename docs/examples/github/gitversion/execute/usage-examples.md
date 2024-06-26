# Execute GitVersion Action (gitversion/execute) usage Examples

Find out how to use the **gitversion/execute** action using the examples below.

Note that if the pipeline is set up to use a shallow git fetch mode the GitVersion Execute action will fail. It is required to use `fetch-depth: 0`.
You must also run the GitVersion Setup step before the Execute step:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v4
    with:
      fetch-depth: 0

  - name: Install GitVersion
    uses: gittools/actions/gitversion/setup@v1.1.1
    with:
      versionSpec: '5.x'
```

These steps are omitted from the examples for brevity.

> The examples use version _1.1.1_ of the GitVersion Execute action.  It is recommended to use the latest released version in your own workflows.

## Inputs

The Execute GitVersion action accepts the following inputs:

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
---

## Execution Examples

### Example 1

<details>
  <summary>Calculate the version for the build.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v1.1.1 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v1.1.1
```
</details>

### Example 2

<details>
  <summary>Calculate the version for the build using a config file with the default name **GitVersion.yml**.</summary>

```yaml
steps:
  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v1.1.1
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
</details>

### Example 3

<details>
  <summary>Calculate the version for the build using a config file named **VersionConfig.yml** in the root of the working folder.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v1.1.1 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v1.1.1
    with:
      useConfigFile: true
      configFilePath: VersionConfig.yml
```
</details>

### Example 4

<details>
  <summary>Show the effective configuration for GitVersion by running the **/showConfig** command (passed as an additional argument).</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v1.1.1 action omitted for brevity.

  - name: Display GitVersion config
    uses: gittools/actions/gitversion/execute@v1.1.1
    with:
      useConfigFile: true
      additionalArguments: '/showConfig'
```
</details>

### Example 5

<details>
  <summary>Calculate the version for the build. Disabling the cache and normalization.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v1.1.1 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v1.1.1
    with:
      disableCache: true
      disableNormalization: true
```
</details>

### Example 6

<details>
  <summary>Calculate the version for the build. Update the version in the AssemblyInfo files.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v1.1.1 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v1.1.1
    with:
      updateAssemblyInfo: true
```
</details>

### Example 7

<details>
  <summary>Calculate the version for the build. Override the configuration file with the specified values.</summary>

```yaml
steps:
  # gittools/actions/gitversion/setup@v1.1.1 action omitted for brevity.

  - name: Determine Version
    uses: gittools/actions/gitversion/execute@v1.1.1
    with:
      overrideConfig: |
        update-build-number=false
        next-version=1.1.1
```
</details>

## Output usage

The outputs can be accessed using the syntax `${{ steps.<id>.outputs.<outputName> }}` or `${{ steps.<id>.outputs.GitVersion_<OutputName> }}`, where `<id>` is the ID assigned to the step that calls the action, by subsequent steps later in the same job.

The action also creates environment variables of the form `${{ env.<outputName> }}` or `${{ env.GitVersion_<OutputName> }}` for use by other steps in the same job.

### Example 8

<details>
  <summary>Calculate the version for the build and use the output in a subsequent steps within the same job.</summary>

```yaml
jobs:
  GitVersion_v5_same_job:
    name: GitVersion v5 (same job)
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install GitVersion
        uses: gittools/actions/gitversion/setup@v1.1.1
        with:
          versionSpec: '5.x'

      - name: Determine Version
        id: version_step # step id used as reference for output values
        uses: gittools/actions/gitversion/execute@v1.1.1

      - run: |
          echo "FullSemVer (env.fullSemVer)            : ${{ env.fullSemVer }}"
        name: Display GitVersion variables (without prefix)

      - run: |
          echo "FullSemVer (env.GitVersion_FullSemVer) : ${{ env.GitVersion_FullSemVer }}"
        name: Display GitVersion variables (with prefix)

      - run: |
          echo "FullSemVer (steps.version_step.outputs.fullSemVer)            : ${{ steps.version_step.outputs.fullSemVer }}"
        name: Display GitVersion outputs (step output without prefix)

      - run: |
          echo "FullSemVer (steps.version_step.outputs.GitVersion_FullSemVer) : ${{ steps.version_step.outputs.GitVersion_FullSemVer }}"
        name: Display GitVersion outputs (step output with prefix)

      - run: |
          echo "FullSemVer (env.myvar_fullSemVer)            : ${{ env.myvar_fullSemVer }}"
        name: Display mapped local env (outputs without prefix)
        env:
          myvar_fullSemVer: ${{ steps.version_step.outputs.fullSemVer }}

      - run: |
          echo "FullSemVer (env.myvar_GitVersion_FullSemVer) : ${{ env.myvar_GitVersion_FullSemVer }}"
        name: Display mapped local env (outputs with prefix)
        env:
          myvar_GitVersion_FullSemVer: ${{ steps.version_step.outputs.GitVersion_FullSemVer }}

      - run: |
          echo "FullSemVer (env.myvar_fullSemVer)            : $env:myvar_fullSemVer"
        name: Display mapped local env (pwsh - outputs without prefix)
        shell: pwsh
        env:
          myvar_fullSemVer: ${{ steps.version_step.outputs.fullSemVer }}

      - run: |
          echo "FullSemVer (env.myvar_GitVersion_FullSemVer) : $env:myvar_GitVersion_FullSemVer"
        name: Display mapped local env (pwsh - outputs with prefix)
        shell: pwsh
        env:
          myvar_GitVersion_FullSemVer: ${{ steps.version_step.outputs.GitVersion_FullSemVer }}

      - run: |
          echo "FullSemVer (myvar_fullSemVer)            : $myvar_fullSemVer"
        name: Display mapped local env (bash - outputs without prefix)
        shell: bash
        env:
          myvar_fullSemVer: ${{ steps.version_step.outputs.fullSemVer }}

      - run: |
          echo "FullSemVer (myvar_GitVersion_FullSemVer) : $myvar_GitVersion_FullSemVer"
        name: Display mapped local env (bash - outputs with prefix)
        shell: bash
        env:
          myvar_GitVersion_FullSemVer: ${{ steps.version_step.outputs.GitVersion_FullSemVer }}
```
</details>

### Example 9

<details>
  <summary>Calculate the version for the build and use the output in a subsequent job.</summary>

```yaml
jobs:
  GitVersion_v5_cross_job:
    name: GitVersion v5 (cross job)
    runs-on: ubuntu-latest
    outputs:
      branchName: ${{ steps.version_step.outputs.branchName }}
      fullSemVer: ${{ steps.version_step.outputs.fullSemVer }}

      GitVersion_BranchName: ${{ steps.version_step.outputs.GitVersion_BranchName }}
      GitVersion_FullSemVer: ${{ steps.version_step.outputs.GitVersion_FullSemVer }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install GitVersion
        uses: gittools/actions/gitversion/setup@v1.1.1
        with:
          versionSpec: '5.x'

      - name: Determine Version
        id: version_step # step id used as reference for output values
        uses: gittools/actions/gitversion/execute@v1.1.1

  GitVersion_v5_cross_job_consumer_without_prefix:
    name: GitVersion v5 (cross job consumer) - without prefix
    needs: GitVersion_v5_cross_job
    runs-on: ubuntu-latest
    if: contains(needs.GitVersion_v5_cross_job.outputs['branchName'], 'main')
    env:
      myvar_fullSemVer: ${{ needs.GitVersion_v5_cross_job.outputs.fullSemVer }}
    steps:
      - run: |
          echo "FullSemVer (env:myvar_fullSemVer)   : $env:myvar_fullSemVer"
        name: Use job variables (pwsh - outputs without prefix)
        shell: pwsh

      - run: |
          echo "FullSemVer (env:localvar_fullSemVer): $env:localvar_fullSemVer"
        name: Use local env mapped from output (pwsh - outputs without prefix)
        shell: pwsh
        env:
          localvar_fullSemVer: ${{ needs.GitVersion_v5_cross_job.outputs.fullSemVer }}

      - run: |
          echo "FullSemVer (env:localvar_fullSemVer)   : $env:localvar_fullSemVer"
        name: Use local env mapped from job variables (pwsh - outputs without prefix)
        shell: pwsh
        env:
          localvar_fullSemVer: ${{ env.myvar_fullSemVer }}

      - run: |
          echo "FullSemVer (needs.GitVersion_v5_cross_job.outputs.fullSemVer) : ${{ needs.GitVersion_v5_cross_job.outputs.fullSemVer }}"
        name: Use direct output from previous job (pwsh - outputs without prefix)
        shell: pwsh

      - run: |
          echo "FullSemVer (myvar_fullSemVer)   : $myvar_fullSemVer"
        name: Use job variables (bash - outputs without prefix)
        shell: bash

      - run: |
          echo "FullSemVer (localvar_fullSemVer): $localvar_fullSemVer"
        name: Use local env mapped from output (bash - outputs without prefix)
        shell: bash
        env:
          localvar_fullSemVer: ${{ needs.GitVersion_v5_cross_job.outputs.fullSemVer }}

      - run: |
          echo "FullSemVer (localvar_fullSemVer)   : $localvar_fullSemVer"
        name: Use local env mapped from job variables (bash - outputs without prefix)
        shell: bash
        env:
          localvar_fullSemVer: ${{ env.myvar_fullSemVer }}

      - run: |
          echo "FullSemVer (needs.GitVersion_v5_cross_job.outputs.fullSemVer) : ${{ needs.GitVersion_v5_cross_job.outputs.fullSemVer }}"
        name: Use direct output from previous job (bash - outputs without prefix)
        shell: bash

  GitVersion_v5_cross_job_consumer_with_prefix:
    name: GitVersion v5 (cross job consumer) - with prefix
    needs: GitVersion_v5_cross_job
    runs-on: ubuntu-latest
    if: contains(needs.GitVersion_v5_cross_job.outputs['GitVersion_BranchName'], 'main')
    env:
      myvar_GitVersion_FullSemVer: ${{ needs.GitVersion_v5_cross_job.outputs.GitVersion_FullSemVer }}
    steps:
      - run: |
          echo "FullSemVer (env:myvar_GitVersion_FullSemVer)   : $env:myvar_GitVersion_FullSemVer"
        name: Use job variables (pwsh - outputs without prefix)
        shell: pwsh

      - run: |
          echo "FullSemVer (env:localvar_fullSemVer): $env:localvar_fullSemVer"
        name: Use local env mapped from output (pwsh - outputs without prefix)
        shell: pwsh
        env:
          localvar_fullSemVer: ${{ needs.GitVersion_v5_cross_job.outputs.GitVersion_FullSemVer }}

      - run: |
          echo "FullSemVer (env:localvar_fullSemVer)   : $env:localvar_fullSemVer"
        name: Use local env mapped from job variables (pwsh - outputs without prefix)
        shell: pwsh
        env:
          localvar_fullSemVer: ${{ env.myvar_GitVersion_FullSemVer }}

      - run: |
          echo "FullSemVer (needs.GitVersion_v5_cross_job.outputs.GitVersion_FullSemVer) : ${{ needs.GitVersion_v5_cross_job.outputs.GitVersion_FullSemVer }}"
        name: Use direct output from previous job (pwsh - outputs without prefix)
        shell: pwsh

      - run: |
          echo "FullSemVer (myvar_GitVersion_FullSemVer)   : $myvar_GitVersion_FullSemVer"
        name: Use job variables (bash - outputs without prefix)
        shell: bash

      - run: |
          echo "FullSemVer (localvar_fullSemVer): $localvar_fullSemVer"
        name: Use local env mapped from output (bash - outputs without prefix)
        shell: bash
        env:
          localvar_fullSemVer: ${{ needs.GitVersion_v5_cross_job.outputs.GitVersion_FullSemVer }}

      - run: |
          echo "FullSemVer (localvar_fullSemVer)   : $localvar_fullSemVer"
        name: Use local env mapped from job variables (bash - outputs without prefix)
        shell: bash
        env:
          localvar_fullSemVer: ${{ env.myvar_GitVersion_FullSemVer }}

      - run: |
          echo "FullSemVer (needs.GitVersion_v5_cross_job.outputs.GitVersion_FullSemVer) : ${{ needs.GitVersion_v5_cross_job.outputs.GitVersion_FullSemVer }}"
        name: Use direct output from previous job (bash - outputs without prefix)
        shell: bash
```
</details>
