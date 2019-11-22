# use-gitversion

![GitVersion](https://raw.githubusercontent.com/GitTools/GitVersion/master/docs/img/package_icon.png "GitVersion")

GitHub Action that installs and uses the GitVersion tool

## Usage

See [setup](setup/action.yml) and [usage](execute/action.yml)

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
      uses: gittools/use-gitversion/setup@v0.2
      with:
          versionSpec: '5.1.x'
    - name: Use GitVersion
      id: gitversion # step id used as reference for output values
      uses: gittools/use-gitversion/execute@v0.2
    - run: |
        echo "FullSemVer: ${{ steps.gitversion.outputs.fullSemVer }}"
```
