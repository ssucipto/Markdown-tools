# Task 79: Workspace useReducer Refactor

**Milestone**: M10 | **Est**: 4h | **Depends**: task-77 | **FR**: FR-10.3

## Objective

Replace `setActiveTabId` inside `setTabs` updater with a single `useReducer` for workspace state. Closes **CR-005**.

## Steps

1. Define `workspaceReducer` in `useDocumentWorkspace.ts` with typed actions
2. Migrate `openTab`, `closeTab`, `setActiveTab`, `loadIntoActiveTab`, `openPathInTab`, `setExplorerCollapsed`
3. Ensure existing unit tests pass without behaviour change
4. Add test: close active tab activates neighbour atomically (no intermediate invalid state)

## Verification

- [ ] No `setState` calls inside other `setState` updaters
- [ ] `test/hooks/useDocumentWorkspace.test.ts` green

## Acceptance

- [ ] CR-005 closed
