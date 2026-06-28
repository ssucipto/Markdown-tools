# Test Baseline — Markdown-tools

**Date**: 2026-06-24  
**Version**: 0.5.1  
**Baseline for**: Post-M10 release hardening

---

## Test Counts

| Suite | Files | Tests | Status |
|-------|-------|-------|--------|
| Unit (Vitest) | 13 | 68 | ✅ All pass |
| E2E (Playwright) | 3 | 13 | ✅ All pass |
| **Total** | **16** | **81** | ✅ |

## Coverage (src/markdown/*)

Coverage is collected via `@vitest/coverage-v8`. Run `npm run test:coverage` to get current numbers.

| Directory | Target | Status |
|-----------|--------|--------|
| `src/markdown/` | ≥60% line coverage | ✅ (PRD requirement met) |

### Test files by area

| Area | Test File | Tests | Key Coverage |
|------|-----------|-------|-------------|
| Parse pipeline | `test/markdown/parse.test.ts` | 8 | GFM, code blocks, tables, anchors, extractMermaid, DOMPurify |
| Math (KaTeX) | `test/markdown/math.test.ts` | 3 | Preprocess, restore, code-fence protection |
| Export (PDF) | `test/markdown/export.test.ts` | 2 | HTML blob, title, filename |
| Export (DOCX) | `test/markdown/export-docx.test.ts` | 1 | Tables, code, images, mermaid, headings |
| Component | `test/components/markdown-viewer.test.tsx` | 10 | Controlled mode, mermaid, scroll, toolbar |
| File explorer | `test/components/file-explorer.test.tsx` | 3 | Collapse toggle, aria-hidden |
| Document tabs | `test/components/document-tabs.test.tsx` | 3 | Tab bar render, select/close, arrow keys |
| Workspace hook | `test/hooks/useDocumentWorkspace.test.ts` | 8 | Tab open/close, path dedupe, localStorage |
| SVG | `test/lib/svg-to-png.test.ts` | 2 | Canvas rendering, error handling |
| HTML Entities | `test/lib/html-entities.test.ts` | 2 | Encode/decode data attributes |
| Save/export UX | `test/lib/saveBlob.test.ts` | 10 | saveBlob, printHtmlDocument, Tauri no-fallback |
| Contract | `test/contract/props-contract.test.ts` | 4 | MarkdownViewerProps, embed API |
| CLI smoke | `test/cli/smoke.test.ts` | 8 | --help, open errors, usage, Rust detection |
| E2E smoke | `e2e/smoke.spec.ts` | 7 | Empty state, file picker, mermaid, export, view source |
| E2E math | `e2e/math.spec.ts` | 1 | KaTeX render |
| E2E tabs | `e2e/tabs.spec.ts` | 4 | New tab, multi-tab switch, tab bar, explorer collapse |

## Security Audit Baseline

| Tool | Threshold | Result |
|------|-----------|--------|
| `npm audit --audit-level=high --omit=dev` | No high/critical vulnerabilities | ✅ Pass (dompurify patched in 0.5.1) |

### Dependencies with Moderate Findings (non-blocking)

| Package | Severity | Advisory |
|---------|----------|----------|
| dompurify | moderate | XSS bypass in older versions — pinned via overrides |
