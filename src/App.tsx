import { StandaloneViewer } from '@/components/StandaloneViewer'
import '@/styles/prose-doc.css'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Markdown-tools</h1>
      </header>
      <StandaloneViewer />
    </div>
  )
}
