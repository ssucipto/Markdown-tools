/** True when running inside the Tauri desktop shell (WKWebView). */
export function isTauriRuntime(): boolean {
  return '__TAURI_INTERNALS__' in window
}
