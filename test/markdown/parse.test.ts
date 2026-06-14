import { describe, it, expect } from 'vitest'
import { parseMarkdown, extractMermaid, wrapTables, addAnchors } from '@/markdown/parse'

describe('parseMarkdown', () => {
  it('returns empty for blank input', () => {
    expect(parseMarkdown('')).toEqual({ html: '', toc: [] })
  })

  it('parses headings and builds TOC', () => {
    const { html, toc } = parseMarkdown('# Hello\n\n## World')
    expect(html).toContain('Hello')
    expect(html).toContain('World')
    expect(toc).toHaveLength(2)
    expect(toc[0]?.text).toBe('Hello')
  })

  it('wraps tables', () => {
    const html = wrapTables('<table><tr><td>A</td></tr></table>')
    expect(html).toContain('table-wrapper')
  })

  it('extracts mermaid blocks', () => {
    const html = extractMermaid('<pre><code class="language-mermaid">graph TD\nA-->B</code></pre>')
    expect(html).toContain('mermaid-container')
    expect(html).toContain('pre class="mermaid"')
  })

  it('adds anchor ids', () => {
    const { html, toc } = addAnchors('<h2>My Section</h2>')
    expect(html).toContain('id="my-section"')
    expect(toc[0]?.id).toBe('my-section')
  })

  it('dedupes duplicate heading ids', () => {
    const { html, toc } = addAnchors('<h1>A</h1><h2>B</h2><h2>B</h2>')
    expect(html).toContain('id="a"')
    expect(html).toContain('id="b"')
    expect(html).toContain('id="b-2"')
    expect(toc.map((t) => t.id)).toEqual(['a', 'b', 'b-2'])
  })

  it('preserves special chars in code copy data attribute', () => {
    const md = '```js\nif (a < b) return "ok"\n```'
    const { html } = parseMarkdown(md)
    expect(html).toContain('data-code=')
    expect(html).not.toContain('onclick=')
    expect(html).toContain('&lt;')
  })

  it('sanitizes script tags', () => {
    const { html } = parseMarkdown('# Safe\n\n<script>alert(1)</script>')
    expect(html).not.toContain('<script>')
  })
})
