# Pattern: controlled-content-undefined-not-empty

**Date**: 2026-06-14
**Task Type**: testing
**Code Ref**: src/components/StandaloneViewer.tsx

## Description

When a parent wraps MarkdownViewer in standalone mode, do not pass `content=""` or `rawMarkdown=""`. Empty string is defined (not undefined), so `isControlled` is true and `loadFile` returns early. Pass `undefined` until a document path exists.

## Template

```tsx
content={doc.documentPath != null ? doc.content : undefined}
rawMarkdown={doc.documentPath != null ? doc.content : undefined}
```
