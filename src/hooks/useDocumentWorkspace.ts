import { useCallback, useReducer } from 'react'
import type { DocumentWorkspaceState, TabDocument } from '@/types/workspace'

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

type WorkspaceAction =
  | { type: 'OPEN_TAB'; id: string }
  | { type: 'CLOSE_TAB'; id: string }
  | { type: 'SET_ACTIVE_TAB'; id: string }
  | { type: 'SET_EXPLORER_COLLAPSED'; collapsed: boolean }
  | { type: 'OPEN_PATH_IN_TAB'; path: string; content: string }
  | { type: 'LOAD_INTO_ACTIVE_TAB'; path: string; content: string }
  | { type: 'LOAD_INTO_TAB'; tabId: string; path: string; content: string }

function workspaceReducer(state: DocumentWorkspaceState, action: WorkspaceAction): DocumentWorkspaceState {
  switch (action.type) {
    case 'OPEN_TAB': {
      const id = action.id
      const tab: TabDocument = { id, documentPath: null, content: '', title: 'Untitled' }
      return { ...state, tabs: [...state.tabs, tab], activeTabId: id }
    }
    case 'CLOSE_TAB': {
      const nextTabs = state.tabs.filter((t) => t.id !== action.id)
      const activeTabId =
        state.activeTabId !== action.id ? state.activeTabId : neighbourTabId(state.tabs, action.id)
      return { ...state, tabs: nextTabs, activeTabId }
    }
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTabId: action.id }
    case 'SET_EXPLORER_COLLAPSED':
      return { ...state, explorerCollapsed: action.collapsed }
    case 'OPEN_PATH_IN_TAB': {
      const { path, content } = action
      const existing = state.tabs.find((t) => t.documentPath === path)
      if (existing) {
        return {
          ...state,
          activeTabId: existing.id,
          tabs: state.tabs.map((t) =>
            t.id === existing.id ? { ...t, content, title: titleFromPath(path) } : t,
          ),
        }
      }
      const id = newTabId()
      const tab: TabDocument = { id, documentPath: path, content, title: titleFromPath(path) }
      return { ...state, tabs: [...state.tabs, tab], activeTabId: id }
    }
    case 'LOAD_INTO_ACTIVE_TAB': {
      const { path, content } = action
      const existing = state.tabs.find((t) => t.documentPath === path)
      if (existing) {
        return {
          ...state,
          activeTabId: existing.id,
          tabs: state.tabs.map((t) =>
            t.id === existing.id ? { ...t, content, title: titleFromPath(path) } : t,
          ),
        }
      }
      if (state.activeTabId) {
        return {
          ...state,
          tabs: state.tabs.map((t) =>
            t.id === state.activeTabId
              ? { ...t, documentPath: path, content, title: titleFromPath(path) }
              : t,
          ),
        }
      }
      const id = newTabId()
      const tab: TabDocument = { id, documentPath: path, content, title: titleFromPath(path) }
      return { ...state, tabs: [...state.tabs, tab], activeTabId: id }
    }
    case 'LOAD_INTO_TAB': {
      const { tabId, path, content } = action
      const existing = state.tabs.find((t) => t.documentPath === path)
      if (existing) {
        return {
          ...state,
          activeTabId: existing.id,
          tabs: state.tabs.map((t) =>
            t.id === existing.id ? { ...t, content, title: titleFromPath(path) } : t,
          ),
        }
      }
      return {
        ...state,
        activeTabId: tabId,
        tabs: state.tabs.map((t) =>
          t.id === tabId ? { ...t, documentPath: path, content, title: titleFromPath(path) } : t,
        ),
      }
    }
    default:
      return state
  }
}

const initialWorkspaceState = (): DocumentWorkspaceState => ({
  tabs: [],
  activeTabId: null,
  explorerCollapsed: readExplorerCollapsed(),
})

export function useDocumentWorkspace() {
  const [state, dispatch] = useReducer(workspaceReducer, undefined, initialWorkspaceState)
  const { tabs, activeTabId, explorerCollapsed } = state
  const activeTab = tabs.find((t) => t.id === activeTabId) ?? null

  const openTab = useCallback((): string => {
    const id = newTabId()
    dispatch({ type: 'OPEN_TAB', id })
    return id
  }, [])

  const closeTab = useCallback((id: string) => {
    dispatch({ type: 'CLOSE_TAB', id })
  }, [])

  const setActiveTab = useCallback((id: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', id })
  }, [])

  const setExplorerCollapsed = useCallback((collapsed: boolean) => {
    dispatch({ type: 'SET_EXPLORER_COLLAPSED', collapsed })
    writeExplorerCollapsed(collapsed)
  }, [])

  const openPathInTab = useCallback((path: string, content: string) => {
    dispatch({ type: 'OPEN_PATH_IN_TAB', path, content })
  }, [])

  const loadIntoActiveTab = useCallback((path: string, content: string) => {
    dispatch({ type: 'LOAD_INTO_ACTIVE_TAB', path, content })
  }, [])

  const loadIntoTab = useCallback((tabId: string, path: string, content: string) => {
    dispatch({ type: 'LOAD_INTO_TAB', tabId, path, content })
  }, [])

  const loadFileIntoActiveTab = useCallback(
    async (file: File): Promise<void> => {
      const content = await file.text()
      dispatch({
        type: 'LOAD_INTO_ACTIVE_TAB',
        path: `[dropped] ${file.name}`,
        content,
      })
    },
    [],
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
