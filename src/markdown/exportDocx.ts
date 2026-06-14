import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
  ImageRun,
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

async function buildDocxParagraphs(el: HTMLElement): Promise<Paragraph[]> {
  const blocks: Paragraph[] = []

  for (const node of el.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,pre.mermaid, .mermaid-container')) {
    if (node.classList.contains('mermaid-container')) {
      const imgPara = await mermaidImageParagraph(node as HTMLElement)
      if (imgPara) blocks.push(imgPara)
      continue
    }
    const tag = node.tagName
    const text = textFrom(node)
    if (!text) continue
    const heading = headingForTag(tag)
    if (heading) {
      blocks.push(new Paragraph({ text, heading }))
    } else if (tag === 'PRE') {
      blocks.push(
        new Paragraph({
          children: [new TextRun({ text, font: 'Courier New', size: 20 })],
        }),
      )
    } else {
      blocks.push(new Paragraph({ children: [new TextRun(text)] }))
    }
  }

  if (!blocks.length) {
    blocks.push(new Paragraph({ children: [new TextRun(textFrom(el) || 'Empty document')] }))
  }

  return blocks
}

export async function exportDocxDocument(
  el: HTMLElement,
  documentPath: string | null | undefined,
): Promise<{ blob: Blob; filename: string }> {
  const children = await buildDocxParagraphs(el)
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
