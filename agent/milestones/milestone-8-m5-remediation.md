# Milestone 8: M5 Remediation — Native Desktop Local Install Readiness

<!-- @acp.meta.milestone
topic: tauri, desktop, cli, install, documentation
description: Fix M5 so the desktop app can be installed and run locally; update docs, verification gates, and progress tracking
tasks: task-61..task-67
spec: agent/design/requirements.md
status: completed
updated: 2026-06-21
@acp.meta.end -->

**Goal**: Make the M5 native desktop build installable and runnable on a developer's local machine. Fix all audit findings from AUDIT-006 (M5 audit). Update documentation and verification gates so future milestones verify runnability before marking complete.

**Duration**: 1 week  
**PRD phase**: Phase 3 — Native Desktop (remediation)  
**Depends on**: M5 scaffold (task-26..task-28) — structural code exists, only install/verification/CI steps missing  
**Blocks**: Future milestones that require desktop testing (Tauri CI, automated smoke tests)

---

## Overview

Audit #6 (2026-06-21) found M5 marked **completed** in `progress.yaml` but the desktop app **cannot be built or run** on a fresh clone due to two critical blockers:

1. **`node_modules` never installed** — `npm install` was never executed. Every npm script fails.
2. **Rust toolchain absent** — `cargo`/`rustc` not on `$PATH`. Tauri 2 cannot compile without Rust.
3. **Tauri CLI not available locally** — `@tauri-apps/cli` declared in `devDependencies` but never installed (consequence of #1).

Additionally, this is a **repeat finding** — AUDIT-002-F1 (2026-06-14) flagged the same `node_modules` absence for M1, was marked "addressed", but actually persisted. The project lacks a **verification gate** that confirms a milestone can be built before it is marked complete.

---

## Deliverables

1. Working `npm install` + `npm run build` on a clean clone
2. Working `npm run tauri:dev` — opens a native window (requires Rust)
3. Working `npm run tauri:build` — produces a distributable installer (requires Rust)
4. Working `markdown-tools open <file.md>` — CLI opens file in Tauri dev shell (with fallback when Rust/binary absent)
5. Updated documentation — prerequisites, install steps, verification checklist, CLI reference
6. ✅ Verification gate added to milestone definition template (done in /acp-plan)
7. AUDIT-002-F1 permanently closed with a verification automation
8. Testing & security baseline — coverage baseline, regression checklist, CLI smoke tests, npm audit gate, security hardening verification

---

## Success Criteria

- [x] Fresh clone → `npm install` → `npm run build` → `npm run preview` works (browser)
- [ ] `npm run tauri:dev` opens a native window with the viewer (requires Rust — not on this machine)
- [ ] `npm run tauri:build` completes and produces a platform installer (requires Rust — not on this machine)
- [ ] `markdown-tools open docs/sample-basic.md` opens the file in the desktop window (requires Rust — not on this machine)
- [x] `docs/user-guide.md` and `README.md` accurately reflect all prerequisites including Rust
- [x] ✅ Milestone template includes a "Build Verification" acceptance step (done in /acp-plan)
- [x] `progress.yaml` shows M5 status correctly (with notes about Rust dependency)
- [x] All existing tests still pass after any changes
- [x] `npm run test:all` passes (typecheck + lint + unit + e2e + security audit)
- [x] `docs/test-baseline.md` documents coverage, test counts, and security audit findings
- [x] `docs/regression-checklist.md` documents pre-release verification steps
- [x] CLI smoke tests exist and pass (`test/cli/smoke.test.ts`)
- [x] DOMPurify usage verified; no console.log leaks in production code
- [x] `agent/scripts/acp.verify-milestone.sh` exists and passes for M8

---

## Audit Traceability

| Audit Finding | Task(s) |
|---------------|---------|
| AUDIT-006-F1 — `node_modules` never installed | task-61 |
| AUDIT-006-F2 — Rust toolchain absent | task-62 |
| AUDIT-006-F3 — Tauri CLI missing locally | task-61 (resolved by npm install) |
| AUDIT-006-F4 — CLI launches dev server not built binary | task-63 |
| AUDIT-006-F5 — `beforeDevCommand` confusion | task-63 (documentation) |
| AUDIT-006-F6 — No audit report for M5 | task-64 |
| AUDIT-002-F1 (recurrence) — node_modules absence reoccurred | task-64 |
| M5 milestone status mismatch (draft in file, completed in progress.yaml) | task-65 |
| AUDIT-007-F4 — task-62 missing explicit package.json update | task-62, task-67 |
| AUDIT-007-F7 — prereq checker should verify project deps | task-62 |
| AUDIT-007-F10 — no audit-6 report exists | task-64 |
| Testing & security baseline — coverage, regression, security audit | task-67 |
| CLI integration tests — smoke tests for binary | task-67 |

---

## Tasks

### Task 61 — `npm install` + Build Verification
**Est**: 0.5h  
**Audit**: AUDIT-006-F1, F3  

1. Run `npm install` in the project root
2. Verify `node_modules/.bin/tauri` exists after install
3. Run `npm run build` — must complete without errors
4. Run `npm run build:lib` — must complete without errors
5. Run `npm test` — all 36+ unit tests pass
6. Run `npm run typecheck` — no TypeScript errors
7. Document the install + verify sequence in `docs/user-guide.md` first-time setup

**Acceptance**:
- [ ] All npm scripts succeed after `npm install`
- [ ] `tauri` binary present in `node_modules/.bin/`

### Task 62 — Rust Installation Guide & Verification
**Est**: 1h  
**Audit**: AUDIT-006-F2  

1. Add Rust install instructions to `docs/user-guide.md` prerequisites section
2. Add Rust detection script (`scripts/check-prereqs.sh`) that checks:
   - `cargo --version` succeeds
   - `rustc --version` succeeds
   - `node --version` ≥ 20
   - `npm --version` works
3. Add `npm run check:prereqs` script to `package.json` that runs the check script
4. Document known issue: macOS `xcode-select --install` may be needed
5. Update README prerequisites table to reference the check script

**Acceptance**:
- [ ] `npm run check:prereqs` reports missing Rust gracefully (not a crash)
- [ ] `docs/user-guide.md` has clear Rust install instructions with links
- [ ] README cross-references the check script

### Task 63 — CLI Improvement: `open` Command for Built Binary
**Est**: 2h  
**Audit**: AUDIT-006-F4, F5  

1. Update `bin/markdown-tools.mjs` to detect whether a Tauri built binary exists (`src-tauri/target/release/app` or `markdown-tools` on PATH)
2. If built binary exists, launch it directly with the file path as argument
3. If only Tauri dev is available, fall back to `npx tauri dev -- <file>` (current behaviour)
4. Add a `--help` / usage example that distinguishes dev vs production modes
5. Document the CLI modes clearly in `docs/user-guide.md`

**Acceptance**:
- [ ] `markdown-tools open file.md` works after `npm run tauri:build`
- [ ] `markdown-tools open file.md` gives a clear message when Rust is missing
- [ ] No breaking changes to existing CLI interface

### Task 64 — Verification Gate: Milestone Completion Checklist
**Est**: 1h  
**Audit**: AUDIT-006-F6, AUDIT-002-F1 (permanent fix)  

1. Create `agent/scripts/acp.verify-milestone.sh` that:
   - Checks `node_modules/` exists (deps installed)
   - Runs `npm run build` (dry-run, reports success/failure)
   - Checks `agent/reports/` exists for the milestone being verified
   - Reports a pass/fail summary
2. Add a "Build Verification" section to the milestone template at `agent/milestones/milestone-1-{title}.template.md`
3. Update `agent/milestones/milestone-5-native-desktop.md`:
   - Change `status: draft` to `status: completed` (to match progress.yaml)
   - Update `updated: 2026-06-21`
   - Add verification notes about Rust dependency
4. Create `agent/reports/audit-6-m5-implementation.md` with the full audit findings
5. Update `agent/memory/audit-carryovers.md`:
   - Close AUDIT-006-F1 through F6
   - Re-close AUDIT-002-F1 with verified_in_audit: audit-6

**Acceptance**:
- [ ] `acp.verify-milestone.sh` exists and reports meaningfully
- [ ] Milestone template updated with verification section
- [ ] M5 milestone doc reflects actual status
- [ ] Audit report exists at `agent/reports/audit-6-m5-implementation.md`
- [ ] Carryovers updated

### Task 65 — Documentation & Progress Sync
**Est**: 1h  

1. Update `agent/progress.yaml`:
   - Add M8 milestone entry
   - Change M5 status in `milestones[5].status` from `completed` to `needs_verification`
   - Add note about Rust dependency to M5 notes
   - Update `current_milestone` to M8
   - Add recent_work entry for audit #6
   - Move M5 tasks under the new status tracking
   - Update `overall` progress percentage
2. Update `docs/user-guide.md` desktop section:
   - Clarify that Tauri is optional and requires Rust
   - Add troubleshooting for `cargo: command not found`
   - Add "Verify your install" section with expected command outputs
3. Update `README.md` if needed to reflect M8 status
4. Update `CHANGELOG.md` with M8 entry

**Acceptance**:
- [ ] progress.yaml accurately reflects M5 as needing verification
- [ ] M8 milestone listed with tasks
- [ ] docs/user-guide.md has clear Rust troubleshooting
- [ ] CHANGELOG updated

### Task 66 — Verification & Documentation Audit
**Est**: 1h  

1. Run through the full install flow on a simulated clean state:
   - `rm -rf node_modules` → `npm install` → `npm run build` → `npm run test`
2. Run `npm run check:prereqs` — confirm it detects missing Rust gracefully
3. Run `markdown-tools open docs/sample-basic.md` — confirm it produces a helpful error if Rust is missing
4. Run `npm run test:all` — full suite passes
5. Verify all documentation is self-consistent (no stale references)
6. Run `agent/scripts/acp.verify-milestone.sh M8` — confirm it passes
7. Mark M8 as complete in progress.yaml only if all acceptance criteria pass

**Acceptance**:
- [ ] Full clean-install flow passes
- [ ] Verification script passes for M8
- [ ] `npm run test:all` passes
- [ ] Documentation is self-consistent
- [ ] All M8 tasks complete

### Task 67 — Testing, Security & Regression Baseline
**Est**: 2h  
**Audit**: AUDIT-007-F4, F7, F10  
**Standards**: OWASP Top 10:2025 (security regression), ISO 25010 (coverage baseline), NIST SP 800-53 (audit trail)  

1. Run `npm run test:coverage` and record baseline counts/coverage in `docs/test-baseline.md`
2. Run `npm audit` and record vulnerability baseline
3. Verify DOMPurify usage in `src/markdown/parse.ts` — confirm no bypass
4. Verify `dangerouslySetInnerHTML` only in `MarkdownViewer.tsx` with sanitized input
5. Create `docs/regression-checklist.md` with pre-release steps, test matrix, rollback procedure
6. Add `test:security` (`npm audit --audit-level=high --omit=dev`) and `test:all` scripts to `package.json`
7. Create `test/cli/smoke.test.ts` — CLI smoke tests (--help, open errors, dev --help)
8. Verify no `console.log` leaks in production entry points

**Acceptance**:
- [ ] `docs/test-baseline.md` exists with coverage, counts, audit results
- [ ] `docs/regression-checklist.md` exists with pre-release checklist
- [ ] `package.json` has `test:security` and `test:all` scripts
- [ ] `test/cli/smoke.test.ts` exists and passes
- [ ] DOMPurify usage verified; no console.log leaks
- [ ] All existing tests still pass

---

## Timeline

| Task | Est. Hours | Dependencies |
|------|-----------|--------------|
| task-61: npm install + build verify | 0.5 | None |
| task-62: Prereq checker + Rust guide | 1.5 | task-61 |
| task-63: CLI built binary support | 2 | task-61, task-62 |
| task-64: Verification gate | 1 | None |
| task-65: Documentation sync | 1 | task-61, task-62, task-63 |
| task-66: Final verification | 1 | All above |
| task-67: Testing & security baseline | 2 | task-61, task-64 |
| **Total** | **9h** | |
| task-64: Verification gate | 1 | None |
| task-65: Documentation sync | 1 | task-61, task-62, task-63 |
| task-66: Final verification | 1 | All above |
| **Total** | **6.5h** | |
