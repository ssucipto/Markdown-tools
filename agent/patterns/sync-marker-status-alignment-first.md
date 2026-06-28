# Pattern: sync-marker-status-alignment-first

**Date**: 2026-06-28
**Task Type**: documentation-sync
**Code Ref**: agent/scripts/acp.meta-scan.sh, agent/milestones/*.md

## Description
During /acp-sync, run the meta-scan (acp.meta-scan.sh) first and align all milestone marker status fields before comparing docs to code. Stale marker statuses (e.g., draft/active when the milestone is actually completed) create noise during the comparison phase. Fixing them early gives a cleaner drift diff and prevents duplicate findings.

## Template
```
# In /acp-sync, always run Step 1.3 (meta-scan) before Step 5 (compare):
1. acp.meta-scan.sh agent/ → parse status fields
2. Cross-check milestone marker status vs progress.yaml milestone status
3. Fix stale markers BEFORE comparing docs to code
4. Re-run meta-scan so downstream steps see corrected status
```
