# Architecture Decision Records (ADR Log)
# Loaded by section (ADR ID) only — never fully loaded

## ADR-001 | 2026-06-14 | Vite SPA client-only (no TanStack Start SSR)

**Status**: Accepted

**Context**: ACPEnhanced-Visual uses TanStack Start with server functions (`docs.ts`) for filesystem markdown listing. Markdown-tools targets drag-and-drop first; SSR adds complexity (Windows workarounds, server deploy).

**Decision**: Build as **Vite 6 + React 19 SPA**. No SSR for MVP through M4. Folder browser in M4 uses File System Access API client-side.

**Consequences**:
- (+) Faster port, simpler CI, matches primary DnD workflow
- (+) No `PROGRESS_YAML_PATH` or ACP server coupling
- (−) No server-side project doc scan without M4 client APIs
- (−) SEO irrelevant for local tool

**Alternatives rejected**: Full TanStack Start port (Option C in audit); Express file API (Option B) deferred to M4 only if FS API insufficient.

---

## ADR-002 | 2026-06-14 | One-time vendor copy from ACPEnhanced-Visual

**Status**: Accepted

**Context**: Viewer code lives in sibling repo `C:\Project\ACP\ACPEnhanced-Visual`. Need standalone product releases.

**Decision**: **Vendor copy once** at M1 from `acp-visualizer` v1.5.4 (`DocsViewer.tsx`, `svg-to-png.ts`, styles, tests). Markdown-tools owns forked code thereafter. No npm dependency on `acp-visualizer`.

**Consequences**:
- (+) Independent versioning and CI
- (+) No submodule or monorepo sync burden
- (−) Manual cherry-pick if upstream visualizer fixes bugs
- (−) Record provenance in README and this ADR

**Reference commit**: ACPEnhanced-Visual v1.5.4 (package.json version).

**Amendment (2026-06-14)**: Initial port remains a one-time vendor copy (M1). **ADR-006** supersedes the “no npm dependency” consequence for the **output direction**: Markdown-tools publishes `@markdown-tools/react`; ACPEnhanced-Visual consumes it and deletes duplicated `DocsViewer.tsx`.

---

## ADR-003 | 2026-06-14 | marked + lazy mermaid (preserve source pipeline)

**Status**: Accepted

**Context**: Could adopt `react-markdown` + unified/rehype (Rendu pattern) or keep source `marked` sync pipeline.

**Decision**: Keep **`marked` ^18** with existing post-process helpers (`extractMermaid`, `wrapTables`, etc.). Load **`mermaid` via dynamic import** only when fences present. Add **`lowlight`** for highlighting (close M37 gap).

**Consequences**:
- (+) Lowest port risk; proven export compatibility
- (+) Memoized innerHtml pattern preserved for Mermaid stability
- (−) `dangerouslySetInnerHTML` requires DOMPurify (M3)
- (−) Less extensible than unified AST pipeline long-term

**Alternatives rejected**: Full migration to react-markdown/remark (rewrite export DOM cloning).

---

## ADR-004 | 2026-06-14 | View-only product; editor deferred to M5+

**Status**: Accepted

**Context**: OmniCore and others offer split-pane editing. PRD open question on edit vs view-only.

**Decision**: **View-only through M4**. Optional read-only “View source” in M4. Split-pane editor only if validated user demand — earliest M5+.

**Consequences**: See PRD Product Decisions §2.

---

## ADR-005 | 2026-06-14 | MVP Word export as HTML .doc; DOCX in M4

**Status**: Accepted

**Context**: True DOCX requires new libraries and style mapping. Source already ships HTML-as-Word with PNG diagrams.

**Decision**: MVP (M2) ships **Export Word (.doc)**. M4 adds **true .docx** as default; `.doc` remains fallback.

**Consequences**: UI must label format clearly; README lists limitation.

---

## ADR-006 | 2026-06-14 | ACPEnhanced-Visual integration via @markdown-tools/react

**Status**: Accepted

**Context**: Audit #1 found visualizer integration absent from M1–M5 plan. ACPEnhanced-Visual (`acp-visualizer`) embeds `DocsViewer.tsx` with server-side `listDocs` / `readDoc` (`server/routes/api/docs.ts`). Strategic goal: Markdown-tools becomes the **shared markdown viewer**; visualizer replaces local component with npm package.

**Decision**:

1. Publish **`@markdown-tools/react`** (and optionally `@markdown-tools/core` for parse/export modules) from this repo.
2. **Standalone app** and **embed** share the same `MarkdownViewer` component — dual Vite build (SPA + library mode).
3. **Controlled props API** — no server imports inside the package:
   - `content`, `documentPath`, `files`, `onSelectFile`, `loading`, `showSidebar`, `theme`, `initialFile`, `initialAnchor`
4. **Visualizer keeps** `docs.ts` server routes; thin embed wrapper fetches and passes props.
5. **Deep-link parity**: support `initialFile` + `initialAnchor` for `SourceLink` (`?file=&anchor=`).
6. **Migration** in M6 task-34: visualizer adds dependency, removes `DocsViewer.tsx`.

**Consequences**:
- (+) Single source of truth for viewer; bug fixes ship once
- (+) Standalone product + embed without duplicate maintenance
- (+) Semver contract for visualizer upgrades
- (−) Must design props API before M2 freeze (task-30)
- (−) Requires npm publish pipeline and cross-repo contract tests (task-35)
- (−) DOMPurify (M3) required before production visualizer embed

**Alternatives rejected**:
- Git submodule / monorepo merge (couples release cycles)
- Ongoing manual vendor copy both directions (ADR-002 only — drift risk)
- Visualizer keeps DocsViewer; Markdown-tools duplicates (rejected strategic goal)

**Related**: ADR-002 (initial port), M6 milestone, PRD FR-7.
