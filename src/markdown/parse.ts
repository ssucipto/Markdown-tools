import DOMPurify from 'dompurify'
import { marked } from 'marked'
import type { TocEntry } from '@/types/viewer'
import { applySyntaxHighlighting } from './highlight'

export function wrapTables(html: string): string {
  return html
    .replace(/<table>/g, '<div class="table-wrapper"><table>')
    .replace(/<\/table>/g, '</table></div>')
}

export function extractMermaid(html: string): string {
  return html.replace(
    /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
    (_, code: string) => {
      const decoded = code
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      return `<div class="mermaid-container"><pre class="mermaid">${decoded}</pre></div>`
    },
  )
}

export function addAnchors(html: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = []
  const result = html.replace(/<h([1-3])([^>]*)>(.*?)<\/h\1>/g, (_, level, attrs, text) => {
    const id = text
      .toLowerCase()
      .replace(/<[^>]+>/g, '')
      .replace(/[^\w]+/g, '-')
      .replace(/^-|-$/g, '')
    toc.push({ id, text: text.replace(/<[^>]+>/g, ''), level: parseInt(level, 10) })
    return `<h${level} id="${id}"${attrs}><a href="#${id}" class="heading-anchor" title="Link to section" aria-hidden="true">#</a>${text}</h${level}>`
  })
  return { html: result, toc }
}

/** Copy buttons use data-code — no inline onclick (M3 XSS hardening). */
export function enhanceCodeBlocks(html: string): string {
  return html.replace(
    /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      return `<div class="code-block-wrapper">
      <div class="code-block-header">
        <span class="code-lang">${lang}</span>
        <button type="button" class="code-copy-btn" data-code="${escaped}" aria-label="Copy code">Copy</button>
      </div>
      <pre><code class="language-${lang} hljs">${code}</code></pre>
    </div>`
    },
  )
}

const SANITIZE_CONFIG: DOMPurify.Config = {
  ADD_ATTR: ['data-code', 'data-mermaid-src', 'data-mermaid-done', 'data-processed', 'data-zoom-bound', 'aria-hidden', 'aria-label'],
  ADD_TAGS: ['button'],
}

export function parseMarkdown(content: string): { html: string; toc: TocEntry[] } {
  if (!content) return { html: '', toc: [] }
  const raw = marked(content, { breaks: true, gfm: true }) as string
  const withMermaid = extractMermaid(raw)
  const withCode = enhanceCodeBlocks(withMermaid)
  const withHighlight = applySyntaxHighlighting(withCode)
  const withTables = wrapTables(withHighlight)
  const { html, toc } = addAnchors(withTables)
  const sanitized = DOMPurify.sanitize(html, SANITIZE_CONFIG)
  return { html: sanitized, toc }
}
