---
created: 2026-06-14
audit_ref: audit-3 industry hygiene
---

# Task 47: ESLint, Prettier, npm audit CI

**Milestone**: M3b | **Est**: 3h | **Depends**: none

## Objective

Industry-standard lint/format and dependency audit in CI.

## Steps

1. Add ESLint 9 flat config + typescript-eslint + react-hooks
2. Add Prettier + format script; optional lint-staged (document only if skipped)
3. CI: `npm run lint`, `npm audit --audit-level=high` (fail or allowlist documented)
4. Fix critical lint issues in `src/`

## Acceptance

- [ ] `npm run lint` passes
- [ ] CI runs lint on PR
