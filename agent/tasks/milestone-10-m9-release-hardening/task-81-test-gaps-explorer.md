# Task 81: Test Gaps — localStorage & E2E Chevron

**Milestone**: M10 | **Est**: 3h | **Depends**: task-78, task-80 | **FR**: FR-10.5

## Objective

Deepen AUDIT-012-F5 fix (shallow UI-only test) and shortcut #11 (E2E uses toolbar ☰ not chevron).

## Steps

1. `useDocumentWorkspace.test.ts`: mock `localStorage`; assert `mdtools.explorer.collapsed` round-trip on `setExplorerCollapsed`
2. `file-explorer.test.tsx`: verify collapse button writes localStorage key
3. `e2e/tabs.spec.ts`: collapse via **chevron** (`data-testid` explorer-collapse); expand via chevron (not only toolbar ☰)
4. Update `docs/test-baseline.md` counts

## Verification

- [ ] localStorage persistence tested at hook level
- [ ] E2E: chevron collapse + expand both pass

## Acceptance

- [ ] AUDIT-012-F5 verification depth satisfied
- [ ] Shortcut #5, #11 resolved
