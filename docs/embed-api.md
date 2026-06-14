# Embed API — @markdown-tools/react

Publishable React component for embedding the markdown viewer in ACPEnhanced-Visual or third-party apps.

## Install

```bash
npm install @markdown-tools/react react react-dom
```

## Required CSS

```tsx
import '@markdown-tools/react/styles.css'
// Or in standalone SPA: import 'katex/dist/katex.min.css' is bundled in styles.css build
```

## Peer dependencies

- `react` ^19.0.0
- `react-dom` ^19.0.0

## Controlled embed (visualizer)

```tsx
import { MarkdownViewer, type DocFile } from '@markdown-tools/react'
import '@markdown-tools/react/styles.css'
import { parseDocsSearchParams } from '@markdown-tools/react/embed-url'

function DocsRoute({ search }: { search: Record<string, string> }) {
  const { file, anchor } = parseDocsSearchParams(new URLSearchParams(search))
  const [content, setContent] = useState('')
  const files: DocFile[] = /* from listDocs() server */

  return (
    <MarkdownViewer
      content={content}
      documentPath={file ?? null}
      files={files}
      showSidebar
      theme="dark"
      onThemeChange={(t) => setTheme(t)}
      initialFile={file}
      initialAnchor={anchor}
      onSelectFile={async (path) => {
        setContent(await readDoc({ data: { path } }))
      }}
    />
  )
}
```

## Standalone (DnD only)

The default app uses `StandaloneViewer` internally — drag-and-drop and single-file picker without server.

## URL deep-link contract

| Param | Prop | Example |
|-------|------|---------|
| `file` | `initialFile` | `?file=docs/sample-basic.md` |
| `anchor` | `initialAnchor` | `&anchor=intro` |

Use `parseDocsSearchParams()` to map TanStack Router search params.

## Visualizer migration

See [visualizer-migration.md](./visualizer-migration.md) for replacing `DocsViewer.tsx` in ACPEnhanced-Visual.
