---
created: 2026-06-14
audit_ref: audit-3 B7
---

# Task 43: Scoped initialAnchor Scroll

**Milestone**: M3b | **Est**: 2h | **Depends**: task-41

## Objective

Deep-link scroll targets heading inside viewer container, not global document.

## Steps

1. Scroll via `contentRef.current.querySelector('#' + CSS.escape(id))`
2. Fall back to `document.getElementById` only if not found in container
3. Test with `initialAnchor` prop after content render

## Acceptance

- [ ] Multiple viewers on page don't cross-scroll
