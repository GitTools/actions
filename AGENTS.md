# Repository Guidelines

## Project Structure & Module Organization

- `src/tools/` contains tool-specific logic for GitVersion and GitReleaseManager.
- `src/agents/` contains platform adapters for `local`, `github`, and `azure`.
- `src/__tests__/` mirrors the source layout.
- `dist/` holds generated build output.
- `gitversion/*` and `gitreleasemanager/*` contain published action entrypoints with `action.yml` and generated `main.mjs`.
- `docs/` and `docs/examples/` contain usage docs and examples.

## Build, Test, and Development Commands

Use Node.js 24 or later.

```bash
npm install
npm run build
npm run test
npm run lint:check
npm run typecheck
npm run format:check
npm run mdlint:check
```

- Use `npm run build:tools` or `npm run build:agents` for smaller rebuilds.
- Use `npm run build:agent:local`, `npm run build:agent:azure`, or `npm run build:agent:github` for one target.
- Use `npm run test:tools` or `npm run test:agents` to limit test scope.
- Run a single spec with `npx vitest --run src/__tests__/tools/gitversion/runner.spec.ts --config src/__tests__/vitest.config.ts`.
- Exercise a built tool locally with `npm run run:local:gitversion -- --command execute`.

## Coding Style & Naming Conventions

- TypeScript is the primary language; keep new code under `src/**/*.ts`.
- Follow `.editorconfig`: 4 spaces for code, 2 spaces for Markdown/YAML/JSON, LF endings, trailing newline.
- Prettier enforces single quotes, no semicolons, 160-column width, and no tabs.
- Keep platform folders lowercase and name tests `*.spec.ts`.
- Match action folder names to the command, for example `gitversion/setup`.

## Testing Guidelines

- Vitest runs with globals enabled and writes JUnit output to `junit-report.xml`.
- Add or update tests in `src/__tests__/agents/**` or `src/__tests__/tools/**` to mirror the changed code.
- Name test files `*.spec.ts`.
- For behavior changes, cover both the platform agent path and tool logic when applicable.

## Commit & Pull Request Guidelines

- Prefer short, imperative commit subjects with prefixes like `fix:` or `build:`.
- Keep commits focused on one change.
- Before committing, Husky runs `npm run build`, stages `**/*.mjs*`, and then runs `lint-staged`.
- Do not hand-edit generated bundles.
- Pull requests should describe the user-visible change, link the related issue, note generated `dist/` or action entrypoint updates, and list the checks run.

## Release & Packaging Notes

- Rebuild before opening a PR when a change affects shipped actions or Azure task output.
- Generated `.mjs` files in `dist/` and the repo-root action folders are part of the release output and must stay in sync with `src/`.
- Use `npm run publish:prepare` only when preparing Azure marketplace artifacts.
