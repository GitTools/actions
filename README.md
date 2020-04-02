# GitTools actions

![GitTools](docs/icon.png "GitTools")

GitHub Actions that allow to install and use the [GitVersion](https://github.com/GitTools/GitVersion) and [GitReleaseManager](https://github.com/GitTools/GitReleaseManager) tools

[![Build Status](https://github.com/GitTools/actions/workflows/CI/badge.svg)](https://github.com/GitTools/actions/actions)
[![Build Status](https://github.com/GitTools/actions/workflows/release/badge.svg)](https://github.com/GitTools/actions/actions)

[![Azure Pipeline Task](https://img.shields.io/badge/marketplace-gittools.gittools-blue?logo=visual-studio)](https://marketplace.visualstudio.com/items?itemName=gittools.gittools)
[![Github Action](https://img.shields.io/badge/marketplace-use--actions-blue?logo=github)](https://github.com/marketplace/actions/use-actions)

## Usage

see examples of usages for **GitVersion**:

- [GitHub Actions](docs/examples/github/gitversion)
- [Azure Pipeline tasks](docs/examples/azure/gitversion)

and for **GitReleaseManager**:

- [GitHub Actions](docs/examples/github/gitreleasemanager)
- [Azure Pipeline tasks](docs/examples/azure/gitreleasemanager)

## Dependency

There are two step dependencies that are required in your workflow before running this action. You must checkout your Git repository and then fetch the master branch and tags.

```yaml
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Fetch all history for all tags and branches
      run: git fetch --prune --unshallow
```

Basic:

```yaml
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Fetch all history for all tags and branches
      run: git fetch --prune --unshallow
    - name: Install GitVersion
      uses: gittools/actions/gitversion/setup@v0.9.2
      with:
          versionSpec: '5.2.x'
    - name: Use GitVersion
      id: gitversion # step id used as reference for output values
      uses: gittools/actions/gitversion/execute@v0.9.2
    - run: |
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
        echo "Sha: ${{ steps.gitversion.outputs.sha }}"
        echo "ShortSha: ${{ steps.gitversion.outputs.shortSha }}"
        echo "NuGetVersionV2: ${{ steps.gitversion.outputs.nuGetVersionV2 }}"
        echo "NuGetVersion: ${{ steps.gitversion.outputs.nuGetVersion }}"
        echo "NuGetPreReleaseTagV2: ${{ steps.gitversion.outputs.nuGetPreReleaseTagV2 }}"
        echo "NuGetPreReleaseTag: ${{ steps.gitversion.outputs.nuGetPreReleaseTag }}"
        echo "VersionSourceSha: ${{ steps.gitversion.outputs.versionSourceSha }}"
        echo "CommitsSinceVersionSource: ${{ steps.gitversion.outputs.commitsSinceVersionSource }}"
        echo "CommitsSinceVersionSourcePadded: ${{ steps.gitversion.outputs.commitsSinceVersionSourcePadded }}"
        echo "CommitDate: ${{ steps.gitversion.outputs.commitDate }}"

```

### Private Repositories

Private repos require credentials before you can fetch the master branch and tags.

```yaml
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Fetch all history for all tags and branches
      run: |
        git config remote.origin.url https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}
        git fetch --prune --unshallow
```
