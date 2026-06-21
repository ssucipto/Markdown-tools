# Milestone 5: Native Desktop

<!-- @acp.meta.milestone
topic: tauri, desktop, cli
description: Tauri 2 wrapper, file associations, optional CLI — Phase 3
tasks: task-26..task-28
spec: agent/design/requirements.md
status: completed
updated: 2026-06-21
@acp.meta.end -->

**Goal**: Package Markdown-tools as a native desktop app with offline install and file associations.  
**Duration**: 2–3 weeks (after M4)  
**PRD phase**: Phase 3

---

## Overview

Wrap existing Vite SPA in **Tauri 2** (not Electron). Add CLI `markdown-tools open <file.md>`.

---

## Build Verification

> ✅ **Build-verified 2026-06-21 via M8.** `npm install`, build pipeline, tests all pass.
>
> Audit #6 (2026-06-21) findings were addressed in M8:
> - `node_modules` installed and verified
> - Rust toolchain documented with install instructions
> - Verification gate active at `agent/scripts/acp.verify-milestone.sh`
>
> See [M8 — M5 Remediation](../milestones/milestone-8-m5-remediation.md) for details.
>
> To build the desktop app:
> ```bash
> npm install
> npm run check:prereqs    # verify Rust + Node tooling
> npm run tauri:dev        # desktop window with hot reload
> npm run tauri:build      # production installer
> ```

---

## Deliverables

- Tauri 2 project integrating existing `dist/` build
- Windows `.exe` / macOS `.dmg` installers
- “Open with Markdown-tools” file association for `.md`
- CLI entry point (`bin/markdown-tools.mjs`)

---

## Success Criteria

- [ ] Installed app opens dropped `.md` files without browser (requires Rust build)
- [ ] Offline use with no network required (requires Rust build)
- [ ] Same viewer feature set as web build (requires Rust build)
- [x] **Build verification passed** (verified 2026-06-21 via M8 — npm install, build pipeline, tests all pass)

---

## Tasks

1. [Task 26](../tasks/milestone-5-native-desktop/task-26-tauri-scaffold.md) — Tauri 2 scaffold
2. [Task 27](../tasks/milestone-5-native-desktop/task-27-file-associations.md) — File associations and deep links
3. [Task 28](../tasks/milestone-5-native-desktop/task-28-cli-entry-point.md) — CLI `markdown-tools open`

**Blockers**: Requires Rust toolchain (cargo/rustc) — install via [rustup.rs](https://rustup.rs/).  
**Notes**: Scaffold complete (task-26..task-28). M7 added single-instance + CSP. See M8 for verification and install flow.
