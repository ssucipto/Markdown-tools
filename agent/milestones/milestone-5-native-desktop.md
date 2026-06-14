# Milestone 5: Native Desktop (Future)

<!-- @acp.meta.milestone
topic: tauri, desktop, cli
description: Tauri 2 wrapper, file associations, optional CLI — Phase 3
tasks: task-26..task-28
spec: agent/design/requirements.md
status: draft
updated: 2026-06-14
@acp.meta.end -->

**Goal**: Package Markdown-tools as a native desktop app with offline install and file associations.  
**Duration**: 2–3 weeks (after M4)  
**PRD phase**: Phase 3

---

## Overview

Deferred until M4 ships. Wrap existing Vite SPA in **Tauri 2** (not Electron). Add optional CLI `markdown-tools open <file.md>`. Split-pane editor remains optional and out of scope unless user demand emerges.

---

## Deliverables

- Tauri 2 project integrating existing `dist/` build
- Windows `.exe` / macOS `.dmg` installers
- “Open with Markdown-tools” file association for `.md`
- Optional: CLI entry point

---

## Success Criteria

- [ ] Installed app opens dropped `.md` files without browser
- [ ] Offline use with no network required
- [ ] Same viewer feature set as web build

---

## Tasks

1. [Task 26](../tasks/milestone-5-native-desktop/task-26-tauri-scaffold.md) — Tauri 2 scaffold
2. [Task 27](../tasks/milestone-5-native-desktop/task-27-file-associations.md) — File associations and deep links
3. [Task 28](../tasks/milestone-5-native-desktop/task-28-cli-entry-point.md) — CLI `markdown-tools open`

**Blockers**: Requires M4 completion  
**Notes**: Milestone is planned only; start after Phase 2 validation.
