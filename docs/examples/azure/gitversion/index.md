# Example

```yaml
  steps:
  - task: gitversion/setup@0
    displayName: Install GitVersion
    inputs:
      versionSpec: '5.x'
  - task: gitversion/execute@0
    displayName: Use GitVersion
  - script: |
      echo FullSemVer: $(fullSemVer)
      echo ##vso[build.updatebuildnumber]$(fullSemVer)
      echo Major: ${{ steps.gitversion.outputs.major }}
      echo Minor: ${{ steps.gitversion.outputs.minor }}
      echo Patch: ${{ steps.gitversion.outputs.patch }}
      echo PreReleaseTag: ${{ steps.gitversion.outputs.preReleaseTag }}
      echo PreReleaseTagWithDash: ${{ steps.gitversion.outputs.preReleaseTagWithDash }}
      echo PreReleaseLabel: ${{ steps.gitversion.outputs.preReleaseLabel }}
      echo PreReleaseNumber: ${{ steps.gitversion.outputs.preReleaseNumber }}
      echo WeightedPreReleaseNumber: ${{ steps.gitversion.outputs.weightedPreReleaseNumber }}
      echo BuildMetaData: ${{ steps.gitversion.outputs.buildMetaData }}
      echo BuildMetaDataPadded: ${{ steps.gitversion.outputs.buildMetaDataPadded }}
      echo FullBuildMetaData: ${{ steps.gitversion.outputs.fullBuildMetaData }}
      echo MajorMinorPatch: ${{ steps.gitversion.outputs.majorMinorPatch }}
      echo SemVer: ${{ steps.gitversion.outputs.semVer }}
      echo LegacySemVer: ${{ steps.gitversion.outputs.legacySemVer }}
      echo LegacySemVerPadded: ${{ steps.gitversion.outputs.legacySemVerPadded }}
      echo AssemblySemVer: ${{ steps.gitversion.outputs.assemblySemVer }}
      echo AssemblySemFileVer: ${{ steps.gitversion.outputs.assemblySemFileVer }}
      echo InformationalVersion: ${{ steps.gitversion.outputs.informationalVersion }}
      echo BranchName: ${{ steps.gitversion.outputs.branchName }}
      echo Sha: ${{ steps.gitversion.outputs.sha }}
      echo ShortSha: ${{ steps.gitversion.outputs.shortSha }}
      echo NuGetVersionV2: ${{ steps.gitversion.outputs.nuGetVersionV2 }}
      echo NuGetVersion: ${{ steps.gitversion.outputs.nuGetVersion }}
      echo NuGetPreReleaseTagV2: ${{ steps.gitversion.outputs.nuGetPreReleaseTagV2 }}
      echo NuGetPreReleaseTag: ${{ steps.gitversion.outputs.nuGetPreReleaseTag }}
      echo VersionSourceSha: ${{ steps.gitversion.outputs.versionSourceSha }}
      echo CommitsSinceVersionSource: ${{ steps.gitversion.outputs.commitsSinceVersionSource }}
      echo CommitsSinceVersionSourcePadded: ${{ steps.gitversion.outputs.commitsSinceVersionSourcePadded }}
      echo CommitDate: ${{ steps.gitversion.outputs.commitDate }}
```
