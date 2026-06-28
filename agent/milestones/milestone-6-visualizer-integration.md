# Milestone 6: ACPEnhanced-Visual Integration

<!-- @acp.meta.milestone
topic: visualizer, npm, embed, acp-visualizer, integration
description: Publish @markdown-tools/react and replace DocsViewer in acp-visualizer
tasks: task-29..task-35
spec: agent/design/requirements.md
status: completed
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Markdown-tools becomes the **shared markdown viewer** for ACPEnhanced-Visual (`acp-visualizer`). Visualizer keeps `docs.ts` server; UI comes from `@markdown-tools/react`.  
**Duration**: 2 weeks (after M3; parallel with late M4 acceptable)  
**PRD phase**: Integration (post-MVP)  
**Depends on**: M2 (viewer features), M3 (XSS hardening before embed)

---

## Overview

Audit #1 identified that the standalone plan did not cover visualizer integration. ADR-006 defines the npm embed strategy. This milestone delivers the library build, public props API, npm publish, and visualizer migration — eliminating duplicate `DocsViewer.tsx` maintenance.

**Visualizer keeps**: `server/routes/api/docs.ts`, `listDocs` / `readDoc`, `PROGRESS_YAML_PATH`, `DOC_DIRS`.  
**Markdown-tools provides**: `<MarkdownViewer />` with injected `content`, `files`, `onSelectFile`, deep-link props.

---

## Deliverables

1. Vite library mode build with `package.json` `exports` and `peerDependencies`
2. `@markdown-tools/react` — embeddable `MarkdownViewer` + TypeScript types
3. `@markdown-tools/core` (optional split) — parse, mermaid, export modules
4. URL deep-link support (`initialFile`, `initialAnchor`) for `SourceLink` workflow
5. Storybook or embed documentation for consumers
6. Published npm package(s) with semver
7. ACPEnhanced-Visual PR: replace `DocsViewer` import; delete duplicated viewer code
8. Cross-repo contract tests

---

## Success Criteria

- [ ] `acp-visualizer` `/docs` tab renders via `@markdown-tools/react` with sidebar from `listDocs`
- [ ] `SourceLink` navigation (`?file=&anchor=`) opens correct doc and scrolls to section
- [ ] Standalone Markdown-tools app still works using same package (no duplicate logic)
- [ ] Visualizer removes `src/components/DocsViewer.tsx` and related tests after migration
- [ ] Contract tests pass in CI for both repos (or visualizer CI with pinned package version)

---

## Tasks

1. [Task 29](../tasks/milestone-6-visualizer-integration/task-29-library-build-exports.md) — Vite library mode + package exports
2. [Task 30](../tasks/milestone-6-visualizer-integration/task-30-embed-props-api.md) — MarkdownViewerProps + DocFile adapter
3. [Task 31](../tasks/milestone-6-visualizer-integration/task-31-url-deep-link.md) — URL `file` / `anchor` deep-link
4. [Task 32](../tasks/milestone-6-visualizer-integration/task-32-embed-storybook.md) — Storybook / embed docs
5. [Task 33](../tasks/milestone-6-visualizer-integration/task-33-npm-publish.md) — Publish `@markdown-tools/react`
6. [Task 34](../tasks/milestone-6-visualizer-integration/task-34-visualizer-migration.md) — ACPEnhanced-Visual DocsViewer replacement
7. [Task 35](../tasks/milestone-6-visualizer-integration/task-35-contract-tests.md) — Cross-repo contract tests

---

## Integration contract (summary)

See PRD **FR-7** and ADR-006.

| Consumer (visualizer) | Provider (markdown-tools) |
|-----------------------|---------------------------|
| `listDocs()` → `files[]` | `files` prop |
| `readDoc(path)` → `content` | `content` prop + `onSelectFile(path)` |
| `/docs?file=x&anchor=y` | `initialFile`, `initialAnchor` props |
| TanStack Start shell / nav | `showSidebar`, `theme`, `onThemeChange` props |

**Blockers**: **M3b** embed fixes (ADR-007) must complete before visualizer cutover. DOMPurify shipped in M3.  
**Next Milestone**: [M5 Native Desktop](milestone-5-native-desktop.md) (can run in parallel after M4)
