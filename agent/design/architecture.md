# Markdown-tools — System Architecture

**Status**: Active  
**Last updated**: 2026-06-14  
**PRD**: [requirements.md](requirements.md)  
**ADRs**: [agent/memory/decisions.md](../memory/decisions.md)

---

## Overview

Markdown-tools is a **client-only Vite SPA**. All markdown parsing, Mermaid rendering, and export happen in the browser. No document content is sent to a server.

```
┌─────────────────────────────────────────────────────────┐
│  Browser (React 19)                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │ Markdown    │  │ markdown/    │  │ lib/          │  │
│  │ Viewer UI   │──│ parse        │──│ svg-to-png    │  │
│  │ + Toolbar   │  │ renderMermaid│  │               │  │
│  │ + TOC       │  │ export*      │  └───────────────┘  │
│  └─────────────┘  └──────────────┘                      │
│         │ FileReader / drag-drop                        │
│         ▼                                               │
│    Local .md files (user disk)                          │
└─────────────────────────────────────────────────────────┘
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

No runtime dependency on sibling repo (see ADR-002).

---

## Future architecture (M4+)

- **Folder browser**: File System Access API (client-only), not TanStack Start server
- **DOCX**: `html-to-docx` or `docx` in `exportWord.ts` path
- **M5 Tauri**: WebView loads `dist/`; Rust shell for file argv and associations

---

## Related documents

- [requirements.md](requirements.md) — PRD and product decisions
- [milestone-1-foundation.md](../milestones/milestone-1-foundation.md) — first implementation phase
