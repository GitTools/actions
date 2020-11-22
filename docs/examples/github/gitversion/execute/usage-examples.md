# Execute GitVersion Action (gitversion/execute) Usage Examples

Find out how to use the **gitversion/execute** action using the examples below.

For the GitVersion workflow to execute successfully, you must checkout your Git repository with `fetch-depth: 0` to fetch all history for all tags and branches, as follows:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2
    with:
      fetch-depth: 0
```

> The examples use version _0.9.6_ of the GitVersion Execute action.  It is recommended to use the latest released version in your own workflows.

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
  description: Optional path to config file (defaults to yml).
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
- buildMetaDataPadded
- fullBuildMetaData
- majorMinorPatch
- semVer
- legacySemVer
- legacySemVerPadded
- assemblySemVer
- assemblySemFileVer
- fullSemVer
- informationalVersion
- branchName
- escapedBranchName (since 5.2.0)
- sha
- shortSha
- nuGetVersionV2
- nuGetVersion
- nuGetPreReleaseTagV2
- nuGetPreReleaseTag
- versionSourceSha
- commitsSinceVersionSource
- commitsSinceVersionSourcePadded (since 5.2.0)
- uncommittedChanges (since 5.5.0)
- commitDate

The outputs can be accessed using the syntax `${{ steps.<id>.outputs.<outputName> }}`, where `<id>` is the ID assigned to the step that calls the action, by subsequent steps later in the same job.  See example 5.

The action also creates environment variables of the form `GITVERSION_<OUTPUTNAME>` for use by other steps in the same job.  See example 6.

The outputs can be accessed across jobs by mapping them to job outputs and referencing the job outputs using the `needs` context in dependent jobs.  See examples 7 and 8.

---

## Examples

- Example 1: Calculate the version for the build.

    ```yaml
    steps:
      # gitversion/setup@v0.9.6 action omitted for brevity.

      - name: Determine Version
        uses: gittools/actions/gitversion/execute@v0.9.6
    ```

---

- Example 2: Calculate the version for the build using a config file with the default name **GitVersion.yml**.

    ```yaml
    steps:
      - name: Determine Version
        uses: gittools/actions/gitversion/execute@v0.9.6
        with:
          useConfigFile: true
    ```

    Example contents of **yml**:

    ```yaml
    mode: Mainline
    branches:
      master:
        regex: ^latest$
      pull-request:
        tag: pr
    ```

---

- Example 3: Calculate the version for the build using a config file named **VersionConfig.yml** in the root of the working folder.

    ```yaml
    steps:
      # gitversion/setup@v0.9.6 action omitted for brevity.

      - name: Determine Version
        uses: gittools/actions/gitversion/execute@v0.9.6
        with:
          useConfigFile: true
          configFilePath: VersionConfig.yml
    ```

---

- Example 4: Show the effective configuration for GitVersion by running the **/showConfig** command (passed as an additional argument).

    ```yaml
    steps:
      # gitversion/setup@v0.9.6 action omitted for brevity.

      - name: Display GitVersion config
        uses: gittools/actions/gitversion/execute@v0.9.6
        with:
          useConfigFile: true
          additionalArguments: '/showConfig'
    ```

---

- Example 5: Calculate the version for the build and display all the calculated variables in the next step.

    ```yaml
    steps:
      # gitversion/setup@v0.9.6 action omitted for brevity.

      - name: Determine Version
        id:   gitversion
        uses: gittools/actions/gitversion/execute@v0.9.6

      - name: Display GitVersion outputs
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
          echo "UncomittedChanges: ${{ steps.gitversion.outputs.uncomittedChanges }}"
          echo "CommitDate: ${{ steps.gitversion.outputs.commitDate }}"
    ```

- Example 6: Calculate the version for the build and display the value of the `GITVERSION_SEMVER` environment variable.

    ```yaml
    steps:
      # gitversion/setup@v0.9.6 action omitted for brevity.

      - name: Determine Version
        uses: gittools/actions/gitversion/execute@v0.9.6

      - name: Display SemVer
        run: |
          echo "SemVer: $GITVERSION_SEMVER"
    ```

---

- Example 7: Calculate the version for the build and use the `branchName` output in a condition for starting another job.

    ````yaml
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
            uses: gittools/actions/gitversion/execute@v0.9.6

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

---

- Example 8: Calculate the version for the build and map the `semVer` output into an environment variable in another job.

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
            uses: gittools/actions/gitversion/execute@v0.9.6

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
