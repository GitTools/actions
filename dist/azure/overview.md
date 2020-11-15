Versioning when using Git, solved. GitVersion looks at your Git history and works out the [semantic version](http://semver.org) of the commit being built.

It works with most branching strategies but has been designed mainly around GitFlow and GitHubFlow (pull request workflow). The calculated version numbers can then be accessed through variables such as `$(GitVersion.NuGetVersion)` and `$(GitVersion.SemVer)`. It is also very configurable to allow it to work with most release workflows!

## Azure Pipelines tasks

![Azure Pipelines Tasks](https://raw.githubusercontent.com/chris-codeflow/actions/feature-236/dist/azure/images/pipeline-editor-tasks.png)

## Azure Pipelines Setup GitVersion task

![Azure Pipelines Setup GitVersion task](https://raw.githubusercontent.com/chris-codeflow/actions/feature-236/dist/azure/images/pipeline-editor-setup-gitversion-task.png)

## Azure Pipelines Execute GitVersion task

![Azure Pipelines Execute GitVersion task](https://raw.githubusercontent.com/chris-codeflow/actions/feature-236/dist/azure/images/pipeline-editor-execute-gitversion-task.png)

## Azure Pipeline run examples

![Builds](https://raw.githubusercontent.com/GitTools/actions/master/dist/azure/images/builds.png)
