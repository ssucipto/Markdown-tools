# Milestone 2: MVP Markdown Viewer

<!-- @acp.meta.milestone
topic: viewer, mermaid, export, drag-drop, gfm
description: Feature-complete view-only viewer with Mermaid, TOC, and Word/PDF export
tasks: task-7..task-14
spec: agent/design/requirements.md
status: draft
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Ship view-only MVP matching PRD P0 requirements — drag-and-drop, GFM, syntax highlight, TOC, Mermaid, Word/PDF export.  
**Duration**: 2 weeks  
**PRD phase**: Phase 1

---

## Overview

Wire extracted modules into a working `MarkdownViewer` at app root route. Achieve feature parity with ACPEnhanced-Visual `DocsViewer` for all P0 functional requirements (FR-1.1–1.3, FR-2.1–2.4, FR-3.1–3.6, FR-3.9, FR-4.1–4.7, FR-5.1–5.5, FR-6.1–6.3).

---

## Deliverables

- Drag-and-drop `.md` + empty-state UX
- GFM rendering with syntax highlighting (10 languages)
- TOC sidebar with IntersectionObserver scroll spy
- Toolbar: dark/light, font S/M/L, export Word (.doc), export PDF
- Mermaid: render, loading, error fallback, theme sync, click-to-zoom
- Ported component tests passing; ≥60% coverage on `src/markdown/*`

---

## Success Criteria

- [ ] PRD acceptance criteria 1–7 pass
- [ ] `docs/sample-mermaid.md` renders ≥2 diagrams with zoom
- [ ] Word export opens in Microsoft Word with diagram PNGs
- [ ] PDF export opens print dialog with intact layout
- [ ] `npm test` passes with coverage threshold met

---

## Tasks

1. [Task 7](../tasks/milestone-2-mvp-viewer/task-7-drag-drop-file-input.md) — Drag-and-drop and file picker
2. [Task 8](../tasks/milestone-2-mvp-viewer/task-8-gfm-rendering.md) — GFM rendering and table wrappers
3. [Task 9](../tasks/milestone-2-mvp-viewer/task-9-syntax-highlighting.md) — Syntax highlighting (lowlight)
4. [Task 10](../tasks/milestone-2-mvp-viewer/task-10-toc-and-toolbar.md) — TOC, scroll spy, toolbar controls
5. [Task 11](../tasks/milestone-2-mvp-viewer/task-11-mermaid-engine.md) — Mermaid render engine
6. [Task 12](../tasks/milestone-2-mvp-viewer/task-12-mermaid-lightbox.md) — Mermaid click-to-zoom lightbox
7. [Task 13](../tasks/milestone-2-mvp-viewer/task-13-word-export.md) — Word export (.doc)
8. [Task 14](../tasks/milestone-2-mvp-viewer/task-14-pdf-export.md) — PDF export (print)

**Next Milestone**: [M3 — Polish & Security](milestone-3-polish.md)
