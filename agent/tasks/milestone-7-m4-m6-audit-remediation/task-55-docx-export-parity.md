# Task 55: DOCX Export Parity

**Milestone**: M7 — Audit Remediation  
**Priority**: P1 (High)  
**Status**: pending  
**Estimated**: 6h  
**Audit**: AUDIT-005-H5

## Problem

DOCX export via `docx` package is thin: no tables, code blocks, images, or KaTeX math.

## Acceptance Criteria

- [ ] Tables export with basic cell structure
- [ ] Fenced code blocks export as monospace paragraphs or styled runs
- [ ] Images: inline or placeholder note when CORS/blob blocked
- [ ] KaTeX: fallback text or "equation" placeholder (full OMML optional P2)
- [ ] Unit tests for `exportDocx` with fixture HTML covering table + code
- [ ] Parity documented vs PDF/Word HTML export limitations

## Reference

- `src/markdown/exportDocx.ts`
- Existing HTML export tests in `test/markdown/`
