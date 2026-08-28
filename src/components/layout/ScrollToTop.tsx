import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Puts a new route at the top of the page, and jumps to the fragment when one
 * is present. Browser back/forward keeps its own restored position, which is
 * why this only runs on PUSH navigations.
 */
export function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      // Let the route render before looking for the target.
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
      return
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash, key])

  return null
}
