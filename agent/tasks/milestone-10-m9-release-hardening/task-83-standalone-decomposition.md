# Task 83: StandaloneViewer Decomposition

**Milestone**: M10 | **Est**: 4h | **Depends**: task-77 | **FR**: FR-10.7

## Objective

Reduce `StandaloneViewer.tsx` below ~350 lines by extracting cohesive subcomponents. Closes **CR-008**.

## Steps

1. Extract candidates (names flexible):
   - `WorkspaceShell` — layout grid (explorer | main)
   - `WorkspaceEmptyState` — no tabs / drop zone
   - `useWorkspaceKeyboard` — `[` toggle, optional Ctrl+T/W
   - `useTauriFileOpen` — listen `open-file-content`
2. Keep public API unchanged (`StandaloneViewer` default export)
3. Smoke test: existing E2E tabs.spec.ts passes without changes

## Verification

- [ ] `StandaloneViewer.tsx` ≤ 350 lines (or documented exception)
- [ ] `npm run test:e2e` passes

## Acceptance

- [ ] CR-008 closed or downgraded with measured line count
