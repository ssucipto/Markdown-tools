# Task 69: Tab Bar UI Component

**Milestone**: M9 | **Est**: 4h | **Depends**: task-68

## Objective

FR-9.1 — Build `DocumentTabs` component: tab list, active indicator, new-tab button, close button, horizontal scroll for overflow.

## Steps

1. Create `src/components/DocumentTabs.tsx`
2. Props: `tabs`, `activeTabId`, `onSelect`, `onClose`, `onNewTab`, `onDropOnTab?`, optional `appTitle` for merged chrome row
3. Tab label: truncated filename; `title` attribute for full path
4. `data-testid="document-tab"`, `data-testid="new-tab-button"`, `data-testid="tab-bar"`
5. Keyboard: Ctrl+T new tab, Ctrl+W close active (document in user-guide)
6. **Lite/airy styling** (see design §Visual design):
   - `h-10`, zinc borders/backgrounds
   - Active: `border-b-2` indicator, not filled pill
   - Close `×` visible on hover/focus only
   - `+` as minimal text/icon button

## Verification

- [ ] Component renders 0, 1, and 5+ tabs without layout break
- [ ] Active tab visually distinct with bottom border only
- [ ] Close button does not trigger tab select (stopPropagation)
- [ ] Unit test: render + click handlers

## Acceptance

- [ ] Accessible: `role="tablist"` / `role="tab"` / `aria-selected`
- [ ] New tab button visible in tab row
- [ ] Full visual polish may continue in task-76
