import { svgToPngDataUri } from '@/lib/svg-to-png'
import { isTauriRuntime } from '@/lib/tauri'

export async function exportPdfDocument(
  el: HTMLElement,
  documentPath: string | null | undefined,
): Promise<{ html: string; title: string }> {
  const clone = el.cloneNode(true) as HTMLElement
  clone
    .querySelectorAll(
      '.heading-anchor, .code-copy-btn, .code-block-header, .mermaid-loading, .mermaid-error span:first-child',
    )
    .forEach((e) => e.remove())

  const liveSvgs = el.querySelectorAll<SVGSVGElement>('.mermaid-container svg')
  const svgs = clone.querySelectorAll<SVGSVGElement>('.mermaid-container svg')

  if (svgs.length) {
    const conversions = Array.from(svgs).map(async (svg, i) => {
      const liveSvg = liveSvgs[i] || svg
      const pngDataUri = await Promise.race([
        svgToPngDataUri(liveSvg),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
      ])
      if (pngDataUri) {
        const img = document.createElement('img')
        img.src = pngDataUri
        img.style.cssText = 'max-width:650px;width:100%;height:auto;display:block;margin:1em auto;'
        svg.replaceWith(img)
      } else {
        const note = document.createElement('p')
        note.textContent = '[Diagram: rendering unavailable]'
        note.style.cssText = 'color:#999;font-style:italic;text-align:center;padding:1em;'
        svg.replaceWith(note)
      }
    })
    await Promise.allSettled(conversions)
  }

  const name =
    documentPath
      ?.split('/')
      .pop()
      ?.replace(/^\[dropped\] /, '')
      .replace(/\.md$/, '') || 'document'
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${name}</title><style>
        body{font-family:system-ui,sans-serif;line-height:1.6;max-width:800px;margin:40px auto;color:#1f2937;padding:20px}
        h1{font-size:1.5em;margin-top:1em;page-break-before:always}h1:first-child{page-break-before:avoid}
        h2{font-size:1.25em;border-bottom:1px solid #e5e7eb;padding-bottom:.25em;page-break-after:avoid}
        h3{page-break-after:avoid}
        pre{background:#f3f4f6;padding:1em;border:1px solid #d1d5db;border-radius:4px;overflow-x:auto;font-size:.8em}
        code{font-family:monospace;font-size:.875em}
        table{border-collapse:collapse;max-width:100%;page-break-inside:avoid}th,td{border:1px solid #d1d5db;padding:4px 8px;text-align:left;word-break:break-word}
        blockquote{border-left:3px solid #3b82f6;padding-left:1em;color:#4b5563;margin:1em 0}
        img{max-width:100%}svg{max-width:100%;height:auto;display:block;margin:1em 0;page-break-inside:avoid}
        .mermaid-container{text-align:center;padding:1em;margin:1em 0;border:1px solid #d1d5db;border-radius:4px;page-break-inside:avoid}
        .mermaid-error{background:#fef2f2;border:1px solid #fecaca;padding:1em;border-radius:4px}
        .table-wrapper{max-width:100%;overflow-x:auto}
        @page{margin:1in}
      </style></head><body>${clone.innerHTML}</body></html>`

  return { html, title: name }
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
