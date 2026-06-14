import { describe, expect, it } from 'vitest'
import { parseDocsSearchParams, buildDocsSearchParams } from '@/lib/embed-url'
import { parseMarkdown } from '@/markdown/parse'

describe('KaTeX math rendering', () => {
  it('renders inline and block math', () => {
    const md = 'Inline $E=mc^2$ and block:\n\n$$x = 1$$'
    const { html } = parseMarkdown(md)
    expect(html).toContain('katex')
    expect(html).toContain('katex-block')
  })
})

describe('embed URL helpers', () => {
  it('parseDocsSearchParams extracts file and anchor', () => {
    expect(parseDocsSearchParams('?file=docs/a.md&anchor=intro')).toEqual({
      file: 'docs/a.md',
      anchor: 'intro',
    })
  })

  it('buildDocsSearchParams round-trips', () => {
    const qs = buildDocsSearchParams('docs/a.md', 'intro')
    expect(parseDocsSearchParams(`?${qs}`)).toEqual({ file: 'docs/a.md', anchor: 'intro' })
  })
})
