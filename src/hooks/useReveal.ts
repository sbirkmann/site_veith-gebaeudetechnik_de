import { useEffect, useRef, useState } from 'react'

/**
 * Reveals an element the first time it scrolls into view.
 *
 * Returns a ref to attach and whether it has been seen. Elements start visible
 * and are only hidden once the observer is known to be running, so the content
 * is never trapped invisible if IntersectionObserver is unavailable or the
 * script fails. Honours prefers-reduced-motion by revealing immediately.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {},
) {
  const { threshold = 0.12, rootMargin = '0px 0px -8% 0px' } = options
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    // Anything already on screen when this mounts is shown at once — there is
    // nothing to animate into view, and waiting for a scroll that may never
    // come would leave it invisible.
    const box = el.getBoundingClientRect()
    if (box.top < window.innerHeight && box.bottom > 0) {
      setShown(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect() // reveal once; never animate back out
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)

    // A safety net: if the observer has not fired within a few seconds — the
    // visitor never scrolled, the page was restored mid-document, a jump link
    // skipped past it — reveal anyway rather than leaving content hidden.
    const failsafe = window.setTimeout(() => {
      setShown(true)
      io.disconnect()
    }, 4000)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
    }
  }, [threshold, rootMargin])

  return { ref, shown }
}
