import katex from 'katex'

const BLOCK_PLACEHOLDER = '%%KATEX_BLOCK_'
const INLINE_PLACEHOLDER = '%%KATEX_INLINE_'

function renderKatex(expr: string, displayMode: boolean): string {
  try {
    return katex.renderToString(expr.trim(), { displayMode, throwOnError: false })
  } catch {
    return `<code>${expr}</code>`
  }
}

/** Extract math before marked; restore HTML placeholders after sanitize. */
export function preprocessMath(markdown: string): { text: string; blocks: string[]; inlines: string[] } {
  const blocks: string[] = []
  const inlines: string[] = []

  let text = markdown.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr: string) => {
    const idx = blocks.length
    blocks.push(renderKatex(expr, true))
    return `${BLOCK_PLACEHOLDER}${idx}%%`
  })

  text = text.replace(/(?<![\\$])\$([^$\n]+?)\$(?!\$)/g, (_, expr: string) => {
    const idx = inlines.length
    inlines.push(renderKatex(expr, false))
    return `${INLINE_PLACEHOLDER}${idx}%%`
  })

  return { text, blocks, inlines }
}

export function restoreMath(html: string, blocks: string[], inlines: string[]): string {
  let result = html
  blocks.forEach((block, i) => {
    result = result.replace(`${BLOCK_PLACEHOLDER}${i}%%`, `<div class="katex-block">${block}</div>`)
  })
  inlines.forEach((inline, i) => {
    result = result.replace(`${INLINE_PLACEHOLDER}${i}%%`, `<span class="katex-inline">${inline}</span>`)
  })
  return result
}
