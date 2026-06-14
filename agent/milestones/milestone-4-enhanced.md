# Milestone 4: Enhanced Product

<!-- @acp.meta.milestone
topic: docx, folder-browser, katex, mermaid-advanced
description: Folder browser, true DOCX, KaTeX math, advanced Mermaid UX
tasks: task-20..task-25
spec: agent/design/requirements.md
status: draft
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Deliver Phase 2 product decisions — folder browsing, true DOCX, math, advanced Mermaid.  
**Duration**: 3 weeks  
**PRD phase**: Phase 2

---

## Deliverables

- Open folder / file picker browser (File System Access API + fallback)
- True `.docx` export with Word heading styles
- KaTeX math in preview (FR-2.8)
- Mermaid copy source / download SVG (FR-4.9)
- Read-only “View source” toggle (FR-2.9)
- GitHub Actions CI (typecheck, test, build)

---

## Success Criteria

- [ ] User can browse a folder of `.md` files in supported browsers
- [ ] DOCX opens in Word with H1–H6 styles and embedded diagrams
- [ ] `$E=mc^2$` renders in preview
- [ ] CI green on main branch

---

## Tasks

1. [Task 20](../tasks/milestone-4-enhanced/task-20-folder-browser.md) — Folder browser
2. [Task 21](../tasks/milestone-4-enhanced/task-21-docx-export.md) — True DOCX export
3. [Task 22](../tasks/milestone-4-enhanced/task-22-katex-math.md) — KaTeX math rendering
4. [Task 23](../tasks/milestone-4-enhanced/task-23-mermaid-copy-download.md) — Mermaid copy/download SVG
5. [Task 24](../tasks/milestone-4-enhanced/task-24-view-source-toggle.md) — View source toggle
6. [Task 25](../tasks/milestone-4-enhanced/task-25-ci-pipeline.md) — CI pipeline

**Next Milestone**: [M5 — Native Desktop](milestone-5-native-desktop.md)
