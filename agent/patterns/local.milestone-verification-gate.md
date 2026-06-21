# Pattern: milestone-verification-gate

**Date**: 2026-06-21
**Task Type**: milestone-create
**Code Ref**: agent/scripts/acp.verify-milestone.sh

## Description

Every milestone must pass a build verification gate before being marked complete. This prevents AUDIT-002-F1 style recurrence where `node_modules` absence persists across milestones because nobody verifies the build.

## Template

Add this section to every milestone document:

```markdown
## Build Verification

> ⚠️ **Required before marking this milestone complete.**
>
> Run the verification gate before declaring this milestone finished:
> ```bash
> ./agent/scripts/acp.verify-milestone.sh <MILESTONE_ID>
> ```
>
> All checks must pass.
```

## Verification Script

The script at `agent/scripts/acp.verify-milestone.sh` checks:
1. `node_modules/` exists
2. `npm run build` succeeds
3. `agent/reports/` has a report for this milestone
4. Returns exit code 0 (pass) or 1 (fail)
