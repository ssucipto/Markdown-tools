---
created: 2026-06-14
---

# Task 31: URL Deep-Link (file and anchor)

**Milestone**: M6 | **Est**: 3h | **Depends**: task-30

## Objective

Support `SourceLink` workflow: `/docs?file=agent/design/foo.md&anchor=section-id`.

## Steps

1. Read `initialFile` / `initialAnchor` props on mount
2. When `files` loaded, auto-select matching `initialFile` and call `onSelectFile` if content not yet loaded
3. After render, scroll to `initialAnchor` heading id
4. Document prop contract for TanStack Router search params in embed docs

## Acceptance

- [ ] Navigating with `?file=docs/sample-basic.md&anchor=intro` opens file and scrolls to section
