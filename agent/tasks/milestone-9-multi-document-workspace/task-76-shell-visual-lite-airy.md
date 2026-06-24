# Task 76: M9 Shell Visual System — Lite/Airy Pass

**Milestone**: M9 | **Est**: 4h | **Depends**: task-69, task-71, task-72

## Objective

FR-9.7 — Apply lite/airy visual design to M9 shell: zinc tokens, minimal chrome, reduced toolbar weight. Addresses AUDIT-010-F3, F4, F5.

## Context

See `agent/design/multi-document-workspace.md` §Visual design. Current UI uses dense `gray-*` panels, uppercase labels, shadow-heavy FAB toolbar, and separate `App.tsx` header — adding tabs without this pass will feel cluttered.

## Steps

1. Document tokens in design doc (already drafted) — verify implementation matches
2. **Merge app chrome**: fold `App.tsx` header into tab row or reduce to 32px brand strip (coordinate with task-72)
3. **DocumentTabs**: zinc palette, `h-10`, bottom-border active state, hover-only close `×`
4. **FileExplorer**: sentence-case labels, `zinc-50/950`, subtle selection (`zinc-100/800`), `w-60` expanded
5. **Toolbar pass**: reduce FAB to `w-8 h-8 shadow-sm` or evaluate slim top icon cluster — keep accessibility labels
6. Harmonize **TableOfContents** right rail to zinc (optional light touch if time)
7. Screenshot check at 1280px and 1440px — no horizontal scroll, airy whitespace around prose

## Verification

- [ ] No `gray-*` classes in new shell components (`DocumentTabs`, `FileExplorer`, workspace layout)
- [ ] Single top chrome row (no header + tabs double stack)
- [ ] Visual review: feels lighter than pre-M9 sidebar + FAB baseline

## Acceptance

- [ ] Design doc §Visual design success criteria met
- [ ] Dark mode parity on all new shell surfaces
- [ ] `npm run typecheck` passes
