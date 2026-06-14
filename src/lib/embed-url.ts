/** Parse visualizer-style docs URL search params for embed consumers. */
export function parseDocsSearchParams(
  search: string | URLSearchParams,
): { file?: string; anchor?: string } {
  const params = typeof search === 'string' ? new URLSearchParams(search) : search
  const file = params.get('file') ?? undefined
  const anchor = params.get('anchor') ?? undefined
  return { file, anchor }
}

/** Build search string for SourceLink navigation. */
export function buildDocsSearchParams(file: string, anchor?: string): string {
  const params = new URLSearchParams({ file })
  if (anchor) params.set('anchor', anchor)
  return params.toString()
}
