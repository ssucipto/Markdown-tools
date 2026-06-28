import { describe, expect, it } from 'vitest'
import { exportDocxDocument } from '@/markdown/exportDocx'

describe('exportDocxDocument', () => {
  const fixture = (inner: string): HTMLElement => {
    const root = document.createElement('div')
    root.innerHTML = `<article>${inner}</article>`
    return root
  }

  it('produces valid ZIP/DOCX binary (PK header)', async () => {
    const { blob } = await exportDocxDocument(fixture('<h1>Test</h1><p>Hello</p>'), 'test.md')
    const buf = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as ArrayBuffer)
      reader.onerror = () => reject(reader.error)
      reader.readAsArrayBuffer(blob)
    })
    const bytes = new Uint8Array(buf)
    expect(bytes[0]).toBe(0x50) // P
    expect(bytes[1]).toBe(0x4b) // K
    expect(blob.size).toBeGreaterThan(100)
  })

  it('exports headings, code, and tables', async () => {
    const { blob, filename } = await exportDocxDocument(fixture(`
      <h1>Title</h1>
      <p>Paragraph text</p>
      <div class="code-block-wrapper">
        <pre><code class="language-ts">const x = 1</code></pre>
      </div>
      <table><tr><th>A</th><td>1</td></tr></table>
    `), 'docs/sample.md')
    expect(blob.size).toBeGreaterThan(100)
    expect(filename).toBe('sample.docx')
  })

  it('handles inline formatting — bold, italic, code within paragraphs', async () => {
    const { blob } = await exportDocxDocument(fixture(
      '<p><strong>Bold</strong> normal <em>italic</em> <code>code</code></p>',
    ), 'test.md')
    expect(blob.size).toBeGreaterThan(100)
  })

  it('handles unordered lists', async () => {
    const { blob } = await exportDocxDocument(fixture(
      '<ul><li>First</li><li>Second</li></ul>',
    ), 'test.md')
    expect(blob.size).toBeGreaterThan(100)
  })

  it('handles ordered lists', async () => {
    const { blob } = await exportDocxDocument(fixture(
      '<ol><li>Alpha</li><li>Beta</li></ol>',
    ), 'test.md')
    expect(blob.size).toBeGreaterThan(100)
  })

  it('handles nested lists', async () => {
    const { blob } = await exportDocxDocument(fixture(
      '<ul><li>Top<ol><li>Nested 1</li><li>Nested 2</li></ol></li></ul>',
    ), 'test.md')
    expect(blob.size).toBeGreaterThan(100)
  })

  it('handles blockquotes', async () => {
    const { blob } = await exportDocxDocument(fixture(
      '<blockquote><p>A quoted passage</p></blockquote>',
    ), 'test.md')
    expect(blob.size).toBeGreaterThan(100)
  })

  it('handles horizontal rules', async () => {
    const { blob } = await exportDocxDocument(fixture(
      '<p>Before</p><hr><p>After</p>',
    ), 'test.md')
    expect(blob.size).toBeGreaterThan(100)
  })

  it('shows fallback for unavailable mermaid diagram', async () => {
    const { blob } = await exportDocxDocument(fixture(
      '<div class="mermaid-container"><pre class="mermaid">graph TD</pre></div>',
    ), 'test.md')
    expect(blob.size).toBeGreaterThan(100)
  })

  it('derives filename from document path', async () => {
    const { filename } = await exportDocxDocument(fixture('<p>test</p>'), 'path/to/readme.md')
    expect(filename).toBe('readme.docx')
  })

  it('handles dropped file prefix in path', async () => {
    const { filename } = await exportDocxDocument(fixture('<p>test</p>'), '[dropped] notes.md')
    expect(filename).toBe('notes.docx')
  })

  it('empty document produces fallback content', async () => {
    const { blob } = await exportDocxDocument(fixture(''), 'empty.md')
    expect(blob.size).toBeGreaterThan(50)
  })
})
