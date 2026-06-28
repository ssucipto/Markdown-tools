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

- date: 2026-06-24
  name: tauri-export-native-save-and-print
  task_type: desktop-export
  description: >
    In Tauri desktop, do not use anchor download or window.open for export.
    Open the save dialog synchronously on click (acquireSaveTarget), write via
    invoke write_export_file after async prep, and print PDF via invoke
    print_html_document (hidden WKWebView). Anchor downloads and iframe print
    silently fail in WKWebView on macOS.
  code_ref: src/lib/saveBlob.ts, src/markdown/exportPdf.ts, src-tauri/src/lib.rs
  template: |
    // Save: dialog first, then async export, then Rust write
    const target = await acquireSaveTarget({ filename, mimeType, description })
    const { blob } = await exportDocxDocument(el, path)
    await commitSaveTarget(target, blob, filename)

    // PDF: invoke native print (not window.open / iframe)
    const { html } = await exportPdfDocument(el, path)
    await invoke('print_html_document', { html })
