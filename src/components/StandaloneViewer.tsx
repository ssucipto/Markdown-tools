import { useCallback, useRef, useState, type DragEvent } from 'react'
import { DocumentTabs } from '@/components/DocumentTabs'
import { FileExplorer } from '@/components/FileExplorer'
import { MarkdownViewerWithBoundary } from '@/components/MarkdownViewer'
import { EmptyState } from '@/components/Toolbar'
import { useDocumentWorkspace } from '@/hooks/useDocumentWorkspace'
import { useFolderBrowser } from '@/hooks/useFolderBrowser'
import { useShellTheme } from '@/hooks/useShellTheme'
import { useTauriFileOpen } from '@/hooks/useTauriFileOpen'
import { useToast } from '@/hooks/useToast'
import { useWorkspaceKeyboard } from '@/hooks/useWorkspaceKeyboard'

const MD_EXT = /\.(md|markdown)$/i
const READ_ERROR = '⚠️ Could not read file'

export function StandaloneViewer() {
  const workspace = useDocumentWorkspace()
  const folder = useFolderBrowser()
  const folderInputRef = useRef<HTMLInputElement>(null)
  const shellFileInputRef = useRef<HTMLInputElement>(null)
  const { toast, showToast } = useToast()
  const [folderLoading, setFolderLoading] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [shellDragOver, setShellDragOver] = useState(false)
  const { theme, dark, handleThemeChange } = useShellTheme()

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

  const toggleExplorer = useCallback(() => {
    setExplorerCollapsed(!explorerCollapsed)
  }, [explorerCollapsed, setExplorerCollapsed])

  const handleCloseActiveTab = useCallback(() => {
    if (activeTabId) closeTab(activeTabId)
  }, [activeTabId, closeTab])

  useWorkspaceKeyboard({
    hasFolder: folder.hasFolder,
    fullscreen,
    explorerCollapsed,
    activeTabId,
    onToggleExplorer: toggleExplorer,
    onNewTab: openTab,
    onCloseActiveTab: handleCloseActiveTab,
  })

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
        if (text !== null) {
          openPathInTab(path, text)
        } else {
          showToast(READ_ERROR)
        }
      } catch {
        showToast(READ_ERROR)
      } finally {
        setFolderLoading(false)
      }
    },
    [folder, openPathInTab, showToast],
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

  const loadDroppedFile = useCallback(
    async (file: File) => {
      try {
        await loadFileIntoActiveTab(file)
      } catch {
        showToast(READ_ERROR)
      }
    },
    [loadFileIntoActiveTab, showToast],
  )

  const handleFileDrop = useCallback(
    (file: File) => {
      loadDroppedFile(file).catch(console.warn)
    },
    [loadDroppedFile],
  )

  const handleDropOnTab = useCallback(
    async (tabId: string | null, file: File) => {
      try {
        const content = await file.text()
        const path = `[dropped] ${file.name}`
        if (tabId) {
          loadIntoTab(tabId, path, content)
        } else {
          await loadFileIntoActiveTab(file)
        }
      } catch {
        showToast(READ_ERROR)
      }
    },
    [loadIntoTab, loadFileIntoActiveTab, showToast],
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
      loadDroppedFile(file).catch(console.warn)
    },
    [loadDroppedFile, showToast],
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
      loadDroppedFile(file).catch(console.warn)
      e.target.value = ''
    },
    [loadDroppedFile, showToast],
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
