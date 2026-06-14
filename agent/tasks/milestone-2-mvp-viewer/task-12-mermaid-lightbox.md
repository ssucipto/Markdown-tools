# Task 12: Mermaid Click-to-Zoom Lightbox

**Milestone**: M2 | **Est**: 3h | **Depends**: task-11

## Objective
FR-4.7 — click SVG opens full-screen lightbox; Escape closes.

## Steps
1. Implement `MermaidLightbox.tsx` with `dangerouslySetInnerHTML` for SVG
2. Attach click listeners after mermaid render (port from source)
3. Overlay dismiss on backdrop click + Escape key

## Acceptance
- [ ] Clicking diagram opens zoom overlay; Escape closes it
