# Milestone 3b: Audit Remediation & Quality Gates

<!-- @acp.meta.milestone
topic: audit, remediation, quality, embed, coverage
description: Close audit #3 findings and carryovers before M4 and M6 embed cutover
tasks: task-39..task-48
spec: agent/design/requirements.md
status: completed
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Close all pending **AUDIT-003** carryovers and audit #3 recommendations so M1–M3 meet strict acceptance, embed bugs are fixed, and quality gates match industry practice.  
**Duration**: 1 week (before M4)  
**PRD phase**: Phase 1c — Audit remediation  
**Depends on**: M3 (implementation landed in v0.3.0)  
**Blocks**: Strict M3 sign-off, M6 visualizer cutover (embed bugs)

---

## Overview

Audit #3 found the viewer **usable** but **not strictly complete**: embed theme/toolbar bugs, duplicate anchor IDs, coverage below 60%, export untested, Lighthouse stub, missing lint/audit CI. This milestone addresses every **pending** item in `agent/memory/audit-carryovers.md` (AUDIT-003-*) plus industry hygiene from [audit-3](../reports/audit-3-m1-m3-implementation-review.md).

**M6 tasks 29–35 remain unchanged** — M3b fixes code quality; M6 delivers npm package and visualizer migration.

---

## Deliverables

1. Embed-safe `MarkdownViewer` (theme, toolbar, anchors, deep-link scroll) per ADR-007
2. Export pipeline + svg-to-png unit tests; ≥60% coverage on `src/markdown/*`
3. Automated Lighthouse performance gate (≥85)
4. ESLint + Prettier + `npm audit` in CI
5. Extended E2E (Mermaid SVG, export smoke)
6. Docs sync: README security, `identity.yml`, milestone acceptance checkboxes

---

## Success Criteria

- [x] All AUDIT-003 carryovers marked **addressed** in audit-carryovers.md
- [x] `npm test -- --coverage` ≥60% statements on `src/markdown/*`
- [x] No open high-severity bugs from audit #3 (B2–B4)
- [x] CI green: typecheck, unit, E2E, lint, audit (production deps)
- [x] PRD FR-8 quality requirements satisfied

---

## Audit traceability

| Carryover | Task |
|-----------|------|
| AUDIT-003-B2 | task-39 |
| AUDIT-003-B3 | task-40 |
| AUDIT-003-B4 | task-41 |
| AUDIT-003-G3, B5, B6 | task-42 |
| AUDIT-003-B7 (audit #3) | task-43 |
| AUDIT-003-G2 | task-44, task-45 |
| AUDIT-003-G4 | task-46 |
| Industry (ESLint, npm audit) | task-47 |
| E2E depth (audit #3) | task-48 |
| AUDIT-003-M6 | **M6** task-29–35 (unchanged) |

---

## Tasks

1. [Task 39](../tasks/milestone-3b-audit-remediation/task-39-embed-theme-contract.md) — Embed theme contract + ADR-007
2. [Task 40](../tasks/milestone-3b-audit-remediation/task-40-toolbar-has-document.md) — Toolbar / hasDocument embed fix
3. [Task 41](../tasks/milestone-3b-audit-remediation/task-41-anchor-id-dedup.md) — Unique heading anchor IDs
4. [Task 42](../tasks/milestone-3b-audit-remediation/task-42-drop-toast-code-escape.md) — Invalid drop toast + code copy escaping
5. [Task 43](../tasks/milestone-3b-audit-remediation/task-43-scoped-deep-link-scroll.md) — Scoped initialAnchor scroll
6. [Task 44](../tasks/milestone-3b-audit-remediation/task-44-export-unit-tests.md) — Export pipeline unit tests
7. [Task 45](../tasks/milestone-3b-audit-remediation/task-45-coverage-gate-svg-tests.md) — 60% markdown coverage + svg-to-png tests
8. [Task 46](../tasks/milestone-3b-audit-remediation/task-46-lighthouse-ci-gate.md) — Lighthouse CI ≥85
9. [Task 47](../tasks/milestone-3b-audit-remediation/task-47-eslint-prettier-audit-ci.md) — ESLint, Prettier, npm audit CI
10. [Task 48](../tasks/milestone-3b-audit-remediation/task-48-e2e-and-docs-sync.md) — E2E depth + docs/identity sync

**Next Milestone**: [M4 Enhanced Product](milestone-4-enhanced.md)  
**Blockers**: None — start immediately
