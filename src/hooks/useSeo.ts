import { useEffect } from 'react'

export interface Seo {
  title: string
  description: string
  /** Path only; the canonical origin is added here. */
  path?: string
  /** Slug of an image in the manifest, used for og:image. */
  image?: string
  type?: 'website' | 'article'
  /** JSON-LD. Only ever describe things that genuinely exist. */
  jsonLd?: object | object[]
}

const ORIGIN = 'https://www.veith-gebaeudetechnik.de'
const SUFFIX = 'VEITH Gebäudetechnik'

function meta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

/**
 * Sets the document title, meta description, canonical URL, Open Graph tags and
 * structured data for the current route.
 *
 * This is a small hand-rolled head manager rather than a library: the site is
 * static enough that a dozen lines beat another dependency in the bundle.
 */
export function useSeo({ title, description, path, image, type = 'website', jsonLd }: Seo) {
  useEffect(() => {
    const full = title.includes(SUFFIX) ? title : `${title} | ${SUFFIX}`
    document.title = full

    meta('meta[name="description"]', 'name', 'description', description)
    meta('meta[property="og:title"]', 'property', 'og:title', full)
    meta('meta[property="og:description"]', 'property', 'og:description', description)
    meta('meta[property="og:type"]', 'property', 'og:type', type)
    meta('meta[property="og:site_name"]', 'property', 'og:site_name', SUFFIX)
    meta('meta[property="og:locale"]', 'property', 'og:locale', 'de_DE')
    meta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')

    const url = ORIGIN + (path ?? window.location.pathname)
    meta('meta[property="og:url"]', 'property', 'og:url', url)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // Pages name a photograph where they have a strong one; everything else
    // falls back to the branded card so no share is ever a bare link.
    const card = image ? `${ORIGIN}/img/${image}-1280.webp` : `${ORIGIN}/og-default.jpg`
    meta('meta[property="og:image"]', 'property', 'og:image', card)
    meta('meta[property="og:image:alt"]', 'property', 'og:image:alt', title)
    meta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200')
    meta('meta[property="og:image:height"]', 'property', 'og:image:height', '630')

    // Structured data is replaced wholesale on each route so stale entities
    // from the previous page never linger.
    document.head.querySelectorAll('script[data-route-ld]').forEach((n) => n.remove())
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.routeLd = 'true'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, image, type, jsonLd])
}
