# Task 75: Tests, E2E & M9 Documentation Sync

**Milestone**: M9 | **Est**: 5h | **Depends**: task-72, task-73, task-74, task-76

## Objective

Expand E2E for tabs/explorer, sync user-facing docs and regression checklist. FR-9 is already in PRD (added at plan revision — verify traceability, do not duplicate).

## Steps

1. Verify `agent/design/requirements.md` FR-9 table matches implemented behaviour (audit-10 amendment)
2. E2E (`e2e/`): new tab, switch tab, collapse explorer, optional fullscreen tab bar visible (Playwright `data-testid`)
3. Update `docs/user-guide.md` — tabs, explorer collapse, keyboard shortcuts (Ctrl+T/W, `[`)
4. Update `docs/regression-checklist.md` — M9 verification rows including lite UI smoke
5. Update `docs/test-baseline.md` test counts
6. Update `agent/design/architecture.md` §Standalone shell for workspace layout
7. Run full gate: `npm test`, `npm run test:e2e`, `npm run typecheck`, `npm run lint`

## Verification

- [ ] ≥3 new E2E scenarios pass locally (`CI=true`)
- [ ] FR-9 rows in PRD match shipped features (traceability)
- [ ] User guide describes web + desktop tab workflow

## Acceptance

- [ ] Milestone M9 verification gate pass
- [ ] Ready for v0.5.0 CHANGELOG draft
- [ ] Mark AUDIT-010 carryovers verified where applicable
