export type MermaidZoomHandler = (svgHtml: string, source: string) => void

export async function renderMermaidDiagrams(
  container: HTMLElement,
  dark: boolean,
  onZoom: MermaidZoomHandler,
  retryRef: { current: number },
): Promise<void> {
  for (const block of container.querySelectorAll<HTMLElement>('pre.mermaid')) {
    if (!block.getAttribute('data-mermaid-src')) {
      const src = (block.textContent || '').trim()
      if (src && !src.includes('Rendering diagram')) {
        block.setAttribute('data-mermaid-src', src)
      }
    }
    block.removeAttribute('data-processed')
  }

  const pending = container.querySelectorAll<HTMLElement>('pre.mermaid:not([data-mermaid-done])')
  if (!pending.length) return

  for (const block of pending) {
    if (block.querySelector('svg')) {
      block.setAttribute('data-mermaid-done', 'true')
      continue
    }
    block.innerHTML = '<div class="mermaid-loading" role="status">🔄 Rendering diagram…</div>'
  }

  try {
    const mermaidMod = await Promise.race([
      import('mermaid'),
      new Promise<never>((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000)),
    ])
    const mermaid = mermaidMod.default
    mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'neutral', securityLevel: 'loose' })

    const blocks = container.querySelectorAll<HTMLElement>('pre.mermaid:not([data-mermaid-done])')
    let id = 0

    for (const block of blocks) {
      const code = (block.getAttribute('data-mermaid-src') || block.textContent || '').trim()
      if (!code || code.includes('Rendering diagram')) continue

      try {
        const { svg } = await mermaid.render(`mermaid-${Date.now()}-${++id}`, code)
        block.innerHTML = svg
        block.setAttribute('data-mermaid-done', 'true')
        block.removeAttribute('data-processed')
        const svgEl = block.querySelector('svg')
        if (svgEl && !svgEl.hasAttribute('data-zoom-bound')) {
          svgEl.setAttribute('data-zoom-bound', 'true')
          svgEl.style.cursor = 'pointer'
          svgEl.setAttribute('title', 'Click to zoom')
          svgEl.setAttribute('role', 'button')
          svgEl.setAttribute('tabindex', '0')
          svgEl.addEventListener('click', () => onZoom(svgEl.outerHTML, code))
          svgEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onZoom(svgEl.outerHTML, code)
            }
          })
        }
      } catch (err) {
        block.setAttribute('data-mermaid-done', 'true')
        block.removeAttribute('data-processed')
        const msg = err instanceof Error ? err.message : String(err)
        block.innerHTML = `<div class="mermaid-error" role="alert"><span>⚠️ Diagram rendering failed</span><pre><code>${escapeHtml(code)}</code></pre><p class="text-xs text-red-500 mt-1">${escapeHtml(msg)}</p></div>`
      }
    }

    const containers = container.querySelectorAll('.mermaid-container')
    const svgCount = container.querySelectorAll('.mermaid-container svg').length
    if (containers.length > svgCount && retryRef.current < 5) {
      retryRef.current += 1
      for (const block of container.querySelectorAll<HTMLElement>('pre.mermaid:not(:has(svg))')) {
        block.removeAttribute('data-mermaid-done')
        block.removeAttribute('data-processed')
      }
      setTimeout(() => {
        void renderMermaidDiagrams(container, dark, onZoom, retryRef)
      }, 500)
    } else if (containers.length <= svgCount) {
      retryRef.current = 0
    }
  } catch (err) {
    console.warn('[MarkdownViewer] Mermaid import failed:', err instanceof Error ? err.message : err)
    for (const block of container.querySelectorAll<HTMLElement>('pre.mermaid:not([data-mermaid-done])')) {
      const code = block.getAttribute('data-mermaid-src') || ''
      block.setAttribute('data-mermaid-done', 'true')
      block.removeAttribute('data-processed')
      block.innerHTML = `<div class="mermaid-error" role="alert"><span>⚠️ Mermaid library failed to load</span><pre><code>${escapeHtml(code)}</code></pre></div>`
    }
  }
}

export function resetMermaidForTheme(container: HTMLElement): void {
  for (const block of container.querySelectorAll<HTMLElement>('pre.mermaid[data-mermaid-done]')) {
    block.removeAttribute('data-mermaid-done')
    block.removeAttribute('data-processed')
    block.removeAttribute('data-zoom-bound')
    const src = block.getAttribute('data-mermaid-src')
    if (src) block.textContent = src
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}
