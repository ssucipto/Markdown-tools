# Task 71: Collapsible File Explorer Panel

**Milestone**: M9 | **Est**: 4h | **Depends**: task-68

## Objective

FR-9.4 — Shell-level `FileExplorer` (evolved from `FileSidebar`) — fully collapsible, lite/airy styling.

## Steps

1. Create `src/components/FileExplorer.tsx` (standalone shell only — **not** rendered inside `MarkdownViewer`):
   - Collapse toggle on right edge (chevron)
   - Width: `w-60` expanded → `w-0` collapsed (zero width, not icon sliver)
   - `data-testid="file-explorer"`, `data-testid="explorer-collapse-toggle"`
2. Collapse state from workspace hook (`collapsed`, `onToggleCollapse`) — persisted via `setExplorerCollapsed`
3. Props: `files`, `selectedPath`, `onSelect`, `collapsed`, `onToggleCollapse`, `onOpenFolder`, `dark`, `hidden` (fullscreen)
4. **Lite styling**: zinc palette, sentence-case "Files" header (no uppercase), subtle row selection
5. File click → `onSelect(path)` (task-72 wires to `openPathInTab`)
6. Open Folder button in explorer header; keep toolbar 📁 as secondary until task-76

## Verification

- [ ] Collapse hides explorer completely; viewer expands
- [ ] Reload preserves collapsed state
- [ ] Folder file list works when expanded (FSA + webkitdirectory)
- [ ] Unit test: toggle + localStorage round-trip
- [ ] Does not render when used from embed `MarkdownViewer` path

## Acceptance

- [ ] No horizontal scroll on main layout at 1280px width
- [ ] `FileSidebar.tsx` retained for embed; `FileExplorer` is standalone shell component
