# Task 75: Tests, E2E & FR-9 Documentation

**Milestone**: M9 | **Est**: 5h | **Depends**: task-72, task-73, task-74

## Objective

Add FR-9 requirements to PRD, expand E2E for tabs/explorer, update user-guide and regression checklist.

## Steps

1. Add **FR-9 — Multi-document workspace** section to `agent/design/requirements.md`:
   - FR-9.1 Tab bar (new, close, switch)
   - FR-9.2 Per-tab file open (picker, DnD)
   - FR-9.3 Drop on tab strip targets specific tab
   - FR-9.4 Collapsible file explorer
   - FR-9.5 Embed API unchanged
2. E2E (`e2e/`): new tab, switch tab, collapse explorer (Playwright `data-testid`)
3. Update `docs/user-guide.md` — tabs, explorer collapse, keyboard shortcuts
4. Update `docs/regression-checklist.md` — M9 verification rows
5. Update `docs/test-baseline.md` test counts
6. Run full gate: `npm test`, `npm run test:e2e`, `npm run typecheck`, `npm run lint`

## Verification

- [ ] ≥3 new E2E scenarios pass locally (`CI=true`)
- [ ] PRD FR-9 table complete
- [ ] User guide describes web + desktop tab workflow

## Acceptance

- [ ] Milestone M9 verification gate pass
- [ ] Ready for v0.5.0 release note draft
