---
created: 2026-06-14
---

# Task 35: Cross-Repo Contract Tests

**Milestone**: M6 | **Est**: 4h | **Depends**: task-34

## Objective

Prevent drift between markdown-tools package and visualizer embed.

## Steps

1. Add contract test in Markdown-tools: export snapshot of `MarkdownViewerProps` types
2. Add visualizer CI step: install pinned `@markdown-tools/react`, run docs route smoke test
3. Document upgrade process when breaking props change (semver major)

## Acceptance

- [ ] CI fails if visualizer embed breaks against latest compatible package version
