# Pattern: tauri-export-native-save-and-print

**Date**: 2026-06-24  
**Task Type**: desktop-export  
**Code Ref**: src/lib/saveBlob.ts, src/markdown/exportPdf.ts, src-tauri/src/lib.rs

## Description

In Tauri desktop, do not use anchor download or `window.open` for export. Open the save dialog synchronously on click (`acquireSaveTarget`), write via `invoke('write_export_file')` after async prep, and print PDF via `invoke('print_html_document')` (hidden WKWebView). Anchor downloads and iframe print silently fail in WKWebView on macOS.

## Template

```typescript
// Save: dialog first, then async export, then Rust write
const target = await acquireSaveTarget({ filename, mimeType, description })
const { blob } = await exportWordDocument(el, path)
await commitSaveTarget(target, blob, filename)

// PDF: invoke native print (not window.open / iframe)
const { html } = await exportPdfDocument(el, path)
await invoke('print_html_document', { html })
```
