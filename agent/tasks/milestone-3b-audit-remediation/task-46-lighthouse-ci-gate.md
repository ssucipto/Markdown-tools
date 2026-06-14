---
created: 2026-06-14
audit_ref: AUDIT-003-G4
---

# Task 46: Lighthouse CI Performance Gate

**Milestone**: M3b | **Est**: 4h | **Depends**: task-40

## Objective

Replace `scripts/lighthouse-check.mjs` stub with automated ≥85 Performance check.

## Steps

1. Add `@lhci/cli` or lighthouse CI script
2. Build + preview; run against `/` with sample doc loaded (e2e helper or static fixture route)
3. Fail CI if Performance < 85 (document baseline in report)
4. Update task-38 acceptance as superseded by this task

## Acceptance

- [ ] CI job `lighthouse` runs on PR
- [ ] Documented score ≥85 or waiver with issue link
