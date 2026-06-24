import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FileExplorer } from '@/components/FileExplorer'

const files = [
  { name: 'readme.md', path: 'docs/readme.md', dir: 'docs' },
  { name: 'guide.md', path: 'docs/guide.md', dir: 'docs' },
]

describe('FileExplorer', () => {
  it('renders file list and collapse toggle', () => {
    render(
      <FileExplorer
        files={files}
        selectedPath="docs/readme.md"
        collapsed={false}
        dark={false}
        onSelect={() => {}}
        onToggleCollapse={() => {}}
      />,
    )
    expect(screen.getByTestId('file-explorer')).toBeInTheDocument()
    expect(screen.getByText('readme.md')).toBeInTheDocument()
    expect(screen.getByTestId('explorer-collapse-toggle')).toBeInTheDocument()
  })

  it('calls onToggleCollapse when chevron clicked', async () => {
    const user = userEvent.setup()
    const onToggleCollapse = vi.fn()
    render(
      <FileExplorer
        files={files}
        selectedPath={null}
        collapsed={false}
        dark={false}
        onSelect={() => {}}
        onToggleCollapse={onToggleCollapse}
      />,
    )
    await user.click(screen.getByTestId('explorer-collapse-toggle'))
    expect(onToggleCollapse).toHaveBeenCalledOnce()
  })

  it('marks collapsed state via aria-hidden', () => {
    const { rerender } = render(
      <FileExplorer
        files={files}
        selectedPath={null}
        collapsed={false}
        dark={false}
        onSelect={() => {}}
        onToggleCollapse={() => {}}
      />,
    )
    expect(screen.getByTestId('file-explorer')).toHaveAttribute('aria-hidden', 'false')
    rerender(
      <FileExplorer
        files={files}
        selectedPath={null}
        collapsed={true}
        dark={false}
        onSelect={() => {}}
        onToggleCollapse={() => {}}
      />,
    )
    expect(screen.getByTestId('file-explorer')).toHaveAttribute('aria-hidden', 'true')
  })
})
