# Audit Carryovers
# Actionable findings from /acp-audit — pick up in future sessions
# Schema: finding_id, audit_ref, severity, finding, status, fix_applied_date, verified_in_audit, planned_in

carryovers:
  - finding_id: AUDIT-001-F1
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: critical
    finding: Add Milestone M6 (Visualizer Integration) and tasks for npm package + ACPEnhanced-Visual DocsViewer replacement
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-2-pre-impl-readiness
    planned_in: M6

  - finding_id: AUDIT-001-F2
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: critical
    finding: Create ADR-006 for @markdown-tools/react embed strategy; revise ADR-002 to allow npm publish (not one-way vendor copy only)
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-2-pre-impl-readiness
    planned_in: M6

  - finding_id: AUDIT-001-F3
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: high
    finding: Extend M1 task-1 or add task-29 for Vite library mode, package.json exports, peerDependencies before MarkdownViewer API freezes
    status: planned
    fix_applied_date: null
    verified_in_audit: audit-4-carryover-verification
    planned_in: M6 task-29

  - finding_id: AUDIT-001-F4
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: high
    finding: Document server-side doc adapter (listDocs/readDoc props) vs client FS folder browser — visualizer needs former, not task-20 alone
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-2-pre-impl-readiness
    planned_in: PRD FR-7

  - finding_id: AUDIT-001-F5
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: high
    finding: Add task for URL deep-link support (?file= & ?anchor=) for SourceLink parity with ACPEnhanced-Visual
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-43; M6 task-31 for URL routing

  - finding_id: AUDIT-001-F6
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: medium
    finding: Move CI pipeline (task-25) from M4 to M1/M2 — industry standard early CI
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-2-pre-impl-readiness
    planned_in: M1 task-36

  - finding_id: AUDIT-001-F7
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: medium
    finding: Add Playwright E2E smoke tests milestone task (drop, render mermaid, export buttons)
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-48

  - finding_id: AUDIT-001-F8
    audit_ref: agent/reports/audit-1-pre-impl-milestones-plan.md
    severity: medium
    finding: Add Lighthouse or perf verification task for PRD metric (≥85)
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-46

  - finding_id: AUDIT-002-F1
    audit_ref: agent/reports/audit-2-pre-impl-readiness.md
    severity: medium
    finding: Task-1 scaffold files exist but npm install/build not verified — node_modules absent
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-3-m1-m3-implementation-review
    planned_in: null

  - finding_id: AUDIT-002-F2
    audit_ref: agent/reports/audit-2-pre-impl-readiness.md
    severity: low
    finding: M1–M6 planning artifacts uncommitted — only f2ceca2 (28-task plan) in git
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-3-m1-m3-implementation-review
    planned_in: null

  - finding_id: AUDIT-003-B2
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: high
    finding: Theme toggle broken when theme prop is controlled — onToggleDark updates internalDark only
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-39

  - finding_id: AUDIT-003-B3
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: medium
    finding: Toolbar hidden when content prop set without documentPath — hasDocument requires both
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-40

  - finding_id: AUDIT-003-B4
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: medium
    finding: Duplicate heading IDs in addAnchors when headings share text — breaks TOC and deep-links
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-41

  - finding_id: AUDIT-003-G2
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: high
    finding: Test coverage 51% on src/markdown vs task-19/M3 target 60%; exportWord untested
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-44, task-45

  - finding_id: AUDIT-003-G3
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: medium
    finding: task-7 acceptance — no error toast when dropping non-.md files
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-42

  - finding_id: AUDIT-003-G4
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: medium
    finding: task-38 Lighthouse perf check is manual stub only — no automated ≥85 gate
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-46

  - finding_id: AUDIT-003-M6
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: high
    finding: M6 library package not implemented — no vite lib mode, peerDependencies, npm exports (blocks visualizer migration)
    status: planned
    fix_applied_date: null
    verified_in_audit: null
    planned_in: M6 task-29–35

  - finding_id: AUDIT-003-IND1
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: medium
    finding: No ESLint / Prettier / npm audit in CI — industry standard gap
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-47

  - finding_id: AUDIT-003-IND2
    audit_ref: agent/reports/audit-3-m1-m3-implementation-review.md
    severity: low
    finding: identity.yml version stale; unused useMarkdownDocument/useToast hooks
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-4-carryover-verification
    planned_in: M3b task-48

  - finding_id: AUDIT-004-OP1
    audit_ref: agent/reports/audit-4-carryover-verification.md
    severity: medium
    finding: M3b v0.3.1 remediation complete locally but uncommitted — git HEAD still b149606 (v0.3.0)
    status: pending
    fix_applied_date: null
    verified_in_audit: null
    planned_in: git commit v0.3.1
