export interface MermaidError {
  index: number
  source: string
  message: string
  type: 'syntax' | 'render' | 'timeout' | 'import'
}

export type MermaidZoomHandler = (svgHtml: string, source: string) => void
export type MermaidErrorHandler = (errors: MermaidError[]) => void

export async function renderMermaidDiagrams(
  container: HTMLElement,
  dark: boolean,
  onZoom: MermaidZoomHandler,
  retryRef: { current: number },
  onErrors?: MermaidErrorHandler,
): Promise<void> {
  const errors: MermaidError[] = []
  let errorIndex = 0

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
  if (!pending.length) {
    onErrors?.([])
    return
  }

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
      errorIndex++

      // Pre-validate syntax with mermaid.parse() before rendering
      // (gracefully skip if mermaid.parse is unavailable — older Mermaid versions)
      if (typeof mermaid.parse === 'function') {
        try {
          mermaid.parse(code, { suppressErrors: true })
        } catch (parseErr) {
          const parseMsg = parseErr instanceof Error ? parseErr.message : String(parseErr)
          errors.push({ index: errorIndex, source: code, message: parseMsg, type: 'syntax' })
          block.setAttribute('data-mermaid-done', 'true')
          block.setAttribute('data-mermaid-error', 'syntax')
          block.removeAttribute('data-processed')
          block.innerHTML = buildErrorHtml(code, parseMsg, 'Syntax Error')
          onErrors?.([...errors])
          continue
        }
      }

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
        const msg = err instanceof Error ? err.message : String(err)
        errors.push({ index: errorIndex, source: code, message: msg, type: 'render' })
        block.setAttribute('data-mermaid-done', 'true')
        block.setAttribute('data-mermaid-error', 'render')
        block.removeAttribute('data-processed')
        block.innerHTML = buildErrorHtml(code, msg, 'Render Error')
        onErrors?.([...errors])
      }
    }

    // Retry logic for blocks that didn't get SVGs
    const containers = container.querySelectorAll('.mermaid-container')
    const svgCount = container.querySelectorAll('.mermaid-container svg').length
    if (containers.length > svgCount && retryRef.current < 5) {
      retryRef.current += 1
      for (const block of container.querySelectorAll<HTMLElement>('pre.mermaid:not(:has(svg))')) {
        block.removeAttribute('data-mermaid-done')
        block.removeAttribute('data-processed')
      }
      setTimeout(() => {
        void renderMermaidDiagrams(container, dark, onZoom, retryRef, onErrors)
      }, 500)
    } else if (containers.length <= svgCount) {
      retryRef.current = 0
    }

    // Final error report after all retries exhausted
    if (containers.length > svgCount && retryRef.current >= 5) {
      onErrors?.(errors)
    }
  } catch (err) {
    console.warn('[MarkdownViewer] Mermaid import failed:', err instanceof Error ? err.message : err)
    for (const block of container.querySelectorAll<HTMLElement>('pre.mermaid:not([data-mermaid-done])')) {
      const code = block.getAttribute('data-mermaid-src') || ''
      errorIndex++
      errors.push({ index: errorIndex, source: code, message: String(err), type: 'import' })
      block.setAttribute('data-mermaid-done', 'true')
      block.setAttribute('data-mermaid-error', 'import')
      block.removeAttribute('data-processed')
      block.innerHTML = buildErrorHtml(code, String(err), 'Mermaid Library Failed')
    }
    onErrors?.([...errors])
  }
}

export function resetMermaidForTheme(container: HTMLElement): void {
  for (const block of container.querySelectorAll<HTMLElement>('pre.mermaid[data-mermaid-done]')) {
    block.removeAttribute('data-mermaid-done')
    block.removeAttribute('data-processed')
    block.removeAttribute('data-zoom-bound')
    block.removeAttribute('data-mermaid-error')
    const src = block.getAttribute('data-mermaid-src')
    if (src) block.textContent = src
  }
}

/** Build a formatted error block with copy-support for the user */
function buildErrorHtml(source: string, message: string, label: string): string {
  const escapedSource = escapeHtml(source)
  const escapedMsg = escapeHtml(message)
  return `<div class="mermaid-error" role="alert" data-testid="mermaid-error">
  <div class="mermaid-error-header">
    <span>⚠️ ${escapeHtml(label)}</span>
  </div>
  <details class="mermaid-error-details">
    <summary>Show diagram source</summary>
    <pre><code>${escapedSource}</code></pre>
  </details>
  <p class="mermaid-error-msg">${escapedMsg}</p>
</div>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
