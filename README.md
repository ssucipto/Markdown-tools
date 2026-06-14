# Markdown-tools

A **desktop-first** markdown viewer and **embeddable npm library** (`@markdown-tools/react`) for [ACPEnhanced-Visual](https://github.com/ssucipto/acp-enhanced) and standalone use.

Drop `.md` files, read richly rendered GitHub-flavored preview, **Mermaid** diagrams, **KaTeX** math, and one-click **Word / DOCX / PDF** export — all client-side, no upload.

> Viewer ported from `acp-visualizer` v1.5.4 (`DocsViewer.tsx`). See [ADR-006](agent/memory/decisions.md).

**Current release**: v0.4.1 (M1–M7 complete)

## Status

| Milestone | Status |
|-----------|--------|
| M1–M3b | ✅ Foundation + audit remediation (v0.3.1) |
| M4 | ✅ Enhanced product — folder, DOCX, KaTeX, view source |
| M5 | ✅ Tauri 2 desktop + CLI |
| M6 | ✅ `@markdown-tools/react` library build |
| M7 | ✅ Audit #5 remediation — production readiness |

Track progress: [agent/progress.yaml](agent/progress.yaml)

## Features

| Feature | Status |
|---------|--------|
| Drag-and-drop + file picker | ✅ |
| Folder browser (FSA + webkitdirectory fallback) | ✅ |
| GFM, syntax highlighting, TOC | ✅ |
| Mermaid + zoom/pan lightbox | ✅ |
| KaTeX math (`$inline$`, `$$block$$`) | ✅ |
| Word (`.doc`) + DOCX + PDF export | ✅ |
| View source toggle | ✅ |
| DOMPurify XSS hardening | ✅ |
| Embed props for acp-visualizer | ✅ |
| npm package `@markdown-tools/react` | ✅ publish-ready |
| Tauri desktop + `.md` file associations | ✅ |

## Quick start

```bash
git clone <repo-url> markdown-tools
cd markdown-tools
npm install
npm run dev
```

Open `http://localhost:5173`, drop a `.md` file or use 📂 / 📁.

### Desktop (Tauri)

```bash
npm run tauri:dev          # Dev with hot reload
npm run tauri:build        # Native installer
markdown-tools open README.md
```

### Library consumers

```bash
npm run build:lib
npm pack --dry-run
```

## Development

```bash
npm run dev           # Vite dev server
npm run build         # SPA production build
npm run build:lib     # @markdown-tools/react library build
npm run test          # Vitest unit + contract tests
npm run test:coverage # Coverage gate: ≥60% on src/markdown/*
npm run test:e2e      # Playwright smoke tests
npm run typecheck
npm run lint
npm run format:check
npm run perf:check    # Lighthouse ≥85 gate
```

### CI (GitHub Actions)

| Job | Checks |
|-----|--------|
| `build-test` | typecheck, lint, format, audit, unit tests, coverage, SPA build |
| `lib-pack` | `build:lib` + `npm pack --dry-run` |
| `e2e` | Playwright smoke (mermaid, export, view source, KaTeX) |
| `lighthouse` | Performance ≥85 |

![CI](https://github.com/ssucipto/markdown-tools/actions/workflows/ci.yml/badge.svg)

## Architecture

```
src/
├── components/MarkdownViewer.tsx   # Shell + embed props
├── components/StandaloneViewer.tsx # SPA with folder browser
├── hooks/useFolderBrowser.ts       # FSA + webkitdirectory
├── hooks/useTauriFileOpen.ts       # Desktop file open events
├── markdown/parse.ts               # marked → DOMPurify → KaTeX
├── markdown/exportDocx.ts          # True .docx export
├── markdown/exportWord.ts          # .doc HTML export
├── markdown/exportPdf.ts           # Print window helper
├── index.ts                        # Library entry (@markdown-tools/react)
└── types/viewer.ts                 # MarkdownViewerProps
```

Details: [agent/design/requirements.md](agent/design/requirements.md) · [docs/embed-api.md](docs/embed-api.md)

## Embed API

```tsx
import { MarkdownViewer, parseDocsSearchParams } from '@markdown-tools/react'
import '@markdown-tools/react/styles.css'

<MarkdownViewer
  content={markdown}
  documentPath="docs/readme.md"
  files={docFiles}
  onSelectFile={(path) => loadDoc(path)}
  theme="dark"
  onThemeChange={setTheme}
  initialFile="agent/design/requirements.md"
  initialAnchor="fr-7"
  showSidebar
/>
```

URL routing: `parseDocsSearchParams('?file=docs/a.md&anchor=intro')`

## Security

- **Untrusted input**: Dropped/opened files sanitized with **DOMPurify** after parsing.
- **No upload**: Content stays in the browser.
- **No inline handlers**: Code copy uses `data-code` + React delegation.
- **KaTeX**: Math extracted before parse; fenced code protected from math transforms.

## ACPEnhanced-Visual integration

1. ~~M3b embed fixes~~ ✅
2. ~~M6 publish `@markdown-tools/react`~~ ✅
3. **Next**: Execute [visualizer-migration.md](docs/visualizer-migration.md) in ACPEnhanced-Visual repo

## Known limitations

1. PDF: browser print dialog (allow popups)
2. View-only — no editor
3. DOCX: KaTeX exports as `[math]` text placeholder (no OMML yet)
4. Tauri `tauri:build` requires Rust toolchain locally

## ACP workflow

- `/acp-proceed` — implement next task
- `/acp-status` — project snapshot
- `/acp-audit` — quality reports in `agent/reports/`

## License

MIT — see [LICENSE](LICENSE)
