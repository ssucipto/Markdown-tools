# Mermaid Diagrams

## Flowchart

```mermaid
graph TD
  A[Drop .md file] --> B[Parse markdown]
  B --> C[Render Mermaid]
  C --> D[Export Word/PDF]
```

## Sequence

```mermaid
sequenceDiagram
  User->>Viewer: Open document
  Viewer->>Mermaid: Render diagrams
  Mermaid-->>Viewer: SVG
```
