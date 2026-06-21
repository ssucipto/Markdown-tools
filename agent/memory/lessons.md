# Correction Log — Filtered by task_type before loading
# Populated automatically when developer says "log it" or "wrong, log this"
# Max 5 entries loaded per session, filtered to current task_type + priority:high

- date: 2026-06-21
  task_type: audit-run
  mistake: "M5 native desktop marked completed but `node_modules` was never installed — no dependencies available"
  correction: "Before marking any milestone complete, verify the project can actually run: `npm install && npm run build` must succeed. A M5 acceptance check should include `npm install` as a prerequisite step."
  priority: high

- date: 2026-06-21
  task_type: milestone-create
  mistake: "AUDIT-002-F1 recurred because no verification gate existed — the same 'node_modules absent' bug was 'fixed' in M1 but silently reoccurred in M5"
  correction: "All milestone templates MUST include a Build Verification section. Create agent/scripts/acp.verify-milestone.sh that checks node_modules existence, build success, and audit report presence before a milestone can be marked complete."
  priority: high

- date: 2026-06-21
  task_type: audit-run
  mistake: "M8 plan was created without task-67 for testing and security baseline — coverage baseline, regression checklist, CLI smoke tests, and security hardening were not in the original plan"
  correction: "Every milestone plan must include a testing & security task as a final gate. This task must verify: (1) coverage baseline recorded in docs/test-baseline.md, (2) npm audit with --audit-level=high, (3) regression checklist in docs/regression-checklist.md, (4) CLI smoke tests, (5) DOMPurify/console.log hardening checks, (6) a 'test:all' convenience script. Reference OWASP Top 10:2025, ISO 25010, and NIST SP 800-53 in task definitions."
  priority: high

