# Task 66: Final Verification & Documentation Audit

**Milestone**: M8 | **Est**: 1h | **Depends**: All M8 tasks

## Objective
Run through the complete install-to-verify flow on a simulated clean state and confirm everything works end-to-end.

## Steps
1. Simulate clean state:
   ```bash
   rm -rf node_modules
   npm install
   npm run build
   npm run build:lib
   npm test
   npm run typecheck
   npm run test:e2e
   ```
2. Run `npm run check:prereqs` — confirm it detects missing Rust gracefully
3. Run `markdown-tools open docs/sample-basic.md` — confirm helpful error when Rust/built-binary missing
4. Verify all documentation is self-consistent:
   - README prerequisites match user-guide
   - user-guide CLI reference matches actual CLI behaviour
   - CHANGELOG matches progress.yaml entries
5. Run `agent/scripts/acp.verify-milestone.sh M8` — confirm it passes
6. Mark M8 complete in progress.yaml only if ALL acceptance criteria pass

## Acceptance
- [ ] Full clean-install flow passes (all builds, all tests including new security audit)
- [ ] `npm run check:prereqs` works correctly in all states (all present, some missing)
- [ ] CLI produces helpful output in all modes (binary present, dev only, no Rust)
- [ ] Documentation is self-consistent (README matches user-guide matches CHANGELOG)
- [ ] Verification script passes for M8 (`./agent/scripts/acp.verify-milestone.sh M8`)
- [ ] M8 marked complete in progress.yaml only if ALL acceptance criteria pass
