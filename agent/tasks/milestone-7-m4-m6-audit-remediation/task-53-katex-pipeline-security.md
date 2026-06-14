# Task 53: KaTeX Pipeline Security & Lib CSS

**Milestone**: M7 — Audit Remediation  
**Priority**: P1 (High)  
**Status**: pending  
**Estimated**: 4h  
**Audit**: AUDIT-005-H2, AUDIT-005-H6 (CSS), AUDIT-005-H7

## Problem

KaTeX runs before fenced-code protection; restored HTML may be unsanitized; KaTeX CSS not exported from library entry.

## Acceptance Criteria

- [ ] Fenced code blocks protected before KaTeX pass (same pattern as Mermaid)
- [ ] KaTeX output sanitized or trusted-path only
- [ ] `katex/dist/katex.min.css` imported/re-exported from `src/index.ts` for consumers
- [ ] Unit tests: `$...$` inside fenced code not transformed
- [ ] Unit tests: display math `$$...$$` renders

## Verification

```bash
npm test -- math
npm run build:lib
```
