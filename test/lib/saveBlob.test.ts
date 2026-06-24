import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  acquireSaveTarget,
  commitSaveTarget,
  deriveExportFilename,
  saveBlob,
  toastForSaveResult,
} from '@/lib/saveBlob'
import { printHtmlDocument } from '@/markdown/exportPdf'

describe('deriveExportFilename', () => {
  it('derives from document path', () => {
    expect(deriveExportFilename('folder/requirements.md', '.doc')).toBe('requirements.doc')
  })
})

describe('acquireSaveTarget + commitSaveTarget', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('returns anchor target when no save picker', async () => {
    vi.stubGlobal('showSaveFilePicker', undefined)
    const target = await acquireSaveTarget({
      filename: 'sample.doc',
      mimeType: 'application/msword',
      description: 'Word Document',
    })
    expect(target).toEqual({ kind: 'anchor' })
    vi.unstubAllGlobals()
  })

  it('returns file-handle when save picker succeeds', async () => {
    const handle = { createWritable: vi.fn().mockResolvedValue({ write: vi.fn(), close: vi.fn() }) }
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockResolvedValue(handle))

    const target = await acquireSaveTarget({
      filename: 'sample.doc',
      mimeType: 'application/msword',
      description: 'Word Document',
    })

    expect(target).toEqual({ kind: 'file-handle', handle })
    vi.unstubAllGlobals()
  })

  it('commitSaveTarget writes via anchor fallback', async () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    const html = `<!DOCTYPE html><html><body>${'x'.repeat(100)}</body></html>`
    const blob = new Blob([html], { type: 'application/msword' })

    const result = await commitSaveTarget({ kind: 'anchor' }, blob, 'sample.doc')

    expect(result).toBe('downloaded')
    expect(clickSpy).toHaveBeenCalled()
    clickSpy.mockRestore()
  })

  it('commitSaveTarget falls back to anchor when file-handle write fails', async () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    const handle = {
      queryPermission: vi.fn().mockResolvedValue('granted'),
      createWritable: vi.fn().mockRejectedValue(new Error('write failed')),
    } as unknown as FileSystemFileHandle

    const html = `<!DOCTYPE html><html><body>${'x'.repeat(100)}</body></html>`
    const blob = new Blob([html], { type: 'application/msword' })

    const result = await commitSaveTarget({ kind: 'file-handle', handle }, blob, 'sample.doc')

    expect(result).toBe('downloaded')
    expect(clickSpy).toHaveBeenCalled()
    clickSpy.mockRestore()
  })

  it('commitSaveTarget returns failed for tiny blobs', async () => {
    const result = await commitSaveTarget({ kind: 'anchor' }, new Blob(['x']), 'tiny.doc')
    expect(result).toBe('failed')
  })

  it('commitSaveTarget does not fall back to anchor in Tauri', async () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
    vi.stubGlobal('__TAURI_INTERNALS__', {})
    vi.stubGlobal('__TAURI__', { invoke: vi.fn() })

    const html = `<!DOCTYPE html><html><body>${'x'.repeat(100)}</body></html>`
    const blob = new Blob([html], { type: 'application/msword' })

    const result = await commitSaveTarget(
      { kind: 'tauri-path', path: '/tmp/test.doc' },
      blob,
      'test.doc',
    )

    expect(result).toBe('failed')
    expect(clickSpy).not.toHaveBeenCalled()
    clickSpy.mockRestore()
    vi.unstubAllGlobals()
  })
})

describe('saveBlob (legacy one-shot)', () => {
  it('returns failed for tiny blobs', async () => {
    const result = await saveBlob({
      blob: new Blob(['x'], { type: 'text/plain' }),
      filename: 'tiny.txt',
    })
    expect(result).toBe('failed')
  })
})

describe('toastForSaveResult', () => {
  it('maps results to user-facing messages', () => {
    const messages: string[] = []
    const showToast = (msg: string) => messages.push(msg)

    toastForSaveResult('saved', 'doc.doc', showToast)
    toastForSaveResult('downloaded', 'doc.doc', showToast)
    toastForSaveResult('cancelled', 'doc.doc', showToast)
    toastForSaveResult('failed', 'doc.doc', showToast)

    expect(messages[0]).toContain('Saved doc.doc')
    expect(messages[1]).toContain('Downloads')
    expect(messages[2]).toBe('Export cancelled')
    expect(messages[3]).toContain('failed')
  })
})

describe('printHtmlDocument', () => {
  afterEach(() => {
    document.querySelectorAll('iframe').forEach((node) => node.remove())
  })

  it('creates iframe and calls print in browser', async () => {
    const print = vi.fn()
    const originalCreateElement = document.createElement.bind(document)
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = originalCreateElement(tag)
      if (tag === 'iframe') {
        const mockWin = {
          document: { open: vi.fn(), write: vi.fn(), close: vi.fn() },
          focus: vi.fn(),
          print,
          addEventListener: vi.fn(),
        }
        Object.defineProperty(el, 'contentWindow', { value: mockWin })
      }
      return el
    })

    await expect(printHtmlDocument('<html><body>PDF</body></html>')).resolves.toBe(true)
    expect(print).toHaveBeenCalled()
    vi.restoreAllMocks()
  })
})
