# Task 72: StandaloneViewer Layout Integration

**Milestone**: M9 | **Est**: 7h | **Depends**: task-68, task-69, task-70, task-71

## Objective

Wire workspace, tab bar, shell-level explorer, and single keyed `MarkdownViewer` into `StandaloneViewer`. **Lift file list out of `MarkdownViewer`** for standalone (AUDIT-010-F2).

## Context

Today `FileSidebar` renders inside `MarkdownViewer` when `showSidebar && files.length` (`MarkdownViewer.tsx:376-378`). M9 requires explorer at **shell level** only. Embed consumers may still use `showSidebar` + `files` on `MarkdownViewer` directly.

## Steps

1. Refactor `StandaloneViewer.tsx`:
   - Replace `useMarkdownDocument` with `useDocumentWorkspace`
   - Layout: `FileExplorer | (DocumentTabs + MarkdownViewer)`
2. **Lift sidebar (critical)**:
   - Pass `showSidebar={false}` to `MarkdownViewer` in standalone (do not pass `files` for sidebar render)
   - Render `FileExplorer` only in `StandaloneViewer` with `folder.files` + `openPathInTab`
   - Leave `FileSidebar` inside `MarkdownViewer` for embed path when `showSidebar` prop true
3. Render `MarkdownViewer` with `key={activeTabId}` for Mermaid remount safety
4. Pass active tab `content`/`documentPath` using controlled-mode contract (`undefined` when no path)
5. Wire `useFolderBrowser` file selection → `openPathInTab` (not `selectPath`)
6. Merge or slim `App.tsx` header into tab row (full polish in task-76; structural merge here if trivial)
7. Fullscreen: hide shell `FileExplorer` when viewer fullscreen (`FR-9.9`)
8. CSS: split pane utilities; explorer collapse `w-0` transition

## Verification

- [ ] `FileSidebar` does **not** render in standalone when folder open (only `FileExplorer` at shell)
- [ ] Embed story unchanged: `showSidebar` + `files` still works on `MarkdownViewer` alone
- [ ] Full manual flow: open folder → click 3 files → 3 tabs
- [ ] Switch tabs preserves each document's content
- [ ] Export toolbar works per active tab (keyed `exportRef`)
- [ ] No regression in empty state / first file open

## Acceptance

- [ ] `npm run typecheck` and `npm test` pass
- [ ] Existing E2E updated or marked for task-75
- [ ] Matches design doc §Shell architecture table
