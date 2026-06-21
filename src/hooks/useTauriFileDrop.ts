// Tauri file drops are handled at the Rust level (src-tauri/src/lib.rs)
// via DragDropEvent::Drop → emits open-file-content event.
// That event is caught by useTauriFileOpen in StandaloneViewer.tsx.
// Browser drops are handled by the onDrop handler in MarkdownViewer.tsx.
export {}
