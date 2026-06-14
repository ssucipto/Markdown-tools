import { describe, it, expect } from 'vitest'
import { encodeDataAttribute, decodeDataAttribute } from '@/lib/html-entities'

describe('html-entities', () => {
  it('round-trips special characters', () => {
    const raw = `if (a < b && c > d) return "it's ok"`
    expect(decodeDataAttribute(encodeDataAttribute(raw))).toBe(raw)
  })

  it('encodes ampersand before other entities', () => {
    expect(encodeDataAttribute('a & b')).toBe('a &amp; b')
  })
})
