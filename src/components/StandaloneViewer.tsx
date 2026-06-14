import { useCallback, useRef, useState } from 'react'
import { MarkdownViewerWithBoundary } from '@/components/MarkdownViewer'
import { useFolderBrowser } from '@/hooks/useFolderBrowser'
import { useMarkdownDocument } from '@/hooks/useMarkdownDocument'
import { useTauriFileOpen } from '@/hooks/useTauriFileOpen'
import { useToast } from '@/hooks/useToast'

export function StandaloneViewer() {
  const doc = useMarkdownDocument()
  const folder = useFolderBrowser()
  const folderInputRef = useRef<HTMLInputElement>(null)
  const { showToast } = useToast()
  const [folderLoading, setFolderLoading] = useState(false)

  useTauriFileOpen(
    useCallback(
      (path, text) => {
        doc.selectPath(path, text)
        showToast(`📄 Opened ${path.split(/[/\\]/).pop()}`)
      },
      [doc, showToast],
    ),
  )

  const handleSelectFile = useCallback(
    async (path: string) => {
      setFolderLoading(true)
      try {
        const text = await folder.readFile(path)
        if (text !== null) doc.selectPath(path, text)
      } finally {
        setFolderLoading(false)
      }
    },
    [folder, doc],
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

  const showSidebar = folder.hasFolder

  return (
    <>
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
      <MarkdownViewerWithBoundary
        content={doc.documentPath != null ? doc.content : undefined}
        documentPath={doc.documentPath}
        files={folder.files}
        onSelectFile={handleSelectFile}
        loading={folder.loading || folderLoading}
        showSidebar={showSidebar}
        onOpenFolder={handleOpenFolder}
        supportsFolderPicker={folder.supportsDirectoryPicker}
        rawMarkdown={doc.documentPath != null ? doc.content : undefined}
      />
    </>
  )
}
