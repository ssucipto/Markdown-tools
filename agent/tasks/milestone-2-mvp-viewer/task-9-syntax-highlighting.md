# Task 9: Syntax Highlighting

**Milestone**: M2 | **Est**: 5h | **Depends**: task-8

## Objective
Implement FR-2.2 — close M37 gap; highlight 10 languages via lowlight + marked hook.

## Steps
1. Register lowlight languages: js, ts, bash, yaml, json, md, css, html, python, sql
2. Integrate with marked `highlight` option or post-process code blocks
3. Add highlight CSS theme (github / github-dark for dark mode)
4. Language badge in code block header (port `enhanceCodeBlocks` or replace with React)

## Acceptance
- [ ] `sample-code.md` shows colored tokens in at least 3 languages
