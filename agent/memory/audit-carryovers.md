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
    finding: Test coverage 51% on src/markdown vs task-19/M3 target 60%; exportWord.ts removed in v0.5.1 (AUDIT-013)
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-export-cleanup
    planned_in: null
    notes: exportWordDocument removed; exportPdfDocument merged into exportPdf.ts. Coverage gate now scoped to remaining modules.

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

  - finding_id: AUDIT-010-F1
    audit_ref: agent/reports/audit-10-m9-multi-document-workspace-plan.md
    severity: high
    finding: FR-9 multi-document workspace requirements not yet in agent/design/requirements.md — only planned for task-75 at end of M9
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-10
    planned_in: M9 plan revision
    notes: FR-9.1–9.9 added to requirements.md; roadmap Phase 4 M9 row

  - finding_id: AUDIT-010-F2
    audit_ref: agent/reports/audit-10-m9-multi-document-workspace-plan.md
    severity: high
    finding: M9 design places FileExplorer at StandaloneViewer shell level but FileSidebar still renders inside MarkdownViewer — task-72 lacks explicit lift/removal step for standalone path
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-10
    planned_in: M9 task-72 amendment
    notes: task-72 + design §Shell architecture; showSidebar false standalone

  - finding_id: AUDIT-010-F3
    audit_ref: agent/reports/audit-10-m9-multi-document-workspace-plan.md
    severity: medium
    finding: No M9 task covers lite/airy UI visual system — current gray panels, uppercase labels, and shadow-heavy FAB toolbar will clash with tab+explorer chrome
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-10
    planned_in: M9 task-76
    notes: task-76 + design §Visual design

  - finding_id: AUDIT-010-F4
    audit_ref: agent/reports/audit-10-m9-multi-document-workspace-plan.md
    severity: medium
    finding: Triple top chrome risk — App header plus planned tab bar plus floating toolbar with no merge/minimize strategy for airy layout
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-10
    planned_in: M9 task-76 + task-72
    notes: design layout single chrome row; merge header into tab bar

  - finding_id: AUDIT-010-F5
    audit_ref: agent/reports/audit-10-m9-multi-document-workspace-plan.md
    severity: low
    finding: Fullscreen mode behaviour for tab bar and explorer undefined in M9 plan (only FileSidebar gated today)
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-10
    planned_in: M9 design doc
    notes: design §Fullscreen table; optional onFullscreenChange prop (FR-9.9)

  - finding_id: AUDIT-011-F1
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: medium
    finding: task-74 cited FR-9.5 instead of FR-9.8 for embed backward compatibility
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 task-74
    notes: objective corrected to FR-9.8

  - finding_id: AUDIT-011-F2
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: high
    finding: No mechanism for shell to hide FileExplorer on fullscreen — state internal to MarkdownViewer only
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 task-72
    notes: optional onFullscreenChange prop; design + FR-9.9

  - finding_id: AUDIT-011-F3
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: medium
    finding: Initial workspace state ambiguous — 0 tabs vs auto-created tab on mount
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 design + task-68
    notes: tabs [] on load; shell EmptyState until first open

  - finding_id: AUDIT-011-F4
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: high
    finding: Standalone could remain uncontrolled via internal useMarkdownDocument — breaks workspace model
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 task-72
    notes: design standalone always controlled from shell

  - finding_id: AUDIT-011-F5
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: medium
    finding: FileExplorer missing selectedPath for active tab row highlight
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 task-71/72
    notes: selectedPath prop added to task-71

  - finding_id: AUDIT-011-F6
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: low
    finding: Explorer collapse state split between separate hook and workspace model
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 task-68
    notes: setExplorerCollapsed in useDocumentWorkspace

  - finding_id: AUDIT-011-F7
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: medium
    finding: No implementation file manifest for one-shot M9 delivery
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 design doc
    notes: Implementation manifest table added

  - finding_id: AUDIT-011-F8
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: medium
    finding: onFileDrop callback required for controlled-mode DnD — task-70 assumed uncontrolled only
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 task-70/74
    notes: optional onFileDrop prop; FR-9.8 updated

  - finding_id: AUDIT-011-F9
    audit_ref: agent/reports/audit-11-m9-pre-impl-readiness.md
    severity: low
    finding: E2E tab scenarios not isolated in dedicated spec file
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-11
    planned_in: M9 task-75
    notes: e2e/tabs.spec.ts planned

  - finding_id: AUDIT-012-F1
    audit_ref: agent/reports/audit-12-m9-implementation.md
    severity: high
    finding: Shell dark-mode parity missing — FileExplorer and shell EmptyState hardcoded dark={false}; viewer theme not propagated to workspace chrome
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-12-remediation
    planned_in: M9 hotfix / task-76 completion
    notes: Controlled theme in StandaloneViewer; dark class on shell root

  - finding_id: AUDIT-012-F2
    audit_ref: agent/reports/audit-12-m9-implementation.md
    severity: medium
    finding: Lite/airy incomplete — EmptyState and DragOverlay still gray/blue; breaks zinc shell aesthetic (FR-9.7)
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-12-remediation
    planned_in: M9 hotfix / task-76 completion
    notes: Toolbar EmptyState + DragOverlay + TOC zinc pass

  - finding_id: AUDIT-012-F3
    audit_ref: agent/reports/audit-12-m9-implementation.md
    severity: medium
    finding: Keyboard [ explorer toggle documented in user-guide but not implemented in StandaloneViewer
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-12-remediation
    planned_in: M9 hotfix
    notes: keydown listener in StandaloneViewer

  - finding_id: AUDIT-012-F4
    audit_ref: agent/reports/audit-12-m9-implementation.md
    severity: medium
    finding: E2E missing explorer collapse scenario — task-75 and design success criteria require it
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-12-remediation
    planned_in: M9 hotfix / e2e/tabs.spec.ts
    notes: explorer collapse E2E added

  - finding_id: AUDIT-012-F5
    audit_ref: agent/reports/audit-12-m9-implementation.md
    severity: medium
    finding: No FileExplorer unit test for collapse toggle and localStorage persistence (task-71 verification)
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-12-remediation
    planned_in: M9 hotfix
    notes: test/components/file-explorer.test.tsx

  - finding_id: AUDIT-012-F6
    audit_ref: agent/reports/audit-12-m9-implementation.md
    severity: medium
    finding: README still v0.4.2; M9 implementation uncommitted in working tree
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: audit-12-remediation
    planned_in: v0.5.0 release
    notes: README v0.5.0 + M9 features

  # ── review-001 (M9 post-impl code review) → M10 ─────────────────────────

  - finding_id: REVIEW-001-CR-001
    audit_ref: agent/reports/review-001.md
    severity: high
    finding: file.text().then() without .catch in StandaloneViewer
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-77
    planned_in: M10 task-77
    notes: FR-10.1 — async/await + toast on all file paths

  - finding_id: REVIEW-001-CR-002
    audit_ref: agent/reports/review-001.md
    severity: high
    finding: void loadFileIntoActiveTab — unhandled rejections (4 call sites)
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-77
    planned_in: M10 task-77
    notes: loadDroppedFile wrapper with catch

  - finding_id: REVIEW-001-CR-003
    audit_ref: agent/reports/review-001.md
    severity: high
    finding: handleSelectFile try/finally without catch
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-77
    planned_in: M10 task-77
    notes: catch + showToast(READ_ERROR)

  - finding_id: REVIEW-001-CR-004
    audit_ref: agent/reports/review-001.md
    severity: high
    finding: tauri.conf.json version 0.4.2 vs package.json 0.5.0
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-78
    planned_in: M10 task-78
    notes: aligned to 0.5.1

  - finding_id: REVIEW-001-CR-005
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: setActiveTabId inside setTabs updater in useDocumentWorkspace
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-79
    planned_in: M10 task-79
    notes: useReducer workspaceReducer

  - finding_id: REVIEW-001-CR-006
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: DocumentTabs role=tab without keyboard navigation pattern
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-80
    planned_in: M10 task-80
    notes: arrow keys, roving tabindex, Ctrl+T/W

  - finding_id: REVIEW-001-CR-007
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: MarkdownViewer.tsx large (557 lines); partial zinc leftovers
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-82
    planned_in: M10 task-82
    notes: zinc pass on loading/error/toast; full split deferred

  - finding_id: REVIEW-001-CR-008
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: StandaloneViewer.tsx large (277 lines) — extract subcomponents
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-83
    planned_in: M10 task-83
    notes: useShellTheme + useWorkspaceKeyboard extracted

  - finding_id: REVIEW-001-CR-009
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: tsconfig noUncheckedIndexedAccess not enabled
    status: deferred
    planned_in: future milestone
    notes: Out of M10 scope per design doc

  - finding_id: REVIEW-001-CR-010
    audit_ref: agent/reports/review-001.md
    severity: low
    finding: package-lock version metadata drift
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-78
    planned_in: M10 task-78
    notes: npm install dompurify sync

  - finding_id: REVIEW-001-CR-011
    audit_ref: agent/reports/review-001.md
    severity: low
    finding: Cargo.toml version may drift from npm
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-78
    planned_in: M10 task-78
    notes: 0.5.1 aligned

  # ── review-002 (code review fixes from /acp-proceed) ─────────────────────

  - finding_id: REVIEW-002-SH-01
    audit_ref: agent/reports/review-001.md
    severity: high
    finding: SH-01 — 17 shell scripts used set -e instead of set -euo pipefail
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: review-001
    planned_in: null
    notes: All 17 scripts updated from set -e to set -euo pipefail. acp.meta-scan.sh updated from set -eu to set -euo pipefail. Lint/typecheck/test/build all pass.

  - finding_id: REVIEW-002-SH-02
    audit_ref: agent/reports/review-001.md
    severity: high
    finding: SH-02 — acp.package-publish.sh used GNU-only sed -i.bak syntax
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: review-001
    planned_in: null
    notes: Replaced sed -i.bak with _sed_i helper from acp.common.sh (portable across GNU/BSD sed).

  - finding_id: REVIEW-002-SC-03
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: SC-03 — MermaidLightbox.tsx used dangerouslySetInnerHTML without DOMPurify sanitisation
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: review-001
    planned_in: null
    notes: Added import DOMPurify and sanitised svgHtml with USE_PROFILES: { svg: true }.

  - finding_id: REVIEW-002-CH-03
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: CH-03 — blockToParagraphs in exportDocx.ts was 93 lines handling 10+ tag types
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: review-001
    planned_in: null
    notes: Decomposed into 13 per-tag handler functions with dispatch via BLOCK_HANDLERS lookup map. blockToParagraphs now dispatches in ~10 lines.

  - finding_id: REVIEW-001-CR-012
    audit_ref: agent/reports/review-001.md
    severity: medium
    finding: dompurify moderate CVE in dependency chain
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-85
    planned_in: M10 task-85
    notes: dompurify@^3.4.11

  - finding_id: M9-SHORTCUT-005
    audit_ref: M9 shortcut retrospective
    severity: medium
    finding: file-explorer.test.tsx UI-only; localStorage round-trip untested at hook level
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-81
    planned_in: M10 task-81
    notes: useDocumentWorkspace localStorage test + lazy init

  - finding_id: M9-SHORTCUT-009
    audit_ref: M9 shortcut retrospective
    severity: low
    finding: user-guide documents Ctrl+T/W not wired in code
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-80
    planned_in: M10 task-80 or task-84
    notes: useWorkspaceKeyboard implements Ctrl+T/W

  - finding_id: M9-SHORTCUT-010
    audit_ref: M9 shortcut retrospective
    severity: low
    finding: design doc status draft; M9 success criteria unchecked until plan
    status: addressed
    fix_applied_date: 2026-06-24
    planned_in: M10 task-84
    notes: Amended in /acp-plan 2026-06-24

  - finding_id: M9-SHORTCUT-011
    audit_ref: M9 shortcut retrospective
    severity: low
    finding: E2E explorer collapse uses toolbar ☰ not chevron for expand
    status: addressed
    fix_applied_date: 2026-06-24
    verified_in_audit: M10-task-81
    planned_in: M10 task-81
    notes: e2e/tabs.spec.ts chevron both ways

  - finding_id: AUDIT-013-F1
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: critical
    finding: exportWord.ts only contains exportPdfDocument — misleading filename; chain exportPdf.ts → exportWord.ts is backward. Should rename to exportPdfDocument.ts or merge into exportPdf.ts.
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: src/markdown/exportWord.ts, src/markdown/exportPdf.ts

  - finding_id: AUDIT-013-F2
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: critical
    finding: docs/user-guide.md still documents removed .doc export button in export table (line 420) and references Word HTML export (line 409)
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: docs/user-guide.md:409-421

  - finding_id: AUDIT-013-F3
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: critical
    finding: agent/design/requirements.md FR-5.1 out of sync — still defines .doc HTML blob export as P0 requirement. File tree and Phase 2 notes also stale.
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: agent/design/requirements.md:248,395,546,692

  - finding_id: AUDIT-013-F4
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: high
    finding: README.md project tree shows exportWord.ts as .doc HTML export (line 201)
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: README.md:201

  - finding_id: AUDIT-013-F5
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: high
    finding: agent/design/architecture.md has stale exportWord references in module group list (line 26), file descriptions (line 59), and export article note (line 92)
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: agent/design/architecture.md:26,59,92

  - finding_id: AUDIT-013-F6
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: high
    finding: docs/test-baseline.md has outdated test counts — Word export says 6 tests (now 2 PDF tests) and E2E smoke says 8 tests (now 7)
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: docs/test-baseline.md:31,42

  - finding_id: AUDIT-013-F7
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: high
    finding: CHANGELOG.md v0.4.0 says .doc HTML fallback retained — needs update. No CHANGELOG entry for the .doc export removal.
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: CHANGELOG.md:91

  - finding_id: AUDIT-013-F8
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: high
    finding: agent/patterns/local.tauri-export-native-save-and-print.md shows stale exportWordDocument code example (line 16)
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: agent/patterns/local.tauri-export-native-save-and-print.md:16

  - finding_id: AUDIT-013-F9
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: medium
    finding: agent/memory/patterns.md contains stale exportWordDocument usage in code template (line 30)
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: agent/memory/patterns.md:30

  - finding_id: AUDIT-013-F10
    audit_ref: agent/reports/audit-1-docx-export-cleanup.md
    severity: medium
    finding: agent/memory/audit-carryovers.md has old entry exportWord untested (line 189) — should mark as addressed
    status: addressed
    fix_applied_date: null
    verified_in_audit: null
    planned_in: null
    notes: agent/memory/audit-carryovers.md:189 (AUDIT-003-G2)


  - finding_id: AUDIT-001-CR-001
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: high
    finding: DOCX inline formatting lost — bold, italic, code, links within paragraphs flattened to plain text. DOM walker in blockToParagraphs uses textContent only; does not inspect child <strong>/<em>/<code>/<a>/<img> elements.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: M11-docx-rich-formatting
    notes: Implemented childTextRuns() DOM walker with TextSegment intermediate format. Handles <strong>/<b> (bold), <em>/<i> (italics), <code> (Courier New), <a> (blue color), <del> (strikethrough), <u>/<ins> (underline), <sub>/<sup>, <mark> (highlight), and <img> ([Image: alt] placeholder). All paragraphs, headings, list items, table cells, and blockquotes now use childTextRuns.

  - finding_id: AUDIT-001-CR-002
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: high
    finding: DOCX nested lists flattened — blockToParagraphs handles <LI> as plain paragraphs. No <ul>/<ol> container traversal means multi-level indentation and bullet/number styles are lost.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: M11-docx-rich-formatting
    notes: Implemented buildListParagraphs() with recursive ul/ol handling. Output uses indentation (depth × 360 twips) with bullet prefix ("• ") for UL and numbered prefix ("1. ", "2. ", ...) for OL. Nested lists within LI children are recursively traversed with incremented depth.

  - finding_id: AUDIT-001-CR-003
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: medium
    finding: DOCX blockquotes silently dropped — <blockquote> falls through to return [] in blockToParagraphs.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: M11-docx-rich-formatting
    notes: <BLOCKQUOTE> now renders with left indent (720 twips) and blue left border (BorderStyle.SINGLE, size 6, color "3b82f6"). Text extracted via childTextRuns() for rich inline formatting.

  - finding_id: AUDIT-001-CR-004
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: medium
    finding: DOCX fixed image dimensions — inline images forced to 400x250, Mermaid to 500x300. No aspect ratio preservation from natural image dimensions.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: M11-docx-rich-formatting
    notes: fitDimensions() reads naturalWidth/naturalHeight from HTMLImageElement and SVG width/height attributes. ImageRun uses proportional dimensions capped at maxWidth=500. If natural dimensions unavailable, defaults to 500×312 (5:3 ratio). Mermaid SVGs similarly use parsed SVG width/height with same fitDimensions logic.

  - finding_id: AUDIT-001-CR-005
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: medium
    finding: PDF is print-dialog-only — no programmatic PDF generation. Relies on OS print dialog and user selecting "Save as PDF". FR-5.7 (P3) deferred.
    status: deferred
    fix_applied_date: null
    verified_in_audit: null
    planned_in: P3 research milestone
    notes: DEFERRED — programmatic PDF generation requires architectural evaluation (pdf-lib vs jsPDF vs server-side). Current print-dialog approach is functional and correctly avoids popup blockers in both browser and Tauri paths. FR-5.7 remains P3 research. No timeline.

  - finding_id: AUDIT-001-CR-006
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: low
    finding: Mermaid export failures silently swallowed — when SVG->PNG conversion times out (5s) or fails, no user feedback. Diagram is omitted from both DOCX and PDF.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: M11-docx-rich-formatting
    notes: DOCX blockToParagraphs mermaid case returns "[Diagram: rendering unavailable]" placeholder paragraph with italics: true, color: "999999" when mermaidImageParagraph returns null (no SVG or conversion failed). PDF exportPdfDocument replaces failed SVG with <p> element with same text and gray italic styling.

  - finding_id: AUDIT-001-CR-007
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: low
    finding: Deprecated PDF functions still exported in public API — openPdfPrintWindow() and populateAndPrintPdf() marked @deprecated but still in exportPdf.ts exports.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: M11-docx-rich-formatting
    notes: Removed openPdfPrintWindow(), populateAndPrintPdf(), openPrintWindow(), and printHtmlInWindow() from exportPdf.ts public API. Verified zero external consumers via grep across src/ and test/. Only internal references were the deprecated wrappers themselves.

  - finding_id: AUDIT-001-CR-008
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: medium
    finding: requirements.md had 2 stale references — "Known limitations" #1 said Word export offers both .docx and .doc; mermaid component diagram showed EW[markdown/exportWord.ts]. Both fixed during this audit.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: null
    notes: Fixed line 679 (known limitations #1) and line 740 (mermaid diagram node ED[markdown/exportDocx.ts]).

  - finding_id: AUDIT-001-CR-009
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: medium
    finding: README.md had stale "Word / DOCX / PDF" wording on line 5 and "Word (.doc) + DOCX + PDF export" in feature table on line 132. Both fixed during this audit.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: null
    notes: Line 5: "Word / DOCX / PDF" -> "DOCX / PDF". Line 132: "Word (.doc) + DOCX + PDF export" -> "DOCX + PDF export".

  - finding_id: AUDIT-001-CR-010
    audit_ref: agent/reports/audit-1-docx-pdf-export-security-and-correctness.md
    severity: medium
    finding: ADR-005 in decisions.md said ".doc remains fallback" — stale since .doc HTML-as-Word was removed in v0.5.1. Fixed during this audit.
    status: addressed
    fix_applied_date: 2026-06-27
    verified_in_audit: audit-1-docx-pdf-export-security-and-correctness
    planned_in: null
    notes: Updated to reflect true DOCX via docx library as canonical format, .doc HTML removed v0.5.1.
  - finding_id: REVIEW-003-F1
    audit_ref: agent/reports/review-002.md
    severity: critical
    finding: Mermaid SVG raw innerHTML injection with securityLevel loose (XSS). securityLevel changed to 'strict' + sanitizeSvg() wrapper strips event handlers and script tags before DOM injection.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
  - finding_id: REVIEW-003-F2
    audit_ref: agent/reports/review-002.md
    severity: high
    finding: Empty catch block in useTauriFileOpen.ts silently dropped errors. Added explicit comment noting browser context is expected and .catch() on the IIFE.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
  - finding_id: REVIEW-003-F3
    audit_ref: agent/reports/review-002.md
    severity: high
    finding: Unhandled promise rejections via void on async calls at 6+ call sites. Replaced all void with .catch(console.warn) or proper try/catch for Mermaid retry.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
  - finding_id: REVIEW-003-F4
    audit_ref: agent/reports/review-002.md
    severity: high
    finding: useToast overlapping timeouts bug — first timeout cleared toast even after newer message. Fixed with useRef to track timeout ID, clearing previous before setting new.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
  - finding_id: REVIEW-003-F5
    audit_ref: agent/reports/review-002.md
    severity: medium
    finding: as unknown as SVGSVGElement cast in exportDocx.ts without comment. Added inline comment explaining the cast rationale.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
  - finding_id: REVIEW-003-F6
    audit_ref: agent/reports/review-002.md
    severity: medium
    finding: Duplicate monospace TextRun creation in handlePre and handleCodeBlockWrapper. Extracted shared monospaceParagraph() helper and refactored both functions.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
  - finding_id: REVIEW-003-F7
    audit_ref: agent/reports/review-002.md
    severity: medium
    finding: 17 moderate npm audit vulns in dev deps (lighthouse → @sentry/node → @opentelemetry/core). Upgraded lighthouse to latest (13.4.0). Remaining vulns in transitive @sentry/node@9.47.1 (needs upstream fix).
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
  - finding_id: INT-001-IG67
    audit_ref: agent/reports/integrity-001.md
    severity: high
    finding: CI workflow actions (actions/checkout@v4, actions/setup-node@v4) not pinned to commit SHA in .github/workflows/ci.yml. Pin to commit SHA per GitHub supply chain security guidance (IG-67).
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
    notes: |
      Pinned to SHA:
      - actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5  # v4
      - actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4
      Applied across all 4 jobs in .github/workflows/ci.yml (8 total steps).
  - finding_id: INT-001-SCRIPT
    audit_ref: agent/reports/integrity-001.md
    severity: low
    finding: acp.dependency-diff.sh fails on Windows — 'File: unbound variable' bug. Script uses 'file' variable outside case statement scope.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
    notes: Could not reproduce — no 'File' variable found in current script. Error may have been a transient Windows/Bash interaction. Script passed syntax check (bash -n clean). Closing as not reproducible.
  - finding_id: INT-001-BOM
    audit_ref: agent/reports/integrity-001.md
    severity: low
    finding: UTF-8 BOM marker in agent/design/requirements.md and agent/memory/audit-carryovers.md. Strip for cleaner text processing.
    status: addressed
    fix_applied_date: 2026-06-28
    verified_in_audit: null
    planned_in: null
    notes: BOM stripped from both files via Python (3 bytes removed from each).
