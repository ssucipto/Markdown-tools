export { exportPdfDocument } from './exportWord'

import { isTauriRuntime } from '@/lib/tauri'

/** Open a blank print window — browser fallback only; blocked in Tauri. */
export function openPrintWindow(): Window | null {
  try {
    return window.open('', '_blank', 'width=900,height=700')
  } catch {
    return null
  }
}

/** Write HTML into a top-level browser window and invoke the OS print dialog. */
export function printHtmlInWindow(printWindow: Window, html: string): boolean {
  try {
    const doc = printWindow.document
    doc.open()
    doc.write(html)
    doc.close()
    printWindow.focus()
    printWindow.addEventListener('afterprint', () => printWindow.close(), { once: true })
    window.setTimeout(() => {
      try {
        printWindow.close()
      } catch {
        // already closed
      }
    }, 60_000)
    printWindow.print()
    return true
  } catch (error) {
    console.error('[exportPdf] print in window failed:', error)
    try {
      printWindow.close()
    } catch {
      // ignore
    }
    return false
  }
}

function printHtmlInIframe(html: string): boolean {
  const iframe = document.createElement('iframe')
  iframe.setAttribute('aria-hidden', 'true')
  iframe.style.cssText =
    'position:fixed;right:0;bottom:0;width:0;height:0;border:none;visibility:hidden;'
  document.body.appendChild(iframe)

  const win = iframe.contentWindow
  const doc = win?.document
  if (!win || !doc) {
    iframe.remove()
    return false
  }

  doc.open()
  doc.write(html)
  doc.close()

  const cleanup = (): void => {
    iframe.remove()
  }

  win.addEventListener('afterprint', cleanup, { once: true })
  window.setTimeout(cleanup, 60_000)

  win.focus()
  win.print()
  return true
}

async function printHtmlInTauri(html: string): Promise<boolean> {
  try {
    const { invoke } = await import('@tauri-apps/api/core')
    await invoke('print_html_document', { html })
    return true
  } catch (error) {
    console.error('[exportPdf] Tauri native print failed:', error)
    return false
  }
}

/**
 * Print HTML for PDF export.
 * - Tauri: native hidden webview + OS print dialog (no popups).
 * - Browser: hidden iframe to avoid popup blockers.
 */
export async function printHtmlDocument(html: string): Promise<boolean> {
  if (isTauriRuntime()) {
    return printHtmlInTauri(html)
  }
  return printHtmlInIframe(html)
}

/** @deprecated Use printHtmlDocument */
export function openPdfPrintWindow(): Window | null {
  return openPrintWindow()
}

/** @deprecated Use printHtmlInWindow */
export function populateAndPrintPdf(printWindow: Window, html: string): void {
  printHtmlInWindow(printWindow, html)
}
