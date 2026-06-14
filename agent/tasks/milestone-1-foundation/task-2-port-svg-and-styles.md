---
created: 2026-06-14
---

# Task 2: Port svg-to-png and prose-doc CSS

**Milestone**: M1 | **Estimated Time**: 3 hours | **Depends on**: task-1

## Objective

Copy `svg-to-png.ts` verbatim and extract `.prose-doc` + mermaid + print CSS from ACPEnhanced-Visual `src/styles.css`.

## Steps

1. Copy `C:\Project\ACP\ACPEnhanced-Visual\src\lib\svg-to-png.ts` → `src/lib/svg-to-png.ts`
2. Extract lines ~18–317 from source `styles.css` → `src/styles/prose-doc.css`
3. Import `prose-doc.css` in `src/main.tsx`
4. Add unit test for `svgToPngDataUri` with minimal SVG fixture

## User-Observable Acceptance

- [ ] `src/lib/svg-to-png.ts` exists and test passes

## Verification

- [ ] No imports from ACPEnhanced-Visual package — vendored copy only

**Next Task**: task-3-extract-markdown-pipeline.md
