# ACP Enhanced — Agent Context Protocol

> This file is auto-loaded by GitHub Copilot, Cursor, and Claude Code.
> Do NOT add project content here. This file contains ONLY the context
> loading protocol. All content lives in agent/ subdirectories.

---

## Who You Are

You are an AI coding assistant working on this project under the
Agent Context Protocol (ACP) Enhanced framework. You have structured
access to persistent project memory, a task routing system, and a
self-improving correction layer.

<!-- TODO: Add 2-3 sentences here describing what this project is -->

---

## Context Loading Protocol

**Run this protocol at the START of every session, before any task.**

### Step 1 — Load Core (always, every session)
Read these files in order. They are small and always relevant:
1. `agent/core/identity.yml` — project identity and stack
2. `agent/core/constraints.yml` — hard rules and context budget
3. `agent/core/routing.yml` — which executor you are this session

### Step 2 — Identify Task Domain
From the developer's request, determine the task_type by reading:
`agent/routing/taxonomy.yml`

Match the request to the closest task_type entry.
If uncertain between two types, choose the one with the higher-risk executor.

### Step 3 — Load Skill (one file only)
Based on task_type, load EXACTLY ONE skill file from `agent/skills/`.
Create one skill file per domain relevant to your project (e.g. `backend.md`, `ui.md`, `deploy.md`).
Map task types → skill files in `agent/routing/taxonomy.yml`.

Do NOT load multiple skill files unless the task explicitly spans two domains.

### Step 4 — Load Working Memory (filtered)
1. Read last 3 entries from `agent/memory/sessions.md` only
2. Read `agent/memory/lessons.md` — filter to entries where
   `trigger` matches current task_type OR `priority: high`
   Load maximum 5 lesson entries.

### Step 5 — Load Reference (section only, if needed)
Only if the task requires it:
- Domain model / entity definitions → load relevant section of `agent/wiki/domain.yml`
- Architecture or integration details → load relevant section of `agent/wiki/architecture.md`
- Architecture decisions → load specific ADR from `agent/memory/decisions.md` by ID

Add your own wiki files under `agent/wiki/` as the project grows.

**Never load an entire wiki file. Load one section at a time.**

### Step 6 — Confirm and Proceed
Before starting the task, output one line:
`[ACP] Loaded: [files loaded] | est. [N] tokens | executor: [executor value]`
Then proceed with the task.

---

## Context Budget Hard Limits

Enforce these limits. If exceeded, drop lower-tier content first:
- Layer 1 (core): max 300 tokens
- Layer 2 (skills): max 500 tokens
- Layer 3 (memory + wiki): max 2,000 tokens
- Total session context: max 2,800 tokens (before task content)

---

## Correction Protocol

When the developer corrects your output, IMMEDIATELY:
1. Append to `agent/memory/lessons.md`:
```yaml
- date: [today]
  task_type: [current task type]
  mistake: [what went wrong in one sentence]
  correction: [correct behaviour]
  priority: [high if critical, normal otherwise]
```
2. Acknowledge: "[ACP] Correction logged to lessons.md"

---

## Session Commit Protocol (/acp-commit)

When developer runs /acp-commit:
1. Write session summary to `agent/memory/sessions.md` in YAML format:
```yaml
- date: [today]
  executor: [executor used]
  tasks: [list of task IDs]
  done: [kebab-case list of completed items]
  deferred: [item → task-ID for each deferred item]
  key_fact: [single most important thing learned, if any]
```
2. Check: did this session produce a reusable code pattern? If yes, append to
   `agent/memory/patterns.md`
3. Check: did you make an architectural decision? If yes, prompt:
   "An architectural decision was made: [decision]. Create ADR? (y/n)"
4. Count entries in sessions.md. If > 15, auto-compact oldest 10 entries:
   - Extract all key_facts → check if any belong in patterns.md
   - Replace the 10 entries with a single weekly summary block
5. Confirm: "[ACP] Session committed. [N] entries in sessions.md."
