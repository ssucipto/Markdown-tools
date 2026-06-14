# Task 56: Tauri Single-Instance File Open

**Milestone**: M7 — Audit Remediation  
**Priority**: P1 (High)  
**Status**: pending  
**Estimated**: 4h  
**Audit**: AUDIT-005-H4

## Problem

Opening `.md` via OS file association only works on cold start; second instance does not forward file to running app.

## Acceptance Criteria

- [ ] `tauri-plugin-single-instance` integrated (Tauri 2)
- [ ] Second launch forwards path to first window via `open-file-content` event
- [ ] `useTauriFileOpen` handles both argv and single-instance payload
- [ ] Manual test: double-click `.md` while app running loads new file
- [ ] Document behavior in README Tauri section

## Implementation Notes

- `src-tauri/Cargo.toml` add plugin
- `src-tauri/src/lib.rs` register single-instance callback
- Align with existing `open-file-content` frontend listener
