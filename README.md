# Markdown-tools

A **desktop-first** markdown viewer: drag-and-drop `.md` files, rich GitHub-flavored preview, interactive **Mermaid** diagrams, and one-click export to **Word** and **PDF** — all in the browser, with no upload of your content.

> Viewer components ported from [ACPEnhanced-Visual](https://github.com/ssucipto/acp-enhanced) (`acp-visualizer` v1.5.4).

## Features

| Status | Feature |
|--------|---------|
| Done (M2) | Drag-and-drop + file picker for `.md` files |
| Done (M2) | GFM tables, task lists, syntax highlighting |
| Done (M2) | Table of contents + scroll spy |
| Done (M2) | Mermaid diagrams with click-to-zoom + pan |
| Done (M2) | Export Word (`.doc`) and PDF (print) |
| Done (M3) | DOMPurify XSS hardening, accessibility labels |
| Planned (M4) | Folder browser, true `.docx`, KaTeX math |
| Planned (M6) | `@markdown-tools/react` npm package for ACPEnhanced-Visual |
| Planned (M5) | Tauri native desktop app |

See [agent/progress.yaml](agent/progress.yaml) for milestone status.

## Quick start

```bash
git clone <repo-url> markdown-tools
cd markdown-tools
npm install
npm run dev
```

Open `http://localhost:5173`, then drop a `.md` file or use the 📂 button.

### Sample documents

Fixtures in `docs/`:

- `docs/sample-basic.md` — headings and lists
- `docs/sample-gfm.md` — tables and task lists
- `docs/sample-mermaid.md` — flowchart and sequence diagrams

## Development

```bash
npm run dev          # Vite dev server
npm run build        # Production build
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright smoke tests
npm run test:coverage
npm run typecheck
```

![CI](https://github.com/ssucipto/markdown-tools/actions/workflows/ci.yml/badge.svg)

## Architecture

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS 4
- **Markdown:** `marked` (GFM) + `lowlight` + DOMPurify
- **Diagrams:** `mermaid` (dynamic import)
- **Export:** HTML-as-Word + browser print-to-PDF; Mermaid rasterized via `svg-to-png`

Details: [agent/design/requirements.md](agent/design/requirements.md) · [agent/design/architecture.md](agent/design/architecture.md)

## Known limitations

1. Word export produces `.doc` (HTML), not `.docx` — until M4
2. PDF uses the browser print dialog (allow popups)
3. View-only — no in-app editing
4. Math (`$...$`) not rendered until M4
5. No native installer until M5 (Tauri)

## License

MIT (pending — align with port source license)
