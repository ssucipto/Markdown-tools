# Task 64: Verification Gate — Milestone Completion Checklist

**Milestone**: M8 | **Est**: 1h | **Depends**: None  
**Audit**: AUDIT-006-F6, AUDIT-002-F1 (permanent fix), AUDIT-007-F10

## Objective
Create a verification gate script and audit-6 report so no future milestone can be marked complete without a build verification step, and the M5 audit trail is permanent.

## Pre-Status
> ✅ Steps 2 (template update) and 3 (M5 milestone doc update) were completed during /acp-plan.
> This task focuses on the remaining implementation: verification script, audit-6 report, and carryover closure.

## Steps
1. Create `agent/scripts/acp.verify-milestone.sh`:
   - Takes a milestone ID as first argument (e.g., `./acp.verify-milestone.sh M8`)
   - Checks `node_modules/` exists (exit 1 with message if missing)
   - Runs `npm run build` (captures output, reports success/failure without side effects)
   - Checks `agent/reports/` has a report file for this milestone (e.g., `audit-*-*.md`)
   - Runs `npm test` to verify tests still pass
   - Runs `npm run typecheck` to verify no type errors
   - Returns exit code 0 (all checks pass) or 1 (any check fails) with structured summary output
   - Uses `set -euo pipefail` and ERR trap per project bash conventions
2. Create `agent/reports/audit-6-m5-implementation.md` with:
   - Full documentation of all AUDIT-006 findings (F1 through F6)
   - Reference to AUDIT-002-F1 recurrence (same root cause from M1)
   - Audit date (2026-06-21), files analyzed, recommendations
3. Update `agent/memory/audit-carryovers.md`:
   - Close AUDIT-006-F1 through F6: set `status: addressed`, `fix_applied_date: 2026-06-21`
   - Re-close AUDIT-002-F1: add `verified_in_audit: audit-7`

## Acceptance
- [ ] `agent/scripts/acp.verify-milestone.sh` exists, is executable (`chmod +x`), and reports meaningfully
- [ ] Verification script uses `set -euo pipefail` + ERR trap
- [ ] `agent/reports/audit-6-m5-implementation.md` exists with all AUDIT-006 findings
- [ ] `agent/memory/audit-carryovers.md` updated with closed AUDIT-006 entries
- [ ] Template update and M5 doc update confirmed as already done
