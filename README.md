# Markdown-tools

A **desktop-first** markdown viewer and **embeddable library** (planned: `@markdown-tools/react`) for [ACPEnhanced-Visual](https://github.com/ssucipto/acp-enhanced) and standalone use.

Drop `.md` files, read richly rendered GitHub-flavored preview, interactive **Mermaid** diagrams, and one-click **Word** / **PDF** export — all client-side, no upload.

> Viewer ported from `acp-visualizer` v1.5.4 (`DocsViewer.tsx`). See [ADR-006](agent/memory/decisions.md).

**Current release**: v0.3.1 (M1–M3b complete)

## Status

| Milestone | Status |
|-----------|--------|
| M1–M3 | ✅ Complete (v0.3.0) |
| M3b | ✅ Audit remediation (v0.3.1) — [audit-4](agent/reports/audit-4-carryover-verification.md) verified |
| **M4** | **Next** — enhanced product (folder browser, DOCX, KaTeX) |
| M6 | `@markdown-tools/react` + visualizer migration |
| M5 | Tauri native desktop |

Track progress: [agent/progress.yaml](agent/progress.yaml)

## Features

| Feature | Status |
|---------|--------|
| Drag-and-drop + file picker | ✅ |
| GFM, syntax highlighting, TOC | ✅ |
| Mermaid + zoom/pan lightbox | ✅ |
| Word (`.doc`) + PDF export | ✅ |
| DOMPurify XSS hardening | ✅ |
| Embed props for acp-visualizer | ✅ API ready (ADR-007); npm package → M6 |
| npm package `@markdown-tools/react` | 📋 M6 |

## Quick start

```bash
git clone <repo-url> markdown-tools
cd markdown-tools
npm install
npm run dev
```

Open `http://localhost:5173`, drop a `.md` file or use 📂.

### Sample documents

- [docs/sample-basic.md](docs/sample-basic.md)
- [docs/sample-gfm.md](docs/sample-gfm.md)
- [docs/sample-mermaid.md](docs/sample-mermaid.md)
- [docs/sample-export-torture.md](docs/sample-export-torture.md)

## Development

```bash
npm run dev           # Vite dev server
npm run build         # Production build
npm run test          # Vitest — 28 unit tests
npm run test:coverage # Coverage gate: ≥60% on src/markdown/*
npm run test:e2e      # Playwright — 6 smoke tests
npm run typecheck
npm run lint          # ESLint (src, test, e2e)
npm run format:check  # Prettier check
npm run perf:check    # Lighthouse ≥85 gate (build + preview + chrome-launcher)
```

### CI (GitHub Actions)

| Job | Checks |
|-----|--------|
| `build-test` | typecheck, lint, format, prod npm audit, unit tests, coverage, build |
| `e2e` | Playwright smoke (mermaid, export, invalid file) |
| `lighthouse` | Performance ≥85 via `npm run perf:check` |

![CI](https://github.com/ssucipto/markdown-tools/actions/workflows/ci.yml/badge.svg)

## Architecture

```
src/
├── components/MarkdownViewer.tsx   # Shell + embed props (ADR-006/007)
├── hooks/useMarkdownDocument.ts    # Uncontrolled doc state
├── hooks/useToast.ts               # Toast notifications
├── lib/html-entities.ts            # Safe code-copy data attributes
├── lib/svg-to-png.ts               # Mermaid → PNG for export
├── markdown/parse.ts               # marked → DOMPurify pipeline
├── markdown/highlight.ts           # lowlight syntax highlighting
├── markdown/renderMermaid.ts       # Lazy mermaid
├── markdown/exportWord.ts          # .doc export
├── markdown/exportPdf.ts           # Print window helper
└── types/viewer.ts                 # MarkdownViewerProps
```

Details: [agent/design/requirements.md](agent/design/requirements.md) (PRD v1.5) · [agent/design/architecture.md](agent/design/architecture.md)

## Embed API (for ACPEnhanced-Visual)

```tsx
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

URL shell routing (`?file=` / `?anchor=`) is M6 task-31; props above are implemented in v0.3.1.

## Security

- **Untrusted input**: Dropped/opened files are sanitized with **DOMPurify** after parsing.
- **No upload**: Content stays in the browser; no server receives document text.
- **No inline handlers**: Code copy uses `data-code` + React delegation (`html-entities.ts`), not `onclick` in HTML.
- **Embed**: Production visualizer cutover requires M6 npm publish (`@markdown-tools/react`).

## ACPEnhanced-Visual integration (roadmap)

Markdown-tools will replace `DocsViewer.tsx` in `acp-visualizer`:

1. ~~**M3b** — embed bugs (theme, toolbar, anchors, deep-link)~~ ✅ v0.3.1
2. **M6** — publish `@markdown-tools/react`; visualizer adds thin `DocsViewerEmbed` wrapper
3. Visualizer keeps server `listDocs` / `readDoc`; package receives props only

See PRD **FR-7** and [milestone-6](agent/milestones/milestone-6-visualizer-integration.md).

## Known limitations

1. Word export: `.doc` (HTML), not `.docx` until M4
2. PDF: browser print dialog (allow popups)
3. View-only — no editor
4. KaTeX math — M4
5. Native installer — M5 (Tauri)
6. v0.3.1 changes may be uncommitted locally — see [audit-4](agent/reports/audit-4-carryover-verification.md)

## ACP workflow

- `/acp-proceed` — implement next task
- `/acp-status` — project snapshot
- `/acp-audit` — quality reports in `agent/reports/`
- `/acp-sync` — align docs with code

## License

MIT (pending — align with port source)
