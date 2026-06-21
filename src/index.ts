import './styles/prose-doc.css'
import 'katex/dist/katex-swap.css' // font-display: swap for better LCP

export { MarkdownViewer, MarkdownViewerWithBoundary } from './components/MarkdownViewer'
export type { DocFile, MarkdownViewerProps, TocEntry } from './types/viewer'
export { parseDocsSearchParams, buildDocsSearchParams } from './lib/embed-url'
