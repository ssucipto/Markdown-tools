---
created: 2026-06-14
---

# Task 4: Split DocsViewer into Components

**Milestone**: M1 | **Estimated Time**: 6 hours | **Depends on**: task-3

## Objective

Create component shells and extract export/Mermaid logic from source `DocsViewer.tsx`.

## Steps

1. Create `src/markdown/renderMermaid.ts` — port `renderMermaid` + retry logic
2. Create `src/markdown/exportWord.ts` and `exportPdf.ts` — port export functions
3. Create `src/components/MarkdownViewer.tsx` (layout shell, no full wiring yet)
4. Create stubs: `TableOfContents.tsx`, `MermaidLightbox.tsx`, `Toolbar.tsx`
5. Create `src/hooks/useMarkdownDocument.ts` for content/path state

## User-Observable Acceptance

- [ ] App imports `MarkdownViewer` without runtime errors (empty state OK)

## Verification

- [ ] No single file >300 lines except MarkdownViewer shell

**Next Task**: task-5-project-identity-and-vitest.md
