import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'
import { useMarkdownDocument } from '@/hooks/useMarkdownDocument'
import { useToast } from '@/hooks/useToast'
import { decodeDataAttribute } from '@/lib/html-entities'
import { attachMermaidToolbars } from '@/lib/mermaid-actions'
import { exportDocxDocument } from '@/markdown/exportDocx'
import { printHtmlDocument, exportPdfDocument } from '@/markdown/exportPdf'
import { acquireSaveTarget, commitSaveTarget, deriveExportFilename, toastForSaveResult } from '@/lib/saveBlob'
import { parseMarkdown } from '@/markdown/parse'
import { renderMermaidDiagrams, resetMermaidForTheme, type MermaidError } from '@/markdown/renderMermaid'
import type { MarkdownViewerProps } from '@/types/viewer'
import { ErrorBoundary } from './ErrorBoundary'
import { FileSidebar } from './FileSidebar'
import { ImageLightbox, MermaidLightbox } from './MermaidLightbox'
import { TableOfContents } from './TableOfContents'
import { DragOverlay, EmptyState, Toolbar } from './Toolbar'

const MD_EXT = /\.(md|markdown)$/i

function isMarkdownFile(name: string): boolean {
  return MD_EXT.test(name)
}

export function MarkdownViewer({
  content: controlledContent,
  documentPath: controlledPath,
  files = [],
  onSelectFile,
  loading = false,
  showSidebar = false,
  theme: controlledTheme,
  onThemeChange,
  initialFile,
  initialAnchor,
  className = '',
  onOpenFolder,
  supportsFolderPicker: _supportsFolderPicker = false,
  rawMarkdown,
  onFileDrop,
  onFullscreenChange,
  onToggleExplorer,
}: MarkdownViewerProps) {
  void _supportsFolderPicker
  const isControlled = controlledContent !== undefined
  const isThemeControlled = controlledTheme !== undefined

  const doc = useMarkdownDocument()
  const [internalDark, setInternalDark] = useState(false)

  const content = isControlled ? controlledContent : doc.content
  const documentPath = isControlled ? (controlledPath ?? null) : doc.documentPath
  const exportPath = documentPath ?? 'document.md'
  const dark = isThemeControlled ? controlledTheme === 'dark' : internalDark

  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md')
  const [showToc, setShowToc] = useState(true)
  const [dragOver, setDragOver] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [mermaidZoom, setMermaidZoom] = useState<{ svg: string; source: string } | null>(null)
  const [exporting, setExporting] = useState(false)
  const [viewSource, setViewSource] = useState(false)
  const [mermaidErrors, setMermaidErrors] = useState<MermaidError[]>([])
  const [showMermaidReport, setShowMermaidReport] = useState(false)
  const scrollPosRef = useRef(0)
  const { toast, showToast } = useToast()
  const [activeId, setActiveId] = useState('')

  const contentRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)
  const exportMermaidRetryRef = useRef(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mermaidRetryRef = useRef(0)
  const initialFileHandled = useRef(false)

  const { html, toc } = useMemo(() => parseMarkdown(content ?? ''), [content])
  const innerHtml = useMemo(() => ({ __html: html }), [html])
  const hasContent = Boolean(content?.length)

  const handleToggleDark = useCallback(() => {
    if (isThemeControlled) {
      onThemeChange?.(dark ? 'light' : 'dark')
    } else {
      setInternalDark((d) => !d)
    }
  }, [dark, isThemeControlled, onThemeChange])

  // Deep-link: initialFile via embed (M6)
  useEffect(() => {
    if (!initialFile || initialFileHandled.current || !onSelectFile) return
    initialFileHandled.current = true
    onSelectFile(initialFile)
  }, [initialFile, onSelectFile])

  useEffect(() => {
    if (!initialAnchor || !html) return
    const t = setTimeout(() => {
      const root = contentRef.current
      const escaped = CSS.escape(initialAnchor)
      const target = root?.querySelector<HTMLElement>(`#${escaped}`) ?? document.getElementById(initialAnchor)
      target?.scrollIntoView({ behavior: 'smooth' })
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

  const handleMermaidZoom = useCallback((svgHtml: string, source: string) => {
    setMermaidZoom({ svg: svgHtml, source })
  }, [])

  const onMermaidErrors = useCallback((errors: MermaidError[]) => {
    setMermaidErrors(errors)
    if (errors.length > 0) {
      setShowMermaidReport(true)
    }
  }, [])

  const runMermaid = useCallback(async () => {
    const el = contentRef.current
    if (!el || !html || viewSource) return
    await renderMermaidDiagrams(el, dark, handleMermaidZoom, mermaidRetryRef, onMermaidErrors)
    attachMermaidToolbars(el)
  }, [html, dark, handleMermaidZoom, viewSource, onMermaidErrors])

  const runExportMermaid = useCallback(async () => {
    const el = exportRef.current
    if (!el || !html) return
    exportMermaidRetryRef.current = 0
    await renderMermaidDiagrams(el, dark, () => {}, exportMermaidRetryRef)
    attachMermaidToolbars(el)
  }, [html, dark])

  useEffect(() => {
    if (!html) return
    mermaidRetryRef.current = 0
    let t: ReturnType<typeof setTimeout>
    const raf = requestAnimationFrame(() => {
      t = setTimeout(() => {
        runMermaid().catch(console.warn)
        runExportMermaid().catch(console.warn)
      }, 0)
    })
    return () => {
      cancelAnimationFrame(raf)
      if (t) clearTimeout(t)
    }
  }, [html, runMermaid, runExportMermaid])

  useEffect(() => {
    const el = contentRef.current
    if (!el || !html) return
    const blocks = el.querySelectorAll<HTMLElement>('pre.mermaid[data-mermaid-done]')
    if (!blocks.length) return
    mermaidRetryRef.current = 0
    resetMermaidForTheme(el)
    const raf = requestAnimationFrame(() => {
      setTimeout(() => runMermaid().catch(console.warn), 0)
    })
    return () => cancelAnimationFrame(raf)
  }, [dark]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    const copyBtn = (e.target as HTMLElement).closest('.code-copy-btn')
    if (copyBtn instanceof HTMLButtonElement) {
      const raw = copyBtn.getAttribute('data-code')
      const code = raw ? decodeDataAttribute(raw) : null
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          copyBtn.textContent = 'Copied!'
          setTimeout(() => {
            copyBtn.textContent = 'Copy'
          }, 2000)
        }).catch(() => {
          copyBtn.textContent = 'Failed'
          setTimeout(() => { copyBtn.textContent = 'Copy' }, 2000)
        })
      }
      return
    }
    const img = (e.target as HTMLElement).closest('img')
    if (img instanceof HTMLImageElement && img.src) setLightboxSrc(img.src)
  }, [])

  const loadFile = useCallback(
    (file: File) => {
      if (!isMarkdownFile(file.name)) {
        showToast('⚠️ Only .md files are supported')
        return
      }
      if (onFileDrop) {
        onFileDrop(file)
        return
      }
      if (isControlled) return
      doc.loadDroppedFile(file)
    },
    [doc, isControlled, onFileDrop, showToast],
  )

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (!file) {
        // In Tauri WKWebView, dataTransfer.files is empty for native drops.
        // The Rust-level DragDrop handler in lib.rs catches those instead.
        return
      }
      loadFile(file)
    },
    [loadFile],
  )

  const handleFilePick = useCallback(() => fileInputRef.current?.click(), [])

  const onFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      loadFile(file)
      e.target.value = ''
    },
    [loadFile],
  )

  const handleSelectFile = useCallback(
    (path: string) => {
      if (onSelectFile) onSelectFile(path)
      else if (!isControlled) doc.selectPath(path)
    },
    [onSelectFile, isControlled, doc],
  )

  const getExportRoot = useCallback((): HTMLElement | null => {
    return exportRef.current
  }, [])

  const exportDocx = useCallback(async () => {
    const el = getExportRoot()
    if (!el) return
    const filename = deriveExportFilename(exportPath, '.docx')
    setExporting(true)
    try {
      const target = await acquireSaveTarget({
        filename,
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        description: 'Word Document (DOCX)',
      })
      if (target === 'cancelled') {
        showToast('Export cancelled')
        return
      }
      showToast('📄 Preparing export…')
      const { blob } = await exportDocxDocument(el, exportPath)
      toastForSaveResult(await commitSaveTarget(target, blob, filename), filename, showToast)
    } catch {
      showToast('⚠️ DOCX export failed')
    } finally {
      setExporting(false)
    }
  }, [exportPath, showToast, getExportRoot])

  const toggleViewSource = useCallback(() => {
    const el = contentRef.current
    if (el && !viewSource) scrollPosRef.current = el.scrollTop
    setViewSource((v) => !v)
  }, [viewSource])

  useEffect(() => {
    if (!viewSource && scrollPosRef.current) {
      const el = contentRef.current
      if (el) {
        const pos = scrollPosRef.current
        requestAnimationFrame(() => {
          el.scrollTop = pos
        })
      }
    }
  }, [viewSource])

  const sourceText = rawMarkdown ?? content ?? ''

  const exportPdf = useCallback(async () => {
    const el = getExportRoot()
    if (!el) return

    showToast('📄 Preparing PDF…')
    try {
      const { html: pdfHtml } = await exportPdfDocument(el, exportPath)
      if (!(await printHtmlDocument(pdfHtml))) {
        showToast('⚠️ PDF export failed — could not open print dialog')
        return
      }
      showToast('🖨️ Print dialog opened — choose Save as PDF')
    } catch {
      showToast('⚠️ PDF export failed')
    }
  }, [exportPath, showToast, getExportRoot])

  const fontSizeClass = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[fontSize]
  const showFileSidebar = showSidebar && files.length > 0 && !fullscreen

  if (loading) {
    return <div className="p-6 text-zinc-400 animate-pulse">Loading documents…</div>
  }

  return (
    <div
      className={`flex h-full min-h-0 ${dark ? 'bg-zinc-950 text-zinc-200' : 'bg-white'} ${className}`}
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
        data-testid="file-picker-input"
        className="hidden"
        aria-hidden="true"
        onChange={onFileInputChange}
      />

      {hasContent && html && (
        <div ref={exportRef} className="hidden" aria-hidden="true">
          <article
            className={`prose-doc max-w-4xl ${dark ? 'prose-invert' : ''}`}
            dangerouslySetInnerHTML={innerHtml}
          />
        </div>
      )}

      {dragOver && <DragOverlay />}
      {showFileSidebar && (
        <FileSidebar files={files} selectedPath={documentPath} dark={dark} onSelect={handleSelectFile} />
      )}

      {showMermaidReport && mermaidErrors.length > 0 && (
        <MermaidErrorReport errors={mermaidErrors} onDismiss={() => setShowMermaidReport(false)} />
      )}

      <main className="flex-1 flex overflow-hidden">
        <div
          ref={contentRef}
          onClick={handleContentClick}
          className={`flex-1 overflow-y-auto p-6 ${fontSizeClass}`}
        >
          {!hasContent ? (
            <EmptyState dark={dark} dragOver={dragOver} onPickFile={handleFilePick} />
          ) : viewSource ? (
            <pre
              className={`whitespace-pre-wrap font-mono text-sm p-4 rounded-lg border ${
                dark
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-200'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-800'
              }`}
              aria-label="Markdown source"
            >
              {sourceText}
            </pre>
          ) : !html ? (
            <div className="animate-pulse text-zinc-400">Rendering…</div>
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
        visible={true} // Always visible so 📂 file picker is accessible even when empty
        dark={dark}
        fontSize={fontSize}
        exporting={exporting}
        fullscreen={fullscreen}
        viewSource={viewSource}
        showViewSource={Boolean(sourceText)}
        showOpenFolder={Boolean(onOpenFolder)}
        onToggleDark={handleToggleDark}
        onToggleFont={() => setFontSize((f) => (f === 'sm' ? 'md' : f === 'md' ? 'lg' : 'sm'))}
        onExportDocx={() => exportDocx().catch(console.warn)}
        onExportPdf={() => exportPdf().catch(console.warn)}
        exportDisabled={viewSource}
        onScrollTop={() => contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
        onToggleFullscreen={() =>
          setFullscreen((f) => {
            const next = !f
            onFullscreenChange?.(next)
            return next
          })
        }
        onPickFile={handleFilePick}
        onOpenFolder={onOpenFolder}
        onToggleViewSource={toggleViewSource}
        showExplorerToggle={Boolean(onToggleExplorer)}
        onToggleExplorer={onToggleExplorer}
      />

      <ImageLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
      <MermaidLightbox
        svgHtml={mermaidZoom?.svg ?? null}
        source={mermaidZoom?.source ?? ''}
        onClose={() => setMermaidZoom(null)}
      />

      {toast && (
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

/** Floating error report banner for Mermaid diagram failures */
function MermaidErrorReport({ errors, onDismiss }: { errors: MermaidError[]; onDismiss: () => void }) {
  const reportText = useMemo(() => {
    const lines = [
      `Mermaid Diagram Error Report (${errors.length} failure(s))`,
      `Generated: ${new Date().toISOString()}`,
      '',
    ]
    errors.forEach((err, i) => {
      lines.push(`--- Error #${i + 1} ---`)
      lines.push(`Type:    ${err.type}`)
      lines.push(`Message: ${err.message}`)
      lines.push(`Source:`)
      err.source.split('\n').forEach((line) => lines.push(`  ${line}`))
      lines.push('')
    })
    lines.push('--- End of Report ---')
    return lines.join('\n')
  }, [errors])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(reportText)
    } catch {
      // fallback: select text manually
    }
  }, [reportText])

  if (errors.length === 0) return null

  const bg = 'bg-amber-50 border-amber-300 text-amber-900'
  const darkBg = 'dark:bg-amber-900/20 dark:border-amber-700 dark:text-amber-200'

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-md ${bg} ${darkBg} border rounded-lg shadow-lg p-4`}
      role="alert"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span>⚠️</span>
          <span>
            {errors.length} diagram{errors.length > 1 ? 's' : ''} failed to render
          </span>
        </div>
        <button
          onClick={onDismiss}
          className="text-amber-500 hover:text-amber-700 text-lg leading-none"
          aria-label="Dismiss error report"
        >
          &times;
        </button>
      </div>
      <div className="mt-2 text-xs space-y-1">
        {errors.slice(0, 3).map((err, i) => (
          <div key={i} className="truncate">
            <span className="font-medium">#{err.index}:</span> {err.type} — {err.message.slice(0, 60)}
          </div>
        ))}
        {errors.length > 3 && <div className="text-amber-600">…and {errors.length - 3} more</div>}
      </div>
      <button
        onClick={handleCopy}
        className="mt-2 text-xs px-2 py-1 rounded bg-amber-200 hover:bg-amber-300 dark:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
      >
        📋 Copy error report
      </button>
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
