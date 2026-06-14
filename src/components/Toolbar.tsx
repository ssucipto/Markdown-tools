interface ToolbarProps {
  dark: boolean
  fontSize: 'sm' | 'md' | 'lg'
  exporting: boolean
  fullscreen: boolean
  visible: boolean
  onToggleDark: () => void
  onToggleFont: () => void
  onExportWord: () => void
  onExportPdf: () => void
  onScrollTop: () => void
  onToggleFullscreen: () => void
  onPickFile: () => void
}

export function Toolbar({
  dark,
  fontSize,
  exporting,
  fullscreen,
  visible,
  onToggleDark,
  onToggleFont,
  onExportWord,
  onExportPdf,
  onScrollTop,
  onToggleFullscreen,
  onPickFile,
}: ToolbarProps) {
  if (!visible) return null

  const btn =
    'w-9 h-9 rounded-full bg-white dark:bg-gray-700 shadow-md border border-gray-200 dark:border-gray-600 flex items-center justify-center text-sm hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 z-40" role="toolbar" aria-label="Viewer controls">
      <button type="button" onClick={onPickFile} title="Open file" className={btn} aria-label="Open markdown file">
        📂
      </button>
      <button type="button" onClick={onToggleDark} title="Toggle theme" className={btn} aria-label="Toggle dark mode">
        {dark ? '☀️' : '🌙'}
      </button>
      <button type="button" onClick={onToggleFont} title="Font size" className={`${btn} text-xs font-bold`} aria-label="Change font size">
        {fontSize === 'sm' ? 'S' : fontSize === 'md' ? 'M' : 'L'}
      </button>
      <button
        type="button"
        onClick={onExportWord}
        title="Export to Word"
        disabled={exporting}
        className={`${btn} disabled:opacity-50`}
        aria-label="Export to Word"
      >
        {exporting ? '⏳' : '📥'}
      </button>
      <button type="button" onClick={onExportPdf} title="Export to PDF" className={btn} aria-label="Export to PDF">
        📄
      </button>
      <button type="button" onClick={onScrollTop} title="Back to top" className={btn} aria-label="Scroll to top">
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
    <div className="fixed inset-0 z-50 bg-blue-500/15 flex items-center justify-center pointer-events-none backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-10 py-8 shadow-2xl text-center border-2 border-blue-400 border-dashed">
        <div className="text-5xl mb-3" aria-hidden="true">
          📄
        </div>
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">Drop .md file to view</div>
        <div className="text-sm text-gray-400 mt-1">Release to render markdown</div>
      </div>
    </div>
  )
}

export function EmptyState({ dark, dragOver }: { dark: boolean; dragOver: boolean }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`text-center max-w-sm p-8 border-2 border-dashed rounded-xl transition-colors ${
          dragOver
            ? 'border-blue-400 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20'
            : dark
              ? 'border-gray-600 hover:border-gray-500'
              : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <div className="text-4xl mb-3" aria-hidden="true">
          📄
        </div>
        <p className={`text-sm font-medium mb-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
          Drop a <code className="px-1 rounded bg-gray-100 dark:bg-gray-700 text-xs">.md</code> file here
        </p>
        <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-400'}`}>or use the 📂 button to open a file</p>
      </div>
    </div>
  )
}
