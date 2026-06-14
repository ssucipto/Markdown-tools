import { useCallback, useState } from 'react'
import type { DocFile } from '@/types/viewer'

const MD_EXT = /\.(md|markdown)$/i

function isMarkdownName(name: string): boolean {
  return MD_EXT.test(name)
}

async function collectMarkdownFiles(
  dirHandle: FileSystemDirectoryHandle,
  prefix = '',
): Promise<DocFile[]> {
  const files: DocFile[] = []
  const entries = (
    dirHandle as FileSystemDirectoryHandle & {
      entries: () => AsyncIterableIterator<[string, FileSystemHandle]>
    }
  ).entries()
  for await (const [name, handle] of entries) {
    if (handle.kind === 'file' && isMarkdownName(name)) {
      const path = prefix ? `${prefix}/${name}` : name
      const dir = prefix || '.'
      files.push({ name, path, dir })
    } else if (handle.kind === 'directory' && !name.startsWith('.')) {
      const sub = prefix ? `${prefix}/${name}` : name
      files.push(...(await collectMarkdownFiles(handle as FileSystemDirectoryHandle, sub)))
    }
  }
  return files.sort((a, b) => a.path.localeCompare(b.path))
}

export function useFolderBrowser() {
  const [files, setFiles] = useState<DocFile[]>([])
  const [dirHandle, setDirHandle] = useState<FileSystemDirectoryHandle | null>(null)
  const [fileMap, setFileMap] = useState<Map<string, File>>(new Map())
  const [loading, setLoading] = useState(false)

  const readFromHandle = useCallback(async (path: string): Promise<string | null> => {
    if (!dirHandle) return null
    const parts = path.split('/')
    let current: FileSystemDirectoryHandle = dirHandle
    for (let i = 0; i < parts.length - 1; i++) {
      current = await current.getDirectoryHandle(parts[i])
    }
    const fileHandle = await current.getFileHandle(parts[parts.length - 1])
    const file = await fileHandle.getFile()
    return file.text()
  }, [dirHandle])

  const readFile = useCallback(
    async (path: string): Promise<string | null> => {
      const mapped = fileMap.get(path)
      if (mapped) return mapped.text()
      if (dirHandle) return readFromHandle(path)
      return null
    },
    [fileMap, dirHandle, readFromHandle],
  )

  const openFolder = useCallback(async () => {
    const picker = (
      window as Window & {
        showDirectoryPicker?: (opts?: { mode: 'read' }) => Promise<FileSystemDirectoryHandle>
      }
    ).showDirectoryPicker
    if (!picker) throw new Error('unsupported')
    setLoading(true)
    try {
      const handle = await picker({ mode: 'read' })
      const list = await collectMarkdownFiles(handle)
      setDirHandle(handle)
      setFileMap(new Map())
      setFiles(list)
    } finally {
      setLoading(false)
    }
  }, [])

  const openFolderFallback = useCallback((fileList: FileList) => {
    const map = new Map<string, File>()
    const list: DocFile[] = []
    for (const file of fileList) {
      if (!isMarkdownName(file.name)) continue
      const rel = file.webkitRelativePath || file.name
      const path = rel.replace(/\\/g, '/')
      const parts = path.split('/')
      const name = parts[parts.length - 1]
      const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : '.'
      map.set(path, file)
      list.push({ name, path, dir })
    }
    list.sort((a, b) => a.path.localeCompare(b.path))
    setDirHandle(null)
    setFileMap(map)
    setFiles(list)
  }, [])

  const supportsDirectoryPicker = typeof window !== 'undefined' && 'showDirectoryPicker' in window
  const supportsWebkitDirectory =
    typeof document !== 'undefined' &&
    'createElement' in document &&
    'webkitdirectory' in document.createElement('input')

  return {
    files,
    loading,
    openFolder,
    openFolderFallback,
    readFile,
    supportsDirectoryPicker,
    supportsWebkitDirectory,
    supportsFolderBrowser: supportsDirectoryPicker || supportsWebkitDirectory,
    hasFolder: files.length > 0,
  }
}
