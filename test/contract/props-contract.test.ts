import { describe, expect, it } from 'vitest'
import * as lib from '@/index'
import { MarkdownViewer, MarkdownViewerWithBoundary } from '@/components/MarkdownViewer'
import { parseDocsSearchParams, buildDocsSearchParams } from '@/lib/embed-url'

/** Contract snapshot — CI fails if embed props drift without semver bump. */
const REQUIRED_PROPS: (keyof import('@/types/viewer').MarkdownViewerProps)[] = [
  'content',
  'documentPath',
  'files',
  'onSelectFile',
  'loading',
  'showSidebar',
  'theme',
  'onThemeChange',
  'initialFile',
  'initialAnchor',
  'className',
  'onOpenFolder',
  'supportsFolderPicker',
  'rawMarkdown',
]

describe('MarkdownViewerProps contract', () => {
  it('exports all required embed props keys', () => {
    const sample = {
      content: '',
      documentPath: null,
      files: [],
      onSelectFile: () => {},
      loading: false,
      showSidebar: true,
      theme: 'light' as const,
      onThemeChange: () => {},
      initialFile: 'docs/foo.md',
      initialAnchor: 'section',
      className: '',
      onOpenFolder: () => {},
      supportsFolderPicker: true,
      rawMarkdown: '',
    }
    for (const key of REQUIRED_PROPS) {
      expect(key in sample).toBe(true)
    }
  })

  it('DocFile shape matches visualizer listDocs', () => {
    const file = { name: 'readme.md', path: 'docs/readme.md', dir: 'docs' }
    expect(file).toMatchObject({
      name: expect.any(String),
      path: expect.any(String),
      dir: expect.any(String),
    })
  })

  it('public library entry exports viewer and URL helpers', () => {
    expect(lib.MarkdownViewer).toBe(MarkdownViewer)
    expect(lib.MarkdownViewerWithBoundary).toBe(MarkdownViewerWithBoundary)
    expect(lib.parseDocsSearchParams).toBe(parseDocsSearchParams)
    expect(lib.buildDocsSearchParams).toBe(buildDocsSearchParams)
  })

  it('parseDocsSearchParams handles empty and partial params', () => {
    expect(parseDocsSearchParams('')).toEqual({})
    expect(parseDocsSearchParams('?file=only.md')).toEqual({ file: 'only.md' })
    expect(parseDocsSearchParams('?anchor=sec')).toEqual({ anchor: 'sec' })
  })
})
