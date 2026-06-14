# Task 10: TOC, Scroll Spy, and Toolbar

**Milestone**: M2 | **Est**: 5h | **Depends**: task-8

## Objective
FR-3.1–3.6, FR-3.9, FR-6.3 — TOC sidebar, IntersectionObserver, theme/font/fullscreen toolbar.

## Steps
1. Implement `TableOfContents.tsx` from parse `toc` data
2. IntersectionObserver for `activeId` scroll spy
3. `Toolbar.tsx`: dark toggle, font S/M/L, fullscreen, code copy delegation
4. Persist theme preference in sessionStorage (optional)

## Acceptance
- [ ] Clicking TOC entry scrolls to heading; active item updates on scroll
- [ ] Dark mode toggles `.prose-invert`
