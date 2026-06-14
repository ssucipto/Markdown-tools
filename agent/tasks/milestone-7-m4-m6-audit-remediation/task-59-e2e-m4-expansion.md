# Task 59: E2E Expansion (M4 Features)

**Milestone**: M7 — Audit Remediation  
**Priority**: P2 (Medium)  
**Status**: pending  
**Estimated**: 5h  
**Audit**: M9 (audit-5 medium), AUDIT-005 medium UX items

## Problem

E2E coverage thin for folder browser, view source, DOCX button, KaTeX render.

## Acceptance Criteria

- [ ] Playwright: view source toggle shows raw markdown
- [ ] Playwright: export buttons state (enabled/disabled per task-54)
- [ ] Playwright: KaTeX sample renders `.katex` element
- [ ] Playwright: folder open skipped on CI if no FS API (or mocked fixture)
- [ ] Mermaid copy/download actions smoke test if feasible

## Verification

```bash
npm run test:e2e
```
