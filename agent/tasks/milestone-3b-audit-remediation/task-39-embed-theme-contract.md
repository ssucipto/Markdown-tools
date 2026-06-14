---
created: 2026-06-14
audit_ref: AUDIT-003-B2
---

# Task 39: Embed Theme Contract (ADR-007)

**Milestone**: M3b | **Est**: 3h | **Depends**: none

## Objective

Fix controlled `theme` prop: toggle must work in standalone mode; embed uses `onThemeChange` callback. Record ADR-007.

## Steps

1. Add ADR-007 to `agent/memory/decisions.md`
2. Add `onThemeChange?: (theme: 'light' | 'dark') => void` to `MarkdownViewerProps`
3. When `theme` prop provided: viewer is controlled — toolbar calls `onThemeChange`; no internal toggle unless prop omitted
4. When `theme` omitted: use internal state (current behavior)
5. Unit test: controlled theme + callback; uncontrolled toggle

## Acceptance

- [ ] Visualizer can own theme via prop + callback without broken toggle
- [ ] Standalone app theme toggle still works
