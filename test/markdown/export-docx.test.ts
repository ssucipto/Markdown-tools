import { describe, expect, it } from 'vitest'
import { exportDocxDocument } from '@/markdown/exportDocx'

describe('exportDocxDocument', () => {
  it('exports headings, code, and tables', async () => {
    const root = document.createElement('div')
    root.innerHTML = `
      <article>
        <h1>Title</h1>
        <p>Paragraph text</p>
        <div class="code-block-wrapper">
          <pre><code class="language-ts">const x = 1</code></pre>
        </div>
        <table><tr><th>A</th><td>1</td></tr></table>
      </article>
    `
    const { blob, filename } = await exportDocxDocument(root, 'docs/sample.md')
    expect(blob.size).toBeGreaterThan(100)
    expect(filename).toBe('sample.docx')
  })
})
