# GitTools actions

![GitTools](docs/icon.png "GitTools")

GitHub Actions that allow the setup and use of the [GitVersion](https://github.com/GitTools/GitVersion) and [GitReleaseManager](https://github.com/GitTools/GitReleaseManager) tools.

[![CI Build Status](https://github.com/GitTools/actions/workflows/CI/badge.svg)](https://github.com/GitTools/actions/actions)
[![Release Build Status](https://github.com/GitTools/actions/workflows/release/badge.svg)](https://github.com/GitTools/actions/actions)

[![GitHub Release](https://img.shields.io/github/v/release/gittools/actions?logo=github&sort=semver)](https://github.com/GitTools/actions/releases/latest)

[![Github Action][gh-actions-badge]][gh-actions]
[![Azure Pipelines Task][az-pipeline-task-badge]][az-pipeline-task]

## Usage

### GitVersion

Examples for usage of **GitVersion**:

- [GitHub Actions](docs/examples/github/gitversion/index.md)
- [Azure Pipelines tasks](docs/examples/azure/gitversion/index.md)

### GitReleaseManager

Examples for usage of **GitReleaseManager**:

- [GitHub Actions](docs/examples/github/gitreleasemanager/index.md)
- [Azure Pipelines tasks](docs/examples/azure/gitreleasemanager/index.md)

[gh-actions]: https://github.com/marketplace/actions/gittools

[gh-actions-badge]: https://img.shields.io/badge/marketplace-gittools-blue?logo=github

[az-pipeline-task]: https://marketplace.visualstudio.com/items?itemName=gittools.gittools

[az-pipeline-task-badge]: https://img.shields.io/badge/marketplace-gittools-blue?logo=data:application/pdf;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABJlJREFUWIXFVk1sVFUU/u6dNzOd6fx2ftoGFNIfNa1prCW4ALHsGolIYmjQGH/CwmUXBl2gK0OihoUYE5G40GAEQ7QJ0IobQSEkLYLFH4QabSpUptPpTDs/773pzLvHRTvDm3lvpjOtxpOcTN69557vu+eec+YwIsL/KdK/4aRzz8WupubA4xKDrRZ7LS8yYxPZ4/RDX27dBLa8PLGnu7fjKxBYPee2ijgH8PG6CGwZvOptfbD1pNDqAwcAboUbWOcTeDb4R8CYfS1ZJLTl3zUT2Lr/xkvhVt82Ekb4TSGG9o12OOwc0cQSfp3OQVZLgySwDgLtg1e9nR0tR02w0bPZgofbXcVvt9OKjWGBr8cXIavcwIBjDbKhxTcCMLsgQK92K6GrzQUilKhN4ujeZCuxNUSg8/kxj1coq5aRsAdeCLUEtpm1D4+TVczGkM8Govy9BQYqEuh78WKPx2a9TmioCs4ZRyDYhErNS1YJlfqarGol58RKCCQAWNJYu8Sq5zJjDI3uAAioCJKQgWhCRchvvMjkXypKcmalCviycwuVv2e5Wi0OcHtDVRshGL77SUE0oRbfXxOEa5MpTEVLbQsiAUBeA6pFwMIscPgCFW+ul7TKMHpFQdClQJIYFtMEJWfMDEMSmpXUcnQApzsIgJkSaHJzLGQ0CKEDIYa5ZNGDqd98Lq/qCOQhhHlFNthcsNjsECYMgz4JPncj/F6BqZk08lrNPZEW4okLRQJCWAjceNjCOBzeJtPoNPuscLud0AhgxOF2cswntdWRibKxO9F9M9/03ywSAPEY9DUKAIzB5Q4CbKVgdRLySnC5HCi04WRaQawGcDWTvRyfS+2aGu5bKMIUavOBfZeGALxX2LBZHPAEmw1OQn4LvK5GEJZfN5mWEU3kDXZ6EUS5ZDQxdONkz4fle0zfHNr2fv8qZ+wwANgtjXCHwgZwXxn47CrgWVkej0eiA9NntyfM9ll5V2vbe+ktgN5gYLccDf5Jp8/zFACE/ZLh5rOJXEVgIkJ6fuHAbyd6DlcjaEj9P09tfxOE19Ss49FfjnfvlhfTX4R8ZeApGZF4zvCnU9AlRUE8cgdJFv+kanjMIlAuTx+c6gmGAtcz2XvglW5ORMgkYlCzGRAj5HMiNHO6P1bNf9V5YODgdGtvR/AKGEMkQZiNpRGp8OZLiozUQgyi0ORrbAkcAD44m3royHDq7SNfJh/Tb547tOnu3zH5MxKUi8bme/+Yip8QgqBXTRBSsSgW4rPIUx6CqKg1EyANnYzjdWblveUGnx5o3v/zzdv3jxzaPHHr8+7nMsnkGVq54JKiYP7ubWSyaQiQIRdqkZpGspF3uyIAwAZP2VqV8H25jAJihCWRqTqNS5JzVRp1zYRhJbxLI3pE0TIrK3VP4wapayacPfPEsBD0iv6dq2kyubrP0ggQnn3/dLp0KSd+HHrGM1b4nhvdeSzw5Hkw4KN6yNdGALQDhB0lS5y9A2BMvzQ/uvNY08AFDpCht+ulQZOzNREQsjLOnY7dZgbcit/N1uPn+o96B769BkLAbJ/Ap+Ln+9Nme3pZtRP+1/IPO814AQ1WwqwAAAAASUVORK5CYII=

### Versioning and Compatibility

You can find the compatibility matrix in the [versions.md](docs/versions.md) file.

## Contributing

### Prerequisites

1. **Linux** - Recommended to build and run
2. **Node.js** - Latest LTS version recommended
3. **.NET SDK** - Version 8.0 or later required for GitVersion and GitReleaseManager tools
4. **Git** - Latest version recommended

### Development Environment Setup

This project is designed to be run and worked on in a Linux or macOS environment.
If developing on Windows, please consider using WSL as it's likely you will run into issues with file paths etc

1. Clone the repository:

   ```bash
   git clone https://github.com/GitTools/actions.git
   cd actions
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   - For local development: `npm run build:local`
   - For Azure Pipelines: `npm run build:azure`
   - For GitHub Actions: `npm run build:github`

4. Test the project:

   ```bash
   npm run test
   ```

### Required Knowledge

- **TypeScript/JavaScript** - Primary development languages
- **GitHub Actions** - Understanding of action creation and workflows
- **Azure Pipelines** - Familiarity with pipeline tasks and extensions
- **.NET Tools** - Basic understanding of .NET CLI tools
- **Git** - Strong knowledge of Git versioning and release management

### Project Structure

- `src/tools/` - Core implementation of GitVersion and GitReleaseManager integrations
- `src/agents/` - Build agent implementations for different CI platforms
- `src/__tests__/` - Test suites organized by component
- `docs/examples/` - Usage examples for both GitHub Actions and Azure Pipelines

### Creating Pull Requests

When contributing to this project, please follow these guidelines for creating pull requests:

1. **Fork and Clone**
   - Fork the repository to your GitHub account
   - Clone your fork locally: `git clone https://github.com/YOUR-USERNAME/actions.git`
   - Add upstream remote: `git remote add upstream https://github.com/GitTools/actions.git`

2. **Create a Feature Branch**
   - Create a branch from main: `git checkout -b feature/your-feature-name`
   - Use descriptive branch names (e.g., `feature/add-new-version-format`, `fix/issue-123`)

3. **Keep Your Branch Updated**
   - Fetch upstream changes: `git fetch upstream`
   - Rebase your branch on upstream main:

     ```bash
     git checkout main
     git rebase upstream/main
     git checkout your-branch
     git rebase main
     ```

   - Always use rebase instead of merge to maintain a clean history

4. **Make Your Changes**
   - Make commits with clear, descriptive messages
   - Follow the project's code style and conventions
   - Add tests for new features or bug fixes
   - Run tests locally to ensure everything passes

5. **Submit the Pull Request**
   - Push your changes to your fork: `git push origin your-branch`
   - Go to the original repository on GitHub
   - Click "New Pull Request" and select your feature branch
   - Link any related issues

6. **PR Guidelines**
   - Keep PRs focused and single-purpose
   - Include tests and documentation updates
   - Ensure CI checks pass

7. **After PR is Merged**
   - Delete your feature branch locally and remotely
   - Update your main branch with the upstream changes
   - Celebrate your contribution! 🎉
