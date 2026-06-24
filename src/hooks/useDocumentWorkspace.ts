import { useCallback, useState } from 'react'
import type { TabDocument } from '@/types/workspace'

const EXPLORER_COLLAPSED_KEY = 'mdtools.explorer.collapsed'

function readExplorerCollapsed(): boolean {
  try {
    return localStorage.getItem(EXPLORER_COLLAPSED_KEY) === 'true'
  } catch {
    return false
  }
}

function writeExplorerCollapsed(collapsed: boolean): void {
  try {
    localStorage.setItem(EXPLORER_COLLAPSED_KEY, String(collapsed))
  } catch {
    // ignore quota / private mode
  }
}

function newTabId(): string {
  return crypto.randomUUID()
}

function titleFromPath(path: string | null): string {
  if (!path) return 'Untitled'
  const base = path.split(/[/\\]/).pop() ?? path
  return base.replace(/^\[dropped\] /, '').replace(/\.md$/i, '') || 'Untitled'
}

function neighbourTabId(tabs: TabDocument[], closedId: string): string | null {
  const idx = tabs.findIndex((t) => t.id === closedId)
  if (idx < 0) return tabs[0]?.id ?? null
  const next = tabs[idx + 1] ?? tabs[idx - 1]
  return next?.id ?? null
}

export function useDocumentWorkspace() {
  const [tabs, setTabs] = useState<TabDocument[]>([])
  const [activeTabId, setActiveTabId] = useState<string | null>(null)
  const [explorerCollapsed, setExplorerCollapsedState] = useState(readExplorerCollapsed)

  const activeTab = tabs.find((t) => t.id === activeTabId) ?? null

  const openTab = useCallback((): string => {
    const id = newTabId()
    const tab: TabDocument = { id, documentPath: null, content: '', title: 'Untitled' }
    setTabs((prev) => [...prev, tab])
    setActiveTabId(id)
    return id
  }, [])

  const closeTab = useCallback((id: string) => {
    setTabs((prev) => {
      const next = prev.filter((t) => t.id !== id)
      setActiveTabId((current) => {
        if (current !== id) return current
        return neighbourTabId(prev, id)
      })
      return next
    })
  }, [])

  const setActiveTab = useCallback((id: string) => {
    setActiveTabId(id)
  }, [])

  const setExplorerCollapsed = useCallback((collapsed: boolean) => {
    setExplorerCollapsedState(collapsed)
    writeExplorerCollapsed(collapsed)
  }, [])

  const openPathInTab = useCallback((path: string, content: string) => {
    setTabs((prev) => {
      const existing = prev.find((t) => t.documentPath === path)
      if (existing) {
        setActiveTabId(existing.id)
        return prev.map((t) => (t.id === existing.id ? { ...t, content, title: titleFromPath(path) } : t))
      }
      const id = newTabId()
      const tab: TabDocument = {
        id,
        documentPath: path,
        content,
        title: titleFromPath(path),
      }
      setActiveTabId(id)
      return [...prev, tab]
    })
  }, [])

  const loadIntoActiveTab = useCallback(
    (path: string, content: string) => {
      setTabs((prev) => {
        const existing = prev.find((t) => t.documentPath === path)
        if (existing) {
          setActiveTabId(existing.id)
          return prev.map((t) =>
            t.id === existing.id ? { ...t, content, title: titleFromPath(path) } : t,
          )
        }
        if (activeTabId) {
          return prev.map((t) =>
            t.id === activeTabId
              ? { ...t, documentPath: path, content, title: titleFromPath(path) }
              : t,
          )
        }
        const id = newTabId()
        const tab: TabDocument = {
          id,
          documentPath: path,
          content,
          title: titleFromPath(path),
        }
        setActiveTabId(id)
        return [...prev, tab]
      })
    },
    [activeTabId],
  )

  const loadIntoTab = useCallback((tabId: string, path: string, content: string) => {
    setTabs((prev) => {
      const existing = prev.find((t) => t.documentPath === path)
      if (existing) {
        setActiveTabId(existing.id)
        return prev.map((t) =>
          t.id === existing.id ? { ...t, content, title: titleFromPath(path) } : t,
        )
      }
      setActiveTabId(tabId)
      return prev.map((t) =>
        t.id === tabId ? { ...t, documentPath: path, content, title: titleFromPath(path) } : t,
      )
    })
  }, [])

  const loadFileIntoActiveTab = useCallback(
    (file: File): Promise<void> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const path = `[dropped] ${file.name}`
          loadIntoActiveTab(path, reader.result as string)
          resolve()
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsText(file)
      })
    },
    [loadIntoActiveTab],
  )

  return {
    tabs,
    activeTabId,
    activeTab,
    explorerCollapsed,
    openTab,
    closeTab,
    setActiveTab,
    setExplorerCollapsed,
    openPathInTab,
    loadIntoActiveTab,
    loadIntoTab,
    loadFileIntoActiveTab,
  }
}
