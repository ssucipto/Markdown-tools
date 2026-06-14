import { describe, it, expect, vi, beforeEach } from 'vitest'
import { svgToPngDataUri } from '@/lib/svg-to-png'

describe('svgToPngDataUri', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  it('returns null for empty SVG', async () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    expect(await svgToPngDataUri(svg)).toBeNull()
  })

  it('returns png data uri when canvas render succeeds', async () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 100 50')
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    rect.setAttribute('width', '100')
    rect.setAttribute('height', '50')
    svg.appendChild(rect)

    const origCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'canvas') {
        const canvas = origCreateElement('canvas') as HTMLCanvasElement
        canvas.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,test')
        const ctx = {
          scale: vi.fn(),
          fillRect: vi.fn(),
          drawImage: vi.fn(),
        }
        canvas.getContext = vi.fn().mockReturnValue(ctx)
        return canvas
      }
      return origCreateElement(tag)
    })

    class MockImage {
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      naturalWidth = 100
      naturalHeight = 50
      crossOrigin = ''
      set src(_v: string) {
        queueMicrotask(() => this.onload?.())
      }
    }
    vi.stubGlobal('Image', MockImage)

    const result = await svgToPngDataUri(svg as SVGSVGElement)
    expect(result).toBe('data:image/png;base64,test')
  })
})
