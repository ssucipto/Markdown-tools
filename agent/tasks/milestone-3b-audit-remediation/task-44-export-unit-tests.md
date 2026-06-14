---
created: 2026-06-14
audit_ref: AUDIT-003-G2
---

# Task 44: Export Pipeline Unit Tests

**Milestone**: M3b | **Est**: 5h | **Depends**: task-40

## Objective

Test `exportWordDocument` and `exportPdfDocument` with mocked DOM and svg-to-png.

## Steps

1. Mock `svgToPngDataUri` in export tests
2. Build fixture DOM with table, code block, mermaid container
3. Assert blob type, filename, HTML structure for Word/PDF paths
4. Test mermaid fallback when PNG fails

## Acceptance

- [ ] `exportWord.ts` coverage ≥50%
- [ ] Export tests pass in CI
