import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MarkdownViewer } from '@/components/MarkdownViewer'

vi.stubGlobal(
  'IntersectionObserver',
  class {
    observe = vi.fn()
    disconnect = vi.fn()
    unobserve = vi.fn()
  },
)

const mockMermaidRender = vi.fn().mockResolvedValue({ svg: '<svg data-testid="mermaid-svg">mock</svg>' })
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: mockMermaidRender,
  },
}))

const SAMPLE_MD = `# Test Document

## Table

| Col1 | Col2 |
|------|------|
| A | B |

\`\`\`typescript
const x = 1
\`\`\`

\`\`\`mermaid
graph TD
  A-->B
\`\`\`
`

describe('MarkdownViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows empty state when no document loaded', () => {
    render(<MarkdownViewer />)
    expect(screen.getByText(/Drop a/i)).toBeInTheDocument()
  })

  it('renders controlled markdown content', async () => {
    render(
      <MarkdownViewer content={SAMPLE_MD} documentPath="test.md" />,
    )
    expect(await screen.findByRole('heading', { name: 'Test Document' })).toBeInTheDocument()
    expect(screen.getByText('Col1')).toBeInTheDocument()
  })

  it('renders mermaid via dynamic import', async () => {
    render(<MarkdownViewer content={SAMPLE_MD} documentPath="test.md" />)
    await waitFor(() => expect(mockMermaidRender).toHaveBeenCalled())
  })

  it('shows toolbar when document is loaded', async () => {
    render(<MarkdownViewer content="# Hi" documentPath="hi.md" />)
    expect(await screen.findByLabelText('Export to Word')).toBeInTheDocument()
    expect(screen.getByLabelText('Export to PDF')).toBeInTheDocument()
  })

  it('renders embed sidebar when files provided', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <MarkdownViewer
        content=""
        showSidebar
        files={[{ name: 'readme', path: 'README.md', dir: 'Root' }]}
        onSelectFile={onSelect}
      />,
    )
    await user.click(screen.getByText('readme'))
    expect(onSelect).toHaveBeenCalledWith('README.md')
  })

  it('generates TOC from headings', async () => {
    render(<MarkdownViewer content={SAMPLE_MD} documentPath="test.md" />)
    expect(await screen.findByLabelText('Table of contents')).toBeInTheDocument()
    expect(screen.getAllByText('Table').length).toBeGreaterThan(0)
  })
})
