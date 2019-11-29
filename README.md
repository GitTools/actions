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
        echo "FullSemVer: ${{ steps.gitversion.outputs.fullSemVer }}"
```
