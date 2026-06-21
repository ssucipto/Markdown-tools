import { useCallback, useEffect, useRef, useState } from 'react'
import { copyMermaidSource, downloadSvg } from '@/lib/mermaid-actions'

interface MermaidLightboxProps {
  svgHtml: string | null
  source: string
  onClose: () => void
}

export function MermaidLightbox({ svgHtml, source, onClose }: MermaidLightboxProps) {
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!svgHtml) {
      setScale(1)
      setPan({ x: 0, y: 0 })
    }
  }, [svgHtml])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && svgHtml) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [svgHtml, onClose])

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScale((s) => Math.min(4, Math.max(0.5, s + (e.deltaY < 0 ? 0.1 : -0.1))))
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true
    last.current = { x: e.clientX, y: e.clientY }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return
    setPan((p) => ({
      x: p.x + e.clientX - last.current.x,
      y: p.y + e.clientY - last.current.y,
    }))
    last.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onPointerUp = useCallback(() => {
    dragging.current = false
  }, [])

  if (!svgHtml) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Mermaid diagram zoom"
    >
      <div className="absolute top-4 right-4 flex gap-2">
        {source && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              void copyMermaidSource(source)
            }}
            className="px-3 py-2 rounded-lg bg-white/20 text-white text-sm hover:bg-white/30 transition-colors"
          >
            Copy source
          </button>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            downloadSvg(svgHtml, 'diagram.svg')
          }}
          className="px-3 py-2 rounded-lg bg-white/20 text-white text-sm hover:bg-white/30 transition-colors"
        >
          Download SVG
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/20 text-white text-xl hover:bg-white/30 transition-colors"
          aria-label="Close diagram"
        >
          ✕
        </button>
      </div>
      <div
        className="max-w-[95vw] max-h-[95vh] overflow-hidden bg-white rounded-lg shadow-2xl p-4 cursor-grab active:cursor-grabbing"
        onClick={(e) => e.stopPropagation()}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}
      >
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      </div>
    </div>
  )
}

interface ImageLightboxProps {
  src: string | null
  onClose: () => void
}

export function ImageLightbox({ src, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && src) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [src, onClose])

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white text-xl hover:bg-white/30 transition-colors"
        aria-label="Close image"
      >
        ✕
      </button>
      <img
        src={src}
        alt=""
        loading="lazy"
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
