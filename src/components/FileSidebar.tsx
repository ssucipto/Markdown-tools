import type { DocFile } from '@/types/viewer'

interface FileSidebarProps {
  files: DocFile[]
  selectedPath: string | null
  dark: boolean
  onSelect: (path: string) => void
}

export function FileSidebar({ files, selectedPath, dark, onSelect }: FileSidebarProps) {
  const grouped = new Map<string, DocFile[]>()
  for (const f of files) {
    const g = grouped.get(f.dir) || []
    g.push(f)
    grouped.set(f.dir, g)
  }

  return (
    <aside
      className={`w-56 shrink-0 border-r overflow-y-auto ${dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
      aria-label="Document list"
    >
      <div className={`px-3 py-3 border-b ${dark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Documents</h2>
      </div>
      {[...grouped.entries()].map(([dir, dirFiles]) => (
        <div key={dir}>
          <div
            className={`px-3 py-1.5 text-xs font-semibold uppercase ${dark ? 'text-gray-500 bg-gray-800' : 'text-gray-400 bg-gray-100'}`}
          >
            {dir} ({dirFiles.length})
          </div>
          {dirFiles.map((f) => (
            <button
              key={f.path}
              type="button"
              onClick={() => onSelect(f.path)}
              aria-current={selectedPath === f.path ? 'page' : undefined}
              className={`w-full text-left px-3 py-1.5 text-sm transition-colors truncate ${
                selectedPath === f.path
                  ? dark
                    ? 'bg-blue-900 text-blue-200 font-medium'
                    : 'bg-blue-50 text-blue-700 font-medium'
                  : dark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      ))}
    </aside>
  )
}
