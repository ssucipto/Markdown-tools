# Regression Checklist — Markdown-tools

**Date**: 2026-06-21  
**Version**: 0.4.1  

Use this checklist before every release to verify no regressions were introduced.

---

## Pre-Release Verification

### 1. Build Pipeline
- [ ] `npm install` — clean install (or `npm ci` for CI)
- [ ] `npm run build` — SPA builds without errors
- [ ] `npm run build:lib` — library builds without errors
- [ ] `npm pack --dry-run` — package structure is valid

### 2. Code Quality
- [ ] `npm run typecheck` — no TypeScript errors
- [ ] `npm run lint` — no ESLint errors
- [ ] `npm run format:check` — all files use Prettier style

### 3. Testing
- [ ] `npm test` — all 36+ unit tests pass
- [ ] `npm run test:e2e` — all 9 E2E tests pass
- [ ] `npm run test:coverage` — coverage meets thresholds (≥60% on src/markdown/*)

### 4. Security
- [ ] `npm audit --audit-level=high --omit=dev` — no high/critical vulnerabilities
- [ ] DOMPurify is active in the parse pipeline (no regression)
- [ ] No `console.log` leaks in production entry points

### 5. Documentation
- [ ] README accurately reflects current version and features
- [ ] docs/user-guide.md matches actual CLI behaviour
- [ ] CHANGELOG.md has entry for this version
- [ ] agent/progress.yaml reflects current milestone status

### 6. Desktop (if Rust available)
- [ ] `npm run check:prereqs` — all tooling available
- [ ] `npm run tauri:dev` — desktop window opens
- [ ] `markdown-tools open docs/sample-basic.md` — file opens in desktop
- [ ] `npm run tauri:build` — platform installer is produced

---

## Test Matrix

| Dimension | Variants |
|-----------|----------|
| **Browsers** | Chrome/Edge 120+, Firefox 120+, Safari 17+ |
| **Platforms** | macOS, Windows, Linux |
| **Modes** | Web (npm run dev), Desktop (Tauri), Library (npm install @markdown-tools/react) |
| **File types** | `.md` basic, GFM, Mermaid, KaTeX, mixed |

---

## Known Flaky Tests / Limitations

| Test | Flakiness | Notes |
|------|-----------|-------|
| E2E: mermaid render | Low | Mermaid diagram may take >3s on slow machines |
| E2E: export PDF | Low | Print dialog may behave differently across OS versions |

---

## Rollback Procedure

If a regression is found after release:

1. Identify the offending commit: `git bisect`
2. Revert: `git revert <commit-hash>`
3. Verify: run `npm run test:all`
4. Release patch: bump version to `<current>.x+1`
5. Document the regression in CHANGELOG.md under the reverted version
