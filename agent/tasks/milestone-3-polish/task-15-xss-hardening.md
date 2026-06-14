# Task 15: XSS Hardening and Copy Delegation

**Milestone**: M3 | **Est**: 5h | **Depends**: task-14

## Objective
FR-2.5 — DOMPurify sanitize; remove inline `onclick` from code copy.

## Steps
1. Add `dompurify` + types; sanitize HTML after marked (allow safe tags)
2. Replace `enhanceCodeBlocks` onclick with React event delegation on contentRef
3. Document trusted-local default in README security section

## Acceptance
- [ ] No `onclick=` strings in rendered HTML output
