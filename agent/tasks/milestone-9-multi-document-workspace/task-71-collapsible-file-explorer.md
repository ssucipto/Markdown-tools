# Task 71: Collapsible File Explorer Panel

**Milestone**: M9 | **Est**: 4h | **Depends**: task-68

## Objective

FR-9.4 — Evolve `FileSidebar` into a **fully collapsible** left file explorer with persisted collapse state.

## Steps

1. Create `src/components/FileExplorer.tsx` (or extend `FileSidebar`) with:
   - Collapse toggle on right edge (chevron)
   - Width transition: expanded (~240px) → collapsed (0, hidden)
   - `data-testid="file-explorer"`, `data-testid="explorer-collapse-toggle"`
2. Persist `explorerCollapsed` in `localStorage` key `mdtools.explorer.collapsed`
3. Hook `useExplorerCollapse()` or state in workspace shell
4. File click → `openPathInTab` (task-68) instead of single-doc `selectPath`
5. Open Folder button: visible in toolbar or explorer header (existing `useFolderBrowser`)

## Verification

- [ ] Collapse hides explorer completely; viewer expands
- [ ] Reload preserves collapsed state
- [ ] Folder file list still works when expanded
- [ ] Unit test: toggle + localStorage round-trip

## Acceptance

- [ ] No horizontal scroll on main layout at 1280px width
- [ ] Explorer works with FSA and webkitdirectory fallback (unchanged)
