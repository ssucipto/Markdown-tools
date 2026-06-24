# Task 70: Per-Tab File Open (DnD & Picker)

**Milestone**: M9 | **Est**: 5h | **Depends**: task-68, task-69

## Objective

FR-9.2, FR-9.3 — Load files into the **active tab** or a **specific tab** via drag-and-drop and file picker.

## Steps

1. Refactor `MarkdownViewer` DnD handlers to accept optional `onFileDrop(file)` callback (standalone workspace supplies loader)
2. Tab strip drop zone: on `drop`, load into tab under cursor or active tab
3. File picker (`📂`): loads into active tab only
4. Empty workspace: first drop/picker creates tab + loads
5. Preserve Tauri note: WKWebView may have empty `dataTransfer.files` — Rust path handled in task-73
6. Toast feedback per existing `useToast` patterns

## Verification

- [ ] Drop on viewer loads active tab
- [ ] Drop on tab bar loads targeted tab
- [ ] Non-`.md` files show warning toast
- [ ] Unit/integration test for drop → workspace state update

## Acceptance

- [ ] Controlled embed mode (`content` prop defined) does not use workspace DnD
- [ ] Pattern `controlled-content-undefined-not-empty` respected
