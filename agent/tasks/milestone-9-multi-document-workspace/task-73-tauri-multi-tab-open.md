# Task 73: Tauri Multi-File Tab Behaviour

**Milestone**: M9 | **Est**: 3h | **Depends**: task-72

## Objective

Desktop parity: CLI launch, file association, drag-drop, and single-instance forward open the correct tab.

## Steps

1. Update `useTauriFileOpen` handler in `StandaloneViewer`:
   - Call `openPathInTab(path, content)` instead of `selectPath`
   - Focus existing tab when path already open
2. Verify `lib.rs` `emit_open_file` works with multi-tab (no Rust change expected)
3. Manual test: `markdown-tools open a.md` then `open b.md` while running
4. Document desktop tab behaviour in `docs/user-guide.md` (stub for task-75)

## Verification

- [ ] Second instance forwards file to new/focused tab
- [ ] Native drag-drop on window opens tab
- [ ] `cargo check` passes

## Acceptance

- [ ] No duplicate tabs for same filesystem path
- [ ] Window focus on file open from CLI
