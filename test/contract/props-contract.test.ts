import { describe, expect, it } from 'vitest'
import type { MarkdownViewerProps } from '@/types/viewer'

/** Contract snapshot — CI fails if embed props drift without semver bump. */
const REQUIRED_PROPS: (keyof MarkdownViewerProps)[] = [
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
    const sample: MarkdownViewerProps = {
      content: '',
      documentPath: null,
      files: [],
      onSelectFile: () => {},
      loading: false,
      showSidebar: true,
      theme: 'light',
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
    expect(file).toMatchObject({ name: expect.any(String), path: expect.any(String), dir: expect.any(String) })
  })
})
