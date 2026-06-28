import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx'
import { svgToPngDataUri } from '@/lib/svg-to-png'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function headingForTag(tag: string): (typeof HeadingLevel)[keyof typeof HeadingLevel] | undefined {
  switch (tag) {
    case 'H1': return HeadingLevel.HEADING_1
    case 'H2': return HeadingLevel.HEADING_2
    case 'H3': return HeadingLevel.HEADING_3
    case 'H4': return HeadingLevel.HEADING_4
    case 'H5': return HeadingLevel.HEADING_5
    case 'H6': return HeadingLevel.HEADING_6
    default: return undefined
  }
}

/** Flatten visible text (used only for fallbacks — prefer `childTextRuns`). */
function textFrom(el: Element): string {
  return el.textContent?.replace(/\s+/g, ' ').trim() ?? ''
}

// ---------------------------------------------------------------------------
// Rich inline text — walk DOM children and produce styled TextRun[]
// ---------------------------------------------------------------------------

interface InlineFormat {
  bold?: boolean
  italics?: boolean
  font?: string
  color?: string
  strike?: boolean
  underline?: Record<string, never>
  superScript?: boolean
  subScript?: boolean
  highlight?: string
}

interface TextSegment {
  text: string
  format: InlineFormat
}

const INLINE_FORMATTING_TAGS = new Set([
  'STRONG', 'B', 'EM', 'I', 'CODE', 'A', 'IMG', 'BR', 'SPAN',
  'SUB', 'SUP', 'DEL', 'U', 'MARK',
])

function childTextRuns(parent: Element): TextRun[] {
  const segments: TextSegment[] = []

  const walk = (node: ChildNode): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      if (text) segments.push({ text, format: {} })
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return

    const el = node as Element
    const tag = el.tagName

    if (INLINE_FORMATTING_TAGS.has(tag)) {
      if (tag === 'IMG') {
        const alt = (el as HTMLImageElement).alt || 'image'
        segments.push({ text: `[Image: ${alt}]`, format: {} })
        return
      }
      if (tag === 'BR') return

      const inner = collectText(el)
      if (!inner) return

      const fmt: InlineFormat = {}
      if (tag === 'STRONG' || tag === 'B') fmt.bold = true
      if (tag === 'EM' || tag === 'I') fmt.italics = true
      if (tag === 'CODE') fmt.font = 'Courier New'
      if (tag === 'A') fmt.color = '0563c1'
      if (tag === 'DEL') fmt.strike = true
      if (tag === 'U' || tag === 'INS') fmt.underline = {}
      if (tag === 'SUB') fmt.subScript = true
      if (tag === 'SUP') fmt.superScript = true
      if (tag === 'MARK') fmt.highlight = 'yellow'

      segments.push({ text: inner, format: fmt })
      return
    }

    for (const child of el.childNodes) walk(child)
  }

  for (const child of parent.childNodes) walk(child)

  return collapseTextSegments(segments)
}

function collectText(el: Element): string {
  return (el.textContent ?? '').replace(/\s+/g, ' ').trim()
}

function collapseTextSegments(segments: TextSegment[]): TextRun[] {
  const merged: TextSegment[] = []
  for (const seg of segments) {
    const last = merged[merged.length - 1]
    const sameFormat = last
      && last.format.bold === seg.format.bold
      && last.format.italics === seg.format.italics
      && last.format.font === seg.format.font
      && last.format.color === seg.format.color
      && last.format.strike === seg.format.strike
      && last.format.superScript === seg.format.superScript
      && last.format.subScript === seg.format.subScript
      && last.format.highlight === seg.format.highlight
    if (sameFormat) {
      last.text += seg.text
    } else {
      merged.push(seg)
    }
  }

  while (merged.length && /^\s*$/.test(merged[0].text)) merged.shift()
  while (merged.length && /^\s*$/.test(merged[merged.length - 1].text)) merged.pop()

  return merged.map((seg) => {
    const f = seg.format
    return new TextRun({
      text: seg.text,
      bold: f.bold,
      italics: f.italics,
      font: f.font,
      color: f.color,
      strike: f.strike,
      underline: f.underline,
      superScript: f.superScript,
      subScript: f.subScript,
      highlight: f.highlight,
    } as ConstructorParameters<typeof TextRun>[0])
  })
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

function fitDimensions(
  naturalW: number | undefined,
  naturalH: number | undefined,
  maxWidth = 500,
): { width: number; height: number } {
  const w = naturalW && naturalW > 0 ? naturalW : maxWidth
  const h = naturalH && naturalH > 0 ? naturalH : Math.round(maxWidth * 0.625)
  if (w <= maxWidth) return { width: w, height: h }
  const ratio = maxWidth / w
  return { width: maxWidth, height: Math.round(h * ratio) }
}

async function imageParagraph(img: HTMLImageElement): Promise<Paragraph | null> {
  const src = img.src
  if (!src || src.startsWith('data:')) {
    if (!src?.startsWith('data:image'))
      return new Paragraph({ children: [new TextRun(`[Image: ${img.alt || 'image'}]`)] })
  }
  try {
    const res = await fetch(src)
    const buf = await res.arrayBuffer()
    const bytes = new Uint8Array(buf)
    const type = src.includes('.png') || src.startsWith('data:image/png') ? 'png' : 'jpg'
    const dims = fitDimensions(img.naturalWidth, img.naturalHeight, 500)
    return new Paragraph({
      children: [
        new ImageRun({
          data: bytes,
          transformation: { width: dims.width, height: dims.height },
          type,
        }),
      ],
    })
  } catch {
    return new Paragraph({
      children: [new TextRun(`[Image: ${img.alt || img.getAttribute('src') || 'unavailable'}]`)],
    })
  }
}

async function mermaidImageParagraph(container: HTMLElement): Promise<Paragraph | null> {
  const svg = container.querySelector('svg')
  if (!svg) return null
  const pngDataUri = await Promise.race([
    svgToPngDataUri(svg as unknown as SVGSVGElement), // querySelector returns Element; runtime guarantees SVGSVGElement here
    new Promise<null>((r) => setTimeout(() => r(null), 5000)),
  ])
  if (!pngDataUri) return null
  const base64 = pngDataUri.split(',')[1]
  if (!base64) return null
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  const svgW = parseFloat(svg.getAttribute('width') ?? '') || undefined
  const svgH = parseFloat(svg.getAttribute('height') ?? '') || undefined
  const dims = fitDimensions(svgW, svgH, 500)
  return new Paragraph({
    children: [
      new ImageRun({
        data: bytes,
        transformation: { width: dims.width, height: dims.height },
        type: 'png',
      }),
    ],
  })
}

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

function tableFromElement(table: HTMLTableElement): Table {
  const rows: TableRow[] = []
  for (const tr of table.querySelectorAll('tr')) {
    const cells: TableCell[] = []
    for (const cell of tr.querySelectorAll('th, td')) {
      const runs = childTextRuns(cell)
      cells.push(
        new TableCell({
          children: [new Paragraph({ children: runs.length ? runs : [new TextRun(textFrom(cell))] })],
          width: { size: 2000, type: WidthType.DXA },
        }),
      )
    }
    if (cells.length) rows.push(new TableRow({ children: cells }))
  }
  return new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } })
}

// ---------------------------------------------------------------------------
// Lists — recursive UL/OL handling
// ---------------------------------------------------------------------------

function buildListParagraphs(listEl: Element, depth: number, startIndex = 1): Paragraph[] {
  const items: Paragraph[] = []
  const tag = listEl.tagName
  let index = startIndex

  for (const li of listEl.children) {
    if (li.tagName !== 'LI') continue

    const prefix = tag === 'OL' ? `${index}. ` : '\u2022 '
    const indentPrefix = '  '.repeat(depth)
    const runs = childTextRuns(li)
    const paragraphRuns: TextRun[] = [new TextRun(`${indentPrefix}${prefix}`), ...runs]

    items.push(new Paragraph({
      children: paragraphRuns,
      indent: { left: depth * 360 },
    }))
    index++

    for (const child of li.children) {
      if (child.tagName === 'UL' || child.tagName === 'OL') {
        items.push(...buildListParagraphs(child as Element, depth + 1))
      }
    }
  }

  return items
}

// ---------------------------------------------------------------------------
// Per-tag handler functions (decomposed from blockToParagraphs)
// ---------------------------------------------------------------------------

/** Shared helper: create a monospace-code Paragraph (used by code blocks and <pre> elements). */
function monospaceParagraph(text: string): Paragraph {
  return new Paragraph({
    children: [new TextRun({ text, font: 'Courier New', size: 20 })],
  })
}

async function handleMermaidContainer(node: Element): Promise<(Paragraph | Table)[]> {
  const imgPara = await mermaidImageParagraph(node as HTMLElement)
  if (imgPara) return [imgPara]
  return [new Paragraph({
    children: [new TextRun({ text: '[Diagram: rendering unavailable]', italics: true, color: '999999' })],
  })]
}

function handleCodeBlockWrapper(node: Element): (Paragraph | Table)[] {
  const code = node.querySelector('code')
  const text = code?.textContent ?? textFrom(node)
  if (!text) return []
  return [monospaceParagraph(text)]
}

function handleTable(node: Element): (Paragraph | Table)[] {
  return [tableFromElement(node as HTMLTableElement)]
}

async function handleImage(node: Element): Promise<(Paragraph | Table)[]> {
  const para = await imageParagraph(node as HTMLImageElement)
  return para ? [para] : []
}

function handleHeading(node: Element): (Paragraph | Table)[] {
  const tag = node.tagName
  const runs = childTextRuns(node)
  if (!runs.length) return []
  const heading = headingForTag(tag)
  return [new Paragraph({ children: runs, heading })]
}

function handlePreMermaid(): (Paragraph | Table)[] {
  return []
}

function handlePre(node: Element): (Paragraph | Table)[] {
  const text = node.textContent ?? ''
  if (!text.trim()) return []
  return [monospaceParagraph(text.trim())]
}

function handleBlockquote(node: Element): (Paragraph | Table)[] {
  const runs = childTextRuns(node)
  if (!runs.length) return []
  return [
    new Paragraph({
      children: runs,
      indent: { left: 720 },
      border: { left: { style: BorderStyle.SINGLE, size: 6, color: '3b82f6', space: 8 } },
    }),
  ]
}

function handleList(node: Element): (Paragraph | Table)[] {
  return buildListParagraphs(node, 0)
}

function handleParagraph(node: Element): (Paragraph | Table)[] {
  const runs = childTextRuns(node)
  if (!runs.length) return []
  return [new Paragraph({ children: runs })]
}

function handleHr(): (Paragraph | Table)[] {
  return [
    new Paragraph({
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'd1d5db', space: 8 } },
      children: [],
    }),
  ]
}

function handleKatex(node: Element): (Paragraph | Table)[] {
  const text = textFrom(node)
  return text ? [new Paragraph({ children: [new TextRun(`[math] ${text}`)] })] : []
}

// ---------------------------------------------------------------------------
// Block → Paragraph(s) — dispatch via handler map
// ---------------------------------------------------------------------------

const BLOCK_HANDLERS: Array<{
  match: (node: Element) => boolean
  handler: (node: Element) => (Paragraph | Table)[] | Promise<(Paragraph | Table)[]>
}> = [
  { match: (n) => n.classList.contains('mermaid-container'), handler: handleMermaidContainer },
  { match: (n) => n.classList.contains('code-block-wrapper'), handler: handleCodeBlockWrapper },
  { match: (n) => n.tagName === 'TABLE', handler: handleTable },
  { match: (n) => n.tagName === 'IMG', handler: handleImage },
  { match: (n) => /^H[1-6]$/.test(n.tagName), handler: handleHeading },
  { match: (n) => n.tagName === 'PRE' && n.classList.contains('mermaid'), handler: handlePreMermaid },
  { match: (n) => n.tagName === 'PRE', handler: handlePre },
  { match: (n) => n.tagName === 'BLOCKQUOTE', handler: handleBlockquote },
  { match: (n) => n.tagName === 'UL', handler: handleList },
  { match: (n) => n.tagName === 'OL', handler: handleList },
  { match: (n) => n.tagName === 'P' || n.tagName === 'LI', handler: handleParagraph },
  { match: (n) => n.tagName === 'HR', handler: handleHr },
  { match: (n) => n.classList.contains('katex-block') || n.classList.contains('katex-inline'), handler: handleKatex },
]

async function blockToParagraphs(node: Element): Promise<(Paragraph | Table)[]> {
  for (const entry of BLOCK_HANDLERS) {
    if (entry.match(node)) {
      return entry.handler(node)
    }
  }
  return []
}

// ---------------------------------------------------------------------------
// Document builder
// ---------------------------------------------------------------------------

async function buildDocxChildren(el: HTMLElement): Promise<(Paragraph | Table)[]> {
  const article = el.querySelector('article') ?? el
  const children: (Paragraph | Table)[] = []

  for (const node of article.children) {
    const blocks = await blockToParagraphs(node)
    children.push(...blocks)
  }

  if (!children.length) {
    children.push(new Paragraph({ children: [new TextRun(textFrom(article) || 'Empty document')] }))
  }

  return children
}

export async function exportDocxDocument(
  el: HTMLElement,
  documentPath: string | null | undefined,
): Promise<{ blob: Blob; filename: string }> {
  const children = await buildDocxChildren(el)
  const doc = new Document({ sections: [{ children }] })
  const blob = await Packer.toBlob(doc)

  const name =
    documentPath
      ?.split('/')
      .pop()
      ?.replace(/^\[dropped\] /, '')
      .replace(/\.md$/, '') || 'document'

  return { blob, filename: `${name}.docx` }
}
