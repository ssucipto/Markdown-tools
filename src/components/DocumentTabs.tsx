import { useCallback, useRef, type DragEvent, type KeyboardEvent } from 'react'
import type { TabDocument } from '@/types/workspace'

export interface DocumentTabsProps {
  tabs: TabDocument[]
  activeTabId: string | null
  appTitle?: string
  onSelect: (id: string) => void
  onClose: (id: string) => void
  onNewTab: () => void
  onDropOnTab?: (tabId: string | null, file: File) => void
  onInvalidFileDrop?: () => void
}

const MD_EXT = /\.(md|markdown)$/i

export function DocumentTabs({
  tabs,
  activeTabId,
  appTitle = 'Markdown-tools',
  onSelect,
  onClose,
  onNewTab,
  onDropOnTab,
  onInvalidFileDrop,
}: DocumentTabsProps) {
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

  const handleTabDrop = useCallback(
    (e: DragEvent, tabId: string | null) => {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer.files[0]
      if (!file) return
      if (!MD_EXT.test(file.name)) {
        onInvalidFileDrop?.()
        return
      }
      onDropOnTab?.(tabId, file)
    },
    [onDropOnTab, onInvalidFileDrop],
  )

  const focusTab = useCallback((id: string) => {
    tabRefs.current.get(id)?.focus()
  }, [])

  const handleTabListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!tabs.length || !activeTabId) return
      const idx = tabs.findIndex((t) => t.id === activeTabId)
      if (idx < 0) return

      let nextIdx: number | null = null
      if (e.key === 'ArrowRight') nextIdx = (idx + 1) % tabs.length
      else if (e.key === 'ArrowLeft') nextIdx = (idx - 1 + tabs.length) % tabs.length
      else if (e.key === 'Home') nextIdx = 0
      else if (e.key === 'End') nextIdx = tabs.length - 1
      else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect(activeTabId)
        return
      } else return

      e.preventDefault()
      const next = tabs[nextIdx!]
      onSelect(next.id)
      focusTab(next.id)
    },
    [tabs, activeTabId, onSelect, focusTab],
  )

  return (
    <div
      className="flex items-center gap-1 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-2 h-10 shrink-0"
      data-testid="tab-bar"
      role="tablist"
      aria-label="Open documents"
      onKeyDown={handleTabListKeyDown}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleTabDrop(e, activeTabId)}
    >
      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 px-2 shrink-0 hidden sm:inline">
        {appTitle}
      </span>
      <div className="flex items-center gap-0.5 overflow-x-auto flex-1 min-w-0">
        {tabs.map((tab) => {
          const active = tab.id === activeTabId
          return (
            <div key={tab.id} className="group flex items-center max-w-[12rem] shrink-0" role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={active}
                tabIndex={active ? 0 : -1}
                ref={(el) => {
                  if (el) tabRefs.current.set(tab.id, el)
                  else tabRefs.current.delete(tab.id)
                }}
                data-testid="document-tab"
                data-tab-id={tab.id}
                className={`flex items-center gap-1 px-3 h-9 text-sm truncate border-b-2 transition-colors ${
                  active
                    ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100'
                    : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                }`}
                title={tab.documentPath ?? tab.title}
                onClick={() => onSelect(tab.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleTabDrop(e, tab.id)}
              >
                <span className="truncate">{tab.title}</span>
              </button>
              <button
                type="button"
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xs leading-none px-1 -ml-1"
                aria-label={`Close ${tab.title}`}
                onClick={(e) => {
                  e.stopPropagation()
                  onClose(tab.id)
                }}
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
      <button
        type="button"
        data-testid="new-tab-button"
        className="shrink-0 w-8 h-8 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 text-lg leading-none"
        aria-label="New tab"
        onClick={onNewTab}
      >
        +
      </button>
    </div>
  )
}
