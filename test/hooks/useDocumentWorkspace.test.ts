import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDocumentWorkspace } from '@/hooks/useDocumentWorkspace'

describe('useDocumentWorkspace', () => {
  it('starts with no tabs', () => {
    const { result } = renderHook(() => useDocumentWorkspace())
    expect(result.current.tabs).toEqual([])
    expect(result.current.activeTabId).toBeNull()
    expect(result.current.activeTab).toBeNull()
  })

  it('openTab creates untitled tab and activates it', () => {
    const { result } = renderHook(() => useDocumentWorkspace())
    let id = ''
    act(() => {
      id = result.current.openTab()
    })
    expect(result.current.tabs).toHaveLength(1)
    expect(result.current.activeTabId).toBe(id)
    expect(result.current.activeTab?.title).toBe('Untitled')
  })

  it('closeTab removes tab and selects neighbour', () => {
    const { result } = renderHook(() => useDocumentWorkspace())
    act(() => {
      result.current.openTab()
      result.current.openTab()
    })
    const [first, second] = result.current.tabs
    act(() => {
      result.current.closeTab(second.id)
    })
    expect(result.current.tabs).toHaveLength(1)
    expect(result.current.activeTabId).toBe(first.id)
  })

  it('openPathInTab focuses existing path', () => {
    const { result } = renderHook(() => useDocumentWorkspace())
    act(() => {
      result.current.openPathInTab('docs/a.md', '# A')
      result.current.openPathInTab('docs/b.md', '# B')
      result.current.openPathInTab('docs/a.md', '# A updated')
    })
    expect(result.current.tabs).toHaveLength(2)
    expect(result.current.activeTab?.documentPath).toBe('docs/a.md')
    expect(result.current.activeTab?.content).toBe('# A updated')
  })

  it('loadIntoActiveTab loads into active tab', () => {
    const { result } = renderHook(() => useDocumentWorkspace())
    act(() => {
      result.current.openTab()
    })
    const tabId = result.current.activeTabId!
    act(() => {
      result.current.loadIntoActiveTab('[dropped] x.md', '# X')
    })
    expect(result.current.tabs.find((t) => t.id === tabId)?.content).toBe('# X')
  })

  it('loadIntoActiveTab focuses existing path instead of duplicating', () => {
    const { result } = renderHook(() => useDocumentWorkspace())
    act(() => {
      result.current.openPathInTab('docs/a.md', '# A')
      result.current.openTab()
    })
    const firstId = result.current.tabs[0].id
    act(() => {
      result.current.loadIntoActiveTab('docs/a.md', '# A updated')
    })
    expect(result.current.tabs).toHaveLength(2)
    expect(result.current.activeTabId).toBe(firstId)
    expect(result.current.tabs.find((t) => t.id === firstId)?.content).toBe('# A updated')
  })
})
