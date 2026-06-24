# Task 68: Workspace State Model & Hook

**Milestone**: M9 | **Est**: 4h | **Depends**: none

## Objective

Define the multi-document workspace data model and implement `useDocumentWorkspace` hook with tab lifecycle actions. Implements FR-9.1, FR-9.5 (PRD §FR-9).

## Context

Replaces single-document `useMarkdownDocument` in standalone mode. See `agent/design/multi-document-workspace.md`. **Read-only tabs** for v0.5.0 — no dirty flag.

## Steps

1. Add `src/types/workspace.ts` — `TabDocument`, `DocumentWorkspace`, action types (no `dirty` field)
2. Implement `src/hooks/useDocumentWorkspace.ts`:
   - `openTab()` — empty tab with generated id
   - `closeTab(id)` — remove tab; activate neighbour if active closed
   - `setActiveTab(id)`
   - `loadIntoActiveTab(file | path, content)`
   - `openPathInTab(path, content)` — focus existing tab if same `documentPath` (FR-9.5)
3. Derive tab `title` from path basename or `"Untitled"`
4. Unit tests: open/close/switch, duplicate path focus, close last tab → empty workspace

## Verification

- [ ] Hook exposes stable API documented in design doc
- [ ] `test/hooks/useDocumentWorkspace.test.ts` passes (≥8 cases)
- [ ] No changes to `MarkdownViewer` props yet

## Acceptance

- [ ] Tab state is in-memory; no localStorage for tab list (session only)
- [ ] `activeTabId` references existing tab or null when workspace empty
