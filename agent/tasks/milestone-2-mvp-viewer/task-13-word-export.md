# Task 13: Word Export (.doc)

**Milestone**: M2 | **Est**: 4h | **Depends**: task-11, task-2

## Objective
FR-5.1, FR-5.2, FR-5.5 — port `exportWord` with PNG mermaid via svg-to-png.

## Steps
1. Wire toolbar “Export Word (.doc)” button
2. Clone content DOM, strip chrome, rasterize mermaid SVGs
3. Download blob `application/msword`; toast feedback
4. Label button per product decision (not “DOCX”)

## Acceptance
- [ ] Exported file opens in Word with visible diagram images from `sample-export-torture.md`
