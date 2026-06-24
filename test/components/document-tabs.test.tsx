import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DocumentTabs } from '@/components/DocumentTabs'
import type { TabDocument } from '@/types/workspace'

const tabs: TabDocument[] = [
  { id: 'a', documentPath: 'a.md', content: '# A', title: 'a' },
  { id: 'b', documentPath: 'b.md', content: '# B', title: 'b' },
]

describe('DocumentTabs', () => {
  it('renders tabs and new button', () => {
    render(
      <DocumentTabs
        tabs={tabs}
        activeTabId="a"
        onSelect={() => {}}
        onClose={() => {}}
        onNewTab={() => {}}
      />,
    )
    expect(screen.getByTestId('tab-bar')).toBeInTheDocument()
    expect(screen.getAllByTestId('document-tab')).toHaveLength(2)
    expect(screen.getByTestId('new-tab-button')).toBeInTheDocument()
  })

  it('calls onSelect and onClose', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    const onClose = vi.fn()
    render(
      <DocumentTabs
        tabs={tabs}
        activeTabId="a"
        onSelect={onSelect}
        onClose={onClose}
        onNewTab={() => {}}
      />,
    )
    await user.click(screen.getByText('b'))
    expect(onSelect).toHaveBeenCalledWith('b')
    const closeBtn = screen.getAllByLabelText(/Close/i)[0]
    await user.click(closeBtn)
    expect(onClose).toHaveBeenCalledWith('a')
  })

  it('arrow keys move selection', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(
      <DocumentTabs
        tabs={tabs}
        activeTabId="a"
        onSelect={onSelect}
        onClose={() => {}}
        onNewTab={() => {}}
      />,
    )
    const tabA = screen.getByRole('tab', { name: 'a' })
    tabA.focus()
    await user.keyboard('{ArrowRight}')
    expect(onSelect).toHaveBeenCalledWith('b')
  })
})
