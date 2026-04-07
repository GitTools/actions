# Prepare Release

Prepare a GitHub release after confirming the target version and release type.

## Requirements

1. Describe the release workflow before taking action:
   - Confirm whether the release should be published as a prerelease or a release.
   - After the release type is confirmed, check for an open milestone that is a concrete version and not a spec milestone such as `4.x` or `4.5.x`.
   - If a valid open milestone exists, ask the user to confirm that version with a yes/no question.
   - If no valid open milestone exists, require the user to provide the release version.
   - Verify whether the tag already exists.
   - Create the GitHub release with the title set to the version.
2. Ask the user for both:
   - Release type: prerelease or release
   - Release version (or milestone confirmation yes/no when a valid milestone exists)
3. Use the release version as both:
   - Tag name
   - Release title
4. If the user selects prerelease:
   - Create the release with the prerelease flag enabled.
5. If the user selects release:
   - Create the release without the prerelease flag.
6. Treat milestone titles such as `v4.x` or `v4.5.x` as spec milestones and do not suggest them as the release version.
7. Keep the response concise and operational.

## Operational Steps

1. Ask:
   - Is this a prerelease or a release?

Ask for the release type first.

After release type is selected, check open milestones before asking for a version.

1. Summarize the plan:
   - Confirm whether this should be a prerelease or a release.
   - Inspect open milestones and find the latest concrete version milestone.
   - If found, ask the user to confirm that version with yes/no.
   - If not found, ask the user to provide a release version.
   - Verify whether the tag already exists.
   - Create the GitHub release using the version as the tag and title.
   - Apply the prerelease flag only when requested.

2. After the release type is selected, inspect open milestones and find the latest non-spec milestone:

```bash
gh api repos/{owner}/{repo}/milestones --paginate --jq '.[] | select(.state == "open") | .title'
```

Suggestion rules:

- Exclude milestone titles that match spec patterns such as `v4.x` or `v4.5.x`.
- Prefer the latest milestone that looks like a concrete release version such as `v4.5.0`.
- If a valid milestone exists, ask: `Use <MILESTONE_VERSION> as the release version? (yes/no)`.
- If the answer is yes, use that version.
- If the answer is no, ask the user to provide the release version explicitly.
- If no valid milestone exists, ask the user to provide the release version explicitly.

1. Confirm release version:

- Ensure a final release version is confirmed from either:
  - Milestone confirmation (yes), or
  - User-provided version.

1. Check whether the tag already exists:

```bash
gh api repos/{owner}/{repo}/git/ref/tags/<RELEASE_VERSION>
```

If the tag already exists, proceed only if that is intentional for the repository workflow.

1. Create the release:

Prerelease:

```bash
gh release create <RELEASE_VERSION> --repo {owner}/{repo} --title '<RELEASE_VERSION>' --prerelease
```

Release:

```bash
gh release create <RELEASE_VERSION> --repo {owner}/{repo} --title '<RELEASE_VERSION>'
```

1. Report:

- Release version
- Release type
- Whether a valid milestone version was found
- Whether the milestone version was confirmed (yes/no)
- Whether the version was milestone-confirmed or user-provided
- Whether the tag already existed
- Whether the GitHub release was created successfully
