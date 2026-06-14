export function downloadSvg(svgHtml: string, filename = 'diagram.svg'): void {
  const blob = new Blob([svgHtml], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export async function copyMermaidSource(source: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(source)
    return true
  } catch {
    return false
  }
}

export function attachMermaidToolbars(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('.mermaid-container').forEach((wrap) => {
    if (wrap.querySelector('.mermaid-toolbar')) return
    const pre = wrap.querySelector('pre.mermaid')
    const source = pre?.getAttribute('data-mermaid-src') || pre?.textContent?.trim() || ''
    if (!source) return

    const toolbar = document.createElement('div')
    toolbar.className = 'mermaid-toolbar'
    toolbar.setAttribute('role', 'toolbar')
    toolbar.setAttribute('aria-label', 'Mermaid diagram actions')

    const copyBtn = document.createElement('button')
    copyBtn.type = 'button'
    copyBtn.className = 'mermaid-copy-btn'
    copyBtn.textContent = 'Copy source'
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      void copyMermaidSource(source).then((ok) => {
        copyBtn.textContent = ok ? 'Copied!' : 'Failed'
        setTimeout(() => {
          copyBtn.textContent = 'Copy source'
        }, 2000)
      })
    })

    const dlBtn = document.createElement('button')
    dlBtn.type = 'button'
    dlBtn.className = 'mermaid-download-btn'
    dlBtn.textContent = 'Download SVG'
    dlBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      const svg = wrap.querySelector('svg')
      if (svg) downloadSvg(svg.outerHTML, 'diagram.svg')
    })

    toolbar.append(copyBtn, dlBtn)
    wrap.prepend(toolbar)
  })
}
