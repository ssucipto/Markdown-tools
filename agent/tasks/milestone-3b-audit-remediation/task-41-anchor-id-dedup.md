---
created: 2026-06-14
audit_ref: AUDIT-003-B4
---

# Task 41: Unique Heading Anchor IDs

**Milestone**: M3b | **Est**: 2h | **Depends**: none

## Objective

Dedupe anchor IDs when headings share text — fixes TOC and SourceLink `?anchor=`.

## Steps

1. In `addAnchors`, track used ids; suffix `-2`, `-3` on collision
2. Unit tests: duplicate H2 titles produce unique ids
3. Verify TOC links match heading ids

## Acceptance

- [ ] `# A` / `## B` / `## B` → ids `a`, `b`, `b-2`
