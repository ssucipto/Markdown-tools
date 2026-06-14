# Task 52: Folder Browser Cross-Browser

**Milestone**: M7 — Audit Remediation  
**Priority**: P1 (High)  
**Status**: pending  
**Estimated**: 4h  
**Audit**: AUDIT-005-H1

## Problem

Folder button hidden when `supportsFolderPicker` is false (`MarkdownViewer.tsx:371`). `webkitdirectory` fallback exists in hook but UI never exposes it on Firefox/Safari.

## Acceptance Criteria

- [ ] Folder open available on Firefox/Safari via `<input webkitdirectory>` fallback
- [ ] `showOpenFolder` not gated solely on File System Access API
- [ ] Unit tests for `useFolderBrowser` fallback path
- [ ] E2E or manual test note for non-Chromium browsers

## Implementation Notes

- Decouple `showOpenFolder` from `supportsFolderPicker`
- Use `supportsFolderPicker || supportsWebkitDirectory` for visibility
- Preserve Chrome/Edge native picker when available
