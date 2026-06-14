---
created: 2026-06-14
audit_ref: AUDIT-003-G3, B5, B6
---

# Task 42: Invalid Drop Toast + Code Copy Escaping

**Milestone**: M3b | **Est**: 3h | **Depends**: none

## Objective

Close task-7 acceptance gap; harden copy button attribute encoding/decoding.

## Steps

1. On drop/pick of non-`.md` file: `showToast('⚠️ Only .md files are supported')`
2. Add `encodeDataAttribute` / `decodeDataAttribute` helpers (full HTML entity set)
3. Use in `enhanceCodeBlocks` and copy handler
4. Unit test: code with `<`, `'`, `"` copies correctly

## Acceptance

- [ ] Dropping `.txt` shows toast
- [ ] No `onclick=` in output (unchanged)
