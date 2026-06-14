# Task 8: GFM Rendering and Table Wrappers

**Milestone**: M2 | **Est**: 3h | **Depends**: task-3, task-7

## Objective
Wire `markdownToHtml` to viewer with `dangerouslySetInnerHTML` + memoized innerHtml pattern.

## Steps
1. Connect parse pipeline to `MarkdownViewer` content area
2. Apply `.prose-doc` / `.prose-invert` classes from theme state
3. Verify GFM tables, blockquotes, images render from `sample-gfm.md`

## Acceptance
- [ ] Tables in `sample-gfm.md` scroll horizontally inside wrapper
