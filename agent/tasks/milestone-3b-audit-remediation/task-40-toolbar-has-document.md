---
created: 2026-06-14
audit_ref: AUDIT-003-B3
---

# Task 40: Toolbar hasDocument Embed Fix

**Milestone**: M3b | **Est**: 2h | **Depends**: task-39

## Objective

Toolbar and export visible when embed passes `content` without `documentPath`.

## Steps

1. Change visibility logic: `hasContent = Boolean(content?.length)` for toolbar/export
2. Use `documentPath ?? 'document.md'` as export filename fallback only
3. Test controlled content-only render shows export buttons

## Acceptance

- [ ] `<MarkdownViewer content="# Hi" />` shows toolbar
