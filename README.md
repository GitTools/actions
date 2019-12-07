# GitTools actions

![GitTools](docs/icon.png "GitTools")

GitHub Actions that allow to install and use the GitVersion and GitReleaseManager tools

[![Build Status](https://github.com/GitTools/actions/workflows/CI/badge.svg)](https://github.com/GitTools/actions/actions)

## Usage

See [setup](setup-gitversion/action.yml) and [usage](execute-gitversion/action.yml)

## Dependency

There are two step dependencies that are required in your workflow before running this action. You must checkout your Git repository and then fetch the master branch and tags.

```yaml
    steps:
    - name: Checkout
    uses: actions/checkout@v1
    - name: Fetch tags and master for GitVersion
    run: |
        git fetch --tags
        git branch --create-reflog master origin/master
```

Basic:

```yaml
    steps:
    - uses: actions/checkout@v1
    - name: Fetch tags and master for GitVersion
      run: |
          git config remote.origin.url https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }} # creds needed for private repos
          git fetch --tags
          git branch --create-reflog master origin/master
    - name: Install GitVersion
      uses: gittools/actions/setup-gitversion@v0.3
      with:
          versionSpec: '5.1.x'
    - name: Use GitVersion
      id: gitversion # step id used as reference for output values
      uses: gittools/actions/execute-gitversion@v0.3
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
    uses: actions/checkout@v1
    - name: Fetch tags and master for GitVersion
    run: |
        git config remote.origin.url https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/${{ github.repository }}
        git fetch --tags
        git branch --create-reflog master origin/master
```
