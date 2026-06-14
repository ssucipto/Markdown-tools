import { describe, it, expect, vi, beforeEach } from 'vitest'
import { exportWordDocument, exportPdfDocument } from '@/markdown/exportWord'

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

function blobToText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsText(blob)
  })
}

describe('exportWordDocument', () => {
  beforeEach(() => {
    mockPng.mockClear()
    document.body.innerHTML = ''
  })

  it('returns msword blob and filename from path', async () => {
    const el = buildFixtureDom()
    const { blob, filename } = await exportWordDocument(el, 'docs/sample.md')
    expect(blob.type).toBe('application/msword')
    expect(filename).toBe('sample.doc')
  })

  it('uses document fallback when path is null', async () => {
    const el = buildFixtureDom()
    const { filename } = await exportWordDocument(el, null)
    expect(filename).toBe('document.doc')
  })

  it('embeds table and strips copy controls from HTML', async () => {
    const el = buildFixtureDom()
    const { blob } = await exportWordDocument(el, 'test.md')
    const text = await blobToText(blob)
    expect(text).toContain('table-wrapper')
    expect(text).toMatch(/<td[^>]*>A<\/td>/)
    expect(text).not.toContain('code-copy-btn')
  })

  it('falls back to code block when PNG conversion fails', async () => {
    mockPng.mockResolvedValueOnce(null)
    const el = buildFixtureDom()
    const { blob } = await exportWordDocument(el, 'test.md')
    const text = await blobToText(blob)
    expect(text).toContain('graph TD')
  })
})

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
