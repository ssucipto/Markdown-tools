# Task 58: Library Contract Tests & Consumer CI

**Milestone**: M7 — Audit Remediation  
**Priority**: P1 (High)  
**Status**: pending  
**Estimated**: 4h  
**Audit**: AUDIT-005-H12, AUDIT-003-M6

## Problem

Contract tests exist but shallow; no smoke test that built package imports in a minimal consumer.

## Acceptance Criteria

- [ ] `test/contract/props-contract.test.ts` covers all public exports from `src/index.ts`
- [ ] `parseDocsSearchParams` edge cases tested
- [ ] CI job: after `build:lib`, run contract tests against `dist/`
- [ ] Optional: `test/contract/consumer-smoke.mjs` imports package like ACPEnhanced-Visual would

## Verification

```bash
npm run build:lib && npm test -- contract
```
