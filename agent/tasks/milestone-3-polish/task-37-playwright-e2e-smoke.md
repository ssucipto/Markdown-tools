---
created: 2026-06-14
---

# Task 37: Playwright E2E Smoke Tests

**Milestone**: M3 | **Est**: 5h | **Depends**: task-14

## Objective

Browser E2E smoke tests for PRD acceptance paths (audit AUDIT-001-F7).

## Steps

1. Add `@playwright/test` and `e2e/` directory
2. Smoke scenarios:
   - Load app, empty state visible
   - Drop or pick `docs/sample-basic.md`, heading renders
   - `docs/sample-mermaid.md` — at least one diagram SVG present
   - Export Word / PDF buttons trigger without console errors (mock print if needed)
3. Add `npm run test:e2e` script; include in CI (task-36 workflow update or task-25)

## Acceptance

- [ ] `npm run test:e2e` passes locally and in CI
