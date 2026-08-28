/**
 * Renders the Open Graph card (1200x630) used when a page is shared.
 *
 * The card is the hero photograph under the brand navy scrim, with the
 * wordmark and the site's claim — the same composition as the hero itself, so
 * a shared link looks like the page it points at.
 *
 * Run:  node scripts/build-og.mjs
 */
import sharp from 'sharp'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const W = 1200
const H = 630

const photo = await sharp(resolve(ROOT, '_scrape/img2/dsc3336.jpg'))
  .resize(W, H, { fit: 'cover', position: 'attention' })
  .toBuffer()

// The same two-stop scrim the hero uses, so the type stays legible.
const scrim = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%"   stop-color="#0E2340" stop-opacity="0.94"/>
      <stop offset="45%"  stop-color="#0E2340" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#0E2340" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#EF7C00"/>
</svg>`)

// The wordmark, scaled to sit as it does in the header.
const logo = readFileSync(resolve(ROOT, 'src/assets/logo/veith-logo-inverse.svg'))
const logoPng = await sharp(logo, { density: 600 }).resize({ width: 300 }).png().toBuffer()

const text = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <style>
    .h { font-family: 'Archivo', 'Helvetica Neue', Arial, sans-serif;
         font-size: 62px; font-weight: 700; fill: #fff; letter-spacing: -1.6px; }
    .s { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
         font-size: 25px; fill: #A8BCD4; }
    .k { font-family: 'JetBrains Mono', monospace; font-size: 17px;
         fill: #EF7C00; letter-spacing: 3px; }
  </style>
  <text class="k" x="72" y="300">SEIT 1989 · BÜHL / BADEN</text>
  <text class="h" x="72" y="376">Fünf Gewerke,</text>
  <text class="h" x="72" y="446">ein Gebäude, ein Plan.</text>
  <text class="s" x="72" y="502">Energie · Heizung · Klima · Sanitär · Elektro</text>
</svg>`)

await sharp(photo)
  .composite([
    { input: scrim, top: 0, left: 0 },
    { input: logoPng, top: 72, left: 72 },
    { input: text, top: 0, left: 0 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(resolve(ROOT, 'public/og-default.jpg'))

console.log('wrote public/og-default.jpg 1200x630')
