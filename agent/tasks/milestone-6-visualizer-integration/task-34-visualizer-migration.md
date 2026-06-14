---
created: 2026-06-14
---

# Task 34: ACPEnhanced-Visual DocsViewer Migration

**Milestone**: M6 | **Est**: 8h | **Depends**: task-33

## Objective

Replace `DocsViewer.tsx` in ACPEnhanced-Visual with `@markdown-tools/react` embed wrapper.

## Steps (in ACPEnhanced-Visual repo)

1. Add dependency: `"@markdown-tools/react": "^0.4.1"`
2. Create `src/components/DocsViewerEmbed.tsx` thin wrapper:
   - `listDocs()` / `readDoc()` unchanged (server)
   - Pass props to `<MarkdownViewer />`
   - Map router search `{ file, anchor }` to `initialFile` / `initialAnchor`
3. Update `src/routes/docs.tsx` to use embed wrapper
4. Delete `src/components/DocsViewer.tsx`, move tests to wrapper + package
5. Update `test/components/docs-viewer.test.tsx` to mock package or test wrapper

## Acceptance

- [ ] `/docs` tab in acp-visualizer works with published package
- [ ] `DocsViewer.tsx` removed from visualizer repo
