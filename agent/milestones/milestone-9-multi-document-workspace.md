# Milestone 9: Multi-Document Workspace

<!-- @acp.meta.milestone
topic: tabs, multi-document, file-explorer, workspace
description: Tabbed multi-document editing with collapsible file explorer (web + desktop)
tasks: task-68..task-76
spec: agent/design/multi-document-workspace.md
status: completed
updated: 2026-06-24
audit: audit-10-m9-multi-document-workspace-plan, audit-12-m9-implementation, review-001
@acp.meta.end -->

**Goal**: Let users work with **multiple markdown documents** via a tab bar and a **fully collapsible** left file explorer — in both browser and Tauri desktop builds — with a **lite, airy** shell UI.

**Duration**: 2–3 weeks  
**Target version**: 0.5.0 (minor — new features, backward compatible embed API)  
**PRD phase**: Phase 4 — workspace UX  
**Implementation**: commit `1098735` (2026-06-24)  
**Quality gate**: deferred to [M10 — Release Hardening](milestone-10-m9-release-hardening.md) (review-001, shortcut debt)  
**Audit**: [audit-10](../reports/audit-10-m9-multi-document-workspace-plan.md), [audit-11](../reports/audit-11-m9-pre-impl-readiness.md), [audit-12](../reports/audit-12-m9-implementation.md), [review-001](../reports/review-001.md)

---

## Deliverables

- Document workspace state (`useDocumentWorkspace`) with tab open/close/switch (FR-9.1, FR-9.5)
- Tab bar UI with lite/airy zinc styling (FR-9.1, FR-9.7)
- Per-tab file open: drag-and-drop, file picker, folder explorer selection (FR-9.2, FR-9.3)
- Shell-level collapsible file explorer — **lifted out of MarkdownViewer** for standalone (FR-9.4)
- `StandaloneViewer` layout refactor (explorer | tabs + viewer)
- Tauri: `open-file-content` opens new tab or focuses existing path (FR-9.6)
- Lite/airy visual system pass — merged chrome, reduced toolbar weight (FR-9.7, task-76)
- Embed API unchanged; contract tests verify no regression (FR-9.8)
- Fullscreen behaviour per design doc (FR-9.9)
- E2E tab/explorer scenarios; user-guide updates

---

## Success Criteria

- [x] Open 3+ `.md` files in tabs without losing prior tab content (web)
- [x] Same tab workflow works in `npm run tauri:dev`
- [x] Drop file on active tab and on tab strip loads correct tab
- [x] File explorer collapses to zero width; toggle restores; survives page reload
- [x] Shell feels lite/airy — single top chrome row, zinc tokens, minimal shadows *(MarkdownViewer internals → M10 task-82)*
- [x] Standalone does not render duplicate sidebar inside `MarkdownViewer`
- [x] `@markdown-tools/react` embed props and contract tests unchanged
- [x] New E2E: new tab, switch tab, collapse explorer (minimum 3 scenarios) *(chevron both ways → M10 task-81)*

**Post-ship quality** (M10): async error handling, Tauri version sync, tab a11y, useReducer, review-001 gate — see [milestone-10](milestone-10-m9-release-hardening.md).

---

## Tasks

1. [Task 68](../tasks/milestone-9-multi-document-workspace/task-68-workspace-state-model.md) — Workspace state model & hook
2. [Task 69](../tasks/milestone-9-multi-document-workspace/task-69-tab-bar-ui.md) — Tab bar UI component
3. [Task 70](../tasks/milestone-9-multi-document-workspace/task-70-per-tab-file-open.md) — Per-tab DnD & file picker
4. [Task 71](../tasks/milestone-9-multi-document-workspace/task-71-collapsible-file-explorer.md) — Collapsible file explorer (shell)
5. [Task 72](../tasks/milestone-9-multi-document-workspace/task-72-standalone-viewer-layout.md) — StandaloneViewer layout + sidebar lift
6. [Task 73](../tasks/milestone-9-multi-document-workspace/task-73-tauri-multi-tab-open.md) — Tauri multi-file tab behaviour
7. [Task 74](../tasks/milestone-9-multi-document-workspace/task-74-embed-backward-compat.md) — Embed API backward compatibility
8. [Task 76](../tasks/milestone-9-multi-document-workspace/task-76-shell-visual-lite-airy.md) — Lite/airy shell visual system
9. [Task 75](../tasks/milestone-9-multi-document-workspace/task-75-tests-docs-fr9.md) — Tests, E2E, docs sync (after 76)

**Task order note**: Implement 68 → 69 → 70 → 71 → 72 → 73 → 74 → **76** → 75.

**Previous Milestone**: [M8 — M5 Remediation](milestone-8-m5-remediation.md)
