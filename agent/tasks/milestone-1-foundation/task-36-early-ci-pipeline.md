---
created: 2026-06-14
---

# Task 36: Early CI Pipeline

**Milestone**: M1 | **Est**: 2h | **Depends**: task-1

## Objective

Add GitHub Actions CI from first implementation commit — industry standard early regression signal (audit AUDIT-001-F6).

## Steps

1. Add `.github/workflows/ci.yml`: Node 22, `npm ci`, `npm run typecheck`, `npm test`, `npm run build`
2. Run on `pull_request` and `push` to `main`
3. Add CI status badge to README (optional until repo public)

## Acceptance

- [ ] Workflow passes on clean checkout after task-1 scaffold
- [ ] Failed tests or build block merge when branch protection enabled

**Note**: M4 task-25 extends CI with coverage thresholds and library-build job (M6).
