# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single TypeScript codebase that produces **both** GitHub Actions and Azure Pipelines tasks which install and run the .NET CLI tools [GitVersion](https://github.com/GitTools/GitVersion) and [GitReleaseManager](https://github.com/GitTools/GitReleaseManager). Node >= 24 is required. Development is expected on Linux/macOS (use WSL on Windows).

## Commands

```bash
npm run build          # build everything (tools bundle + all three agent bundles) via vite/rolldown -> dist/tools
npm run build:tools    # cli + per-tool runner libs
npm run build:agents   # local + azure + github agent bundles

npm run test           # run all tests (tools + agents) with vitest
npm run test:tools     # only src/__tests__/tools
npm run test:agents    # only src/__tests__/agents
npx vitest --run src/__tests__/tools/gitversion/runner.spec.ts --config src/__tests__/vitest.config.ts   # single test file

npm run lint:check     # eslint src   (lint:fix to autofix)
npm run typecheck      # tsc --noEmit
npm run format:check   # prettier      (format:fix to autofix)
npm run mdlint:check   # markdownlint docs dist

# Run a built tool locally (after build), e.g.:
npm run run:local:gitversion -- --command execute
```

Note: the README references `npm run build:local` etc., but the actual scripts are `build:agent:local` / `build:agent:azure` / `build:agent:github`.

### Committed build output — important

The husky **pre-commit hook runs `npm run build` and `git add **/*.mjs*`**, then lint-staged. The bundled `.mjs` output is checked into the repo (repo-root action dirs and `dist/`) because that is what the published GitHub Action / Azure extension actually executes. When you change `src/`, the built artifacts change too — don't hand-edit the generated `.mjs`.

## Architecture

The code is organized along two orthogonal axes: **tools** (`gitversion`, `gitreleasemanager`) × **agents** / CI platforms (`local`, `azure`, `github`). A tool is platform-agnostic; an agent abstracts one CI platform.

### Entry point and dynamic dispatch (`src/tools/cli.ts` → `src/tools/lib.ts`)

`cli.ts` parses `--agent`, `--tool`, `--command` and calls `run()`. `getToolRunner()` **dynamically imports the built bundles by convention**:

- the agent from `./{agent}/agent.mjs` (exports `BuildAgent`)
- the tool runner from `./libs/{tool}.mjs` (exports `Runner`)

This module layout is produced by the vite configs, so build output paths and these import strings must stay in sync.

### Three core abstractions

1. **`IBuildAgent` / `BuildAgentBase`** (`src/agents/common/build-agent.ts`) — the CI-platform abstraction: reading typed inputs (`getInput<T>`, `getBooleanInput<T>`), setting outputs/variables, `exec`, tool caching, path/dir helpers. Each platform subclass (`src/agents/{local,azure,github}/build-agent.ts`) maps these onto that platform's env vars (e.g. GitHub uses `GITHUB_WORKSPACE`, `RUNNER_TEMP`, `RUNNER_TOOL_CACHE` and issues workflow commands).

2. **`DotnetTool`** (`src/tools/common/dotnet-tool.ts`) — installs a .NET global tool from NuGet: resolves the version spec (queries the NuGet search API for non-explicit specs, validates against `versionRange`), checks/populates the tool cache, locates the executable (including architecture-specific subdirs), and executes it with `--roll-forward Major`. Uses `ArgumentsBuilder` (`arguments-builder.ts`) to build CLI args.

3. **`RunnerBase` / `IRunner`** (`src/tools/common/runner.ts`) — per-tool command dispatch. Each tool's `runner.ts` (`src/tools/{tool}/runner.ts`) switches on the command (e.g. gitversion: `setup` / `execute` / `command`) and wraps each in `safeExecute`, which disables telemetry, runs the action, logs output, and calls `setSucceeded`/`setFailed` on the agent.

Per-tool inputs are read through a **`SettingsProvider`** (`settings.ts`) using the agent's typed `getInput<T>`; `models.ts` holds the tool's types.

### Tool file layout (`src/tools/{gitversion,gitreleasemanager}/`)

Each tool has: `runner.ts` (command dispatch, extends `RunnerBase`), `tool.ts` (extends `DotnetTool`, defines package name / version range / execution), `settings.ts` (`SettingsProvider`), `models.ts`, `index.ts`.

### Distribution targets

- **GitHub Actions**: entry points live in **repo-root directories** (`gitversion/`, `gitreleasemanager/`, `git/`), one subdir per command, each with `action.yml` + built `main.mjs`. The root `action.yml` points at `gitversion/setup/main.js`.
- **Azure Pipelines**: built into `dist/azure/`, one subdir per command with `task.json`, plus `manifest.config.cjs` / `tasks.json`. Packaged/published with `tfx` (`publish:azure:*` scripts); `publish:prepare` runs `dist/azure/updateTasks.mjs`.

### Path aliases (`tsconfig.json`)

`@lib`, `@agents/common`, `@agents/{azure,local,github}`, `@tools/common`, `@tools/{gitversion,gitreleasemanager}`. Use these instead of deep relative imports.

## Tests

Vitest, globals enabled, config at `src/__tests__/vitest.config.ts` (targets node24, emits `junit-report.xml`). Tests mirror `src/` structure under `src/__tests__/{tools,agents}/`; shared helpers in `src/__tests__/tools/common/utils.ts`.
