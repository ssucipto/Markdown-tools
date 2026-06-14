# Milestone 3: Polish & Security

<!-- @acp.meta.milestone
topic: security, accessibility, mermaid, dompurify
description: XSS hardening, accessibility, Mermaid pan, extended test coverage
tasks: task-15..task-19
spec: agent/design/requirements.md
status: completed
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Harden MVP for untrusted markdown, improve UX polish, and meet Phase 1b requirements.  
**Duration**: 1 week  
**PRD phase**: Phase 1b  
**Strict sign-off**: Completed via M3b (audit-4, v0.3.1)

---

## Deliverables

- DOMPurify sanitization + React event delegation (no inline `onclick`)
- Heading anchor links, image lightbox, ErrorBoundary
- Mermaid lightbox pan/zoom (FR-4.8)
- Keyboard accessibility (TOC, toolbar, lightbox Escape)
- Test coverage ≥60% on markdown pipeline; export edge-case tests

---

## Success Criteria

- [x] FR-2.5, FR-3.4, FR-3.7, FR-3.8, FR-6.4 implemented
- [x] No inline `onclick` in generated HTML
- [ ] Lighthouse accessibility score ≥90 on viewer route (not gated in CI)
- [x] `svg-to-png` unit tests added (M3b task-45)
- [x] ≥60% coverage on `src/markdown/*` (strict completion in M3b)

---

## Tasks

1. [Task 15](../tasks/milestone-3-polish/task-15-xss-hardening.md) — DOMPurify and copy-button delegation
2. [Task 16](../tasks/milestone-3-polish/task-16-anchors-lightbox-error-boundary.md) — Anchors, image lightbox, ErrorBoundary
3. [Task 17](../tasks/milestone-3-polish/task-17-mermaid-pan-zoom.md) — Mermaid pan in lightbox
4. [Task 18](../tasks/milestone-3-polish/task-18-accessibility-pass.md) — Accessibility pass
5. [Task 19](../tasks/milestone-3-polish/task-19-test-coverage-export.md) — Extend tests and export QA
6. [Task 37](../tasks/milestone-3-polish/task-37-playwright-e2e-smoke.md) — Playwright E2E smoke tests
7. [Task 38](../tasks/milestone-3-polish/task-38-lighthouse-performance.md) — Lighthouse performance verification

**Next Milestone**: [M3b Audit Remediation](milestone-3b-audit-remediation.md) ✅ → [M4 — Enhanced Product](milestone-4-enhanced.md)
