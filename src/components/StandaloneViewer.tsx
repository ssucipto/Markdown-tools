import { useCallback, useEffect, useRef, useState, type DragEvent } from 'react'
import { DocumentTabs } from '@/components/DocumentTabs'
import { FileExplorer } from '@/components/FileExplorer'
import { MarkdownViewerWithBoundary } from '@/components/MarkdownViewer'
import { EmptyState } from '@/components/Toolbar'
import { useDocumentWorkspace } from '@/hooks/useDocumentWorkspace'
import { useFolderBrowser } from '@/hooks/useFolderBrowser'
import { useTauriFileOpen } from '@/hooks/useTauriFileOpen'
import { useToast } from '@/hooks/useToast'

const MD_EXT = /\.(md|markdown)$/i
const THEME_KEY = 'mdtools.theme'

function readTheme(): 'light' | 'dark' {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function writeTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore
  }
}

export function StandaloneViewer() {
  const workspace = useDocumentWorkspace()
  const folder = useFolderBrowser()
  const folderInputRef = useRef<HTMLInputElement>(null)
  const shellFileInputRef = useRef<HTMLInputElement>(null)
  const { toast, showToast } = useToast()
  const [folderLoading, setFolderLoading] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [shellDragOver, setShellDragOver] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>(readTheme)

  const {
    tabs,
    activeTabId,
    activeTab,
    explorerCollapsed,
    openTab,
    closeTab,
    setActiveTab,
    setExplorerCollapsed,
    openPathInTab,
    loadIntoTab,
    loadFileIntoActiveTab,
  } = workspace

  const dark = theme === 'dark'

  const handleThemeChange = useCallback((next: 'light' | 'dark') => {
    setTheme(next)
    writeTheme(next)
  }, [])

  const toggleExplorer = useCallback(() => {
    setExplorerCollapsed(!explorerCollapsed)
  }, [explorerCollapsed, setExplorerCollapsed])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== '[' || e.metaKey || e.ctrlKey || e.altKey) return
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
      if (!folder.hasFolder || fullscreen) return
      e.preventDefault()
      toggleExplorer()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [folder.hasFolder, fullscreen, toggleExplorer])

  useTauriFileOpen(
    useCallback(
      (path, content) => {
        openPathInTab(path, content)
        showToast(`📄 Opened ${path.split(/[/\\]/).pop()}`)
      },
      [openPathInTab, showToast],
    ),
  )

  const handleSelectFile = useCallback(
    async (path: string) => {
      setFolderLoading(true)
      try {
        const text = await folder.readFile(path)
        if (text !== null) openPathInTab(path, text)
      } finally {
        setFolderLoading(false)
      }
    },
    [folder, openPathInTab],
  )

  const handleOpenFolder = useCallback(async () => {
    try {
      await folder.openFolder()
      showToast('📁 Folder opened')
    } catch (err) {
      if (err instanceof Error && err.message === 'unsupported') {
        folderInputRef.current?.click()
      } else {
        showToast('⚠️ Could not open folder')
      }
    }
  }, [folder, showToast])

  const onFolderInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const list = e.target.files
      if (!list?.length) return
      folder.openFolderFallback(list)
      showToast(`📁 Loaded ${list.length} files`)
      e.target.value = ''
    },
    [folder, showToast],
  )

  const handleFileDrop = useCallback(
    (file: File) => {
      void loadFileIntoActiveTab(file)
    },
    [loadFileIntoActiveTab],
  )

  const handleDropOnTab = useCallback(
    (tabId: string | null, file: File) => {
      if (tabId) {
        void file.text().then((content) => {
          loadIntoTab(tabId, `[dropped] ${file.name}`, content)
        })
        return
      }
      void loadFileIntoActiveTab(file)
    },
    [loadIntoTab, loadFileIntoActiveTab],
  )

  const handleShellDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setShellDragOver(false)
      const file = e.dataTransfer.files[0]
      if (!file) return
      if (!MD_EXT.test(file.name)) {
        showToast('⚠️ Only .md files are supported')
        return
      }
      void loadFileIntoActiveTab(file)
    },
    [loadFileIntoActiveTab, showToast],
  )

  const handleShellFilePick = useCallback(() => {
    shellFileInputRef.current?.click()
  }, [])

  const onShellFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      if (!MD_EXT.test(file.name)) {
        showToast('⚠️ Only .md files are supported')
        e.target.value = ''
        return
      }
      void loadFileIntoActiveTab(file)
      e.target.value = ''
    },
    [loadFileIntoActiveTab, showToast],
  )

  const hasTabs = tabs.length > 0
  const showExplorer = folder.hasFolder && !fullscreen

  return (
    <div
      className={`flex flex-col h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 ${dark ? 'dark' : ''}`}
    >
      <input
        ref={folderInputRef}
        type="file"
        accept=".md,.markdown"
        multiple
        data-testid="folder-picker-input"
        // @ts-expect-error webkitdirectory is non-standard but widely supported
        webkitdirectory=""
        className="hidden"
        aria-hidden="true"
        onChange={onFolderInputChange}
      />
      {!hasTabs && (
        <input
          ref={shellFileInputRef}
          type="file"
          accept=".md,.markdown"
          data-testid="file-picker-input"
          className="hidden"
          aria-hidden="true"
          onChange={onShellFileInputChange}
        />
      )}

      <DocumentTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onSelect={setActiveTab}
        onClose={closeTab}
        onNewTab={openTab}
        onDropOnTab={handleDropOnTab}
        onInvalidFileDrop={() => showToast('⚠️ Only .md files are supported')}
      />

      <div
        className="flex flex-1 min-h-0"
        onDragOver={(e) => {
          e.preventDefault()
          if (!hasTabs) setShellDragOver(true)
        }}
        onDragLeave={() => setShellDragOver(false)}
        onDrop={handleShellDrop}
      >
        {showExplorer && (
          <FileExplorer
            files={folder.files}
            selectedPath={activeTab?.documentPath ?? null}
            collapsed={explorerCollapsed}
            dark={dark}
            onSelect={handleSelectFile}
            onToggleCollapse={toggleExplorer}
            onOpenFolder={handleOpenFolder}
          />
        )}

        <div className="flex-1 min-w-0 flex flex-col">
          {hasTabs && activeTab ? (
            <MarkdownViewerWithBoundary
              key={activeTab.id}
              content={activeTab.documentPath != null ? activeTab.content : undefined}
              documentPath={activeTab.documentPath}
              files={folder.files}
              onSelectFile={handleSelectFile}
              loading={folder.loading || folderLoading}
              showSidebar={false}
              theme={theme}
              onThemeChange={handleThemeChange}
              onOpenFolder={handleOpenFolder}
              supportsFolderPicker={folder.supportsDirectoryPicker}
              rawMarkdown={activeTab.documentPath != null ? activeTab.content : undefined}
              onFileDrop={handleFileDrop}
              onFullscreenChange={setFullscreen}
              onToggleExplorer={showExplorer ? toggleExplorer : undefined}
            />
          ) : (
            <EmptyState dark={dark} dragOver={shellDragOver} onPickFile={handleShellFilePick} />
          )}
        </div>
      </div>

      {!hasTabs && toast && (
        <div
          className="fixed bottom-20 right-4 z-50 bg-zinc-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm"
          role="status"
        >
          {toast}
        </div>
      )}
    </div>
  )
}
