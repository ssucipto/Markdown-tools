# Markdown-tools — System Architecture

**Status**: Active  
**Last updated**: 2026-06-24 (export sync — Tauri native save/print, `saveBlob`)  
**PRD**: [requirements.md](requirements.md) v1.7.0  
**User guide**: [docs/user-guide.md](../../docs/user-guide.md)  
**ADRs**: [agent/memory/decisions.md](../memory/decisions.md)

---

## Overview

Markdown-tools is a **client-only Vite SPA** that also ships as an **embeddable React library** (`@markdown-tools/react`) and optional **Tauri 2** desktop shell. All markdown parsing, Mermaid rendering, KaTeX math, and export happen in the browser. No document content is sent to a server.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Standalone (StandaloneViewer)     Embed (@markdown-tools/react)         │
│  ┌──────────────┐                  ┌─────────────────────────┐            │
│  │ DnD + 📂📁   │                  │ ACPEnhanced-Visual    │            │
│  │ folder sidebar│                 │ DocsViewerEmbed       │            │
│  └──────┬───────┘                  │ listDocs/readDoc      │            │
│         │                          └───────────┬───────────┘            │
│         ▼                                      │ props                   │
│  ┌─────────────────────────────────────────────▼─────────────────────┐  │
│  │ MarkdownViewer + Toolbar + TOC + MermaidLightbox                  │  │
│  │ parse · math · renderMermaid · exportWord/Docx/Pdf                │  │
│  └───────────────────────────────────────────────────────────────────┘  │
│         │ FileReader / folder API (standalone) or injected content       │
└──────────────────────────────────────────────────────────────────────────┘
         │
         ▼ (optional)
┌─────────────────┐
│ Tauri 2 shell   │  .md associations, single-instance, open-file-content
└─────────────────┘
```

---

## Module boundaries

| Module | Responsibility |
|--------|----------------|
| `src/components/MarkdownViewer.tsx` | Layout, state, DnD, export, view-source, embed props |
| `src/components/StandaloneViewer.tsx` | SPA shell — folder browser, Tauri file open |
| `src/components/TableOfContents.tsx` | TOC UI + scroll spy |
| `src/components/MermaidLightbox.tsx` | Diagram zoom/pan overlay |
| `src/components/Toolbar.tsx` | Theme, font, export, folder, view-source |
| `src/hooks/useMarkdownDocument.ts` | `content`, `path`, `loadDroppedFile` (uncontrolled) |
| `src/hooks/useFolderBrowser.ts` | FSA + webkitdirectory fallback |
| `src/hooks/useTauriFileOpen.ts` | Desktop `open-file-content` events |
| `src/hooks/useToast.ts` | Toast notifications |
| `src/markdown/parse.ts` | marked pipeline → DOMPurify → KaTeX restore |
| `src/markdown/math.ts` | KaTeX preprocess/restore; code-fence protection |
| `src/markdown/highlight.ts` | lowlight syntax highlighting |
| `src/markdown/renderMermaid.ts` | Async mermaid lifecycle |
| `src/markdown/exportWord.ts` | DOM clone + PNG diagrams → `.doc` blob; `exportPdfDocument` HTML |
| `src/markdown/exportDocx.ts` | `docx` library — tables, code, images, mermaid |
| `src/markdown/exportPdf.ts` | `printHtmlDocument` — browser iframe print; Tauri `print_html_document` invoke |
| `src/lib/saveBlob.ts` | Save dialog before async prep; Tauri `write_export_file`; browser File System Access API |
| `src/lib/tauri.ts` | `isTauriRuntime()` detection |
| `src/lib/embed-url.ts` | `parseDocsSearchParams` / `buildDocsSearchParams` |
| `src/lib/mermaid-actions.ts` | Copy source + download SVG |
| `src/lib/html-entities.ts` | Safe `data-code` attributes |
| `src/lib/svg-to-png.ts` | Canvas SVG rasterization for export |
| `src/styles/prose-doc.css` | Typography, mermaid, print CSS |
| `src/index.ts` | Library entry — exports + KaTeX CSS side-effect |
| `src/types/viewer.ts` | `MarkdownViewerProps`, `DocFile` |
| `bin/markdown-tools.mjs` | CLI (`open`, `dev`) |
| `src-tauri/` | Tauri 2 native shell |

---

## Rendering pipeline

Order is **fixed** (regression risk if changed):

1. `preprocessMath()` — KaTeX placeholders; fenced/inline code protected
2. `marked({ breaks: true, gfm: true })`
3. `extractMermaid()` — before code block enhancement
4. `enhanceCodeBlocks()` — language badge + copy UI
5. `applySyntaxHighlighting()` — lowlight
6. `wrapTables()`
7. `addAnchors()` — IDs + TOC metadata (deduped per FR-8.8)
8. `DOMPurify.sanitize()` — XSS hardening
9. `restoreMath()` — inject KaTeX HTML
10. Memoized `innerHtml` → `dangerouslySetInnerHTML`
11. `renderMermaid()` in `useEffect` — lazy `import('mermaid')`

Hidden **export article** (`exportRef`) mirrors rendered HTML for Word/DOCX/PDF when view-source mode is active.

---

## State management

- **No global store** — hooks wired in `MarkdownViewer`
- **Controlled vs uncontrolled** — embed passes `content`/`files`; standalone uses `useMarkdownDocument` until a path is set
- **Theme** — controlled (`theme` + `onThemeChange`) or internal state (ADR-007)
- **Mermaid SVG** — must not re-apply innerHTML on unrelated re-renders

### StandaloneViewer controlled-mode contract (v0.4.1+)

`MarkdownViewer` treats `content !== undefined` as **controlled**. An empty string `""` is controlled, not “empty uncontrolled”.

`StandaloneViewer` must pass `content` and `rawMarkdown` only when `doc.documentPath != null`:

```tsx
content={doc.documentPath != null ? doc.content : undefined}
rawMarkdown={doc.documentPath != null ? doc.content : undefined}
```

Until a folder/Tauri path is set, the viewer stays **uncontrolled** so the 📂 file picker and drag-and-drop call `loadDroppedFile` on the internal hook. Passing `content=""` previously blocked file loads (post-M7 fix, commit `a948ac3`).

Pattern: [agent/patterns/local.controlled-content-undefined-not-empty.md](../patterns/local.controlled-content-undefined-not-empty.md)

### E2E test hooks

- `data-testid="file-picker-input"` — single-file input on `MarkdownViewer`
- `data-testid="folder-picker-input"` — folder input on `StandaloneViewer`

Playwright tests scope KaTeX/Mermaid to `main article` to avoid matching the hidden export clone.

---

## Dual build (v0.4.1)

| Mode | Command | Output | Consumer | Status |
|------|---------|--------|----------|--------|
| App | `npm run build` | `dist/` SPA | Standalone + Tauri WebView | ✅ |
| Library | `npm run build:lib` | `dist-lib/` ESM + `.d.ts` | acp-visualizer, npm consumers | ✅ |

- Entry: `src/index.ts` — `MarkdownViewer`, types, URL helpers, styles + KaTeX CSS
- Config: `vite.lib.config.ts` + `tsconfig.lib.json` (dts scoped to `src/`)
- `peerDependencies`: `react`, `react-dom`
- CSS: `@markdown-tools/react/styles.css`
- `prepack` runs `build:lib`

---

## Desktop (Tauri 2)

- WebView loads Vite `dist/` (prod) or dev URL
- `.md` file associations (Windows bundle config)
- `tauri-plugin-single-instance` — forward file opens to running window
- `tauri-plugin-dialog` + `tauri-plugin-fs` — native Save dialog and scoped writes
- Rust commands: `write_export_file` (user-selected path), `print_html_document` (hidden webview + OS print dialog)
- Frontend: `useTauriFileOpen` listens for `open-file-content` event
- Export: `acquireSaveTarget` opens Save dialog on click; `commitSaveTarget` writes via Rust (no anchor-download fallback in Tauri)
- PDF: `invoke('print_html_document')` — avoids `window.open` / iframe print (blocked in WKWebView on macOS)
- CSP tightened in `tauri.conf.json`

---

## Port provenance

One-time vendor copy from `ACPEnhanced-Visual` v1.5.4. No runtime dependency on sibling repo. **ACPEnhanced-Visual** should consume `@markdown-tools/react` per ADR-006 (migration pending in visualizer repo).

---

## Related documents

- [requirements.md](requirements.md) — PRD v1.6.0
- [docs/user-guide.md](../../docs/user-guide.md) — run, install, desktop, CLI, troubleshooting
- [docs/embed-api.md](../../docs/embed-api.md) — developer embed API
- [CHANGELOG.md](../../CHANGELOG.md) — release notes
- [milestone-7-m4-m6-audit-remediation.md](../milestones/milestone-7-m4-m6-audit-remediation.md) — production readiness gate
