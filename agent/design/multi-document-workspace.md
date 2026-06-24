# Multi-Document Workspace — Design

**Status**: draft  
**Created**: 2026-06-24  
**Milestone**: M9  
**PRD**: agent/design/requirements.md (FR-9.x to be added)  
**Supersedes**: single-document `useMarkdownDocument` in standalone mode

---

## Problem

Today markdown-tools opens **one document at a time** in standalone and desktop modes. Users who browse folders or work across multiple `.md` files must reload the viewer for each file. There is no tab UI, and the folder sidebar cannot be hidden for a focused reading layout.

## Proposed solution

Introduce a **document workspace** layer above `MarkdownViewer`:

1. **Tab bar** — multiple open documents; user can add a tab, switch tabs, close tabs.
2. **Per-tab context** — each tab owns `documentPath`, `content`, and optional dirty state; drag-and-drop and file picker target the **active** tab (or the tab under the cursor when dropping on tab strip).
3. **Collapsible file explorer** — left panel (evolved from `FileSidebar`) lists folder files; fully collapsible via toggle; collapsed state persisted in `localStorage`.
4. **Platform parity** — same UX in browser SPA and Tauri desktop; Tauri `open-file-content` opens a new tab or focuses an existing tab for the same path.

Embed mode (`@markdown-tools/react`) remains **single-document controlled** — no breaking change to `MarkdownViewerProps`.

## Layout (target)

```
┌─────────────────────────────────────────────────────────────┐
│ App header                                                   │
├──────────┬──────────────────────────────────────────────────┤
│ Explorer │ [Tab A] [Tab B] [+]                              │
│ (toggle) ├──────────────────────────────────────────────────┤
│          │ MarkdownViewer (active tab only)                 │
│  📁 list │ Toolbar · TOC · content                          │
└──────────┴──────────────────────────────────────────────────┘
```

## State model

```typescript
interface TabDocument {
  id: string              // stable uuid per tab
  documentPath: string | null
  content: string
  title: string           // derived from path or "[Untitled]"
}

interface DocumentWorkspace {
  tabs: TabDocument[]
  activeTabId: string
  explorerCollapsed: boolean  // persisted localStorage key: mdtools.explorer.collapsed
}
```

**Hook**: `useDocumentWorkspace()` — actions: `openTab`, `closeTab`, `setActiveTab`, `loadIntoActiveTab`, `loadIntoTab(id)`, `openPathInTab(path, content)`.

**Rendering**: Only the **active** tab mounts a full `MarkdownViewer` (or one viewer with keyed remount on `activeTabId`) to avoid N× Mermaid instances. Inactive tabs store markdown string only.

## Drag-and-drop rules

| Target | Behaviour |
|--------|-----------|
| Active viewer drop zone | Load file into active tab |
| Tab strip drop | Load file into hovered tab, or active if none hovered |
| Empty new tab | Default target for first drop after "+" |
| Controlled embed | Unchanged — no tabs |

Tauri native drop: emit path → `openPathInTab` (new tab if path not open).

## File explorer collapse

- Toggle button on explorer edge (chevron) + optional keyboard shortcut (`[` or toolbar icon).
- When collapsed: explorer width 0; tab bar + viewer use full width.
- Persist `explorerCollapsed` in `localStorage` (non-sensitive).

## Backward compatibility

| Surface | Change |
|---------|--------|
| `MarkdownViewer` props | No breaking changes |
| `StandaloneViewer` | Refactored to use workspace |
| E2E | Update selectors for tabs; add `data-testid` on tab bar and explorer toggle |
| Embed consumers | No action required |

## Technical decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Tab content storage | In-memory only | Client-only app; no server sync |
| Active viewer instance | Single keyed `MarkdownViewer` | Mermaid/memory cost |
| Explorer vs sidebar | Rename/refactor `FileSidebar` → `FileExplorer` | Clearer product language |
| Close last tab | Show empty state + allow new tab | Matches browser UX |
| Duplicate path | Focus existing tab | Avoid duplicate buffers |

## Risks

- **Mermaid lifecycle**: remount on tab switch must reset `renderMermaid` state — use `key={activeTabId}` on viewer.
- **Controlled-mode regression**: workspace must not pass `content=""` to viewer (pattern `controlled-content-undefined-not-empty`).
- **E2E flakiness**: tab animations — use `data-testid` and `getByRole('tab')`.

## Success criteria

- [ ] User opens 3+ markdown files in tabs (web + desktop)
- [ ] Drop file onto active tab and onto tab strip works
- [ ] Explorer collapses fully and state survives reload
- [ ] Tauri file association opens/focuses correct tab
- [ ] Embed `MarkdownViewer` API unchanged; contract tests pass
- [ ] E2E covers: new tab, switch tab, collapse explorer

## Related

- agent/milestones/milestone-9-multi-document-workspace.md
- agent/patterns/local.controlled-content-undefined-not-empty.md
