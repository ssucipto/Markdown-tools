# Task 50: npm Publish Hygiene

**Milestone**: M7 — Audit Remediation  
**Priority**: P0 (Critical)  
**Status**: pending  
**Estimated**: 3h  
**Audit**: AUDIT-005-C2, AUDIT-005-H6, AUDIT-005-H10, AUDIT-005-H11, AUDIT-003-M6

## Problem

Package marked `"private": true` while task-33 marked done; React in `dependencies` not `peerDependencies`; `embed-api.md` may not match exports.

## Acceptance Criteria

- [ ] `react` and `react-dom` in `peerDependencies` with compatible ranges
- [ ] `private` removed or gated behind explicit publish script (document choice)
- [ ] `package.json` `exports` map matches `src/index.ts` public API
- [ ] `files` field includes only distributable artifacts
- [ ] `prepack` runs `build:lib`
- [ ] `docs/embed-api.md` synced with actual props and CSS import path
- [ ] `npm pack --dry-run` shows no dev/test files

## Verification

```bash
npm run build:lib
npm pack --dry-run
```
