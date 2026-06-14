---
created: 2026-06-14
---

# Task 33: Publish @markdown-tools/react to npm

**Milestone**: M6 | **Est**: 3h | **Depends**: task-29, task-32, task-15

## Objective

Publish semver package; visualizer pins version in `package.json`.

## Steps

1. Finalize package name (`@markdown-tools/react` or scoped org name)
2. Add CHANGELOG.md, LICENSE, README package section
3. `npm publish --access public` (or GitHub Packages)
4. Tag release `v0.1.0` in git

## Acceptance

- [ ] `npm view @markdown-tools/react version` returns published version

**Note**: Requires M3 task-15 (DOMPurify) before production visualizer embed.
