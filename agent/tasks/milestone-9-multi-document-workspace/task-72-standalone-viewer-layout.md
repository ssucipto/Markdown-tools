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
   - Pass `showSidebar={false}` and omit `files`/`onSelectFile` for sidebar in standalone
   - Render `FileExplorer` in shell with `selectedPath={activeTab?.documentPath ?? null}`
   - Wire `onFileDrop` on `MarkdownViewer` → workspace `loadIntoActiveTab`
3. **Always controlled**: pass `content`/`documentPath`/`rawMarkdown` from active tab only (`undefined` when no active tab or empty tab)
4. Render `MarkdownViewer` with `key={activeTabId}` when tab active; omit viewer when `tabs.length === 0` (shell `EmptyState` instead)
5. Add `onFullscreenChange` handler on `MarkdownViewer` → shell state to hide `FileExplorer` (FR-9.9)
6. Wire `useFolderBrowser` file selection → `openPathInTab`
7. Remove `App.tsx` header bar; brand lives in `DocumentTabs` (structural); visual polish in task-76
8. Layout: `flex flex-col min-h-screen` — workspace fills viewport (`h-screen` or `flex-1`), no `calc(100vh-2rem)` offset

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
