# Task 25: CI Pipeline Extensions

**Milestone**: M4 | **Est**: 2h | **Depends**: task-36, task-19

## Objective

Extend early CI (task-36) with coverage gates, E2E job, and library-build verification before M6 publish.

## Steps
1. Add coverage threshold enforcement to CI (align with M3 task-19)
2. Add Playwright job (from task-37) to workflow if not already merged
3. Add `npm run build:lib` job when task-29 library mode exists
4. Badge in README

## Acceptance
- [ ] CI runs typecheck, unit tests, E2E, app build, and library build on PR
