# Markdown-tools

A **desktop-first** markdown viewer and **embeddable npm library** (`@markdown-tools/react`) for [ACPEnhanced-Visual](https://github.com/ssucipto/acp-enhanced) and standalone use.

Drop `.md` files, read richly rendered GitHub-flavored preview, **Mermaid** diagrams, **KaTeX** math, and one-click **Word / DOCX / PDF** export — all client-side, no upload.

> Viewer ported from `acp-visualizer` v1.5.4 (`DocsViewer.tsx`). See [ADR-006](agent/memory/decisions.md).

**Current release**: v0.4.1 (M1–M7 complete)

---

## Contents

- [How to run](#how-to-run)
- [Features](#features)
- [Verify your install](#verify-your-install)
- [Development](#development)
- [Architecture](#architecture)
- [Embed API](#embed-api)
- [Documentation](#documentation)
- [Security](#security)
- [Known limitations](#known-limitations)

---

## How to run

**Full walkthrough**: [docs/user-guide.md](docs/user-guide.md) — prerequisites, desktop build, running from anywhere, CLI, features, troubleshooting.

### Prerequisites

| Mode | You need |
|------|----------|
| **Web app** | [Node.js](https://nodejs.org/) 20+, `npm install` |
| **Desktop (Tauri)** | Above + [Rust](https://rustup.rs/) + [platform build tools](https://v2.tauri.app/start/prerequisites/) |

### Quick start (browser) — recommended

```bash
git clone https://github.com/ssucipto/markdown-tools.git
cd markdown-tools
npm install
npm run dev
```

Open **http://localhost:5173** — drop a `.md` file or use **📂** (single file) / **📁** (folder). Files can live **anywhere on disk**; only the dev server runs from the project folder.

### Run from any folder (CLI)

One-time setup in the project clone:

```bash
npm link
```

Then from **any directory**:

```bash
markdown-tools dev                        # → http://localhost:5173
markdown-tools open path\to\document.md   # Tauri dev shell (needs Rust)
```

After `npm publish`, the same commands work via `npm install -g @markdown-tools/react`.

### Desktop installer (native app)

Requires Rust (`cargo --version` must work). On Windows, install **Visual Studio Build Tools** with **Desktop development with C++**.

```bash
npm run tauri:build
```

Install the `.msi` from `src-tauri/target/release/bundle/msi/`. Then:

- Double-click any `.md` file in Explorer
- Or run `markdown-tools open C:\path\to\file.md`

Development with hot reload:

```bash
npm run tauri:dev
```

### Production preview (no hot reload)

```bash
npm run build
npm run preview      # → http://localhost:4173
```

### Ways to run (summary)

| Command | Result | Rust? |
|---------|--------|-------|
| `npm run dev` | Browser UI, hot reload (port 5173) | No |
| `npm run preview` | Production build in browser (port 4173) | No |
| `markdown-tools dev` | Same as `npm run dev`, any cwd after `npm link` | No |
| `npm run tauri:dev` | Native window + hot reload | Yes |
| `npm run tauri:build` | OS installer + `.md` file associations | Yes |
| `markdown-tools open file.md` | Open file in Tauri dev | Yes |

---

## Status

| Milestone | Status |
|-----------|--------|
| M1–M3b | ✅ Foundation + audit remediation (v0.3.1) |
| M4 | ✅ Enhanced product — folder, DOCX, KaTeX, view source |
| M5 | ✅ Tauri 2 desktop + CLI |
| M6 | ✅ `@markdown-tools/react` library build |
| M7 | ✅ Audit #5 remediation — production readiness |

Track progress: [agent/progress.yaml](agent/progress.yaml) · Release notes: [CHANGELOG.md](CHANGELOG.md)

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

## Verify your install

Full quality gate (matches CI):

```bash
npm install          # first time only
npm test             # 36 Vitest tests (unit + contract)
npm run test:e2e     # 9 Playwright browser tests
npm run typecheck
npm run lint
npm run build        # SPA
npm run build:lib    # @markdown-tools/react library
npm pack --dry-run   # publish tarball check
```

If E2E fails with a stale server on port 4173: `CI=true npm run test:e2e`

## Development

```bash
npm run dev           # Vite dev server (port 5173)
npm run build         # SPA production build
npm run build:lib     # @markdown-tools/react library build
npm run test          # Vitest unit + contract tests (36 tests)
npm run test:e2e      # Playwright browser tests (9 tests)
npm run typecheck
npm run lint
npm run format:check
npm run perf:check    # Lighthouse ≥85 gate
```

### Library consumers

```bash
npm run build:lib
npm pack --dry-run
```

See [docs/embed-api.md](docs/embed-api.md).

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
├── markdown/math.ts                # KaTeX preprocess/restore
├── markdown/exportDocx.ts          # True .docx export
├── markdown/exportWord.ts          # .doc HTML export
├── markdown/exportPdf.ts           # Print window helper
├── index.ts                        # Library entry (@markdown-tools/react)
└── types/viewer.ts                 # MarkdownViewerProps
```

Details: [agent/design/architecture.md](agent/design/architecture.md) · [agent/design/requirements.md](agent/design/requirements.md)

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
4. Tauri build requires Rust + platform build tools (`cargo` on PATH)
5. CLI `open` uses Tauri dev — no browser-only “open file” command yet
6. `npm publish` to registry is manual after `npm login`

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/user-guide.md](docs/user-guide.md) | **Run, install, desktop, CLI, features, troubleshooting** |
| [docs/embed-api.md](docs/embed-api.md) | Embed `MarkdownViewer` in React apps |
| [docs/visualizer-migration.md](docs/visualizer-migration.md) | ACPEnhanced-Visual cutover plan |
| [CHANGELOG.md](CHANGELOG.md) | Release history |
| [agent/design/architecture.md](agent/design/architecture.md) | System design and module map |

## ACP workflow

- `/acp-proceed` — implement next task
- `/acp-status` — project snapshot
- `/acp-audit` — quality reports in `agent/reports/`

## License

MIT — see [LICENSE](LICENSE)
