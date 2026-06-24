# Task 69: Tab Bar UI Component

**Milestone**: M9 | **Est**: 4h | **Depends**: task-68

## Objective

Build `DocumentTabs` component: tab list, active indicator, new-tab button, close button, horizontal scroll for overflow.

## Steps

1. Create `src/components/DocumentTabs.tsx`
2. Props: `tabs`, `activeTabId`, `onSelect`, `onClose`, `onNewTab`, `onDropOnTab?`
3. Tab label: truncated filename; tooltip full path
4. `data-testid="document-tab"`, `data-testid="new-tab-button"`, `data-testid="tab-bar"`
5. Keyboard: optional Ctrl+T new tab, Ctrl+W close (document in user-guide)
6. Style: match existing Toolbar zinc theme; dark mode support

## Verification

- [ ] Component renders 0, 1, and 5+ tabs without layout break
- [ ] Active tab visually distinct
- [ ] Close button does not trigger tab select (stopPropagation)
- [ ] Unit test: render + click handlers

## Acceptance

- [ ] Accessible: tabs use `role="tablist"` / `role="tab"` where appropriate
- [ ] New tab button always visible when ≥1 tab open
