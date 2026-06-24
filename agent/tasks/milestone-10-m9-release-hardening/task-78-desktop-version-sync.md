# Task 78: Desktop & Lockfile Version Sync

**Milestone**: M10 | **Est**: 1h | **Depends**: none | **FR**: FR-10.2

## Objective

Align Tauri app version with npm package **0.5.0** (or 0.5.1 after M10). Closes **CR-004**, **CR-011**.

## Steps

1. Update `src-tauri/tauri.conf.json` `version` → match `package.json`
2. Update `src-tauri/Cargo.toml` `version` if present
3. Run `npm install` if lockfile version metadata stale
4. Verify `npm run tauri build` or `tauri:dev` reports correct version in About/window title if applicable

## Verification

- [ ] `package.json`, `tauri.conf.json`, `Cargo.toml` versions consistent
- [ ] `npm run typecheck` passes

## Acceptance

- [ ] CR-004, CR-011 closed in carryovers
