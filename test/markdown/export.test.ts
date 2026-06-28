import { describe, it, expect, vi, beforeEach } from 'vitest'
import { exportPdfDocument } from '@/markdown/exportPdf'

const mockPng = vi.fn().mockResolvedValue('data:image/png;base64,abc')

vi.mock('@/lib/svg-to-png', () => ({
  svgToPngDataUri: (...args: unknown[]) => mockPng(...args),
}))

function buildFixtureDom(): HTMLElement {
  const root = document.createElement('div')
  root.innerHTML = `
    <h1>Title</h1>
    <div class="table-wrapper"><table><tr><td>A</td></tr></table></div>
    <div class="code-block-wrapper">
      <button class="code-copy-btn" data-code="x">Copy</button>
      <pre><code class="language-js hljs">const x = 1</code></pre>
    </div>
    <div class="mermaid-container">
      <pre class="mermaid" data-mermaid-src="graph TD">graph TD</pre>
      <svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"/></svg>
    </div>
  `
  document.body.appendChild(root)
  return root
}

describe('exportPdfDocument', () => {
  beforeEach(() => {
    mockPng.mockClear()
    document.body.innerHTML = ''
  })

  it('returns printable HTML with title', async () => {
    const el = buildFixtureDom()
    const { html, title } = await exportPdfDocument(el, 'folder/readme.md')
    expect(title).toBe('readme')
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('Title')
  })

  it('replaces mermaid svg with png when conversion succeeds', async () => {
    const el = buildFixtureDom()
    const { html } = await exportPdfDocument(el, 'test.md')
    expect(html).toContain('data:image/png;base64,abc')
    expect(mockPng).toHaveBeenCalled()
  })
})
