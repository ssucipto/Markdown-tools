# Task 54: View Source Export Fix

**Milestone**: M7 — Audit Remediation  
**Priority**: P1 (High)  
**Status**: pending  
**Estimated**: 2h  
**Audit**: AUDIT-005-H3

## Problem

When view-source mode is active, Word/PDF export reads `<pre>` raw markdown instead of rendered article.

## Acceptance Criteria

- [ ] Export buttons disabled in view-source mode OR export uses last rendered HTML snapshot
- [ ] Toolbar shows clear UX (disabled state + tooltip)
- [ ] Unit test: export handler rejects or uses rendered content when `showSource`

## Implementation Notes

- Prefer storing `lastRenderedHtml` ref updated on each parse
- Export paths in `MarkdownViewer` / export modules use snapshot, not live DOM
