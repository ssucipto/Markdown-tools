interface ToolbarProps {
  dark: boolean
  fontSize: 'sm' | 'md' | 'lg'
  exporting: boolean
  fullscreen: boolean
  visible: boolean
  viewSource: boolean
  showViewSource: boolean
  showOpenFolder: boolean
  exportDisabled?: boolean
  onToggleDark: () => void
  onToggleFont: () => void
  onExportDocx: () => void
  onExportPdf: () => void
  onScrollTop: () => void
  onToggleFullscreen: () => void
  onPickFile: () => void
  onOpenFolder?: () => void
  onToggleViewSource: () => void
  showExplorerToggle?: boolean
  onToggleExplorer?: () => void
}

export function Toolbar({
  dark,
  fontSize,
  exporting,
  fullscreen,
  visible,
  viewSource,
  showViewSource,
  showOpenFolder,
  exportDisabled = false,
  onToggleDark,
  onToggleFont,
  onExportDocx,
  onExportPdf,
  onScrollTop,
  onToggleFullscreen,
  onPickFile,
  onOpenFolder,
  onToggleViewSource,
  showExplorerToggle = false,
  onToggleExplorer,
}: ToolbarProps) {
  if (!visible) return null

  const btn =
    'w-8 h-8 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-sm hover:shadow transition-shadow focus:outline-none focus:ring-2 focus:ring-zinc-400'

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 z-40" role="toolbar" aria-label="Viewer controls">
      <button
        type="button"
        onClick={onPickFile}
        title="Open file"
        className={btn}
        aria-label="Open markdown file"
      >
        📂
      </button>
      {showOpenFolder && onOpenFolder && (
        <button
          type="button"
          onClick={onOpenFolder}
          title="Open folder"
          className={btn}
          aria-label="Open folder of markdown files"
        >
          📁
        </button>
      )}
      {showExplorerToggle && onToggleExplorer && (
        <button
          type="button"
          onClick={onToggleExplorer}
          title="Toggle file explorer"
          className={btn}
          aria-label="Toggle file explorer panel"
        >
          ☰
        </button>
      )}
      {showViewSource && (
        <button
          type="button"
          onClick={onToggleViewSource}
          title={viewSource ? 'Show rendered view' : 'View source'}
          className={`${btn} ${viewSource ? 'ring-2 ring-zinc-400' : ''}`}
          aria-label={viewSource ? 'Show rendered view' : 'View markdown source'}
          aria-pressed={viewSource}
        >
          {'</>'}
        </button>
      )}
      <button
        type="button"
        onClick={onToggleDark}
        title="Toggle theme"
        className={btn}
        aria-label="Toggle dark mode"
      >
        {dark ? '☀️' : '🌙'}
      </button>
      <button
        type="button"
        onClick={onToggleFont}
        title="Font size"
        className={`${btn} text-xs font-bold`}
        aria-label="Change font size"
      >
        {fontSize === 'sm' ? 'S' : fontSize === 'md' ? 'M' : 'L'}
      </button>
      <button
        type="button"
        onClick={onExportDocx}
        title={exportDisabled ? 'Switch to rendered view to export' : 'Export to DOCX'}
        disabled={exporting || exportDisabled}
        className={`${btn} disabled:opacity-50`}
        aria-label="Export to DOCX"
      >
        {exporting ? '⏳' : 'W'}
      </button>
      <button
        type="button"
        onClick={onExportPdf}
        title={exportDisabled ? 'Switch to rendered view to export' : 'Export to PDF'}
        disabled={exportDisabled}
        className={`${btn} disabled:opacity-50`}
        aria-label="Export to PDF"
      >
        📄
      </button>
      <button
        type="button"
        onClick={onScrollTop}
        title="Back to top"
        className={btn}
        aria-label="Scroll to top"
      >
        ↑
      </button>
      <button
        type="button"
        onClick={onToggleFullscreen}
        title={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}
        className={btn}
        aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {fullscreen ? '↙' : '⛶'}
      </button>
    </div>
  )
}

export function DragOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-zinc-400/10 dark:bg-zinc-600/10 flex items-center justify-center pointer-events-none">
      <div className="bg-white dark:bg-zinc-900 rounded-xl px-10 py-8 shadow-sm text-center border border-dashed border-zinc-300 dark:border-zinc-600">
        <div className="text-5xl mb-3" aria-hidden="true">
          📄
        </div>
        <div className="text-lg font-medium text-zinc-800 dark:text-zinc-200">Drop .md file to view</div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Release to render markdown</div>
      </div>
    </div>
  )
}

export function EmptyState({
  dark,
  dragOver,
  onPickFile,
}: {
  dark: boolean
  dragOver: boolean
  onPickFile?: () => void
}) {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`text-center max-w-sm p-8 border border-dashed rounded-xl transition-colors cursor-pointer ${
          dragOver
            ? 'border-zinc-400 bg-zinc-50 dark:border-zinc-500 dark:bg-zinc-900/40'
            : dark
              ? 'border-zinc-600 hover:border-zinc-500'
              : 'border-zinc-300 hover:border-zinc-400'
        }`}
        onClick={onPickFile}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onPickFile?.()
          }
        }}
        aria-label="Open markdown file"
      >
        <div className="text-4xl mb-3" aria-hidden="true">
          📄
        </div>
        <p className={`text-sm font-medium mb-1 ${dark ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Drop a <code className="px-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">.md</code> file here
        </p>
        <p className={`text-xs ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>or click here to open a file</p>
      </div>
    </div>
  )
}
