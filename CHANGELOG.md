# Changelog

## [0.5.0] - 2026-06-24

### Added (M9 — Multi-document workspace)
- **Tab bar** — open, switch, and close multiple markdown documents in web and Tauri standalone
- **`useDocumentWorkspace` hook** — tab state, `openPathInTab`, dropped-file paths, explorer collapse persistence
- **`FileExplorer`** — shell-level collapsible folder panel (lifted out of `MarkdownViewer` for standalone)
- **`DocumentTabs`** — tab strip with drag-and-drop onto tabs
- **Lite/airy shell** — zinc palette, merged app chrome in tab bar, lighter toolbar FABs
- **Tauri** — `open-file-content` opens or focuses tabs by path
- **Optional embed props** — `onFileDrop?`, `onFullscreenChange?` (non-breaking)

### Changed
- `StandaloneViewer` is always controlled via workspace state; `showSidebar={false}` on inner viewer
- `App.tsx` — removed duplicate header; brand lives in tab bar
- E2E: `e2e/tabs.spec.ts`; smoke tests updated for shell empty state and save-picker stub

### Fixed (audit-12 remediation)
- Shell dark-mode parity: controlled theme propagated to explorer and empty state
- Zinc pass on `EmptyState`, `DragOverlay`, and `TableOfContents`
- Keyboard `[` toggles file explorer; toolbar ☰ toggle when folder open
- Dropped-file path dedup in `loadIntoActiveTab` / `loadIntoTab`
- Tab-strip invalid file drop shows toast

## [0.4.2] - 2026-06-21

### Fixed (export — desktop)
- **Word/DOCX desktop save**: native Save dialog + `write_export_file` Rust command (no fake browser download in Tauri)
- **PDF desktop export**: `print_html_document` native print via hidden webview (fixes WKWebView iframe/popup failures on macOS)
- **Browser PDF**: hidden iframe print (no popup); save picker opens before async Mermaid rasterization

### Fixed (M8 M5 Remediation)
- **M5 build verification**: `npm install`, build pipeline, tests, lint, security audit, and E2E all verified on fresh clone
- **CLI improvement**: `markdown-tools open` now detects built binary, falls back to Tauri dev shell, and gives a clear error with install instructions when Rust is missing
- **M5 milestone status**: corrected from `completed` to `needs_verification` with Rust dependency documented

### Added
- `npm run check:prereqs` — prerequisite checker script (Node, npm, Rust, platform tools)
- `agent/scripts/acp.verify-milestone.sh` — milestone completion verification gate (8 checks)
- `test/cli/smoke.test.ts` — 8 CLI integration tests
- `docs/test-baseline.md` — test counts, coverage baseline, security audit baseline
- `docs/regression-checklist.md` — pre-release verification steps and rollback procedure
- `npm run test:security` and `npm run test:all` — convenience scripts for full test suite
- `agent/reports/audit-6-m5-implementation.md` — M5 audit report

### Security
- Verified DOMPurify.sanitize() is active and not bypassed in markdown parse pipeline
- Verified `dangerouslySetInnerHTML` only in MarkdownViewer.tsx with sanitized HTML
- Verified no `console.log` leaks in production source files
- Verified no `eval()` usage in source code

## [0.4.1] - 2026-06-14

### Fixed (M7 audit remediation)
- `build:lib` — dedicated `tsconfig.lib.json`; vite-plugin-dts no longer fails on playwright.config.ts
- Folder browser 📁 visible on Firefox/Safari via webkitdirectory fallback
- KaTeX: fenced code protected from math transforms; KaTeX CSS bundled in library entry
- View source: exports use hidden rendered article; export buttons disabled in source mode
- DOCX: tables, code blocks, images, mermaid diagrams; no duplicate mermaid paragraphs
- Tauri: `tauri-plugin-single-instance` forwards file opens to running instance
- npm: removed `private`, React moved to devDependencies (peerDeps for consumers)
- Standalone file picker: `StandaloneViewer` passes `content`/`rawMarkdown` as `undefined` until `documentPath` is set (controlled-mode fix)
- E2E: `data-testid` file picker selectors; math fixture from disk; scoped locators — 9/9 Playwright tests pass

### Added
- Contract tests for public library exports and URL helper edge cases
- E2E: view source toggle, DOCX export smoke, KaTeX render smoke
- Unit tests: KaTeX code-fence guard, DOCX export fixtures
- Comprehensive [user guide](docs/user-guide.md) and README run/install documentation (web, CLI, desktop, troubleshooting)

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
