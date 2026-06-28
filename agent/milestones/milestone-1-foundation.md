# Milestone 1: Foundation & Component Port

<!-- @acp.meta.milestone
topic: foundation, vite, port, acp-enhanced-visual
description: Scaffold Vite React app and port core viewer assets from ACPEnhanced-Visual
tasks: task-1..task-6
spec: agent/design/requirements.md
status: completed
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Stand up the Markdown-tools application shell and port reusable assets from ACPEnhanced-Visual v1.5.4.  
**Duration**: 1 week  
**PRD phase**: Phase 0

---

## Overview

Greenfield scaffold at repo root (`src/`, `package.json`, Vitest). One-time vendor copy from `C:\Project\ACP\ACPEnhanced-Visual`: `svg-to-png.ts`, `prose-doc` CSS, and refactor `DocsViewer.tsx` into modular `src/markdown/*` + `src/components/*`.

No feature-complete viewer yet — this milestone delivers buildable app + extracted modules + test harness.

---

## Deliverables

### 1. Application scaffold
- Vite 6 + React 19 + TypeScript + Tailwind CSS 4
- `npm run dev`, `build`, `test`, `typecheck` scripts
- Root `.gitignore` for `node_modules`, `dist`

### 2. Ported assets
- `src/lib/svg-to-png.ts` (from source)
- `src/styles/prose-doc.css` (extracted from source `styles.css`)
- `src/markdown/parse.ts`, `renderMermaid.ts`, `exportWord.ts`, `exportPdf.ts` (extracted)
- `src/components/MarkdownViewer.tsx` shell (split from DocsViewer)

### 3. Project identity & fixtures
- `agent/core/identity.yml` updated for Markdown-tools
- `docs/sample-*.md` fixture files (basic, gfm, code, mermaid)
- Vitest + Testing Library setup ported from source

---

## Success Criteria

- [ ] `npm install && npm run build` succeeds
- [ ] `npm test` runs (may have skipped/pending tests until M2)
- [ ] `src/lib/svg-to-png.ts` and `src/markdown/parse.ts` exist with unit tests
- [ ] No runtime dependency on sibling `ACPEnhanced-Visual` repo
- [ ] README documents dev setup

---

## Tasks

1. [Task 1](../tasks/milestone-1-foundation/task-1-scaffold-vite-app.md) — Scaffold Vite React TypeScript Tailwind
2. [Task 2](../tasks/milestone-1-foundation/task-2-port-svg-and-styles.md) — Port svg-to-png and prose-doc CSS
3. [Task 3](../tasks/milestone-1-foundation/task-3-extract-markdown-pipeline.md) — Extract markdown parse pipeline
4. [Task 4](../tasks/milestone-1-foundation/task-4-split-docs-viewer-components.md) — Split DocsViewer into components
5. [Task 5](../tasks/milestone-1-foundation/task-5-project-identity-and-vitest.md) — Update identity.yml and Vitest setup
6. [Task 6](../tasks/milestone-1-foundation/task-6-sample-doc-fixtures.md) — Create sample markdown fixtures
7. [Task 36](../tasks/milestone-1-foundation/task-36-early-ci-pipeline.md) — Early CI pipeline (GitHub Actions)

---

## Risks

| Risk | Mitigation |
|------|------------|
| Port breaks subtle Mermaid ordering | Preserve `extractMermaid` → `enhanceCodeBlocks` order; add regression tests in M2 |
| Windows path issues in port scripts | Use Git Bash / cross-platform paths in docs |

**Next Milestone**: [M2 — MVP Markdown Viewer](milestone-2-mvp-viewer.md)  
**Blockers**: None
