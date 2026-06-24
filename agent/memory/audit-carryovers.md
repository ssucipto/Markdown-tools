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
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-5-m4-m5-m6-implementation
    planned_in: M7 task-49, task-50, task-58

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

  - finding_id: AUDIT-006-F1
    audit_ref: agent/reports/audit-6-m5-implementation.md
    severity: critical
    finding: 'node_modules' never installed — npm install was never executed
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: audit-7
    planned_in: M8 task-61

  - finding_id: AUDIT-006-F2
    audit_ref: agent/reports/audit-6-m5-implementation.md
    severity: high
    finding: Rust toolchain absent — cargo/rustc not on PATH
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: audit-7
    planned_in: M8 task-62

  - finding_id: AUDIT-006-F3
    audit_ref: agent/reports/audit-6-m5-implementation.md
    severity: high
    finding: Tauri CLI not available locally — @tauri-apps/cli not in node_modules/.bin/
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: audit-7
    planned_in: M8 task-61

  - finding_id: AUDIT-006-F4
    audit_ref: agent/reports/audit-6-m5-implementation.md
    severity: moderate
    finding: CLI launches dev server instead of built binary
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: audit-7
    planned_in: M8 task-63

  - finding_id: AUDIT-006-F5
    audit_ref: agent/reports/audit-6-m5-implementation.md
    severity: low
    finding: beforeDevCommand starts Vite dev server (expected but confusing)
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: audit-7
    planned_in: M8 task-63

  - finding_id: AUDIT-006-F6
    audit_ref: agent/reports/audit-6-m5-implementation.md
    severity: moderate
    finding: No audit report for M5 — milestone marked complete without audit trail
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: audit-7
    planned_in: M8 task-64

  - finding_id: AUDIT-002-F1
    audit_ref: agent/reports/audit-2-pre-impl-readiness.md
    severity: medium
    finding: Task-1 scaffold files exist but npm install/build not verified — node_modules absent
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-6, audit-7
    planned_in: M8 task-64
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
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-5-m4-m5-m6-implementation
    planned_in: M7 task-49, task-50, task-58

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
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: audit-5-m4-m5-m6-implementation
    planned_in: b8ee61c, cf33a3c

  - finding_id: AUDIT-005-C1
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: critical
    finding: npm run build:lib fails — vite-plugin-dts api-extractor error on playwright.config.ts path
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-49

  - finding_id: AUDIT-005-H1
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: high
    finding: Folder browser webkitdirectory fallback unreachable on Firefox/Safari — showOpenFolder gated on supportsFolderPicker
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-52

  - finding_id: AUDIT-005-H2
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: high
    finding: KaTeX preprocess corrupts math inside fenced code blocks; KaTeX CSS missing from library entry
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-53, task-50

  - finding_id: AUDIT-005-H3
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: high
    finding: View source mode breaks Word/DOCX/PDF export — contentRef shows raw pre not rendered article
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-54

  - finding_id: AUDIT-005-H4
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: high
    finding: Tauri file open only on cold start — no single-instance or open-while-running
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-56

  - finding_id: AUDIT-005-H5
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: high
    finding: DOCX export missing tables/code/images/KaTeX; duplicate mermaid content
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-55

  - finding_id: AUDIT-005-H6
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: high
    finding: npm package not publish-ready — private true, React in dependencies, embed-api docs mismatch
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-50

  - finding_id: AUDIT-005-C3
    audit_ref: agent/reports/audit-5-m4-m5-m6-implementation.md
    severity: critical
    finding: README stale at v0.3.1 / M4 next — conflicts with v0.4.0 implementation
    status: addressed
    fix_applied_date: 2026-06-14
    verified_in_audit: null
    planned_in: M7 task-51

  - finding_id: AUDIT-006-B1
    audit_ref: agent/reports/audit-6-visualizer-migration.md
    severity: high
    finding: "@markdown-tools/react not published to npm — visualizer must use npm link or file: dependency until npm publish"
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: null
    planned_in: npm publish manual step
    notes: >
      Package v0.4.2 fully ready for publish.
      - CHANGELOG, version bump, build:lib, npm pack --dry-run all verified
      - docs/visualizer-migration.md updated to ^0.4.2
      - User action: npm login && npm publish

  - finding_id: AUDIT-006-B2
    audit_ref: agent/reports/audit-6-visualizer-migration.md
    severity: high
    finding: "FR-7.8 visualizer cutover not executed — DocsViewer.tsx still in ACPEnhanced-Visual repo (external team)"
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: null
    planned_in: ACPEnhanced-Visual per docs/visualizer-migration.md
    notes: >
      Migration doc updated to ^0.4.2 with accurate install instructions
      (Option A: npm publish, Option B: npm link / file: dependency).
      Execute in ACPEnhanced-Visual repo per docs/visualizer-migration.md.

  - finding_id: AUDIT-006-D9
    audit_ref: agent/reports/audit-6-visualizer-migration.md
    severity: low
    finding: "task-34-visualizer-migration.md still references @markdown-tools/react ^0.1.0 instead of ^0.4.1"
    status: addressed
    fix_applied_date: 2026-06-21
    verified_in_audit: audit-7
    planned_in: M8 task-65
    notes: Updated to ^0.4.2

  - finding_id: AUDIT-008-F1
    audit_ref: agent/reports/audit-8-pdf-export-popup-blocked.md
    severity: critical
    finding: PDF export calls window.open() after await exportPdfDocument() — breaks browser user-gesture requirement; popup blocked even when popups are allowed (especially with Mermaid diagrams)
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-8
    planned_in: M9 or hotfix
    notes: openPdfPrintWindow() sync on click; populateAndPrintPdf after async prep

  - finding_id: AUDIT-008-F2
    audit_ref: agent/reports/audit-8-pdf-export-popup-blocked.md
    severity: medium
    finding: No unit or E2E test reproduces post-async popup blocking; E2E uses Mermaid-free basic.md
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-8
    planned_in: M9 or hotfix
    notes: test/lib/saveBlob.test.ts covers PDF window flow; E2E .doc label fixed

  - finding_id: AUDIT-008-F3
    audit_ref: agent/reports/audit-8-pdf-export-popup-blocked.md
    severity: low
    finding: Print window auto-closes after 500ms setTimeout — may interrupt print dialog; use afterprint event instead
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-8
    planned_in: M9 or hotfix
    notes: afterprint listener + 60s fallback in populateAndPrintPdf

  - finding_id: AUDIT-009-F1
    audit_ref: agent/reports/audit-9-doc-export-download-ux.md
    severity: high
    finding: .doc and .docx export show unconditional success toast after a.click() without verifying download/save succeeded — user cannot confirm file exists
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-9
    planned_in: M9 or hotfix
    notes: saveBlob + toastForSaveResult with saved/downloaded/cancelled/failed states

  - finding_id: AUDIT-009-F2
    audit_ref: agent/reports/audit-9-doc-export-download-ux.md
    severity: high
    finding: No Save As dialog for Word/DOCX export — silent blob download to browser Downloads only; no Tauri native save dialog
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-9
    planned_in: M9 or hotfix
    notes: showSaveFilePicker + Tauri plugin-dialog/fs for desktop

  - finding_id: AUDIT-009-F3
    audit_ref: agent/reports/audit-9-doc-export-download-ux.md
    severity: medium
    finding: Download anchor not appended to document.body; blob URL revoked after 1s — may cause silent download failures
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-9
    planned_in: M9 or hotfix
    notes: saveBlob appends anchor to body; revokes URL after 10s
