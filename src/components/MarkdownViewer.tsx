import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from 'react'
import { openPdfPrintWindow, exportPdfDocument } from '@/markdown/exportPdf'
import { exportWordDocument } from '@/markdown/exportWord'
import { parseMarkdown } from '@/markdown/parse'
import { renderMermaidDiagrams, resetMermaidForTheme } from '@/markdown/renderMermaid'
import type { MarkdownViewerProps } from '@/types/viewer'
import { ErrorBoundary } from './ErrorBoundary'
import { FileSidebar } from './FileSidebar'
import { ImageLightbox, MermaidLightbox } from './MermaidLightbox'
import { TableOfContents } from './TableOfContents'
import { DragOverlay, EmptyState, Toolbar } from './Toolbar'

export function MarkdownViewer({
  content: controlledContent,
  documentPath: controlledPath,
  files = [],
  onSelectFile,
  loading = false,
  showSidebar = false,
  theme: controlledTheme,
  initialFile,
  initialAnchor,
  className = '',
}: MarkdownViewerProps) {
  const isControlled = controlledContent !== undefined

  const [internalContent, setInternalContent] = useState('')
  const [internalPath, setInternalPath] = useState<string | null>(null)
  const [internalDark, setInternalDark] = useState(false)

  const content = isControlled ? controlledContent : internalContent
  const documentPath = isControlled ? (controlledPath ?? null) : internalPath
  const dark = controlledTheme ? controlledTheme === 'dark' : internalDark

  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [showToc, setShowToc] = useState(true)
  const [dragOver, setDragOver] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [mermaidZoom, setMermaidZoom] = useState<string | null>(null)
  const [exporting, setExporting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [activeId, setActiveId] = useState('')

  const contentRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mermaidRetryRef = useRef(0)
  const initialFileHandled = useRef(false)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }, [])

  const { html, toc } = useMemo(() => parseMarkdown(content ?? ''), [content])
  const innerHtml = useMemo(() => ({ __html: html }), [html])

  // Deep-link: initialFile via embed (M6)
  useEffect(() => {
    if (!initialFile || initialFileHandled.current || !onSelectFile) return
    initialFileHandled.current = true
    onSelectFile(initialFile)
  }, [initialFile, onSelectFile])

  useEffect(() => {
    if (!initialAnchor || !html) return
    const t = setTimeout(() => {
      document.getElementById(initialAnchor)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
    return () => clearTimeout(t)
  }, [initialAnchor, html])

  // Scroll spy
  useEffect(() => {
    if (!html) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveId(e.target.id)
            break
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' },
    )
    const timer = setTimeout(() => {
      contentRef.current?.querySelectorAll('h1[id],h2[id],h3[id]').forEach((h) => observer.observe(h))
    }, 100)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [html])

  const handleMermaidZoom = useCallback((svgHtml: string) => setMermaidZoom(svgHtml), [])

  const runMermaid = useCallback(async () => {
    const el = contentRef.current
    if (!el || !html) return
    await renderMermaidDiagrams(el, dark, handleMermaidZoom, mermaidRetryRef)
  }, [html, dark, handleMermaidZoom])

  useEffect(() => {
    if (!html) return
    mermaidRetryRef.current = 0
    let t: ReturnType<typeof setTimeout>
    const raf = requestAnimationFrame(() => {
      t = setTimeout(() => void runMermaid(), 0)
    })
    return () => {
      cancelAnimationFrame(raf)
      if (t) clearTimeout(t)
    }
  }, [html, runMermaid])

  useEffect(() => {
    const el = contentRef.current
    if (!el || !html) return
    const blocks = el.querySelectorAll<HTMLElement>('pre.mermaid[data-mermaid-done]')
    if (!blocks.length) return
    mermaidRetryRef.current = 0
    resetMermaidForTheme(el)
    const raf = requestAnimationFrame(() => {
      setTimeout(() => void runMermaid(), 0)
    })
    return () => cancelAnimationFrame(raf)
  }, [dark]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    const copyBtn = (e.target as HTMLElement).closest('.code-copy-btn')
    if (copyBtn instanceof HTMLButtonElement) {
      const code = copyBtn.getAttribute('data-code')?.replace(/&quot;/g, '"').replace(/&amp;/g, '&')
      if (code) {
        void navigator.clipboard.writeText(code).then(() => {
          copyBtn.textContent = 'Copied!'
          setTimeout(() => {
            copyBtn.textContent = 'Copy'
          }, 2000)
        })
      }
      return
    }
    const img = (e.target as HTMLElement).closest('img')
    if (img instanceof HTMLImageElement && img.src) setLightboxSrc(img.src)
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (!file) return
      if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) return
      const reader = new FileReader()
      reader.onload = () => {
        if (!isControlled) {
          setInternalPath(`[dropped] ${file.name}`)
          setInternalContent(reader.result as string)
        }
      }
      reader.readAsText(file)
    },
    [isControlled],
  )

  const handleFilePick = useCallback(() => fileInputRef.current?.click(), [])

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        if (!isControlled) {
          setInternalPath(`[dropped] ${file.name}`)
          setInternalContent(reader.result as string)
        }
      }
      reader.readAsText(file)
      e.target.value = ''
    },
    [isControlled],
  )

  const handleSelectFile = useCallback(
    (path: string) => {
      if (onSelectFile) onSelectFile(path)
      else if (!isControlled) setInternalPath(path)
    },
    [onSelectFile, isControlled],
  )

  const exportWord = useCallback(async () => {
    const el = contentRef.current
    if (!el) return
    setExporting(true)
    try {
      const { blob, filename } = await exportWordDocument(el, documentPath)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
      showToast(`✅ Exported as ${filename}`)
    } catch {
      showToast('⚠️ Export failed')
    } finally {
      setExporting(false)
    }
  }, [documentPath, showToast])

  const exportPdf = useCallback(async () => {
    const el = contentRef.current
    if (!el) return
    showToast('📄 Preparing PDF…')
    try {
      const { html: pdfHtml, title } = await exportPdfDocument(el, documentPath)
      if (!openPdfPrintWindow(pdfHtml, title)) {
        showToast('⚠️ Popup blocked — allow popups for PDF export')
      }
    } catch {
      showToast('⚠️ PDF export failed')
    }
  }, [documentPath, showToast])

  const fontSizeClass = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[fontSize]
  const hasDocument = Boolean(documentPath && content)
  const showFileSidebar = showSidebar && files.length > 0 && !fullscreen

  if (loading) {
    return <div className="p-6 text-gray-400 animate-pulse">Loading documents…</div>
  }

  return (
    <div
      className={`flex h-full min-h-[calc(100vh-2rem)] ${dark ? 'bg-gray-900 text-gray-200' : 'bg-white'} ${className}`}
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown"
        className="hidden"
        aria-hidden="true"
        onChange={onFileInputChange}
      />

      {dragOver && <DragOverlay />}
      {showFileSidebar && (
        <FileSidebar files={files} selectedPath={documentPath} dark={dark} onSelect={handleSelectFile} />
      )}

      <main className="flex-1 flex overflow-hidden">
        <div
          ref={contentRef}
          onClick={handleContentClick}
          className={`flex-1 overflow-y-auto p-6 ${fontSizeClass}`}
        >
          {!hasDocument ? (
            <EmptyState dark={dark} dragOver={dragOver} />
          ) : !html ? (
            <div className="animate-pulse text-gray-400">Rendering…</div>
          ) : (
            <article
              className={`prose-doc max-w-4xl ${dark ? 'prose-invert' : ''}`}
              dangerouslySetInnerHTML={innerHtml}
            />
          )}
        </div>

        {!fullscreen && (
          <TableOfContents
            toc={toc}
            activeId={activeId}
            dark={dark}
            showToc={showToc}
            onToggle={() => setShowToc((v) => !v)}
          />
        )}
      </main>

      <Toolbar
        visible={hasDocument}
        dark={dark}
        fontSize={fontSize}
        exporting={exporting}
        fullscreen={fullscreen}
        onToggleDark={() => setInternalDark((d) => !d)}
        onToggleFont={() => setFontSize((f) => (f === 'sm' ? 'md' : f === 'md' ? 'lg' : 'sm'))}
        onExportWord={() => void exportWord()}
        onExportPdf={() => void exportPdf()}
        onScrollTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onToggleFullscreen={() => setFullscreen((f) => !f)}
        onPickFile={handleFilePick}
      />

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      <MermaidLightbox svgHtml={mermaidZoom} onClose={() => setMermaidZoom(null)} />

      {toast && (
        <div className="fixed bottom-20 right-4 z-50 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}

export function MarkdownViewerWithBoundary(props: MarkdownViewerProps) {
  return (
    <ErrorBoundary>
      <MarkdownViewer {...props} />
    </ErrorBoundary>
  )
}
