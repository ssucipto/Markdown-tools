# Milestone 9: Multi-Document Workspace

<!-- @acp.meta.milestone
topic: tabs, multi-document, file-explorer, workspace
description: Tabbed multi-document editing with collapsible file explorer (web + desktop)
tasks: task-68..task-75
spec: agent/design/multi-document-workspace.md
status: planned
updated: 2026-06-24
@acp.meta.end -->

**Goal**: Let users work with **multiple markdown documents** via a tab bar and a **fully collapsible** left file explorer — in both browser and Tauri desktop builds.

**Duration**: 2–3 weeks  
**Target version**: 0.5.0 (minor — new features, backward compatible embed API)  
**PRD phase**: Phase 3 — workspace UX

---

## Deliverables

- Document workspace state (`useDocumentWorkspace`) with tab open/close/switch
- Tab bar UI (new tab, close, labels from filename, overflow scroll)
- Per-tab file open: drag-and-drop, file picker, folder explorer selection
- Collapsible file explorer panel (persist collapsed state in `localStorage`)
- `StandaloneViewer` layout refactor (explorer | tabs + viewer)
- Tauri: `open-file-content` opens new tab or focuses existing path
- Embed API unchanged; contract tests verify no regression
- FR-9.x requirements, user-guide, E2E tab/explorer scenarios

---

## Success Criteria

- [ ] Open 3+ `.md` files in tabs without losing prior tab content (web)
- [ ] Same tab workflow works in `npm run tauri:dev`
- [ ] Drop file on active tab and on tab strip loads correct tab
- [ ] File explorer collapses to zero width; toggle restores; survives page reload
- [ ] `@markdown-tools/react` embed props and contract tests unchanged
- [ ] New E2E: new tab, switch tab, collapse explorer (minimum 3 scenarios)

---

## Tasks

1. [Task 68](../tasks/milestone-9-multi-document-workspace/task-68-workspace-state-model.md) — Workspace state model & hook
2. [Task 69](../tasks/milestone-9-multi-document-workspace/task-69-tab-bar-ui.md) — Tab bar UI component
3. [Task 70](../tasks/milestone-9-multi-document-workspace/task-70-per-tab-file-open.md) — Per-tab DnD & file picker
4. [Task 71](../tasks/milestone-9-multi-document-workspace/task-71-collapsible-file-explorer.md) — Collapsible file explorer panel
5. [Task 72](../tasks/milestone-9-multi-document-workspace/task-72-standalone-viewer-layout.md) — StandaloneViewer layout integration
6. [Task 73](../tasks/milestone-9-multi-document-workspace/task-73-tauri-multi-tab-open.md) — Tauri multi-file tab behaviour
7. [Task 74](../tasks/milestone-9-multi-document-workspace/task-74-embed-backward-compat.md) — Embed API backward compatibility
8. [Task 75](../tasks/milestone-9-multi-document-workspace/task-75-tests-docs-fr9.md) — Tests, E2E, FR-9 docs

**Previous Milestone**: [M8 — M5 Remediation](milestone-8-m5-remediation.md)
