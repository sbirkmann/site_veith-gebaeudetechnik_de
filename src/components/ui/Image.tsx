import { useLayoutEffect, useRef, useState } from 'react'
import manifest from '../../data/image-manifest.json'
import './Image.scss'

type Manifest = Record<
  string,
  { width: number; height: number; widths: number[]; blur: string }
>

const images = manifest as Manifest

export interface ImageProps {
  /** Slug from src/data/image-manifest.json. */
  src: string
  alt: string
  /** The `sizes` attribute — tell the browser how wide this will render. */
  sizes?: string
  /** Set on the one image above the fold; everything else stays lazy. */
  priority?: boolean
  className?: string
  /** Crops the image to a ratio instead of using its intrinsic one. */
  ratio?: string
  /**
   * Fills the parent instead of carrying its own aspect ratio — for full-bleed
   * bands whose height is set by the layout around them.
   */
  fill?: boolean
  /** Where to anchor the crop, e.g. 'center top'. */
  position?: string
}

/**
 * Responsive picture with AVIF and WebP sources.
 *
 * Width and height always come from the manifest so the browser can reserve
 * the space before the file arrives — no layout shift. Until it does, a 20px
 * blur of the same image sits behind it.
 */
export function Image({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  ratio,
  fill = false,
  position,
}: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const entry = images[src]

  // Cached images can finish before React attaches onLoad — without this the
  // 20px blur placeholder stays stretched over the slot forever.
  useLayoutEffect(() => {
    const el = imgRef.current
    if (el?.complete && el.naturalWidth > 0) setLoaded(true)
  }, [src])

  if (!entry) {
    // A missing slug is a build mistake, not something to paper over at runtime.
    if (import.meta.env.DEV) console.warn(`Image: unknown slug "${src}"`)
    return null
  }

  const srcset = (ext: string) =>
    entry.widths.map((w) => `/img/${src}-${w}.${ext} ${w}w`).join(', ')

  // Several of the photographs inherited from the old site are small. Cap the
  // declared `sizes` at the largest file that actually exists, so the browser
  // never picks a candidate it then has to upscale — and so a slot that is
  // wider than the source degrades to a clean crop rather than a soft image.
  const widest = entry.widths[entry.widths.length - 1]
  const cappedSizes = `min(${widest}px, ${sizes})`

  return (
    <picture
      className={['img', loaded && 'is-loaded', className].filter(Boolean).join(' ')}
      style={{
        // The blur is only a stand-in; drop it from the box once the real
        // file has painted so it cannot bleed through transparent edges.
        backgroundImage: loaded ? undefined : `url(${entry.blur})`,
        // A filling image takes its height from the parent, so it must not
        // also impose an aspect ratio.
        aspectRatio: fill ? undefined : (ratio ?? `${entry.width} / ${entry.height}`),
        height: fill ? '100%' : undefined,
        width: fill ? '100%' : undefined,
      }}
    >
      <source type="image/avif" srcSet={srcset('avif')} sizes={cappedSizes} />
      <source type="image/webp" srcSet={srcset('webp')} sizes={cappedSizes} />
      <img
        ref={imgRef}
        src={`/img/${src}.jpg`}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        // The LCP image should not wait behind the rest of the page.
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setLoaded(true)}
        style={position ? { objectPosition: position } : undefined}
      />
    </picture>
  )
}
