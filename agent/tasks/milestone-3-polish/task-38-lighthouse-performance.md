---
created: 2026-06-14
---

# Task 38: Lighthouse Performance Verification

**Milestone**: M3 | **Est**: 2h | **Depends**: task-14

## Objective

Verify PRD success metric: Lighthouse Performance ≥ 85 on production build (audit AUDIT-001-F8).

## Steps

1. Add `lighthouse` CLI or `@lhci/cli` dev dependency
2. Script: build app, serve `dist/` preview, run Lighthouse on viewer route with sample doc loaded
3. Document baseline score in `agent/reports/` or README; fail CI if below 85 (optional threshold job)

## Acceptance

- [ ] Documented Lighthouse Performance score ≥ 85 on standard test doc
- [ ] Script reproducible via `npm run perf:check` (or documented manual steps)
