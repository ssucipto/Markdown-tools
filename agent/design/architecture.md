# Markdown-tools — System Architecture

**Status**: Active  
**Last updated**: 2026-06-14  
**PRD**: [requirements.md](requirements.md)  
**ADRs**: [agent/memory/decisions.md](../memory/decisions.md)

---

## Overview

Markdown-tools is a **client-only Vite SPA** that also ships as an **embeddable React library** (`@markdown-tools/react`). All markdown parsing, Mermaid rendering, and export happen in the browser. No document content is sent to a server.

```
┌──────────────────────────────────────────────────────────────────┐
│  Standalone app (Vite SPA)          Embed (@markdown-tools/react)│
│  ┌─────────────┐                    ┌─────────────────────────┐  │
│  │ App shell   │                    │ ACPEnhanced-Visual      │  │
│  │ DnD + picker│                    │ DocsViewerEmbed wrapper │  │
│  └──────┬──────┘                    │ listDocs/readDoc server │  │
│         │ props                     └───────────┬─────────────┘  │
│         ▼                                       │ props          │
│  ┌──────────────────────────────────────────────▼──────────────┐  │
│  │ MarkdownViewer + Toolbar + TOC + MermaidLightbox            │  │
│  │ markdown/parse · renderMermaid · exportWord · exportPdf   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│         │ FileReader / drag-drop (standalone) or injected content │
└──────────────────────────────────────────────────────────────────┘
```

---

## Module boundaries

| Module | Responsibility |
|--------|----------------|
| `src/components/MarkdownViewer.tsx` | Layout, state, drag-drop, wires hooks |
| `src/components/TableOfContents.tsx` | TOC UI + scroll spy |
| `src/components/MermaidLightbox.tsx` | Diagram zoom overlay |
| `src/components/Toolbar.tsx` | Theme, font, export actions |
| `src/hooks/useMarkdownDocument.ts` | `content`, `path`, `droppedRef` |
| `src/markdown/parse.ts` | marked pipeline → HTML + TOC |
| `src/markdown/renderMermaid.ts` | Async mermaid lifecycle |
| `src/markdown/exportWord.ts` | DOM clone + PNG diagrams → .doc blob |
| `src/markdown/exportPdf.ts` | Print window with styles |
| `src/lib/svg-to-png.ts` | Canvas SVG rasterization |
| `src/styles/prose-doc.css` | Typography, mermaid, print CSS |
| `src/index.ts` | Library entry — exports `MarkdownViewer`, types (M6) |
| `src/types/viewer.ts` | `MarkdownViewerProps`, `DocFile` embed contract (M6) |

---

## Rendering pipeline

Order is **fixed** (regression risk if changed):

1. `marked({ breaks: true, gfm: true })`
2. `extractMermaid()` — before code block enhancement
3. `enhanceCodeBlocks()` — language badge + copy UI
4. `wrapTables()`
5. `addAnchors()` — IDs + TOC metadata
6. Memoized `innerHtml` → `dangerouslySetInnerHTML`
7. `renderMermaid()` in `useEffect` — lazy `import('mermaid')`

---

## State management

- **No global store** — local React state in `MarkdownViewer` + `useMarkdownDocument`
- **Theme/font** — component state; optional `sessionStorage`
- **Mermaid SVG** — must not re-apply innerHTML on unrelated re-renders (export toast, etc.)

---

## Port provenance

One-time vendor copy from `ACPEnhanced-Visual` v1.5.4:

- `src/components/DocsViewer.tsx` → split into modules above
- `src/lib/svg-to-png.ts` → verbatim
- `src/styles.css` (prose section) → `prose-doc.css`

No runtime dependency on sibling repo for **standalone** use (see ADR-002). **ACPEnhanced-Visual** consumes `@markdown-tools/react` after M6 (ADR-006).

---

## Dual build (M1 scaffold → M6 publish)

| Mode | Vite config | Output | Consumer |
|------|-------------|--------|----------|
| App | default `build` | `dist/` SPA | Standalone markdown-tools |
| Library | `build.lib` + `src/index.ts` | ESM + types | acp-visualizer, third parties |

- `peerDependencies`: `react`, `react-dom`
- CSS: `@markdown-tools/react/styles.css` side-effect import
- Embed API: controlled props only — no `listDocs` / `readDoc` inside package

---

## Future architecture (M4+)

- **Folder browser**: File System Access API (client-only), standalone app only — **not** used by visualizer embed (server adapter via props)
- **DOCX**: `html-to-docx` or `docx` in `exportWord.ts` path
- **M5 Tauri**: WebView loads `dist/`; Rust shell for file argv and associations

---

## Related documents

- [requirements.md](requirements.md) — PRD and product decisions
- [milestone-1-foundation.md](../milestones/milestone-1-foundation.md) — first implementation phase
- [milestone-6-visualizer-integration.md](../milestones/milestone-6-visualizer-integration.md) — npm embed for acp-visualizer
