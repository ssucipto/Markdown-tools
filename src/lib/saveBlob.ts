/** Minimum blob size to treat as a non-empty export (HTML wrapper alone is ~200+ bytes). */
const MIN_BLOB_BYTES = 64

export type SaveBlobResult = 'saved' | 'downloaded' | 'cancelled' | 'failed'

export interface SaveTargetOptions {
  filename: string
  mimeType: string
  description: string
}

export type SaveTarget =
  | { kind: 'file-handle'; handle: FileSystemFileHandle }
  | { kind: 'tauri-path'; path: string }
  | { kind: 'anchor' }

export interface SaveBlobOptions {
  blob: Blob
  filename: string
  mimeType?: string
  extension?: string
  description?: string
}

export function deriveExportFilename(
  documentPath: string | null | undefined,
  extension: string,
): string {
  const base =
    documentPath
      ?.split('/')
      .pop()
      ?.replace(/^\[dropped\] /, '')
      .replace(/\.md$/i, '') || 'document'
  return `${base}${extension}`
}

function extensionFromFilename(filename: string): string {
  const dot = filename.lastIndexOf('.')
  return dot >= 0 ? filename.slice(dot + 1) : 'bin'
}

function getShowSaveFilePicker():
  | ((options: {
      suggestedName: string
      types: Array<{ description: string; accept: Record<string, string[]> }>
    }) => Promise<FileSystemFileHandle>)
  | undefined {
  return (
    window as Window & {
      showSaveFilePicker?: (options: {
        suggestedName: string
        types: Array<{ description: string; accept: Record<string, string[]> }>
      }) => Promise<FileSystemFileHandle>
    }
  ).showSaveFilePicker
}

function triggerAnchorDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000)
}

function savePickerTypes(
  ext: string,
  mimeType: string,
  description: string,
): Array<{ description: string; accept: Record<string, string[]> }> {
  return [
    {
      description,
      accept: {
        [mimeType]: [`.${ext}`],
        'application/octet-stream': [`.${ext}`],
      },
    },
  ]
}

async function ensureFileHandleWritePermission(handle: FileSystemFileHandle): Promise<boolean> {
  const h = handle as FileSystemFileHandle & {
    queryPermission?: (opts: { mode: 'readwrite' }) => Promise<PermissionState>
    requestPermission?: (opts: { mode: 'readwrite' }) => Promise<PermissionState>
  }
  if (!h.queryPermission || !h.requestPermission) return true
  const query = await h.queryPermission({ mode: 'readwrite' })
  if (query === 'granted') return true
  const request = await h.requestPermission({ mode: 'readwrite' })
  return request === 'granted'
}

async function writeToFileHandle(handle: FileSystemFileHandle, blob: Blob): Promise<void> {
  const allowed = await ensureFileHandleWritePermission(handle)
  if (!allowed) throw new Error('write permission denied')

  const writable = await handle.createWritable()
  try {
    await writable.write(await blob.arrayBuffer())
    await writable.close()
  } catch (error) {
    try {
      await writable.abort()
    } catch {
      // ignore abort errors
    }
    throw error
  }
}

async function writeToTauriPath(path: string, blob: Blob): Promise<void> {
  const { invoke } = await import('@tauri-apps/api/core')
  const contents = new Uint8Array(await blob.arrayBuffer())
  await invoke('write_export_file', { path, contents })
}

/**
 * Open a save target while the user-gesture is still active.
 * Must run before any long async export preparation.
 */
export async function acquireSaveTarget(
  options: SaveTargetOptions,
): Promise<SaveTarget | 'cancelled'> {
  const { filename, mimeType, description } = options
  const ext = extensionFromFilename(filename)

  if ('__TAURI_INTERNALS__' in window) {
    try {
      const { save } = await import('@tauri-apps/plugin-dialog')
      const path = await save({
        defaultPath: filename,
        filters: [{ name: ext.toUpperCase(), extensions: [ext] }],
      })
      if (!path) return 'cancelled'
      return { kind: 'tauri-path', path }
    } catch (error) {
      console.error('[saveBlob] Tauri save dialog failed:', error)
      throw error
    }
  }

  const showSaveFilePicker = getShowSaveFilePicker()
  if (showSaveFilePicker) {
    try {
      const handle = await showSaveFilePicker({
        suggestedName: filename,
        types: savePickerTypes(ext, mimeType, description),
      })
      return { kind: 'file-handle', handle }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
      console.error('[saveBlob] showSaveFilePicker failed:', error)
    }
  }

  return { kind: 'anchor' }
}

/** Write a prepared blob to a target acquired earlier via acquireSaveTarget. */
export async function commitSaveTarget(
  target: SaveTarget,
  blob: Blob,
  filename: string,
): Promise<SaveBlobResult> {
  if (blob.size < MIN_BLOB_BYTES) {
    console.error('[saveBlob] export blob too small:', blob.size)
    return 'failed'
  }

  const inTauri = '__TAURI_INTERNALS__' in window

  try {
    if (target.kind === 'tauri-path') {
      await writeToTauriPath(target.path, blob)
      return 'saved'
    }

    if (target.kind === 'file-handle') {
      await writeToFileHandle(target.handle, blob)
      return 'saved'
    }

    triggerAnchorDownload(blob, filename)
    return 'downloaded'
  } catch (error) {
    console.error('[saveBlob] primary save failed:', error)
    // Anchor downloads do not work in Tauri WKWebView — never pretend they succeeded.
    if (inTauri || target.kind === 'anchor') return 'failed'
    try {
      triggerAnchorDownload(blob, filename)
      return 'downloaded'
    } catch (fallbackError) {
      console.error('[saveBlob] download fallback failed:', fallbackError)
      return 'failed'
    }
  }
}

/** Legacy one-shot save (picker opens after blob exists — avoid for exports). */
export async function saveBlob(options: SaveBlobOptions): Promise<SaveBlobResult> {
  const mimeType = options.mimeType ?? (options.blob.type || 'application/octet-stream')
  const target = await acquireSaveTarget({
    filename: options.filename,
    mimeType,
    description: options.description ?? 'File',
  })
  if (target === 'cancelled') return 'cancelled'
  return commitSaveTarget(target, options.blob, options.filename)
}

export function toastForSaveResult(
  result: SaveBlobResult,
  filename: string,
  showToast: (message: string) => void,
): void {
  switch (result) {
    case 'saved':
      showToast(`✅ Saved ${filename}`)
      break
    case 'downloaded':
      showToast(`✅ Download started — check your Downloads folder for ${filename}`)
      break
    case 'cancelled':
      showToast('Export cancelled')
      break
    case 'failed':
      showToast('⚠️ Export failed — could not write file (check folder permissions)')
      break
  }
}
