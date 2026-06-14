---
created: 2026-06-14
---

# Task 3: Extract Markdown Parse Pipeline

**Milestone**: M1 | **Estimated Time**: 6 hours | **Depends on**: task-2

## Objective

Extract `wrapTables`, `extractMermaid`, `addAnchors`, `enhanceCodeBlocks`, and `marked` config from `DocsViewer.tsx` into `src/markdown/parse.ts`.

## Steps

1. Read source `DocsViewer.tsx` helper functions
2. Create `src/markdown/parse.ts` exporting `markdownToHtml(markdown: string): { html, toc }`
3. Preserve order: `extractMermaid` before `enhanceCodeBlocks`
4. Add unit tests: tables wrapped, mermaid containers, TOC entries from h1–h3

## User-Observable Acceptance

- [ ] `npm test` passes parse pipeline tests with sample markdown strings

## Verification

- [ ] `marked` configured with `{ breaks: true, gfm: true }`

**Next Task**: task-4-split-docs-viewer-components.md
