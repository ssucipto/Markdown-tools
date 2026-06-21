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
} from 'docx'
import { svgToPngDataUri } from '@/lib/svg-to-png'

function headingForTag(tag: string): (typeof HeadingLevel)[keyof typeof HeadingLevel] | undefined {
  switch (tag) {
    case 'H1':
      return HeadingLevel.HEADING_1
    case 'H2':
      return HeadingLevel.HEADING_2
    case 'H3':
      return HeadingLevel.HEADING_3
    case 'H4':
      return HeadingLevel.HEADING_4
    case 'H5':
      return HeadingLevel.HEADING_5
    case 'H6':
      return HeadingLevel.HEADING_6
    default:
      return undefined
  }
}

function textFrom(el: Element): string {
  return el.textContent?.replace(/\s+/g, ' ').trim() ?? ''
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
    return new Paragraph({
      children: [
        new ImageRun({
          data: bytes,
          transformation: { width: 400, height: 250 },
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
    svgToPngDataUri(svg as unknown as SVGSVGElement),
    new Promise<null>((r) => setTimeout(() => r(null), 5000)),
  ])
  if (!pngDataUri) return null
  const base64 = pngDataUri.split(',')[1]
  if (!base64) return null
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Paragraph({
    children: [
      new ImageRun({
        data: bytes,
        transformation: { width: 500, height: 300 },
        type: 'png',
      }),
    ],
  })
}

function tableFromElement(table: HTMLTableElement): Table {
  const rows: TableRow[] = []
  for (const tr of table.querySelectorAll('tr')) {
    const cells: TableCell[] = []
    for (const cell of tr.querySelectorAll('th, td')) {
      cells.push(
        new TableCell({
          children: [new Paragraph({ children: [new TextRun(textFrom(cell))] })],
          width: { size: 2000, type: WidthType.DXA },
        }),
      )
    }
    if (cells.length) rows.push(new TableRow({ children: cells }))
  }
  return new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } })
}

async function blockToParagraphs(node: Element): Promise<(Paragraph | Table)[]> {
  const tag = node.tagName

  if (node.classList.contains('mermaid-container')) {
    const imgPara = await mermaidImageParagraph(node as HTMLElement)
    return imgPara ? [imgPara] : []
  }

  if (node.classList.contains('code-block-wrapper')) {
    const code = node.querySelector('code')
    const text = code?.textContent ?? textFrom(node)
    if (!text) return []
    return [
      new Paragraph({
        children: [new TextRun({ text, font: 'Courier New', size: 20 })],
      }),
    ]
  }

  if (tag === 'TABLE') {
    return [tableFromElement(node as HTMLTableElement)]
  }

  if (tag === 'IMG') {
    const para = await imageParagraph(node as HTMLImageElement)
    return para ? [para] : []
  }

  if (/^H[1-6]$/.test(tag)) {
    const text = textFrom(node)
    if (!text) return []
    const heading = headingForTag(tag)
    return [new Paragraph({ text, heading })]
  }

  if (tag === 'PRE' && node.classList.contains('mermaid')) {
    return []
  }

  if (tag === 'PRE') {
    const text = node.textContent ?? ''
    if (!text.trim()) return []
    return [
      new Paragraph({
        children: [new TextRun({ text: text.trim(), font: 'Courier New', size: 20 })],
      }),
    ]
  }

  if (tag === 'P' || tag === 'LI') {
    const text = textFrom(node)
    if (!text) return []
    return [new Paragraph({ children: [new TextRun(text)] })]
  }

  if (node.classList.contains('katex-block') || node.classList.contains('katex-inline')) {
    const text = textFrom(node)
    return text ? [new Paragraph({ children: [new TextRun(`[math] ${text}`)] })] : []
  }

  return []
}

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
