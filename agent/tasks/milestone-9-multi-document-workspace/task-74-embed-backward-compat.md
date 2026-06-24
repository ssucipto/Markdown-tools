# Task 74: Embed API Backward Compatibility

**Milestone**: M9 | **Est**: 2h | **Depends**: task-72

## Objective

FR-9.5 — Ensure `@markdown-tools/react` embed consumers see **no breaking changes** to `MarkdownViewerProps`.

## Steps

1. Confirm `MarkdownViewer` single-document controlled API unchanged
2. Update `test/contract/props-contract.test.ts` if new optional props added (none required for embed)
3. `src/index.ts` exports: do not export workspace hook unless explicitly desired (optional `useDocumentWorkspace` export — defer unless needed)
4. Update `docs/embed-api.md` — note tabs are standalone-only; embed remains single-doc
5. Run `npm run build:lib` and contract tests

## Verification

- [ ] `build:lib` succeeds
- [ ] Contract tests pass
- [ ] Embed doc states workspace is standalone feature

## Acceptance

- [ ] No peer dependency or export map changes required for consumers
- [ ] ADR-006 embed strategy still valid
