# Task 67: Testing, Security & Regression Baseline

**Milestone**: M8 | **Est**: 2h | **Depends**: task-61, task-64  
**Audit**: AUDIT-007-F4, AUDIT-007-F7, AUDIT-007-F10  
**Standards**: OWASP Top 10:2025, ISO 25010 (test coverage), NIST SP 800-53 (security regression)

## Objective
Establish a comprehensive testing, security, and regression baseline for the project. Verify that existing test infrastructure is robust, identify coverage gaps, add missing security checks, and document the regression baseline so future changes can be validated against it.

## Steps

### Part A — Baseline & Regression Inventory
1. Run `npm run test:coverage` and record:
   - Total number of test files (currently 8 unit + 2 E2E)
   - Total number of test cases (currently ~36 unit + ~9 E2E)
   - Line/branch/function coverage percentage for `src/markdown/*` (PRD target: ≥60%)
   - Any uncovered files or branches
2. Run `npm audit` and record baseline:
   - Number of vulnerabilities by severity (none should be high/critical)
   - List of any moderate/low findings for awareness
3. Document the baseline in `docs/test-baseline.md` (new file) with:
   - Test counts, coverage percentages, audit results
   - Date of baseline (2026-06-21)
   - Instructions: "Run `npm test && npm run test:e2e && npm audit --audit-level=high --omit=dev` before every release"

### Part B — Security Hardening Verification
4. Verify DOMPurify is loaded in the markdown pipeline (`src/markdown/parse.ts`) and is not bypassed
5. Verify `dangerouslySetInnerHTML` is only used in one location (MarkdownViewer.tsx) and receives sanitized HTML
6. Verify `npm audit` runs in CI with `--audit-level=high` and `continue-on-error: false`
7. Verify ESLint security-related rules are active (no `eval()`, no `innerHTML` outside allowed patterns)
8. Check for any `console.log` or debug code that could leak info in production (CLI and library entry points)

### Part C — Regression Test Documentation
9. Create `docs/regression-checklist.md` with:
   - Pre-release verification steps (build, test, audit, lint, typecheck)
   - Test matrix: browser (Chrome, Firefox, Safari), platform (macOS, Windows, Linux), mode (web, desktop)
   - Known flaky tests or limitations
   - Rollback procedure if regression is found
10. Add a `"test:security"` script to `package.json`:
    - `"test:security": "npm audit --audit-level=high --omit=dev"`
11. Add a `"test:all"` script to `package.json` that runs the full suite:
    - `"test:all": "npm run typecheck && npm run lint && npm run test && npm run test:e2e && npm run test:security"`

### Part D — CLI Integration Test (Smoke)
12. Create `test/cli/smoke.test.ts` that:
    - Spawns `node bin/markdown-tools.mjs --help` and verifies usage output
    - Spawns `node bin/markdown-tools.mjs open <nonexistent>` and verifies error message
    - Spawns `node bin/markdown-tools.mjs dev --help` (just verifies it doesn't crash)
    - Uses a timeout to prevent hanging

## Acceptance
- [ ] `docs/test-baseline.md` exists with coverage, test counts, and security audit baseline
- [ ] `docs/regression-checklist.md` exists with pre-release steps and test matrix
- [ ] `package.json` has `test:security` and `test:all` scripts
- [ ] `test/cli/smoke.test.ts` exists and passes (CLI smoke tests)
- [ ] All existing tests still pass after any additions
- [ ] DOMPurify usage verified in parse pipeline
- [ ] No `console.log` leaks in production entry points
- [ ] Baseline coverage ≥60% on `src/markdown/*` (PRD requirement)
