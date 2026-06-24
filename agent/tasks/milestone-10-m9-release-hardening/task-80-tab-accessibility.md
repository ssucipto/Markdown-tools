# Task 80: Tab Accessibility (WAI-ARIA)

**Milestone**: M10 | **Est**: 3h | **Depends**: none | **FR**: FR-10.4

## Objective

Implement proper tablist pattern per WAI-ARIA. Closes **CR-006**.

## Steps

1. `DocumentTabs`: `role="tablist"`, tabs `role="tab"` with `aria-selected`, `tabIndex={0}` on active
2. Keyboard: ArrowLeft/ArrowRight move focus; Home/End; Enter/Space activate
3. Optional: implement Ctrl+T (new tab) and Ctrl+W (close tab) if documented in user-guide — or remove docs claims in task-84
4. Unit tests: keyboard navigation fires `onSelectTab` / `onCloseTab`
5. `data-testid` preserved for E2E

## Verification

- [ ] axe or manual: tab strip keyboard-operable
- [ ] `test/components/document-tabs.test.tsx` covers arrow keys

## Acceptance

- [ ] CR-006 closed
