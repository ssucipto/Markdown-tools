---
created: 2026-06-14
---

# Task 30: MarkdownViewer Embed Props API

**Milestone**: M6 | **Est**: 6h | **Depends**: task-4, task-14

## Objective

Refactor `MarkdownViewer` from self-contained app to **controlled component** for visualizer embed. No internal `listDocs`/`readDoc` calls.

## Steps

1. Define `MarkdownViewerProps` in `src/types/viewer.ts`:
   - `content: string`
   - `documentPath?: string | null`
   - `files?: DocFile[]`
   - `onSelectFile?: (path: string) => void`
   - `loading?: boolean`
   - `showSidebar?: boolean`
   - `theme?: 'light' | 'dark'`
   - `initialFile?: string`
   - `initialAnchor?: string`
2. Export `DocFile` type matching visualizer `docs.ts` shape
3. Standalone app: wrapper provides DnD + file picker; passes props down
4. Remove any server-function imports from viewer component

## Acceptance

- [ ] Visualizer can render viewer with `files` from server + `content` from `readDoc` without forking component
