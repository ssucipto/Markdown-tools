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

- date: 2026-06-28
  name: sync-marker-status-alignment-first
  task_type: documentation-sync
  description: >
    During /acp-sync, run the meta-scan (acp.meta-scan.sh) first and align all
    milestone marker status fields before comparing docs to code. Stale marker
    statuses (e.g., draft/active when the milestone is actually completed) create
    noise during the comparison phase. Fixing them early gives a cleaner drift diff
    and prevents duplicate findings.
  code_ref: agent/scripts/acp.meta-scan.sh, agent/milestones/*.md
  template: |
    # In /acp-sync, always run Step 1.3 (meta-scan) before Step 5 (compare):
    1. acp.meta-scan.sh agent/ → parse status fields
    2. Cross-check milestone marker status vs progress.yaml milestone status
    3. Fix stale markers BEFORE comparing docs to code
    4. Re-run meta-scan so downstream steps see corrected status
