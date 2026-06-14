# Task 11: Mermaid Render Engine

**Milestone**: M2 | **Est**: 6h | **Depends**: task-8

## Objective
FR-4.1–4.6 — port `renderMermaid` with dynamic import, retry, loading, error fallback, theme sync.

## Steps
1. Wire `renderMermaid.ts` in useEffect after innerHtml applied
2. `mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme })`
3. Per-block loading + `.mermaid-error` fallback
4. Re-run on `dark` state change

## Acceptance
- [ ] `sample-mermaid.md` shows ≥2 rendered SVG diagrams
