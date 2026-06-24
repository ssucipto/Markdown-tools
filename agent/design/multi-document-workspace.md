# Multi-Document Workspace — Design

**Status**: draft (audit-10 revisions applied)  
**Created**: 2026-06-24  
**Revised**: 2026-06-24  
**Milestone**: M9  
**PRD**: agent/design/requirements.md (FR-9)  
**Audit**: audit-11-m9-pre-impl-readiness (2026-06-24)  
**Supersedes**: single-document `useMarkdownDocument` in standalone mode

---

## Problem

Today markdown-tools opens **one document at a time** in standalone and desktop modes. Users who browse folders or work across multiple `.md` files must reload the viewer for each file. There is no tab UI, and the folder sidebar cannot be hidden for a focused reading layout.

## Proposed solution

Introduce a **document workspace** layer above `MarkdownViewer`:

1. **Tab bar** — multiple open documents; user can add a tab, switch tabs, close tabs.
2. **Per-tab context** — each tab owns `documentPath`, `content`, and `title`; drag-and-drop and file picker target the **active** tab (or the tab under the cursor when dropping on tab strip).
3. **Collapsible file explorer** — left panel at **shell level** (not inside `MarkdownViewer` for standalone); fully collapsible; state persisted in `localStorage`.
4. **Platform parity** — same UX in browser SPA and Tauri desktop; Tauri `open-file-content` opens a new tab or focuses an existing tab for the same path.
5. **Lite/airy shell** — minimal chrome, zinc palette, generous whitespace (see §Visual design).

Embed mode (`@markdown-tools/react`) remains **single-document controlled** — no breaking change to `MarkdownViewerProps`. Optional `showSidebar` + `files` props remain for embed consumers only.

## Layout (target)

Single horizontal chrome row — app brand merged into tab bar (no stacked header + tabs).

```
┌─────────────────────────────────────────────────────────────┐
│ Markdown-tools │ doc-a.md │ doc-b.md │ +                  │  ← ~40px tab row
├──────────┬──────────────────────────────────────────────────┤
│ explorer │                                                  │
│ (light)  │     MarkdownViewer (active tab only)             │
│ toggle ▸ │     Toolbar · TOC · prose content                │
└──────────┴──────────────────────────────────────────────────┘
```

## Shell architecture (standalone vs embed)

| Surface | File explorer | Tab bar | MarkdownViewer |
|---------|---------------|---------|----------------|
| **Standalone** / Tauri | `FileExplorer` in `StandaloneViewer` | `DocumentTabs` in shell | Active tab only; **no** internal `FileSidebar` |
| **Embed** | Optional via `showSidebar` + `files` props | None | Single controlled document |

**AUDIT-010-F2 fix**: Task-72 must pass `showSidebar={false}` (or omit) to `MarkdownViewer` in standalone and render explorer only in `StandaloneViewer`.

## State model

```typescript
interface TabDocument {
  id: string              // stable uuid per tab
  documentPath: string | null
  content: string
  title: string           // derived from path or "Untitled"
}

interface DocumentWorkspace {
  tabs: TabDocument[]
  activeTabId: string | null
  explorerCollapsed: boolean  // localStorage: mdtools.explorer.collapsed
}
```

**v0.5.0 scope**: Read-only tabs — **no dirty state** or close-confirmation (viewer does not persist edits to disk). View-source is read-only display.

**Hook**: `useDocumentWorkspace()` — actions: `openTab`, `closeTab`, `setActiveTab`, `loadIntoActiveTab`, `loadIntoTab(id)`, `openPathInTab(path, content)`, `setExplorerCollapsed(collapsed)`.

**Initial state** (on app load): `tabs: []`, `activeTabId: null`. Shell shows `EmptyState` until first file open or "+" creates a tab. Do not auto-create a tab on mount.

**Dropped files**: Use `documentPath: \`[dropped] ${file.name}\`` convention (matches existing `useMarkdownDocument`).

**Explorer selection**: `FileExplorer` receives `selectedPath={activeTab?.documentPath ?? null}` for row highlight.

**Standalone mode**: `StandaloneViewer` is always **controlled** — passes `content`/`documentPath` from workspace to `MarkdownViewer`; never relies on internal `useMarkdownDocument` in the viewer for standalone.

**Rendering**: Only the **active** tab mounts a full `MarkdownViewer` with `key={activeTabId}` to avoid N× Mermaid instances. Inactive tabs store markdown string only. Per-tab export uses active tab's `exportRef` via keyed remount.

**Fullscreen (FR-9.9)**: Add optional `onFullscreenChange?: (fullscreen: boolean) => void` to `MarkdownViewer` (non-breaking). Shell hides `FileExplorer` when `fullscreen === true`; tab bar stays visible.

## Drag-and-drop rules

| Target | Behaviour |
|--------|-----------|
| Active viewer drop zone | Load file into active tab |
| Tab strip drop | Load file into hovered tab, or active if none hovered |
| Empty new tab | Default target for first drop after "+" |
| Controlled embed | Unchanged — no tabs |

Tauri native drop: emit path → `openPathInTab` (new tab if path not open).

## File explorer collapse

- Toggle on explorer right edge (chevron) + toolbar icon; keyboard `[` (document in user-guide).
- Expanded width: `w-60` (240px); collapsed: `w-0` overflow hidden (not icon-only sliver).
- Persist `explorerCollapsed` in `localStorage` (non-sensitive).
- Open Folder control: explorer header primary; optional duplicate in toolbar until task-76 toolbar pass.

## Fullscreen behaviour

| Chrome | Normal | Fullscreen |
|--------|--------|------------|
| Tab bar | Visible | **Visible** (thin strip for multi-doc) |
| File explorer | Visible / collapsed | **Hidden** |
| TOC (right) | Visible / collapsible | **Hidden** |
| Floating toolbar | Visible | Visible |
| Content | Padded `p-6` | Full viewport |

Today `showFileSidebar` is gated by `!fullscreen` in `MarkdownViewer.tsx:340` — standalone explorer follows same rule at shell level.

## Visual design (lite & airy)

Design intent: **calm reading focus** — light visual weight, generous whitespace, minimal shadows. Avoid IDE-dense chrome.

### Tokens (use zinc consistently — match `App.tsx`)

| Token | Light | Dark |
|-------|-------|------|
| App/tab background | `zinc-50` | `zinc-950` |
| Border | `zinc-200` | `zinc-800` |
| Muted text | `zinc-500` | `zinc-400` |
| Active tab indicator | `border-b-2 border-zinc-900` / `border-zinc-100` | — |
| Explorer selection | `bg-zinc-100` | `bg-zinc-800` |

**Do not** use `gray-*` in new shell components. Retire uppercase section headers ("DOCUMENTS") in explorer — use sentence-case labels.

### Component guidance

| Component | Guidance |
|-----------|----------|
| **Tab bar** | `h-10`, text-first labels, truncate; close `×` on hover; `+` as text button not heavy pill |
| **Explorer** | Sentence-case file list; `py-1.5 px-3` rows; no blue-900 selection blocks |
| **App chrome** | Merge brand into tab row; remove duplicate `App.tsx` header bar in task-72/76 |
| **Toolbar** | Reduce FAB weight: `w-8 h-8 shadow-sm` or slim top icon row inside viewer (task-76) |
| **Motion** | Explorer `transition-[width] duration-200 ease-out` |

Implemented primarily in **task-76** after structural tasks 69/71/72.

## Backward compatibility

| Surface | Change |
|---------|--------|
| `MarkdownViewer` props | No breaking changes |
| `StandaloneViewer` | Refactored to workspace shell |
| `FileSidebar` | Retained for embed path; standalone uses `FileExplorer` at shell |
| E2E | `data-testid` on tab bar, explorer toggle |
| Embed consumers | No action required |

## Technical decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tab content storage | In-memory only | Client-only app; no server sync |
| Active viewer instance | Single keyed `MarkdownViewer` | Mermaid/memory cost |
| Explorer location | Shell-only (standalone) | AUDIT-010-F2; embed keeps props |
| Close last tab | Empty state + new tab | Browser UX |
| Duplicate path | Focus existing tab | Avoid duplicate buffers |
| Dirty state | Omitted v0.5.0 | Read-only viewer |
| PRD FR-9 | Added before implementation | AUDIT-010-F1 |

## Risks

- **Mermaid lifecycle**: remount on tab switch — `key={activeTabId}`.
- **Controlled-mode regression**: pattern `controlled-content-undefined-not-empty`.
- **Visual clutter**: mitigated by task-76 lite/airy pass.
- **E2E flakiness**: `data-testid` + `getByRole('tab')`.

## Success criteria

- [ ] User opens 3+ markdown files in tabs (web + desktop)
- [ ] Drop file onto active tab and onto tab strip works
- [ ] Explorer collapses fully and state survives reload
- [ ] Tauri file association opens/focuses correct tab
- [ ] Embed `MarkdownViewer` API unchanged; contract tests pass
- [ ] Shell feels lite/airy — zinc tokens, single chrome row, no triple header stack
- [ ] E2E covers: new tab, switch tab, collapse explorer

## Related

- agent/milestones/milestone-9-multi-document-workspace.md
- agent/patterns/local.controlled-content-undefined-not-empty.md
- agent/reports/audit-10-m9-multi-document-workspace-plan.md
- agent/reports/audit-11-m9-pre-impl-readiness.md

## Implementation manifest (one-shot checklist)

| Action | Path |
|--------|------|
| **Create** | `src/types/workspace.ts` |
| **Create** | `src/hooks/useDocumentWorkspace.ts` |
| **Create** | `src/components/DocumentTabs.tsx` |
| **Create** | `src/components/FileExplorer.tsx` |
| **Create** | `src/components/WorkspaceShell.tsx` (optional layout wrapper; may inline in StandaloneViewer) |
| **Create** | `test/hooks/useDocumentWorkspace.test.ts` |
| **Create** | `test/components/DocumentTabs.test.tsx` (minimal) |
| **Modify** | `src/components/StandaloneViewer.tsx` — workspace shell |
| **Modify** | `src/components/MarkdownViewer.tsx` — `onFileDrop?`, `onFullscreenChange?` |
| **Modify** | `src/App.tsx` — remove duplicate header; flex `min-h-screen` shell |
| **Modify** | `e2e/smoke.spec.ts` + new `e2e/tabs.spec.ts` |
| **Modify** | `docs/user-guide.md`, `docs/embed-api.md`, `agent/design/architecture.md` |
| **Keep** | `src/components/FileSidebar.tsx` — embed path only |
