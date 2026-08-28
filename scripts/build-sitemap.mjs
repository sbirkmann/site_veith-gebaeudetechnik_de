/**
 * Writes public/sitemap.xml from the routes the app actually serves.
 *
 * Run after any change to the route table or the news list:
 *   node scripts/build-sitemap.mjs
 */
import { writeFileSync, readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ORIGIN = 'https://www.veith-gebaeudetechnik.de'

/** Pulls the slugs out of a data module without importing TypeScript. */
function slugs(file, key) {
  const src = readFileSync(resolve(ROOT, file), 'utf8')
  return [...src.matchAll(new RegExp(`${key}:\\s*'([a-z0-9-]+)'`, 'g'))].map((m) => m[1])
}

const tradeSlugs = slugs('src/data/leistungen.ts', 'slug')
const newsSlugs = slugs('src/data/news.ts', 'slug')

/** priority reflects how central a page is, not how often it changes. */
const pages = [
  ['/', 1.0, 'weekly'],
  ['/leistungen', 0.9, 'monthly'],
  ...tradeSlugs.map((s) => [`/leistungen/${s}`, 0.9, 'monthly']),
  ['/service', 0.7, 'monthly'],
  ['/service/kundendienst', 0.8, 'monthly'],
  ['/service/foerderungen', 0.7, 'monthly'],
  ['/service/seminare', 0.7, 'weekly'],
  ['/service/lebensraeume', 0.6, 'monthly'],
  ['/service/marken', 0.5, 'yearly'],
  ['/unternehmen', 0.8, 'monthly'],
  ['/referenzen', 0.6, 'monthly'],
  ['/karriere', 0.8, 'weekly'],
  ['/aktuelles', 0.7, 'weekly'],
  ...newsSlugs.map((s) => [`/aktuelles/${s}`, 0.5, 'yearly']),
  ['/kontakt', 0.8, 'monthly'],
  ['/impressum', 0.2, 'yearly'],
  ['/datenschutz', 0.2, 'yearly'],
]

const today = new Date().toISOString().slice(0, 10)
const body = pages
  .map(
    ([path, priority, freq]) =>
      `  <url>\n    <loc>${ORIGIN}${path}</loc>\n    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${freq}</changefreq>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`,
  )
  .join('\n')

writeFileSync(
  resolve(ROOT, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
)
console.log(`sitemap.xml: ${pages.length} urls`)
