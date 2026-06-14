# Reusable Code Patterns
# Populated automatically by /acp-commit when patterns are identified
# Format: date-stamped YAML entries, max 60 days active

- date: 2026-06-14
  name: controlled-content-undefined-not-empty
  task_type: testing
  description: >
    When a parent wraps MarkdownViewer in standalone mode, do not pass content=""
    or rawMarkdown="". Empty string is defined (not undefined), so isControlled is true
    and loadFile returns early. Pass undefined until a document path exists.
  code_ref: src/components/StandaloneViewer.tsx
  template: |
    content={doc.documentPath != null ? doc.content : undefined}
    rawMarkdown={doc.documentPath != null ? doc.content : undefined}
