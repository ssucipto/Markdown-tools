# Task 57: Tauri CSP, CLI & Version Alignment

**Milestone**: M7 — Audit Remediation  
**Priority**: P2 (Medium)  
**Status**: pending  
**Estimated**: 3h  
**Audit**: AUDIT-005-H9, M5/M6 carryovers

## Problem

Tauri CSP may be permissive; CLI `bin/markdown-tools.mjs` minimal; version strings may drift between `package.json` and `tauri.conf.json`.

## Acceptance Criteria

- [ ] CSP reviewed and tightened where possible without breaking Vite dev
- [ ] CLI `open` handles missing file gracefully; `dev` documented
- [ ] `tauri.conf.json` version matches package version (or sync script)
- [ ] `npm run tauri:build` succeeds on CI or documented as manual (Windows)

## Verification

```bash
npm run tauri:dev  # smoke
node bin/markdown-tools.mjs open README.md
```
