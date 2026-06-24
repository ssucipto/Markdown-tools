import { useEffect } from 'react'

export interface WorkspaceKeyboardOptions {
  hasFolder: boolean
  fullscreen: boolean
  explorerCollapsed: boolean
  activeTabId: string | null
  onToggleExplorer: () => void
  onNewTab: () => void
  onCloseActiveTab: () => void
}

export function useWorkspaceKeyboard({
  hasFolder,
  fullscreen,
  onToggleExplorer,
  onNewTab,
  onCloseActiveTab,
  activeTabId,
}: WorkspaceKeyboardOptions): void {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const inField =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        if (inField) return
        e.preventDefault()
        onNewTab()
        return
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
        if (inField) return
        if (!activeTabId) return
        e.preventDefault()
        onCloseActiveTab()
        return
      }

      if (e.key !== '[' || e.metaKey || e.ctrlKey || e.altKey) return
      if (inField) return
      if (!hasFolder || fullscreen) return
      e.preventDefault()
      onToggleExplorer()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasFolder, fullscreen, onToggleExplorer, onNewTab, onCloseActiveTab, activeTabId])
}
