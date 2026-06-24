# Task 77: Async File-Read Error Handling

**Milestone**: M10 | **Est**: 2h | **Depends**: none | **FR**: FR-10.1

## Objective

Eliminate unhandled promise rejections on all file-read paths in `StandaloneViewer`. Closes **CR-001**, **CR-002**, **CR-003** (review-001).

## Context

`file.text().then()` lacks `.catch`; `void loadFileIntoActiveTab(file)` swallows rejections; `handleSelectFile` uses try/finally without catch.

## Steps

1. Wrap `file.text()` in async/await with try/catch; toast on failure
2. Replace `void loadFileIntoActiveTab(...)` with awaited calls + catch at call sites (4 locations)
3. Add catch to `handleSelectFile`; show user-visible error via existing toast pattern
4. Unit test: mock `File.text()` rejection → toast invoked (if testable) or integration via handler export

## Verification

- [ ] No `void` on async load helpers
- [ ] Grep: no bare `.then()` without `.catch` on file reads
- [ ] `npm test` passes

## Acceptance

- [ ] review-001 CR-001–003 marked resolved
- [ ] Carryover CR-001–003 closed in audit-carryovers.md
