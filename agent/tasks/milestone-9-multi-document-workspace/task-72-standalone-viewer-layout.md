# Task 72: StandaloneViewer Layout Integration

**Milestone**: M9 | **Est**: 6h | **Depends**: task-68, task-69, task-70, task-71

## Objective

Wire workspace, tab bar, explorer, and single keyed `MarkdownViewer` into `StandaloneViewer` shell layout.

## Steps

1. Refactor `StandaloneViewer.tsx`:
   - Replace `useMarkdownDocument` with `useDocumentWorkspace`
   - Layout: `FileExplorer | (DocumentTabs + MarkdownViewer)`
2. Render `MarkdownViewer` with `key={activeTabId}` for Mermaid remount safety
3. Pass active tab `content`/`documentPath` using controlled-mode contract (`undefined` when no path)
4. Wire `useFolderBrowser` file selection → `openPathInTab`
5. Update `App.tsx` if header needs tab-aware title (optional)
6. CSS: `src/styles/` or Tailwind utilities for split pane

## Verification

- [ ] Full manual flow: open folder → click 3 files → 3 tabs
- [ ] Switch tabs preserves each document's content
- [ ] Export toolbar works per active tab
- [ ] No regression in empty state / first file open

## Acceptance

- [ ] `npm run typecheck` and `npm test` pass
- [ ] Existing E2E updated or marked for task-75
