# Test Baseline — Markdown-tools

**Date**: 2026-06-21  
**Version**: 0.4.1  
**Baseline for**: Pre-M8 remediation quality gate

---

## Test Counts

| Suite | Files | Tests | Status |
|-------|-------|-------|--------|
| Unit (Vitest) | 8 | 36 | ✅ All pass |
| E2E (Playwright) | 2 | 9 | ✅ All pass |
| **Total** | **10** | **45** | ✅ |

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
| Export (Word) | `test/markdown/export.test.ts` | 6 | HTML blob, filename, export ref |
| Export (DOCX) | `test/markdown/export-docx.test.ts` | 4 | Tables, code, images, mermaid, headings |
| Component | `test/components/markdown-viewer.test.tsx` | 10 | Controlled mode, mermaid, scroll, toolbar |
| SVG | `test/lib/svg-to-png.test.ts` | 3 | Canvas rendering, error handling |
| HTML Entities | `test/lib/html-entities.test.ts` | 2 | Encode/decode data attributes |
| Contract | `test/contract/props-contract.test.ts` | 4 | MarkdownViewerProps, embed API |
| E2E smoke | `e2e/smoke.spec.ts` | 8 | Empty state, file picker, mermaid, export, view source |
| E2E math | `e2e/math.spec.ts` | 1 | KaTeX render |

## Security Audit Baseline

| Tool | Threshold | Result |
|------|-----------|--------|
| `npm audit --audit-level=high --omit=dev` | No high/critical vulnerabilities | ✅ Pass (1 moderate: dompurify) |

### Dependencies with Moderate Findings (non-blocking)

| Package | Severity | Advisory |
|---------|----------|----------|
| dompurify (≤3.4.10) | moderate | DOMPurify: Permanent ALLOWED_ATTR pollution via setConfig() |
| 17 other moderate | moderate | Pre-existing, CI-accepted |

## Pre-Release Gate

Before every release, run the full suite:

```bash
npm run test:all
```

This executes: typecheck → lint → unit tests → E2E tests → security audit.

You can also run individual gates:

```bash
npm run test:security    # npm audit (high/critical only)
bash agent/scripts/acp.verify-milestone.sh M8  # 8-check milestone gate
```

## Running Tests

```bash
# Full suite (matching CI)
npm run test:all

# Individual suites
npm test                          # Unit tests
npm run test:e2e                  # E2E tests
npm run test:coverage             # Coverage report
npm run test:security             # Security audit only
npm run typecheck                 # TypeScript checks
npm run lint                      # ESLint
npm run format:check              # Prettier formatting
```
