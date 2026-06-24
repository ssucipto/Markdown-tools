# Milestone 10: M9 Release Hardening

<!-- @acp.meta.milestone
topic: remediation, review-001, quality-gate, m9-carryovers
description: Close review-001 HIGH/MEDIUM findings, shortcut debt, and verify all M9 carryovers
tasks: task-77..task-86
spec: agent/design/m10-m9-release-hardening.md
status: planned
updated: 2026-06-24
audit: review-001, audit-12
@acp.meta.end -->

**Goal**: Make v0.5.0 **release-ready** by resolving all open code-review findings, shortcut debt from M9 delivery, and re-verifying audit carryovers — without new product features.

**Duration**: 1 week  
**Target version**: 0.5.1 (patch) or finalize 0.5.0 after gate pass  
**Depends on**: M9 complete (commit `1098735`)  
**Audits**: [review-001](../reports/review-001.md), [audit-12](../reports/audit-12-m9-implementation.md)

---

## Why M10 (not amend M9 tasks)

M9 tasks 68–76 are **implemented**. Re-opening them would confuse progress history. M10 is a focused **remediation milestone** mapped 1:1 to review findings and known shortcuts.

---

## Deliverables

| # | Task | Focus |
|---|------|-------|
| 77 | Async file-read error handling | CR-001–003 |
| 78 | Desktop & lockfile version sync | CR-004, CR-011 |
| 79 | Workspace `useReducer` refactor | CR-005 |
| 80 | Tab accessibility (WAI-ARIA) | CR-006 |
| 81 | Test gaps: localStorage + E2E chevron | AUDIT-012-F5 depth, shortcut 11 |
| 82 | MarkdownViewer zinc leftovers | CR-007 partial, shortcut 8 |
| 83 | StandaloneViewer decomposition | CR-008 |
| 84 | Docs & design truth sync | shortcut 9–10, M9 success criteria |
| 85 | dompurify CVE remediation | CR-012 |
| 86 | Release gate + carryover verification | review-001 closeout |

---

## M9 amendment (documentation only)

Update [milestone-9](../milestones/milestone-9-multi-document-workspace.md):

- Meta `status: completed` (implementation landed)
- Success criteria: mark implemented items `[x]`; link deferred items → M10 tasks
- Note: functional FR-9.1–9.9 **shipped**; quality gate deferred to M10

---

## Success Criteria

- [ ] `npm test` + `npm run test:e2e` + `typecheck` + `lint` pass
- [ ] `/acp-review --ci` → PASS (0 HIGH)
- [ ] Manual: Tauri dev opens multi-tab; explorer collapse persists
- [ ] All `AUDIT-012-*` and `CR-*` carryovers verified or closed
- [ ] CHANGELOG 0.5.1 entry

---

## Tasks

1. [Task 77](../tasks/milestone-10-m9-release-hardening/task-77-async-file-read-errors.md)
2. [Task 78](../tasks/milestone-10-m9-release-hardening/task-78-desktop-version-sync.md)
3. [Task 80](../tasks/milestone-10-m9-release-hardening/task-80-tab-accessibility.md) — after 78
4. [Task 79](../tasks/milestone-10-m9-release-hardening/task-79-workspace-use-reducer.md) — after 77
5. [Task 81](../tasks/milestone-10-m9-release-hardening/task-81-test-gaps-explorer.md)
6. [Task 82](../tasks/milestone-10-m9-release-hardening/task-82-viewer-zinc-pass.md)
7. [Task 83](../tasks/milestone-10-m9-release-hardening/task-83-standalone-decomposition.md)
8. [Task 84](../tasks/milestone-10-m9-release-hardening/task-84-docs-design-sync.md)
9. [Task 85](../tasks/milestone-10-m9-release-hardening/task-85-dompurify-cve.md)
10. [Task 86](../tasks/milestone-10-m9-release-hardening/task-86-release-gate-carryovers.md)

**Order**: `77 → 78 → 80 → 79 → 81 → 82 → 83 → 84 → 85 → 86`
