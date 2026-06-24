export interface DocFile {
  name: string
  path: string
  dir: string
}

export interface TocEntry {
  id: string
  text: string
  level: number
}

export interface MarkdownViewerProps {
  content?: string
  documentPath?: string | null
  files?: DocFile[]
  onSelectFile?: (path: string) => void
  loading?: boolean
  showSidebar?: boolean
  theme?: 'light' | 'dark'
  /** Called when user toggles theme in controlled mode (ADR-007). */
  onThemeChange?: (theme: 'light' | 'dark') => void
  initialFile?: string
  initialAnchor?: string
  className?: string
  /** Standalone: open folder via File System Access API */
  onOpenFolder?: () => void
  supportsFolderPicker?: boolean
  /** Raw markdown for view-source toggle (standalone) */
  rawMarkdown?: string
  /** When set, DnD/file picker delegate to parent (workspace shell) */
  onFileDrop?: (file: File) => void
  /** Notifies parent when fullscreen toggles (shell hides explorer) */
  onFullscreenChange?: (fullscreen: boolean) => void
  /** Standalone: toggle shell file explorer collapse from toolbar */
  onToggleExplorer?: () => void
}
