---
created: 2026-06-14
audit_ref: AUDIT-003-G2
---

# Task 45: Coverage Gate + svg-to-png Tests

**Milestone**: M3b | **Est**: 3h | **Depends**: task-44

## Objective

Meet task-19/M3 target: ≥60% coverage on `src/markdown/*`.

## Steps

1. Update `vite.config.ts` thresholds: markdown/ statements ≥60
2. Add svg-to-png tests with mocked canvas/Image where feasible
3. Add parse edge-case tests (duplicate anchors post task-41)

## Acceptance

- [ ] `npm run test:coverage` passes thresholds
- [ ] `src/markdown/*` ≥60% statements
