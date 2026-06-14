# Milestone 7: M4–M6 Audit Remediation & Production Readiness

<!-- @acp.meta.milestone
topic: audit-5, remediation, production-readiness, npm-publish, tauri
description: Close audit #5 findings and pending carryovers from M4–M6 implementation
tasks: task-49..task-60
spec: agent/reports/audit-5-m4-m5-m6-implementation.md
status: active
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Close all **AUDIT-005** carryovers and audit #5 recommendations so M4–M6 meet strict acceptance, the library build is shippable, and npm/visualizer cutover can proceed safely.  
**Duration**: 1–2 weeks  
**PRD phase**: Phase 2b — Post-M4/M5/M6 audit remediation  
**Depends on**: M4, M5, M6 (v0.4.0 landed in `cf33a3c`)  
**Blocks**: npm publish, ACPEnhanced-Visual migration (task-34 execution), production desktop UX

---

## Overview

Audit #5 found M4–M6 **functionally present** but **not production-ready**: `build:lib` fails, README stale, folder fallback broken on Firefox, KaTeX/DOCX/export gaps, Tauri single-instance missing, npm package misconfigured.

This milestone mirrors **M3b** pattern: targeted remediation before declaring phases complete.

---

## Deliverables

1. Working `npm run build:lib` + CI `lib-pack` green
2. npm publish-ready `@markdown-tools/react` (peer deps, exports, CSS)
3. Cross-browser folder browser + KaTeX security hardening
4. DOCX export parity with HTML export (tables, code, diagrams)
5. Tauri single-instance file open + hardened CSP/CLI
6. Expanded tests (unit, contract, E2E) + docs sync (README, PRD, milestones)
7. Audit #5 carryover verification pass

---

## Success Criteria

- [ ] All AUDIT-005 carryovers marked **addressed** in `audit-carryovers.md`
- [ ] `npm run build:lib` && `npm pack --dry-run` pass locally and in CI
- [ ] `npm test` && `npm run test:e2e` pass with new coverage for M4 paths
- [ ] README reflects v0.4.x+ and M7 remediation status accurately
- [ ] No open critical/high findings from audit #5
- [ ] Ready for `npm publish` and external visualizer migration

---

## Audit traceability

| Audit ID | Task(s) |
|----------|---------|
| AUDIT-005-C1 | task-49 |
| AUDIT-005-C3, AUDIT-001-F3 (partial) | task-51 |
| AUDIT-005-H6, C2, AUDIT-003-M6 | task-50 |
| AUDIT-005-H1 | task-52 |
| AUDIT-005-H2, H6, H7 | task-53 |
| AUDIT-005-H3 | task-54 |
| AUDIT-005-H5 | task-55 |
| AUDIT-005-H4 | task-56 |
| H9, M5, M6 (Tauri/CLI) | task-57 |
| H12, M8 | task-58 |
| M9, M4 tests | task-59 |
| All + carryover closure | task-60 |

---

## Tasks

1. [Task 49](../tasks/milestone-7-m4-m6-audit-remediation/task-49-fix-library-build.md) — Fix `build:lib` (vite-plugin-dts)
2. [Task 50](../tasks/milestone-7-m4-m6-audit-remediation/task-50-npm-publish-hygiene.md) — npm publish hygiene
3. [Task 51](../tasks/milestone-7-m4-m6-audit-remediation/task-51-docs-sync-v04.md) — Documentation sync
4. [Task 52](../tasks/milestone-7-m4-m6-audit-remediation/task-52-folder-browser-cross-browser.md) — Folder browser cross-browser
5. [Task 53](../tasks/milestone-7-m4-m6-audit-remediation/task-53-katex-pipeline-security.md) — KaTeX pipeline & lib CSS
6. [Task 54](../tasks/milestone-7-m4-m6-audit-remediation/task-54-view-source-export-fix.md) — View source export fix
7. [Task 55](../tasks/milestone-7-m4-m6-audit-remediation/task-55-docx-export-parity.md) — DOCX export parity
8. [Task 56](../tasks/milestone-7-m4-m6-audit-remediation/task-56-tauri-single-instance.md) — Tauri single-instance
9. [Task 57](../tasks/milestone-7-m4-m6-audit-remediation/task-57-tauri-cli-hardening.md) — Tauri CSP, CLI, versions
10. [Task 58](../tasks/milestone-7-m4-m6-audit-remediation/task-58-library-contract-ci.md) — Library contract & consumer CI
11. [Task 59](../tasks/milestone-7-m4-m6-audit-remediation/task-59-e2e-m4-expansion.md) — E2E expansion
12. [Task 60](../tasks/milestone-7-m4-m6-audit-remediation/task-60-audit5-verification.md) — Audit #5 verification

**Target release**: v0.4.1 (patch) or v0.5.0 (if breaking npm export changes)
