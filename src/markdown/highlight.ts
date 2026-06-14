import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

const LANG_ALIASES: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  sh: 'bash',
  yml: 'yaml',
}

export function applySyntaxHighlighting(html: string): string {
  return html.replace(
    /<pre><code class="language-(\w+) hljs">([\s\S]*?)<\/code><\/pre>/g,
    (match, lang: string, inner: string) => {
      const normalized = LANG_ALIASES[lang] ?? lang
      if (!lowlight.registered(normalized)) return match
      try {
        const text = inner.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
        const tree = lowlight.highlight(normalized, text)
        const highlighted = lowlightToHtml(tree)
        return match.replace(inner, highlighted)
      } catch {
        return match
      }
    },
  )
}

function lowlightToHtml(node: {
  type: string
  value?: string
  children?: unknown[]
  properties?: { className?: string[] }
}): string {
  if (node.type === 'text') return escapeHtml(node.value ?? '')
  const children = (node.children ?? []).map((c) => lowlightToHtml(c as typeof node)).join('')
  const cls = node.properties?.className?.join(' ') ?? ''
  if (cls) return `<span class="${cls}">${children}</span>`
  return children
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
