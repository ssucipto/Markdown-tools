# Changelog

## [0.4.0] - 2026-06-14

### Added (M4 Enhanced Product)
- Folder browser via File System Access API + webkitdirectory fallback
- True `.docx` export (docx library) with Word heading styles; `.doc` HTML fallback retained
- KaTeX math rendering (`$inline$`, `$$block$$`); `docs/sample-math.md` fixture
- Mermaid copy source + download SVG (container toolbar + lightbox)
- View source toggle (read-only raw markdown panel)

### Added (M5 Native Desktop)
- Tauri 2 scaffold (`npm run tauri:dev`, `npm run tauri:build`)
- `.md` file associations on Windows; CLI file open on launch
- `markdown-tools` CLI (`bin/markdown-tools.mjs`)

### Added (M6 Visualizer Integration)
- Vite library build (`npm run build:lib`) → `@markdown-tools/react`
- Package exports, peerDependencies, `prepack` script
- `parseDocsSearchParams` / `buildDocsSearchParams` embed URL helpers
- Embed API docs (`docs/embed-api.md`) + visualizer migration guide
- Contract tests for `MarkdownViewerProps` API surface

### Changed
- Standalone app uses `StandaloneViewer` with folder sidebar
- CI: library build + `npm pack --dry-run` job

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
