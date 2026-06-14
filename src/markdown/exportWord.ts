import { svgToPngDataUri } from '@/lib/svg-to-png'

export async function exportWordDocument(
  el: HTMLElement,
  documentPath: string | null | undefined,
): Promise<{ blob: Blob; filename: string }> {
  const clone = el.cloneNode(true) as HTMLElement
  clone
    .querySelectorAll(
      '.heading-anchor, .code-copy-btn, .code-block-header, .mermaid-loading, .mermaid-error span:first-child',
    )
    .forEach((e) => e.remove())

  const liveContainers = el.querySelectorAll<HTMLElement>('.mermaid-container')
  const containers = clone.querySelectorAll<HTMLElement>('.mermaid-container')

  if (containers.length) {
    const conversions = Array.from(containers).map(async (container, i) => {
      ;(container as HTMLElement).style.background = 'transparent'
      ;(container as HTMLElement).style.border = '1px solid #d1d5db'

      const svg = container.querySelector('svg')
      if (!svg) {
        const pre = container.querySelector('pre.mermaid')
        if (pre) {
          const code = pre.getAttribute('data-mermaid-src') || pre.textContent || ''
          const codeBlock = document.createElement('pre')
          codeBlock.style.cssText =
            'background:#f3f4f6;padding:8px;border:1px solid #d1d5db;font-size:11px;overflow-x:auto;white-space:pre-wrap;color:#374151;'
          codeBlock.textContent = code
          pre.replaceWith(codeBlock)
        }
        return
      }

      const liveSvg = liveContainers[i]?.querySelector('svg') as SVGSVGElement | null
      const pngDataUri = await Promise.race([
        svgToPngDataUri(liveSvg || (svg as unknown as SVGSVGElement)),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
      ])

      const pre = container.querySelector('pre.mermaid')
      if (pngDataUri) {
        const img = document.createElement('img')
        img.src = pngDataUri
        img.setAttribute('width', '650')
        img.style.cssText = 'max-width:650px;width:650px;height:auto;display:block;margin:1em auto;'
        if (pre) pre.replaceWith(img)
        else container.appendChild(img)
      } else if (pre) {
        const code = pre.getAttribute('data-mermaid-src') || pre.textContent || ''
        const codeBlock = document.createElement('pre')
        codeBlock.style.cssText =
          'background:#f3f4f6;padding:8px;border:1px solid #d1d5db;font-size:11px;overflow-x:auto;white-space:pre-wrap;color:#374151;'
        codeBlock.textContent = code
        pre.replaceWith(codeBlock)
      }
    })
    await Promise.allSettled(conversions)
  }

  clone.querySelectorAll('.table-wrapper').forEach((wrapper) => {
    ;(wrapper as HTMLElement).style.cssText += ';width:100%;max-width:100%;overflow:hidden;'
  })
  clone.querySelectorAll('table').forEach((table) => {
    table.setAttribute('width', '100%')
    const style = (table as HTMLElement).style
    style.width = '100%'
    style.maxWidth = '100%'
    style.tableLayout = 'fixed'
    style.wordBreak = 'break-all'
  })
  clone.querySelectorAll('th, td').forEach((cell) => {
    const style = (cell as HTMLElement).style
    style.width = 'auto'
    style.wordBreak = 'break-all'
    style.whiteSpace = 'normal'
    style.overflowWrap = 'break-word'
  })

  const docHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
        body{font-family:system-ui,sans-serif;line-height:1.6;max-width:800px;margin:40px auto;color:#1f2937}
        h1{font-size:1.5em;margin-top:1em}h2{font-size:1.25em;border-bottom:1px solid #e5e7eb;padding-bottom:.25em}
        pre{background:#f3f4f6;padding:1em;border-radius:4px;overflow-x:auto}code{font-family:monospace;font-size:.875em}
        .table-wrapper{max-width:100%;overflow-x:auto;margin-bottom:1em}
        table{border-collapse:collapse;max-width:100%}th,td{border:1px solid #d1d5db;padding:4px 8px;text-align:left;word-break:break-word}
        blockquote{border-left:3px solid #3b82f6;padding-left:1em;color:#4b5563;margin:1em 0}
        img{max-width:100%}svg{max-width:100%;height:auto;display:block;margin:1em 0}
        .mermaid-container{text-align:center;padding:1em;margin:1em 0;border:1px solid #d1d5db;border-radius:4px}
        @page{margin:1in}
      </style></head><body>${clone.innerHTML}</body></html>`

  const name =
    documentPath
      ?.split('/')
      .pop()
      ?.replace(/^\[dropped\] /, '')
      .replace(/\.md$/, '') || 'document'
  return {
    blob: new Blob([docHtml], { type: 'application/msword' }),
    filename: `${name}.doc`,
  }
}

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
