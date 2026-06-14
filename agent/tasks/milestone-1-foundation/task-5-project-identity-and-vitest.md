---
created: 2026-06-14
---

# Task 5: Project Identity and Vitest Setup

**Milestone**: M1 | **Estimated Time**: 2 hours | **Depends on**: task-1

## Objective

Update ACP identity, port Vitest setup from ACPEnhanced-Visual, configure coverage thresholds.

## Steps

1. Update `agent/core/identity.yml` for Markdown-tools stack
2. Port `test/setup.ts` and vitest config from source `vite.config.ts`
3. Port `docs-viewer.test.tsx` as skeleton → `test/components/markdown-viewer.test.tsx` (mock mermaid)
4. Set coverage thresholds: 40% global, 60% target for `src/markdown` by M2

## User-Observable Acceptance

- [ ] `npm test` runs with jsdom environment

## Verification

- [ ] `identity.yml` project name is `markdown-tools`

**Next Task**: task-6-sample-doc-fixtures.md
