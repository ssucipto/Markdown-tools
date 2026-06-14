# ACPEnhanced-Visual Migration Guide

Replace in-repo `DocsViewer.tsx` with `@markdown-tools/react` embed wrapper.

## 1. Add dependency

```json
{
  "dependencies": {
    "@markdown-tools/react": "^0.4.1"
  }
}
```

## 2. Create `DocsViewerEmbed.tsx`

```tsx
import { MarkdownViewer, parseDocsSearchParams, type DocFile } from '@markdown-tools/react'
import '@markdown-tools/react/styles.css'
import { useSearch } from '@tanstack/react-router'
import { listDocs, readDoc } from '@/server/routes/api/docs'

export function DocsViewerEmbed() {
  const search = useSearch({ from: '/docs' })
  const { file, anchor } = parseDocsSearchParams(new URLSearchParams(search as Record<string, string>))
  const [files, setFiles] = useState<DocFile[]>([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listDocs().then(setFiles).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (file) readDoc({ data: { path: file } }).then(setContent)
  }, [file])

  return (
    <MarkdownViewer
      content={content}
      documentPath={file ?? null}
      files={files}
      showSidebar
      loading={loading}
      initialFile={file}
      initialAnchor={anchor}
      onSelectFile={(path) => readDoc({ data: { path } }).then(setContent)}
    />
  )
}
```

## 3. Update route

Point `src/routes/docs.tsx` at `<DocsViewerEmbed />` instead of `<DocsViewer />`.

## 4. Remove legacy

Delete `src/components/DocsViewer.tsx` after parity verification.

## 5. Contract tests

Run `npm test` in markdown-tools — `test/contract/props-contract.test.ts` snapshots the public props API.
