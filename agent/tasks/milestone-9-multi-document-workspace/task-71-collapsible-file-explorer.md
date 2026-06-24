# Task 71: Collapsible File Explorer Panel

**Milestone**: M9 | **Est**: 4h | **Depends**: task-68

## Objective

FR-9.4 — Shell-level `FileExplorer` (evolved from `FileSidebar`) — fully collapsible, lite/airy styling.

## Steps

1. Create `src/components/FileExplorer.tsx` (standalone shell only — **not** rendered inside `MarkdownViewer`):
   - Collapse toggle on right edge (chevron)
   - Width: `w-60` expanded → `w-0` collapsed (zero width, not icon sliver)
   - `data-testid="file-explorer"`, `data-testid="explorer-collapse-toggle"`
2. Persist `explorerCollapsed` in `localStorage` key `mdtools.explorer.collapsed`
3. **Lite styling**: zinc palette, sentence-case "Files" header (no uppercase), subtle row selection
4. File click → `openPathInTab` via props (wired in task-72)
5. Open Folder button in explorer header; keep toolbar 📁 as secondary until task-76
6. Hide entirely when viewer fullscreen (shell passes `hidden` — FR-9.9)

## Verification

- [ ] Collapse hides explorer completely; viewer expands
- [ ] Reload preserves collapsed state
- [ ] Folder file list works when expanded (FSA + webkitdirectory)
- [ ] Unit test: toggle + localStorage round-trip
- [ ] Does not render when used from embed `MarkdownViewer` path

## Acceptance

- [ ] No horizontal scroll on main layout at 1280px width
- [ ] `FileSidebar.tsx` retained for embed; `FileExplorer` is standalone shell component
