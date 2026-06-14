---
created: 2026-06-14
audit_ref: audit-3 E2E + docs
---

# Task 48: E2E Depth + Docs Sync

**Milestone**: M3b | **Est**: 4h | **Depends**: task-42, task-46

## Objective

Extend E2E; sync README, identity.yml, milestone checkboxes; resolve dead hooks.

## Steps

1. E2E: load `sample-mermaid.md`, assert `.mermaid-container svg` or loading→done
2. E2E: export buttons click without page error (mock print if needed)
3. README: Security section (untrusted markdown, DOMPurify, local-only)
4. Update `agent/core/identity.yml` version to match package.json
5. Wire `useMarkdownDocument` into standalone wrapper OR remove unused hooks with architecture note
6. Mark M1–M3 milestone success criteria `[x]` where verified; M3 note "strict sign-off via M3b"

## Acceptance

- [ ] `npm run test:e2e` includes mermaid + export smoke
- [ ] README documents security model
- [ ] identity.yml version 0.3.x+
