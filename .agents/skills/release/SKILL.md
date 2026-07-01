---
name: release
description: Guided GitTools Actions release workflow — picks the version from the open milestone, checks release readiness (milestone, GitReleaseManager labels), publishes the GitHub release as a prerelease and/or promotes it to a full release, then monitors and verifies the correct Azure DevOps Marketplace extension (test vs prod), the VSIX release asset, the milestone notes, the moving consumer branches (vX / vX.Y), the Announcements discussion, and the downstream example-update dispatches.
allowed-tools:
    - Bash(command -v gh)
    - Bash(gh --version)
    - Bash(gh auth status)
    - Bash(git log *)
    - Bash(git tag *)
    - Bash(git ls-remote *)
    - Bash(git describe *)
    - Bash(gh release *)
    - Bash(gh api *)
    - Bash(gh run list *)
    - Bash(gh pr list *)
    - Bash(gh pr view *)
    - Bash(python3 *)
    - Bash(python3 -c *)
    - Bash(curl *)
    - Read(GitReleaseManager.yml)
    - AskUserQuestion
    - Skill(loop)
---

# Release Skill — GitTools Actions Release Workflow

You are helping the maintainer of **GitTools/actions** (the GitHub Actions + Azure DevOps Pipelines tasks for GitVersion and GitReleaseManager) prepare and execute a release. Work through the phases in order. Never skip a phase. Always show your findings before moving on. This skill supersedes and extends `.github/prompts/prepare-release.prompt.md` — keep it consistent with that prompt.

## The two release types (read first — this drives everything)

A release is published in **two stages on the same tag/release**, promoted in place — not two separate releases:

1. **Prerelease** — publish the GitHub release with `prerelease=true`. GitHub fires the `prereleased` event → **`prerelease.yml`** runs.
2. **Full release** — later flip the same release to `prerelease=false` (promote in place). GitHub fires the `released` event → **`release.yml`** runs (guarded by `if: github.event.release.prerelease == false`).

So a typical cycle is: cut the **prerelease**, let `prerelease.yml` publish the **test** extension for validation, then **promote to full release**, which lets `release.yml` do the production publish + release-notes + milestone close. The user may ask for only one stage — always confirm which.

### What each workflow does (the differences that matter)

| Step                                                         | `prerelease.yml` (`prereleased`)                                                             | `release.yml` (`released`, prerelease==false)                                                                                                                                                        |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build (tools + github + azure agents)                        | ✅                                                                                           | ✅                                                                                                                                                                                                   |
| GitVersion setup + execute                                   | ✅                                                                                           | ✅                                                                                                                                                                                                   |
| **GitReleaseManager**                                        | ❌ not installed/run                                                                         | ✅ setup → **create** (notes) → **addasset** → **close** milestone                                                                                                                                   |
| **Azure Marketplace VSIX**                                   | `publish-azure` mode **`test`** → **`gittools.gittools-test`** ("GitTools (Test)", internal) | mode **`prod`** → **`gittools.gittools`** (production)                                                                                                                                               |
| VSIX version string                                          | `Major.Minor.Patch.<yyMMddHHm>`                                                              | `Major.Minor.Patch.<yyMMddHHm>`                                                                                                                                                                      |
| **VSIX attached to the GitHub release**                      | ❌                                                                                           | ✅ (`gitreleasemanager/addasset`)                                                                                                                                                                    |
| **Milestone**                                                | untouched                                                                                    | notes generated from it, then **closed**                                                                                                                                                             |
| Release-token permissions                                    | actions, contents, workflows                                                                 | **+ issues** (GRM close comments)                                                                                                                                                                    |
| **Update examples**                                          | `GitTools/actions-test` only, mode **`test`**                                                | `actions-test` mode **`prod`** **+** `GitTools/actions` (`update-examples` dispatch → `examples-version.yml` rewrites version pins in `package.json`/`docs`/`.github`/`.azure` and pushes to `main`) |
| **Moving consumer branches `v<Major>` / `v<Major>.<Minor>`** | ❌ never moved                                                                               | ✅ **this skill fast-forwards them to the release commit as the final step (Phase 6f)** — not done by the workflow files                                                                             |
| **Announcements discussion**                                 | created for the release (category `Announcements`, e.g. discussions/2033)                    | preserved / ensured linked                                                                                                                                                                           |

**Implication:** GitReleaseManager (release notes, milestone close), the VSIX release asset, the production extension, the moving branches, and the `actions` example bump **only happen on the full release**. For a prerelease, their absence is expected — never flag it.

## Repository facts (baked in — do not re-derive)

- **Repo:** `GitTools/actions` (`OWNER=GitTools`, `REPO=actions`).
- **Version is milestone-driven.** The release version is the title of the open **concrete-version** milestone (e.g. `v4.5.0`). **Exclude spec milestones** whose titles look like `v4.x` or `v4.5.x` — never use those as the version. GitVersion recomputes the exact number inside CI; you do not bump it by hand.
- **Tag = release title = milestone title**, all `v`-prefixed (e.g. `v4.5.0`). Throughout this skill `<TAG>` means `v<Major.Minor.Patch>` and `<VERSION>` means the bare `Major.Minor.Patch`.
- **Azure Marketplace extensions:** `gittools.gittools` (production, from a full release) and `gittools.gittools-test` (from a prerelease). Both carry version `Major.Minor.Patch.<date>`.
- **GitReleaseManager config:** `GitReleaseManager.yml` in the repo root. Included labels: `breaking change`, `bug`, `dependencies`, `documentation`, `feature`, `improvement`. Excluded label: `build`. `create` runs with `allow-update-to-published: true` (so notes can be regenerated in place) and `include-contributors: true` (notes credit authors and show "resolved in !PR" links).

### GRM `create` preconditions

`create` builds notes from the milestone and fails the `release.yml` run if any of these are violated. `prerelease.yml` does not run GRM, so verify them in Phase 3 before promoting:

1. **≥1 closed non-PR issue** with a valid label. Otherwise: `No closed issues have been found for milestone …`. A milestone of only PRs fails.
2. **Each closed item has exactly one label from {6 included ∪ `build`}.** Zero or ≥2 raises `InvalidIssuesException` on the first offender. `build` counts toward the "exactly one" even though it is excluded from rendered notes.
3. **PRs that close an in-milestone issue are not themselves in the milestone** (the issue is the tracked unit — see Phase 3d).

GRM reads the milestone via `GET /issues?milestone=N&state=closed`. That listing lags bulk milestone changes and can return a partial set for minutes while `milestone.closed_issues` already shows the full count. Prefer milestoning items at merge time over bulk-moving before a release; when a bulk move is unavoidable, use the settle check in Phase 3.

---

## Phase 0 — Prerequisites

```bash
command -v gh >/dev/null && gh --version || echo "MISSING"
gh auth status
gh auth status --hostname github.com   # must be logged in to github.com specifically
```

If `gh` is missing, stop and tell the user to install it (`brew install gh`, or <https://cli.github.com/>) and run `gh auth login`, then re-run. Do not proceed until `gh` is present and authenticated.

`GitTools/actions` is on **github.com**. If `gh`'s default host is an enterprise instance (`*.ghe.com`), bare `gh` calls target the wrong host. Pin it for the session:

```bash
export GH_HOST=github.com
```

The github.com account needs `repo` + `workflow` scopes (publish releases, edit milestones/labels, move branches).

---

## Phase 1 — Choose release type and version

### 1a. Ask the release type first

Use `AskUserQuestion`: **"Is this a prerelease, or promoting to a full release?"** Options:

- **Prerelease** — publish (or keep) the release as a prerelease → runs `prerelease.yml` (test extension, actions-test examples).
- **Full release** — promote the release to `prerelease=false` → runs `release.yml` (production extension, GRM notes, milestone close, example bumps), and then **this skill moves the consumer branches (Phase 6f)** as the final step. Requires the readiness checks in Phase 3 to pass first.

### 1b. Determine the version from milestones

List open milestones and pick the latest **concrete** version (exclude spec milestones):

```bash
gh api repos/GitTools/actions/milestones --paginate \
  --jq '[.[] | select(.state=="open") | {title, number, open_issues, closed_issues}]'
```

- Prefer the latest title matching `v<Major.Minor.Patch>` (e.g. `v4.5.0`).
- **Exclude** `v<Major>.x` / `v<Major>.<Minor>.x` spec milestones.
- If a valid milestone exists, ask: `Use <MILESTONE_TITLE> as the release version? (yes/no)`. On yes, use it; record its **milestone number**. On no (or none found), ask the user for the version explicitly.

State the resolved tag/version clearly, e.g. **Release: `v4.5.0` (milestone #NN)**.

### 1c. Analyse unreleased changes (context)

For situational awareness (and to sanity-check the milestone label mix ahead of GRM), summarise what's shipping:

```bash
gh release list --repo GitTools/actions --limit 1 --json tagName,publishedAt --jq '.[0]'
git log $(git describe --tags --abbrev=0)..HEAD --merges --oneline
gh pr list --repo GitTools/actions --state merged --json number,title,labels \
  --search "$(git log $(git describe --tags --abbrev=0)..HEAD --merges --format='%s' | grep -oE '#[0-9]+' | tr '\n' ' ')"
```

Present a short summary (PR count, breaking/feature/patch breakdown). Note this is informational — the version comes from the milestone, not from a computed bump.

---

## Phase 3 — Readiness checklist (required before a FULL release)

> **Prerelease:** these checks are informational — a prerelease can proceed without them because `prerelease.yml` does not run GitReleaseManager and does not touch the milestone. Still worth a glance so the eventual promotion isn't blocked. **Full release:** all hard blockers below must be resolved first, because `release.yml` runs `gitreleasemanager/create` + `close` against the milestone.

Run the checks in parallel and present a single consolidated report. All target the milestone from Phase 1 (title `<TAG>`, number `<MILESTONE_NUMBER>`).

### 3a. Milestone exists / is the right one

Already resolved in Phase 1b. If the milestone doesn't exist and the user still wants to release, offer to create it:

```bash
gh api repos/GitTools/actions/milestones --method POST --field title="<TAG>" --field state="open"
```

If closed items live in a related spec/umbrella milestone (`v<Major>.x`), offer to move them in (ask first):

```bash
gh api "repos/GitTools/actions/issues?milestone=<UMBRELLA_NUMBER>&state=closed&per_page=100" \
  --jq '[.[] | {number, title, labels: [.labels[].name]}]'
gh api repos/GitTools/actions/issues/<NUMBER> --method PATCH --field milestone=<MILESTONE_NUMBER>
```

### 3b. Open issues/PRs in milestone

```bash
gh api "repos/GitTools/actions/issues?milestone=<MILESTONE_NUMBER>&state=open&per_page=100" \
  --jq '[.[] | {number, title, url: ("https://github.com/GitTools/actions/issues/" + (.number|tostring)), type: (if .pull_request then "PR" else "issue" end)}]'
```

⚠️ if any remain — they won't be in the notes. Offer to close, move to a future milestone, or proceed (they carry over).

### 3c. Each closed item has exactly one label from {6 included ∪ `build`}

GRM throws `InvalidIssuesException` on the first item with zero or ≥2 valid labels. List the offenders:

```bash
cat GitReleaseManager.yml
gh api "repos/GitTools/actions/issues?milestone=<MILESTONE_NUMBER>&state=closed&per_page=100" --paginate \
  --jq '.[] | {n:.number, type:(if .pull_request then "PR" else "issue" end), labels:[.labels[].name]}
        | (.labels | map(select(. as $l | ["breaking change","bug","dependencies","documentation","feature","improvement","build"] | index($l)))) as $valid
        | select(($valid|length) != 1)
        | "\(.type) #\(.n)\tvalid=\($valid)\tall=\(.labels)"'
```

Any row printed is a blocker (zero labels, or ≥2). `build`-only items pass validation but are omitted from notes. Fixes:

```bash
# add the single correct label
gh api repos/GitTools/actions/issues/<NUMBER>/labels --method POST --field 'labels[]=<LABEL>'
# remove extras (precedence: breaking change > feature > bug > improvement > dependencies > documentation)
gh api repos/GitTools/actions/issues/<NUMBER>/labels/<LABEL_TO_REMOVE> --method DELETE
```

### 3c-bis. At least one closed issue present

GRM aborts with `No closed issues have been found` if the milestone has no closed non-PR issue with a valid label:

```bash
# --slurp so the count aggregates across pages (per-page --jq would report each page separately)
gh api "repos/GitTools/actions/issues?milestone=<MILESTONE_NUMBER>&state=closed&per_page=100" --paginate --slurp \
  | python3 -c "import sys,json;p=json.load(sys.stdin);print('closed issues in milestone:', sum(1 for pg in p for i in pg if i.get('pull_request') is None))"
```

`0` → ❌ blocker. Ask the user to file and close a labeled tracking issue for the release's changes and assign it to the milestone.

### 3d. Merged PRs not assigned to the milestone

```bash
# --paginate --slurp so milestones with >100 items aren't truncated to the first page
MILESTONE_ITEMS=$(gh api "repos/GitTools/actions/issues?milestone=<MILESTONE_NUMBER>&state=closed&per_page=100" --paginate --slurp \
  | python3 -c "import sys,json;p=json.load(sys.stdin);print(json.dumps([i['number'] for pg in p for i in pg]))")
LAST_DATE=$(gh release list --repo GitTools/actions --limit 1 --json publishedAt --jq '.[0].publishedAt')
# --limit well above gh's default of 30 or merged PRs are silently dropped
gh pr list --repo GitTools/actions --state merged --base main \
  --search "merged:>=${LAST_DATE}" --limit 200 --json number,title,labels \
  --jq "[.[] | select(.number as \$n | ($MILESTONE_ITEMS | index(\$n)) == null) | {number, title, url: (\"https://github.com/GitTools/actions/pull/\" + (.number|tostring)), labels: [.labels[].name]}]"
```

For each, check if it closes a linked issue (`gh pr view <N> --json closingIssuesReferences`). If it closes an issue, the issue is the tracked unit — don't add the PR. Otherwise (dependency bumps, CI/build PRs) it belongs in the milestone; label it (one included label) and assign:

```bash
gh api repos/GitTools/actions/issues/<NUMBER> --method PATCH --field milestone=<MILESTONE_NUMBER>
```

A PR that closes an in-milestone issue must not be in the milestone itself (duplicate/unlabeled entry). Check and remove:

```bash
# For a suspect PR already in the milestone, is its closing target also in the milestone?
gh api graphql -f query='query($o:String!,$r:String!,$n:Int!){repository(owner:$o,name:$r){pullRequest(number:$n){closingIssuesReferences(first:20){nodes{number}}}}}' \
  -F o=GitTools -F r=actions -F n=<PR_NUMBER> --jq '[.data.repository.pullRequest.closingIssuesReferences.nodes[].number]'
# If it closes an in-milestone issue, drop the PR from the milestone:
gh api repos/GitTools/actions/issues/<PR_NUMBER> --method PATCH -f milestone=null
```

### Consolidated report + settle check

```text
Release Readiness: <TAG>
─────────────────────────────────────────────────────
✅/❌  Milestone <TAG> exists (N open, N closed)
✅/⚠️  Open items in milestone: N
✅/❌  ≥1 closed issue present (3c-bis)
✅/❌/⚠️  Every closed item has exactly one {6+build} label (N zero-label, N multi-label, N build-only)
✅/❌  No in-milestone PR closes an in-milestone issue (3d)
✅/⚠️  All merged PRs in milestone (N missing)
```

Hard blockers (❌) gate a full release; each maps to a GRM `create` failure.

**Settle check** — run after any milestone move/assignment and again before promoting. Count-equality (`milestone.closed_issues` vs listing length) is insufficient: GRM can read a partial listing while the counter is already correct. Compare the set of item numbers and require it stable across two reads:

```bash
snap(){ gh api "repos/GitTools/actions/issues?milestone=<MILESTONE_NUMBER>&state=closed&per_page=100" --paginate --slurp \
  | python3 -c "import sys,json;p=json.load(sys.stdin);print(sorted(i['number'] for pg in p for i in pg))"; }
A=$(snap); sleep 20; B=$(snap)
MILESTONE_CLOSED=$(gh api repos/GitTools/actions/milestones/<MILESTONE_NUMBER> --jq '.closed_issues')
python3 - "$A" "$B" "$MILESTONE_CLOSED" <<'PY'
import sys,ast
a,b,c=ast.literal_eval(sys.argv[1]),ast.literal_eval(sys.argv[2]),int(sys.argv[3])
print(f"listed={len(a)} stable={a==b} milestone.closed_issues={c}")
print("SAFE" if a==b and len(a)==c else "NOT SETTLED — wait 30-60s and re-check")
PY
```

Promote only when the set is stable (`A == B`) and its length equals `milestone.closed_issues`; otherwise wait 30–60s and repeat. Milestoning at merge time avoids the lag entirely.

---

## Phase 4 — Publish the release

Before creating/updating, check current state (a release may already exist — never blindly `gh release create` on top of it):

```bash
gh api repos/GitTools/actions/git/ref/tags/<TAG> 2>/dev/null && echo "TAG EXISTS" || echo "no tag"
gh api repos/GitTools/actions/releases/tags/<TAG> --jq '{id, prerelease, draft, discussion_url, name}' 2>/dev/null || echo "no release"
```

### 4a. Prerelease

If no release exists, create it as a prerelease and open the Announcements discussion (this is the discussion consumers watch, e.g. discussions/2033):

```bash
gh release create <TAG> --repo GitTools/actions --title "<TAG>" --prerelease \
  --discussion-category "Announcements" --target main
```

If a release already exists, update it to prerelease instead of creating:

```bash
gh release edit <TAG> --repo GitTools/actions --prerelease
```

Publishing/keeping it as a prerelease fires `prereleased` → `prerelease.yml`. Give the URL and go to Phase 5 (prerelease monitoring).

### 4b. Full release (promote in place)

**Only after Phase 3 blockers are clear and the settle check passes.** Promote the existing release from prerelease to full and ensure the Announcements discussion stays linked:

```bash
RELEASE_ID=$(gh api repos/GitTools/actions/releases/tags/<TAG> --jq '.id')
gh api repos/GitTools/actions/releases/$RELEASE_ID -X PATCH \
  -F prerelease=false -F make_latest=true -f discussion_category_name='Announcements'
```

(If no prerelease was cut first, create the full release directly — `gh api repos/GitTools/actions/releases -X POST -f tag_name='<TAG>' -f name='<TAG>' -F prerelease=false -f discussion_category_name='Announcements'`.)

Flipping to `prerelease=false` fires `released` → `release.yml`. Give the URL and go to Phase 5 (full-release monitoring).

> Do not run `release.yml`/`prerelease.yml` steps yourself and never re-trigger a publish by re-flipping the flag without asking — the Azure Marketplace push and downstream dispatches are one-way external actions.

**Re-run safety when `release.yml` fails.** Step order is: `Update Release Notes` (GRM create) → `Publish To Azure Marketplace` → `Add Assets` → `Close Release` → dispatches. The one-way steps are the Marketplace push and the dispatches.

- Failure at/before `Update Release Notes` with the later steps `skipped` (check `gh run view <ID> --json jobs`): nothing external ran. Fix the milestone, re-run the settle check, then `gh run rerun <ID> --failed`.
- Failure after the Marketplace push: do not re-run (it re-publishes). Fix forward and ask the user.

---

## Phase 5 — Monitor publishing

Monitor via the `loop` skill. **Targets depend on the release type** — poll only the ones that apply. Cross-check the actual workflow-run `conclusion`; never infer failure from elapsed time. A `failure` conclusion is surfaced immediately, not waited out.

**Prerelease targets:** `prerelease.yml` run · **`gittools.gittools-test`** extension version live · Announcements discussion created · `actions-test` example update (mode test).

**Full-release targets:** `release.yml` run · **`gittools.gittools`** extension version live · VSIX asset attached to the release · milestone notes filled & milestone closed · `actions` + `actions-test` example updates. (Moving the `v<Major>`/`v<Major>.<Minor>` branches is **not** monitored here — the skill performs it itself in Phase 6f after the release is verified.)

```text
Skill({
  skill: "loop",
  args: "Monitor the GitTools/actions <TYPE> of <TAG> (TYPE = prerelease | full release). Only poll targets that apply to this type and haven't resolved yet (drop each once terminal). Checks:
    - Workflow run (prerelease.yml for prerelease, release.yml for full):
      gh run list --repo GitTools/actions --limit 20 --json name,event,status,conclusion,createdAt --jq '[.[] | select(.name==\"prerelease\" or .name==\"release\")] | .[0:4]'
    - Azure Marketplace extension (prerelease → gittools.gittools-test; full → gittools.gittools). Base version must equal <VERSION>; marketplace version is <VERSION>.<date>:
      curl -s -X POST \"https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery\" -H \"Accept: application/json;api-version=7.2-preview.1\" -H \"Content-Type: application/json\" -d '{\"filters\":[{\"criteria\":[{\"filterType\":7,\"value\":\"<EXT_ID>\"}]}],\"flags\":914}' | python3 -c \"import sys,json; e=json.load(sys.stdin)['results'][0]['extensions'][0]; vs=[v['version'] for v in e['versions']]; w='<VERSION>'.split('.')[:3]; print('LIVE' if any(v.split('.')[:3]==w for v in vs) else 'not yet','latest='+vs[0])\"
    - (full only) VSIX asset:      gh release view <TAG> --repo GitTools/actions --json assets --jq '[.assets[].name]'
    - (full only) milestone closed: gh api repos/GitTools/actions/milestones/<MILESTONE_NUMBER> --jq '{state, closed_issues}'
    - Announcements discussion:     gh api repos/GitTools/actions/releases/tags/<TAG> --jq '.discussion_url'
    - Example updates: gh run list --repo GitTools/actions-test --limit 10 --json name,event,status,conclusion --jq '[.[] | select(.event==\"repository_dispatch\")] | .[0:3]'  ; (full only) gh run list --repo GitTools/actions --limit 10 --json name,event,status,conclusion --jq '[.[] | select(.name==\"Update examples version\")] | .[0:3]'
  Show a status table titled 'Release Publishing: <TAG> (<TYPE>)' with one row per applicable target: workflow / marketplace(<EXT_ID>) / vsix asset / milestone / discussion / examples — each 'done(<detail>)' | 'not yet (CI running)' | 'FAILED: <run url>'.
  Self-pace: long fallback (1200s) while the workflow is running and nothing resolved. If the workflow conclusion is 'failure', surface it next message with the run URL — do NOT auto-retry (one-way external actions); ask the user.
  Stop the loop (omit ScheduleWakeup) once every applicable target is terminal (resolved or failure reported)."
})
```

---

## Phase 6 — Verify the published artifacts

Run after the relevant workflow completes. Parallel checks, single consolidated report. **Which checks apply depends on the type.**

### 6a. Azure Marketplace extension (both types — pick the right extension)

`EXT_ID` = `gittools.gittools-test` for a prerelease, `gittools.gittools` for a full release. Marketplace version is `<VERSION>.<date>`, so match on the `<VERSION>` prefix:

```bash
EXT_ID=<gittools.gittools-test | gittools.gittools>
curl -s -X POST "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery" \
  -H "Accept: application/json;api-version=7.2-preview.1" -H "Content-Type: application/json" \
  -d "{\"filters\":[{\"criteria\":[{\"filterType\":7,\"value\":\"$EXT_ID\"}]}],\"flags\":914}" \
  | python3 -c "
import sys, json
e = json.load(sys.stdin)['results'][0]['extensions'][0]
vs = [v['version'] for v in e['versions']]
want = '<VERSION>'.split('.')[:3]
print('published' if any(v.split('.')[:3]==want for v in vs) else 'NOT FOUND', '- recent:', vs[:5])
"
```

✅ if a version whose base is `<VERSION>` is present; ❌ if not (check the `Publish To Azure Marketplace` step); ⏳ if the publish step succeeded but the gallery hasn't indexed yet.

If `curl` is blocked by a sandbox/hook, issue the same POST from a scripting runtime (Node `fetch`, `python3` + `urllib`) — same URL, headers, and body — and parse `results[0].extensions[0].versions[].version`.

### 6b. Announcements discussion (both types)

```bash
gh api repos/GitTools/actions/releases/tags/<TAG> --jq '{prerelease, discussion_url}'
```

✅ if `discussion_url` is set (points at an `Announcements` discussion). For a full release also confirm `prerelease == false`.

### 6c. Release notes + milestone (FULL release only — skip for prerelease, report ➖)

`prerelease.yml` doesn't run GitReleaseManager, so there are no generated notes/closed milestone to verify on a prerelease.

```bash
gh release view <TAG> --repo GitTools/actions --json body --jq '.body'      # non-empty, categorized, SHA256 section
gh api repos/GitTools/actions/milestones/<MILESTONE_NUMBER> --jq '{state, closed_issues}'   # expect state=closed
```

Reconcile rendered items vs milestone (catches the settle-lag dropped-item bug):

```bash
EXPECTED=$(gh api "repos/GitTools/actions/issues?milestone=<MILESTONE_NUMBER>&state=closed&per_page=100" \
  --jq '[.[] | select([.labels[].name] | index("build") | not)] | length')
RENDERED=$(gh release view <TAG> --repo GitTools/actions --json body --jq '.body' | grep -oE '[#!][0-9]+' | sort -u | wc -l | tr -d ' ')
echo "expected≈$EXPECTED  rendered=$RENDERED"
```

`RENDERED ≈ EXPECTED` → ✅. Far below → GRM read a stale listing. Re-run the settle check (Phase 3), then regenerate in place with the args CI's `gitreleasemanager/create` uses:

```bash
# install or upgrade to the version release.yml pins (versionSpec 0.20.x)
dotnet tool list --global | grep -q gitreleasemanager \
  && dotnet tool update --global GitReleaseManager.Tool --version 0.20.0 \
  || dotnet tool install --global GitReleaseManager.Tool --version 0.20.0
export PATH="$PATH:$HOME/.dotnet/tools"
# --targetDirectory is the repo root, so GitReleaseManager.yml is picked up
dotnet-gitreleasemanager create \
  --owner GitTools --repository actions \
  --token "$(gh auth token --hostname github.com)" \
  --targetDirectory "$(pwd)" \
  --milestone <TAG> --name <TAG>
```

`allow-update-to-published: true` lets it update the published release. Then re-reconcile.

`create` rebuilds the body without the SHA256 section (in CI that section is written by the `Add Assets` step). Re-append it afterward, verifying the hash against the attached asset:

```bash
gh release download <TAG> --repo GitTools/actions --pattern '*.vsix' --dir /tmp/relverify
SHA=$(shasum -a 256 /tmp/relverify/*.vsix | awk '{print $1}'); F=$(basename /tmp/relverify/*.vsix)
gh release view <TAG> --repo GitTools/actions --json body --jq '.body' > /tmp/body.md
printf '\n### SHA256 Hashes of the release artifacts\n- `%s\t- %s`\n' "$SHA" "$F" >> /tmp/body.md
gh release edit <TAG> --repo GitTools/actions --notes-file /tmp/body.md
```

### 6d. VSIX release asset (FULL release only — skip for prerelease, ➖)

```bash
gh release view <TAG> --repo GitTools/actions --json assets --jq '[.assets[].name]'
```

✅ if a `gittools.gittools-<VERSION>.<date>.vsix` asset is attached (the `Add Assets` step only runs on the full release).

### 6e. Example version pins bumped (FULL release only — ➖ for prerelease)

The full release dispatches `update-examples` to `GitTools/actions` → `examples-version.yml` rewrites pins and pushes to `main`:

```bash
gh run list --repo GitTools/actions --limit 10 --json name,status,conclusion,createdAt \
  --jq '[.[] | select(.name=="Update examples version")] | .[0:3]'
grep -rhoE 'gittools/actions/[a-z]+/[a-z]+@v[0-9.]+' docs 2>/dev/null | sort -u | head   # should read <TAG>
```

### 6f. Move the consumer branches — FINAL STEP (FULL release only)

**This is the last action of the release process, and it runs ONLY for a full release — never for a prerelease.** The two workflow files do not move these branches; this skill does. Do it only after the full release is published and 6a–6e look good, and only once the user has confirmed the release is correct.

Fast-forward `v<Major>` and `v<Major>.<Minor>` to the exact commit the `<TAG>` tag points at, so consumers pinned to `@v<Major>` / `@v<Major>.<Minor>` receive this release.

```bash
MAJOR=$(echo "<VERSION>" | cut -d. -f1)
MINOR=$(echo "<VERSION>" | cut -d. -f1,2)

# Resolve the tag to its commit SHA (dereference annotated tags).
REF=$(gh api repos/GitTools/actions/git/ref/tags/<TAG>)
TYPE=$(echo "$REF" | python3 -c "import sys,json; print(json.load(sys.stdin)['object']['type'])")
OBJ=$(echo "$REF"  | python3 -c "import sys,json; print(json.load(sys.stdin)['object']['sha'])")
if [ "$TYPE" = "tag" ]; then
  SHA=$(gh api repos/GitTools/actions/git/tags/$OBJ --jq '.object.sha')
else
  SHA=$OBJ
fi
echo "Release commit for <TAG>: $SHA"

# For each moving branch: update if it exists, create if it doesn't.
for BR in "v$MAJOR" "v$MINOR"; do
  if gh api "repos/GitTools/actions/git/ref/heads/$BR" >/dev/null 2>&1; then
    gh api "repos/GitTools/actions/git/refs/heads/$BR" -X PATCH -f sha="$SHA" -F force=true \
      --jq '"updated " + .ref + " -> " + .object.sha'
  else
    gh api repos/GitTools/actions/git/refs -X POST -f ref="refs/heads/$BR" -f sha="$SHA" \
      --jq '"created " + .ref + " -> " + .object.sha'
  fi
done
```

Then verify both now point at the release commit:

```bash
git ls-remote https://github.com/GitTools/actions "refs/tags/<TAG>^{}" "refs/heads/v$MAJOR" "refs/heads/v$MINOR"
```

✅ if `v<Major>` and `v<Major>.<Minor>` both equal the `<TAG>` commit. ❌ if either failed to move — surface it; consumers on the moving branch won't get the release until it's fixed. (`force=true` is used because a moving major/minor branch is repointed to each new release commit.)

> Moving a branch is a repo-mutating, outward-facing action. Confirm with the user before running 6f, and never run it for a prerelease.

### Verification report

```text
Release Verification: <TAG>  (<TYPE>)
─────────────────────────────────────────────────────
✅/❌/⏳  Azure Marketplace (<EXT_ID>)
✅/⚠️     Announcements discussion linked
✅/⚠️/➖  Release notes accurate + milestone closed     (➖ prerelease)
✅/❌/➖  VSIX asset attached                            (➖ prerelease)
✅/❌/➖  Example pins bumped to <TAG>                   (➖ prerelease)
✅/❌/➖  Moving branches vMAJOR / vMAJOR.MINOR moved (6f)(➖ prerelease)
```

⏳ = the publish step succeeded but the gallery/CDN hasn't indexed yet (clears in minutes — distinguish from ❌ by checking the workflow `conclusion`). For lingering ⏳, retry the still-pending 6a check on a short `loop` (120–180s), stopping after ~5 attempts with a link to the publish run. Flag any genuine ❌ immediately with the failing check and the run/log; never re-trigger a publish workflow without asking.

---

## Phase 7 — Final summary

Re-fetch current state rather than trusting earlier values:

```bash
gh release view <TAG> --repo GitTools/actions --json url,prerelease,discussion_url,assets --jq '{url, prerelease, discussion_url, assets: [.assets[].name]}'
gh api repos/GitTools/actions/milestones/<MILESTONE_NUMBER> --jq '{title, state, closed_issues}'
```

Present a scannable table. Mark anything incomplete (a moving branch not updated, a failed publish, notes not regenerated) distinctly from "still propagating."

```text
Release Summary: <TAG>  (prerelease | full release)
─────────────────────────────────────────────────────
Release:      https://github.com/GitTools/actions/releases/tag/<TAG>   (prerelease=true/false)
Discussion:   <Announcements discussion url>
Milestone:    https://github.com/GitTools/actions/milestone/<MILESTONE_NUMBER>  (open/closed, N items)
Azure MP:     <EXT_ID> <version> — published / pending indexing
VSIX asset:   <name> attached / ➖ (prerelease) / missing
Moving refs:  vMAJOR ✅  vMAJOR.MINOR ✅ / ➖ (prerelease) / ⚠️ not updated
Examples:     actions <run url> · actions-test <run url> / ➖ (prerelease)

Other issues/PRs touched:
- [#NUMBER](url) — relabeled <old> → <new> / moved into milestone / etc. (only non-obvious actions)
```

If this was a prerelease, remind the user the next step is **promoting to a full release** (Phase 4b) once they've validated the test extension. Keep this table updated in place if asked for status again later in the session.
