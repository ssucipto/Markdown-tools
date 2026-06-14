import { useEffect } from 'react'

interface OpenFilePayload {
  path: string
  content: string
}

/** Load a markdown file passed via Tauri CLI / file association on app launch. */
export function useTauriFileOpen(onOpen: (path: string, content: string) => void): void {
  useEffect(() => {
    let unlisten: (() => void) | undefined

    void (async () => {
      try {
        const { listen } = await import('@tauri-apps/api/event')
        unlisten = await listen<OpenFilePayload>('open-file-content', (event) => {
          const { path, content } = event.payload
          if (path && content) onOpen(path, content)
        })
      } catch {
        /* not in Tauri context */
      }
    })()

    return () => {
      unlisten?.()
    }
  }, [onOpen])
}
