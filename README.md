# Markdown-tools

A **desktop-first** markdown viewer: drag-and-drop `.md` files, rich GitHub-flavored preview, interactive **Mermaid** diagrams, and one-click export to **Word** and **PDF** — all in the browser, with no upload of your content.

> Viewer components are ported from [ACPEnhanced-Visual](https://github.com/ssucipto/acp-enhanced) (`acp-visualizer` v1.5.4).

## Features (roadmap)

| Status | Feature |
|--------|---------|
| Planned (M2) | Drag-and-drop `.md` files |
| Planned (M2) | GFM tables, task lists, syntax highlighting |
| Planned (M2) | Table of contents + scroll spy |
| Planned (M2) | Mermaid diagrams with click-to-zoom |
| Planned (M2) | Export Word (`.doc`) and PDF (print) |
| Planned (M3) | Security hardening, accessibility |
| Planned (M4) | Folder browser, true `.docx`, KaTeX math |
| Planned (M5) | Tauri native desktop app |

See [agent/progress.yaml](agent/progress.yaml) for current milestone status.

## Quick start

> **Note:** Application code is under active development (Milestone 1). Commands below apply once `package.json` exists.

```bash
git clone <repo-url> markdown-tools
cd markdown-tools
npm install
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`), then drop a `.md` file onto the viewer.

### Sample documents

After M1, fixtures live in `docs/`:

- `docs/sample-basic.md` — headings and lists
- `docs/sample-gfm.md` — tables and task lists
- `docs/sample-mermaid.md` — flowchart and sequence diagrams

## Development

```bash
npm run dev        # Vite dev server
npm run build      # Production build
npm run test       # Vitest
npm run typecheck  # tsc --noEmit
```

## Architecture

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS 4
- **Markdown:** `marked` (GFM) + `lowlight` (syntax highlight)
- **Diagrams:** `mermaid` (dynamic import)
- **Export:** HTML-as-Word + browser print-to-PDF; Mermaid rasterized via `svg-to-png`

Details: [agent/design/requirements.md](agent/design/requirements.md) · [agent/design/architecture.md](agent/design/architecture.md)

## Known limitations (MVP)

1. Word export produces `.doc` (HTML), not `.docx` — until M4
2. PDF uses the browser print dialog (allow popups)
3. View-only — no in-app editing until Phase 3 (optional)
4. Math (`$...$`) not rendered until M4
5. No native installer until M5 (Tauri)

## ACP Enhanced

This repo uses [ACP Enhanced](https://github.com/ssucipto/acp-enhanced) for agent workflow:

- `/acp-proceed` — start the next task
- `/acp-status` — project status
- `/acp-plan` — planning

Planning docs: `agent/milestones/`, `agent/tasks/`, `agent/design/requirements.md`

## License

MIT (pending — align with port source license)
