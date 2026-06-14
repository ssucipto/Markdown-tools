import type { TocEntry } from '@/types/viewer'

interface TableOfContentsProps {
  toc: TocEntry[]
  activeId: string
  dark: boolean
  showToc: boolean
  onToggle: () => void
}

export function TableOfContents({ toc, activeId, dark, showToc, onToggle }: TableOfContentsProps) {
  if (toc.length === 0) return null

  return (
    <aside
      className={`w-48 shrink-0 border-l overflow-y-auto p-3 ${dark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}
      aria-label="Table of contents"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500 uppercase">On this page</span>
        <button
          type="button"
          onClick={onToggle}
          className="text-gray-400 text-xs hover:text-gray-600"
          aria-expanded={showToc}
          aria-label={showToc ? 'Collapse table of contents' : 'Expand table of contents'}
        >
          {showToc ? '−' : '+'}
        </button>
      </div>
      {showToc && (
        <nav className="space-y-0.5">
          {toc.map(({ id, text, level }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`block text-xs truncate transition-colors hover:text-blue-500 ${
                level === 1 ? 'pl-0 font-medium' : level === 2 ? 'pl-3' : 'pl-6'
              } ${activeId === id ? 'text-blue-600 font-semibold' : dark ? 'text-gray-400' : 'text-gray-600'}`}
            >
              {text}
            </a>
          ))}
        </nav>
      )}
    </aside>
  )
}
