# Task 61: npm Install & Build Verification

**Milestone**: M8 | **Est**: 0.5h | **Depends**: None  
**Audit**: AUDIT-006-F1, F3

## Objective
Run `npm install` and verify the entire build pipeline works end-to-end.

## Steps
1. Run `npm install` in the project root
2. Verify `node_modules/.bin/tauri` exists after install
3. Run `npm run build` — must complete without errors
4. Run `npm run build:lib` — must complete without errors
5. Run `npm test` — all 36+ unit tests pass
6. Run `npm run test:coverage` — verify coverage thresholds are met (baseline for regression)
7. Run `npm run typecheck` — no TypeScript errors
8. Run `npm run test:e2e` — all 9 E2E tests pass
9. Run `npm run lint` — no lint errors
10. Run `npm run format:check` — no formatting issues
11. Run `npm audit --audit-level=high --omit=dev` — no high/critical vulnerabilities (matches CI gate)
12. Run `npm pack --dry-run` — verify package structure
13. Record baseline test counts and coverage percentage in a comment in progress.yaml or task-67

## Acceptance
- [ ] All npm scripts succeed after `npm install`
- [ ] `tauri` binary present in `node_modules/.bin/`
- [ ] No warnings about unmet peer dependencies
- [ ] Build output directories (`dist/`, `dist-lib/`) are generated
- [ ] `npm audit` passes with no high/critical findings (baseline recorded)
