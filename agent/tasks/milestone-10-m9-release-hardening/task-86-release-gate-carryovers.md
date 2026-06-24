# Task 86: Release Gate & Carryover Verification

**Milestone**: M10 | **Est**: 3h | **Depends**: task-77..task-85 | **FR**: FR-10.10

## Objective

Re-run quality gates; close all M10 carryovers; confirm v0.5.x release-ready.

## Steps

1. `npm run test:all` or full gate: unit, e2e, lint, typecheck
2. `/acp-review --ci` — expect PASS, 0 HIGH
3. Update `agent/memory/audit-carryovers.md`: all CR-* and re-verified AUDIT-012 → addressed
4. Manual smoke: Tauri 3+ tabs, explorer collapse persists, PDF export still works
5. `agent/progress.yaml`: M10 complete, version 0.5.1, current_milestone updated
6. Optional: git tag `v0.5.1` after user approval

## Verification

- [ ] review-001 all findings closed or waived with ADR
- [ ] progress.yaml M10 10/10 tasks complete

## Acceptance

- [ ] M10 milestone success criteria all checked
- [ ] `current_blockers` cleared for review findings
