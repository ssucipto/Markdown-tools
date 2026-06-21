# Task 65: Documentation & Progress Sync

**Milestone**: M8 | **Est**: 1h | **Depends**: task-61, task-62, task-63

## Objective
Update progress.yaml, user guide, README, and CHANGELOG to reflect M8 and the corrected M5 status.

## Steps
1. Update `agent/progress.yaml`:
   - Add M8 milestone entry
   - Change M5 `status: completed` → `status: needs_verification`
   - Add note to M5: "Scaffold complete. Build requires Rust (cargo/rustc). See M8 for verification and install flow."
   - Set `current_milestone: M8`
   - Add recent_work entry for audit #6 and M8 planning
   - Add M8 task entries (task-61..task-66)
   - Update `progress.overall` to reflect new work (e.g., 98% if M8 not yet done)
2. Update `docs/user-guide.md`:
   - Add cross-reference to `npm run check:prereqs` in prerequisites section
   - Add troubleshooting entry for `cargo: command not found`
   - Add "Verify your install" section with expected outputs
   - Update CLI reference to reflect task-63 improvements
3. Update `README.md` if needed — ensure it references the check script
4. Update `CHANGELOG.md`:
   ```
   ## [0.4.2] - 2026-06-21
   ### Fixed
   - M5 verification: `npm install` now runs, build pipeline verified, Rust dependency documented
   - CLI: `markdown-tools open` detects built binary, gives clear error when Rust missing
   ### Added
   - `npm run check:prereqs` — prerequisite checker script
   - `agent/scripts/acp.verify-milestone.sh` — milestone completion gate
   ```

## Acceptance
- [ ] progress.yaml accurately reflects M5 as `needs_verification`
- [ ] M8 milestone listed with 7 tasks (task-61..task-67)
- [ ] docs/user-guide.md has clear Rust troubleshooting and verify-install section
- [ ] CHANGELOG entry for v0.4.2 matches Keep a Changelog format
- [ ] All changes self-consistent (no stale references)
