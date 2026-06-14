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
})
