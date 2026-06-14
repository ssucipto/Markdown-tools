# Task 51: Documentation Sync (v0.4.x)

**Milestone**: M7 — Audit Remediation  
**Priority**: P0 (Critical)  
**Status**: pending  
**Estimated**: 2h  
**Audit**: AUDIT-005-C3, AUDIT-005-L6

## Problem

README still shows v0.3.1 and M4 as "Next"; progress claims 100% while audit found blockers.

## Acceptance Criteria

- [ ] README version, features, scripts match v0.4.0+ (folder, DOCX, KaTeX, Tauri, lib)
- [ ] M4–M6 status accurate; M7 remediation noted if not complete
- [ ] `agent/progress.yaml` `readme_version` synced
- [ ] PRD `requirements.md` planning line updated (M7, task count)
- [ ] CHANGELOG entry for M7 when tasks complete (or WIP note in plan)
- [ ] Milestone docs M4–M6 notes reflect "remediation pending" until task-60

## Verification

Manual review + `/acp-sync` checklist
