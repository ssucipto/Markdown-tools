# Task 63: CLI Improvement — Built Binary Support

**Milestone**: M8 | **Est**: 2h | **Depends**: task-61, task-62  
**Audit**: AUDIT-006-F4, F5

## Objective
Make `markdown-tools open <file.md>` work with the production Tauri binary when available, and provide a clear error when Rust is missing.

## Steps
1. Update `bin/markdown-tools.mjs`:
   - Add detection for built Tauri binary (`src-tauri/target/release/app` on macOS/Linux, `src-tauri/target/release/app.exe` on Windows)
   - If built binary exists, launch it directly: `<binary> <file.md>`
   - If only Tauri dev is available, fall back to current `npx tauri dev -- <file>` behaviour
   - If neither Rust nor a built binary exists, print a clear error: "Desktop app not built. Run 'npm run tauri:build' first, or use 'markdown-tools dev' for the browser version."
2. Add `--help` output that clearly distinguishes dev vs production modes
3. Update `docs/user-guide.md` CLI reference section to reflect the new behaviour
4. Test both paths (built binary present / absent)

## Security & Error-Handling Considerations
- Validate that file path argument does not contain shell injection characters before passing to spawn
- Use `spawn` (not `exec`) to avoid command injection — already implemented, verify
- Ensure error messages do not leak internal paths unnecessarily
- Handle SIGINT/termination gracefully when child process is running

## Acceptance
- [ ] `markdown-tools open file.md` launches the built binary when it exists
- [ ] `markdown-tools open file.md` falls back to tauri dev when no built binary
- [ ] `markdown-tools open file.md` prints a helpful message without crashing when Rust is missing and no built binary exists
- [ ] Shell injection characters in file path are handled safely
- [ ] No breaking changes to CLI interface (`markdown-tools dev` unchanged)
