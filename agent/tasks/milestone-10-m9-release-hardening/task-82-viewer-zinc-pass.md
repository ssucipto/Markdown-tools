# Task 82: MarkdownViewer Zinc Pass

**Milestone**: M10 | **Est**: 2h | **Depends**: none | **FR**: FR-10.6

## Objective

Complete lite/airy zinc styling inside `MarkdownViewer` (loading overlay, error states, gray leftovers). Partial **CR-007**, shortcut #8.

## Steps

1. Audit `MarkdownViewer.tsx` for `gray-*`, `blue-*` classes inconsistent with shell zinc tokens
2. Align loading spinner, error banner, drag hints with `Toolbar` / `EmptyState` palette
3. Do **not** decompose component in this task (task-83 handles shell only)

## Verification

- [ ] Visual spot-check light + dark mode
- [ ] No functional regressions; unit tests pass

## Acceptance

- [ ] FR-9.7 shell consistency extends into viewer chrome
