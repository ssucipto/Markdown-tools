import { useCallback, useRef, useState } from 'react'

export function useMarkdownDocument(initialPath?: string | null) {
  const [documentPath, setDocumentPath] = useState<string | null>(initialPath ?? null)
  const [content, setContent] = useState('')
  const droppedRef = useRef(false)

  const loadDroppedFile = useCallback((file: File) => {
    if (!file.name.endsWith('.md') && !file.name.endsWith('.markdown')) return
    const reader = new FileReader()
    reader.onload = () => {
      droppedRef.current = true
      setDocumentPath(`[dropped] ${file.name}`)
      setContent(reader.result as string)
    }
    reader.readAsText(file)
  }, [])

  const selectPath = useCallback((path: string, newContent?: string) => {
    if (newContent !== undefined) {
      droppedRef.current = false
      setContent(newContent)
    }
    setDocumentPath(path)
  }, [])

  const consumeDroppedGuard = useCallback(() => {
    if (droppedRef.current) {
      droppedRef.current = false
      return true
    }
    return false
  }, [])

  return {
    documentPath,
    content,
    setContent,
    loadDroppedFile,
    selectPath,
    consumeDroppedGuard,
    droppedRef,
  }
}
