---
created: 2026-06-14
---

# Task 1: Scaffold Vite React TypeScript Tailwind App

<!-- @acp.meta.task
topic: vite, react, scaffold
description: Create root package.json, Vite config, React entry, Tailwind 4
milestone: M1
design: agent/design/requirements.md
depends_on:
status: draft
updated: 2026-06-14
@acp.meta.end -->

**Milestone**: [M1 — Foundation](../milestones/milestone-1-foundation.md)  
**Estimated Time**: 4 hours

## Objective

Create the Markdown-tools application scaffold at repository root with Vite 6, React 19, TypeScript, and Tailwind CSS 4.

## Steps

1. Add `package.json` with scripts: `dev`, `build`, `preview`, `test`, `typecheck`
2. Add `vite.config.ts` with `@vitejs/plugin-react`, `@tailwindcss/vite`, Vitest config
3. Add `tsconfig.json` (strict, paths `@/*` → `src/*`)
4. Create `index.html`, `src/main.tsx`, `src/App.tsx` (placeholder “Markdown-tools”)
5. Add root `.gitignore` (`node_modules`, `dist`, `coverage`)
6. Add placeholder `src/index.ts` (library entry stub for M6 task-29)
7. Run `npm install && npm run build`

**Note (ADR-006)**: Scaffold should allow future dual build — keep `src/index.ts` as library entry; avoid coupling viewer to app-only routes.

## User-Observable Acceptance

- [ ] `npm run dev` serves app at localhost with “Markdown-tools” placeholder
- [ ] `npm run build` produces `dist/` without errors

## Verification

- [ ] TypeScript strict mode enabled
- [ ] Tailwind classes render on placeholder page

**Next Task**: [task-2-port-svg-and-styles.md](task-2-port-svg-and-styles.md)
