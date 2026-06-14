# Task 19: Test Coverage and Export QA

**Milestone**: M3 | **Est**: 5h | **Depends**: task-13, task-14

## Objective
≥60% coverage on `src/markdown/*`; tests for svg-to-png and export mocks.

## Steps
1. Extend `markdown-viewer.test.tsx` — export buttons, mermaid error state
2. Unit tests for `svg-to-png.ts` edge cases
3. Configure vitest coverage report; fail if markdown/ below 60%

## Acceptance
- [ ] `npm test -- --coverage` meets 60% on `src/markdown/`
