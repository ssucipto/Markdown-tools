import type { DocFile } from '@/types/viewer'

export interface FileExplorerProps {
  files: DocFile[]
  selectedPath: string | null
  collapsed: boolean
  hidden?: boolean
  dark: boolean
  onSelect: (path: string) => void
  onToggleCollapse: () => void
  onOpenFolder?: () => void
}

export function FileExplorer({
  files,
  selectedPath,
  collapsed,
  hidden = false,
  dark,
  onSelect,
  onToggleCollapse,
  onOpenFolder,
}: FileExplorerProps) {
  if (hidden) return null

  const grouped = new Map<string, DocFile[]>()
  for (const f of files) {
    const g = grouped.get(f.dir) || []
    g.push(f)
    grouped.set(f.dir, g)
  }

  return (
    <aside
      data-testid="file-explorer"
      className={`relative shrink-0 border-r border-zinc-200 dark:border-zinc-800 transition-[width] duration-200 ease-out overflow-visible ${
        collapsed ? 'w-0' : 'w-60'
      } ${dark ? 'bg-zinc-950' : 'bg-zinc-50'}`}
      aria-label="File explorer"
      aria-hidden={collapsed}
    >
      <div className={`h-full flex flex-col overflow-hidden ${collapsed ? 'invisible' : ''}`}>
        <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Files</span>
          {onOpenFolder && (
            <button
              type="button"
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              onClick={onOpenFolder}
              aria-label="Open folder"
            >
              Open folder
            </button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto">
          {[...grouped.entries()].map(([dir, dirFiles]) => (
            <div key={dir}>
              <div className="px-3 py-1 text-xs text-zinc-400 dark:text-zinc-500 truncate">{dir}</div>
              {dirFiles.map((f) => (
                <button
                  key={f.path}
                  type="button"
                  onClick={() => onSelect(f.path)}
                  aria-current={selectedPath === f.path ? 'page' : undefined}
                  className={`w-full text-left px-3 py-1.5 text-sm truncate transition-colors ${
                    selectedPath === f.path
                      ? dark
                        ? 'bg-zinc-800 text-zinc-100'
                        : 'bg-zinc-100 text-zinc-900'
                      : dark
                        ? 'text-zinc-300 hover:bg-zinc-900'
                        : 'text-zinc-600 hover:bg-zinc-100/80'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        data-testid="explorer-collapse-toggle"
        className={`absolute top-2 z-50 w-6 h-6 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-500 shadow-sm ${
          collapsed ? 'left-0' : '-right-3'
        }`}
        aria-label={collapsed ? 'Expand file explorer' : 'Collapse file explorer'}
        aria-expanded={!collapsed}
        onClick={onToggleCollapse}
      >
        {collapsed ? '›' : '‹'}
      </button>
    </aside>
  )
}
