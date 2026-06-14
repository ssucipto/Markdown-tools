/**
 * SVG to PNG rasterization utility (ported from ACPEnhanced-Visual v1.5.4).
 */
export async function svgToPngDataUri(
  svgElement: SVGSVGElement,
  scale = 2,
): Promise<string | null> {
  try {
    if (!svgElement.querySelector('*') && !svgElement.textContent?.trim()) {
      console.warn('[svgToPng] SVG has no child elements — skipping')
      return null
    }

    const clone = svgElement.cloneNode(true) as SVGSVGElement

    const allOriginal: SVGElement[] = [svgElement as SVGElement]
    svgElement.querySelectorAll('*').forEach((el) => allOriginal.push(el as SVGElement))

    const allCloned: SVGElement[] = [clone as SVGElement]
    clone.querySelectorAll('*').forEach((el) => allCloned.push(el as SVGElement))

    const PROPS = [
      'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity',
      'stroke-dasharray', 'font-family', 'font-size', 'font-weight',
      'opacity', 'text-anchor', 'dominant-baseline', 'color',
    ]

    const SKIP_VALUES = new Set(['normal', 'auto', 'none', 'rgba(0, 0, 0, 0)', '0'])

    for (let i = 0; i < allOriginal.length; i++) {
      const orig = allOriginal[i]
      const cln = allCloned[i]
      if (!orig || !cln) continue

      const computed = window.getComputedStyle(orig)
      const styles: string[] = []
      for (const prop of PROPS) {
        const val = computed.getPropertyValue(prop)
        if (val && !SKIP_VALUES.has(val) && !val.startsWith('rgba(0, 0, 0, 0')) {
          styles.push(`${prop}:${val}`)
        }
      }
      if (styles.length) {
        const existing = cln.getAttribute('style') || ''
        cln.setAttribute('style', existing ? `${existing};${styles.join(';')}` : styles.join(';'))
      }
    }

    const vb = clone.viewBox?.baseVal
    let w = vb?.width || svgElement.getBoundingClientRect().width || 800
    let h = vb?.height || svgElement.getBoundingClientRect().height || 400
    if (w <= 0) w = 800
    if (h <= 0) h = 400

    const svgString = '<?xml version="1.0" encoding="UTF-8"?>\n' +
      new XMLSerializer().serializeToString(clone)

    const png = await tryRenderViaBlob(svgString, w, h, scale)
    if (png) return png

    console.warn('[svgToPng] blob approach failed — trying data URI fallback')
    return await tryRenderViaDataUri(svgString, w, h, scale)
  } catch (err) {
    console.warn('[svgToPng] exception:', err instanceof Error ? err.message : err)
    return null
  }
}

async function tryRenderViaBlob(
  svgString: string, w: number, h: number, scale: number,
): Promise<string | null> {
  try {
    const blob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const png = await renderImageToCanvas(url, w, h, scale)
    URL.revokeObjectURL(url)
    return png
  } catch {
    return null
  }
}

async function tryRenderViaDataUri(
  svgString: string, w: number, h: number, scale: number,
): Promise<string | null> {
  try {
    const encoded = encodeURIComponent(svgString)
    const url = `data:image/svg+xml,${encoded}`
    return await renderImageToCanvas(url, w, h, scale)
  } catch {
    return null
  }
}

function renderImageToCanvas(
  src: string, w: number, h: number, scale: number,
): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    const done = (result: string | null) => {
      if (src.startsWith('blob:')) URL.revokeObjectURL(src)
      resolve(result)
    }
    img.onload = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
        done(null)
        return
      }
      const canvas = document.createElement('canvas')
      canvas.width = w * scale
      canvas.height = h * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        done(null)
        return
      }
      ctx.scale(scale, scale)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, 0, 0, w, h)
      try {
        done(canvas.toDataURL('image/png'))
      } catch (e) {
        console.warn('[svgToPng] tainted canvas:', e instanceof Error ? e.message : e)
        done(null)
      }
    }
    img.onerror = () => done(null)
    img.src = src
  })
}
