# M9 Release Hardening — Design

**Status**: approved (plan 2026-06-24)  
**Milestone**: M10  
**Target version**: 0.5.1 (patch — quality/remediation only)  
**Sources**: review-001, audit-12, M9 shortcut retrospective

---

## Problem

M9 (v0.5.0) delivered multi-document tabs and collapsible explorer, but post-implementation audits found:

1. **review-001** — 4 HIGH (unhandled async, Tauri version drift), 6 MEDIUM
2. **Shortcuts** — shallow tests, partial lite UI, docs/design drift, monolithic commit
3. **Carryovers** — AUDIT-012 marked addressed; some fixes were UI-level only (localStorage untested)

M9 functional scope is **done**; M10 closes quality gates before tagging v0.5.0 desktop and npm publish.

---

## Scope

| In M10 | Out of M10 |
|--------|------------|
| Error handling on all file-read paths | New tab features (split view, dirty state) |
| Tauri/package version alignment | MarkdownViewer full decomposition (optional stretch) |
| Workspace `useReducer` refactor | `noUncheckedIndexedAccess` tsconfig (future) |
| Tab WAI-ARIA pattern | npm publish execution |
| Test + E2E gaps | Visualizer migration (M6 cross-repo) |
| Docs/design status sync | |
| dompurify CVE patch verify | |

---

## Traceability matrix

| Source ID | M10 Task | FR |
|-----------|----------|-----|
| CR-001–003 | task-77 | FR-10.1 |
| CR-004, CR-011 | task-78 | FR-10.2 |
| CR-005 | task-79 | FR-10.3 |
| CR-006 | task-80 | FR-10.4 |
| AUDIT-012-F5 gap, shortcut 5/11 | task-81 | FR-10.5 |
| CR-007, shortcut 8 | task-82 | FR-10.6 |
| CR-008 | task-83 | FR-10.7 |
| shortcut 9–10 | task-84 | FR-10.8 |
| CR-012 | task-85 | FR-10.9 |
| review-001 gate | task-86 | FR-10.10 |

---

## Task order (mandatory)

```
77 → 78 → 80 → 79 → 81 → 82 → 83 → 84 → 85 → 86
```

Parallel allowed: 78 + 80 after 77 starts; 82 + 85 while 79 runs.

---

## Success criteria

- [x] `/acp-review --ci` passes (0 HIGH findings)
- [x] `tauri.conf.json` version matches `package.json` 0.5.x
- [x] All file-read failures show toast (no unhandled rejections)
- [x] Tab keyboard navigation works (Arrow keys + focus)
- [x] `mdtools.explorer.collapsed` unit-tested
- [x] E2E: explorer collapse via chevron both directions
- [x] M9 design doc status `implemented`; success criteria checked
- [x] review-001 carryovers logged and verified closed

---

## Related

- agent/reports/review-001.md
- agent/reports/audit-12-m9-implementation.md
- agent/design/multi-document-workspace.md
