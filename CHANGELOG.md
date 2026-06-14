# Changelog

## [0.3.1] - 2026-06-14

### Fixed (M3b audit remediation)
- ADR-007: controlled `theme` + `onThemeChange` for embed consumers
- Toolbar/export visible when `content` without `documentPath`
- Unique heading anchor IDs (`b`, `b-2`, …)
- Invalid file drop toast; hardened code-copy `data-code` encoding
- Scoped `initialAnchor` scroll within viewer container

### Added
- Export pipeline unit tests; ≥60% coverage gate on `src/markdown/*`
- Lighthouse CI performance gate (≥85)
- ESLint 9 + Prettier; production `npm audit` in CI
- E2E: mermaid SVG, invalid file toast, Word/PDF export smoke

## [0.3.0] - 2026-06-14

### Added
- M3 polish: DOMPurify sanitization, ErrorBoundary, Mermaid pan/zoom lightbox
- Playwright E2E smoke tests (task-37)
- Lighthouse perf check script (task-38)
- Accessibility labels on toolbar and lightboxes

## [0.2.0] - 2026-06-14

### Added
- MVP viewer: drag-and-drop, GFM, syntax highlighting, TOC, Mermaid, Word/PDF export
- Component tests for MarkdownViewer and parse pipeline

## [0.1.0] - 2026-06-14

### Added
- M1 foundation: Vite scaffold, port from ACPEnhanced-Visual, modular markdown pipeline
- Sample docs in `docs/`
- GitHub Actions CI (task-36)
