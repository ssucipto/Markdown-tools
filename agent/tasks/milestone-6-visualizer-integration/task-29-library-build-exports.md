---
created: 2026-06-14
---

# Task 29: Vite Library Mode and Package Exports

**Milestone**: M6 | **Est**: 4h | **Depends**: task-1, task-4

## Objective

Configure dual build: standalone SPA + publishable library with `package.json` `exports`, `peerDependencies` (react, react-dom).

## Steps

1. Add Vite `build.lib` entry for `src/index.ts` exporting `MarkdownViewer` and types
2. Configure `package.json`: `"exports"`, `"main"`, `"module"`, `"types"`, `"files"`
3. Set `peerDependencies`: `react`, `react-dom` (^19)
4. Import `@markdown-tools/react/styles.css` or document CSS side-effect path
5. Verify `npm pack` produces consumable tarball

## Acceptance

- [ ] Another project can `npm install ../markdown-tools/*.tgz` and import `MarkdownViewer`
