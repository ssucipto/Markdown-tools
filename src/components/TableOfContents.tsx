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
      className={`w-48 shrink-0 border-l overflow-y-auto p-3 ${
        dark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
      }`}
      aria-label="Table of contents"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">On this page</span>
        <button
          type="button"
          onClick={onToggle}
          className="text-zinc-400 text-xs hover:text-zinc-600 dark:hover:text-zinc-300"
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
              className={`block text-xs truncate transition-colors hover:text-zinc-800 dark:hover:text-zinc-200 ${
                level === 1 ? 'pl-0 font-medium' : level === 2 ? 'pl-3' : 'pl-6'
              } ${
                activeId === id
                  ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                  : dark
                    ? 'text-zinc-400'
                    : 'text-zinc-600'
              }`}
            >
              {text}
            </a>
          ))}
        </nav>
      )}
    </aside>
  )
}
