# Task 62: Prerequisite Check Script & Rust Installation Guide

**Milestone**: M8 | **Est**: 1.5h | **Depends**: task-61  
**Audit**: AUDIT-006-F2, AUDIT-007-F4, AUDIT-007-F7

## Objective
Create a comprehensive prerequisite checker script and update installation documentation so developers can self-diagnose missing tooling before attempting to build the desktop app.

## Steps

### Part A — Create prerequisite checker script
1. Create `scripts/check-prereqs.sh` with the following checks, each with clear pass/fail output and an install URL on failure:
   - `node --version` ≥ 20 (install URL: https://nodejs.org/)
   - `npm --version` works (bundled with Node.js)
   - `node_modules/` directory exists (project dependencies installed — `npm install` required)
   - `cargo --version` succeeds (Rust; install URL: https://rustup.rs/)
   - `rustc --version` succeeds (Rust; install URL: https://rustup.rs/)
   - Platform-specific: on macOS, check `xcode-select -p`; on Linux, check `pkg-config --version` and `webkit2gtk-4.1`
   - Exit code 0 if ALL checks pass, non-zero with summary of failures otherwise

### Part B — Wire into project
2. Edit `package.json` scripts block to add: `"check:prereqs": "bash scripts/check-prereqs.sh"`
   - Place it after `"perf:check"` for logical grouping

### Part C — Update documentation
3. Update `docs/user-guide.md` prerequisites section:
   - Add Rust install instructions with `rustup.rs` link
   - Add macOS `xcode-select --install` note
   - Add Windows MSVC build tools link to Tauri prerequisites
   - Add Linux webkit2gtk deps link to Tauri prerequisites
   - Cross-reference the check script: `npm run check:prereqs`
   - Add a note: "If `npm run check:prereqs` shows `node_modules/` missing, run `npm install` first."
4. Update `README.md` prerequisites table to reference `npm run check:prereqs`

## Acceptance
- [ ] `npm run check:prereqs` reports all installed tools with clear pass/fail
- [ ] On a machine without Rust, it prints: "Rust not found. Install from https://rustup.rs/"
- [ ] On a machine without `node_modules/`, it prints a clear message about running `npm install`
- [ ] Script exits with code 0 when ALL prereqs met, non-zero otherwise
- [ ] `package.json` contains the `check:prereqs` script entry
- [ ] docs/user-guide.md has clear install instructions with links to all platforms
- [ ] README cross-references the check script
