# Task 49: Fix Library Build (`build:lib`)

**Milestone**: M7 — Audit Remediation  
**Priority**: P0 (Critical)  
**Status**: pending  
**Estimated**: 2h  
**Audit**: AUDIT-005-C1, AUDIT-003-M6, AUDIT-001-F3

## Problem

`npm run build:lib` fails: `vite-plugin-dts` / api-extractor resolves `playwright.config.ts` with a non-absolute path.

## Acceptance Criteria

- [ ] `npm run build:lib` completes without errors
- [ ] `dist/` contains `index.js`, `index.d.ts`, CSS assets
- [ ] CI `lib-pack` job passes
- [ ] dts generation scoped to `src/` only (exclude playwright, vite configs, tests)

## Implementation Notes

- Update `vite.lib.config.ts`: `dts.include` / `dts.exclude` or `rollupTypes` options
- Exclude `playwright.config.ts`, `vite.config.ts`, `test/**`, `e2e/**`
- Verify `npm pack --dry-run` lists expected files

## Verification

```bash
npm run build:lib
npm pack --dry-run
```
