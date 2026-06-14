# Task 7: Drag-and-Drop and File Picker

**Milestone**: M2 | **Est**: 4h | **Depends**: task-4, task-6

## Objective
Implement FR-1.1–1.3: drag `.md` onto viewer, drop overlay, reject non-md files.

## Steps
1. Port drag handlers from source `DocsViewer.tsx` (`dragOver`, `onDrop`, `droppedRef`)
2. Add “Open file” button using `<input type="file" accept=".md,.markdown">`
3. `FileReader.readAsText` → `useMarkdownDocument` hook
4. Full-screen drop overlay UI

## Acceptance
- [ ] Dropping `docs/sample-basic.md` renders content in browser
- [ ] Dropping `.txt` shows error toast
