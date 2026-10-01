# Versions and Compatibility

| GitTools/actions | GitVersion       | GitReleaseManager  | Node.js            | Azure DevOps Agent |
|------------------|------------------|--------------------|--------------------|:------------------:|
| v1.x             | `>=5.2.0 <6.1.0` | `>=0.10.0 <0.19.0` | `>=0.10.0 <20.0.0` |      2.220.0       |
| v2.x             | `>=5.2.0 <6.1.0` | `>=0.10.0 <0.20.0` | `>=20.0.0`         |      3.224.0       |
| v3.x             | `>=5.2.0 <7.0.0` | `>=0.19.0 <0.21.0` | `>=20.0.0`         |      3.224.0       |
| v4.0.x-v4.6.0.x  | `>=6.1.0 <6.2.0` | `>=0.20.0`         | `>=20.0.0`         |      4.244.1       |
| v4.7.x           | `>=6.2.0 <7.0.0` | `>=0.20.0`         | `>=24.0.0`         |      4.244.1       |
| v5.x             | `>=6.2.0 <7.0.0` | `>=0.20.0`         | `>=24.0.0`         |      5.270.0       |

Starting with v5, Azure Pipelines tasks require agent 5.270.0 or later, based on .NET 10.
Upgrade self-hosted agents before migrating to v5. See the [Azure Pipelines agent release notes][agent-release].

[agent-release]: https://github.com/microsoft/azure-pipelines-agent/releases/tag/v5.270.0
