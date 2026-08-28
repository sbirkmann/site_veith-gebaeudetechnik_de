/**
 * Generates the VEITH logo SVG set by tracing the original raster artwork.
 *
 * Two sources were measured and cross-checked; they agree to within a pixel
 * once scaled (header cap height 41 / marke_weiss cap height 30 = 1.3667):
 *
 *   marke_weiss.png  (180x97)  — the full lockup incl. GEBÄUDETECHNIK and the
 *                                ring, but cropped hard at left and right.
 *   VEITH_Marke_header.png     — the wordmark uncropped at 900px, used for the
 *                                horizontal metrics of V, E, T and H.
 *
 * All geometry below is stated in "marke_weiss" pixel space, origin at the top
 * left of the cap band, x measured from the left edge of the V:
 *
 *   cap height 30, stem 6.4
 *   V x 0..29    E x 47..67    I x 88..94    T x 113..137    H x 156..180
 *   ring centre (91, 43), outer r 31, stroke 5  -> spans y 12..74, x 60..122
 *   arc gap at the top only: -108.1deg .. -71.9deg, swept the long way round
 *
 * Three details that are easy to get wrong, all verified against the source:
 *   - the "I" stem occupies the cap band only (y0..29). It does NOT descend
 *     into the ring. The ring hangs below the wordmark and its narrow top
 *     opening sits directly under the foot of the I — that is what makes the
 *     mark read as a power symbol.
 *   - the ring is closed at the bottom. Scanning row y69 gives one continuous
 *     run, so the only break in the circle is the gap at the top.
 *   - the ring is wider than the gap between E and T, so the arc passes behind
 *     both letters. Letter widths must therefore be read off rows above y12.
 */
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../src/assets/logo')
mkdirSync(OUT, { recursive: true })

const n = (v) => Number(v.toFixed(2))

// ---------------------------------------------------------------- geometry --
const CAP = 30 // cap height (y 0..29 in source pixels)
const STEM = 6.4 // vertical stem width (V/E/I/T/H stems measure 6..7)
const BAR = 6.4 // horizontal bar thickness (E arms, H crossbar, T bar)

// Left edge and width of each letter, read off rows that sit clear of the ring.
const X = { V: 0, E: 47, I: 88, T: 113, H: 156 }
const W = { V: 29, E: 20, I: 6, T: 24, H: 24 }

// Ring: widest row (y42..44) gives outer edges x 60 and 122 -> cx 91, r 31,
// stroke 5. Vertical centre 43, so it spans y 12..74.
const RING = { cx: 91, cy: 43, r: 28.5, stroke: 5 }
// The only opening is a narrow gap at the top, where the foot of the "I" sits.
const ARC_FROM = -108.1
const ARC_TO = -71.9

/** "V" — splayed sides, flat cut top, short flat vertex on the baseline. */
function glyphV() {
  const x = X.V
  const w = W.V
  const vertex = 5.4 // width of the flat at the bottom of the V
  const inL = (w - vertex) / 2
  return (
    `M${n(x)} 0` +
    `L${n(x + STEM)} 0` +
    `L${n(x + inL + vertex / 2)} ${n(CAP - BAR)}` +
    `L${n(x + w - STEM)} 0` +
    `L${n(x + w)} 0` +
    `L${n(x + inL + vertex)} ${n(CAP)}` +
    `L${n(x + inL)} ${n(CAP)}` +
    'Z'
  )
}

/** "E" — left stem with top, middle and bottom arms. */
function glyphE() {
  const x = X.E
  const w = W.E
  const midTop = (CAP - BAR) / 2
  const midBot = midTop + BAR
  const midW = w - 1 // the middle arm is a touch shorter than top and bottom
  return [
    `M${n(x)} 0`,
    `H${n(x + w)}`,
    `V${n(BAR)}`,
    `H${n(x + STEM)}`,
    `V${n(midTop)}`,
    `H${n(x + midW)}`,
    `V${n(midBot)}`,
    `H${n(x + STEM)}`,
    `V${n(CAP - BAR)}`,
    `H${n(x + w)}`,
    `V${n(CAP)}`,
    `H${n(x)}`,
    'Z',
  ].join('')
}

/** "I" — a plain stem, flush top and bottom on the cap band. */
function glyphI() {
  const x = X.I
  return `M${n(x)} 0H${n(x + W.I)}V${n(CAP)}H${n(x)}Z`
}

/** "T" — full-width bar with a centred stem. */
function glyphT() {
  const x = X.T
  const w = W.T
  const sx = x + (w - STEM) / 2
  return [
    `M${n(x)} 0`,
    `H${n(x + w)}`,
    `V${n(BAR)}`,
    `H${n(sx + STEM)}`,
    `V${n(CAP)}`,
    `H${n(sx)}`,
    `V${n(BAR)}`,
    `H${n(x)}`,
    'Z',
  ].join('')
}

/** "H" — two stems joined by a centred crossbar. */
function glyphH() {
  const x = X.H
  const w = W.H
  const top = (CAP - BAR) / 2
  const bot = top + BAR
  return [
    `M${n(x)} 0`,
    `H${n(x + STEM)}`,
    `V${n(top)}`,
    `H${n(x + w - STEM)}`,
    `V0`,
    `H${n(x + w)}`,
    `V${n(CAP)}`,
    `H${n(x + w - STEM)}`,
    `V${n(bot)}`,
    `H${n(x + STEM)}`,
    `V${n(CAP)}`,
    `H${n(x)}`,
    'Z',
  ].join('')
}

/** The open ring below the "I": a power symbol, drawn as a stroked arc. */
function ringPath(cx = RING.cx, cy = RING.cy, r = RING.r) {
  const rad = (d) => (d * Math.PI) / 180
  const at = (deg) => [cx + r * Math.cos(rad(deg)), cy + r * Math.sin(rad(deg))]
  // Start at the right-hand end of the gap and sweep clockwise all the way
  // round through the bottom to the left-hand end, so the only break in the
  // circle is the measured gap at the top.
  const [x1, y1] = at(ARC_TO)
  const [x2, y2] = at(ARC_FROM)
  return `M${n(x1)} ${n(y1)}A${n(r)} ${n(r)} 0 1 1 ${n(x2)} ${n(y2)}`
}


/* ------------------------------------------------------- subline glyphs -- */
/**
 * "GEBÄUDETECHNIK" as outlines rather than live text, so the lockup renders
 * identically everywhere without depending on a webfont.
 *
 * The path data is generated by scripts/gen-subline.py, which traces real glyph
 * outlines and places each letter on the x position and width measured off the
 * original artwork (marke_weiss.png, rows y84..96, cap height 13). Re-run that
 * script if the subline ever needs to change.
 */
const SUB_CAP = 13
const SUB_PATH = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), 'subline-path.txt'),
  'utf8',
).trim()

const WORD = [glyphV(), glyphE(), glyphI(), glyphT(), glyphH()].join('')

// ------------------------------------------------------------- composition --
const WORD_W = X.H + W.H // 182.93
const HALF = RING.stroke / 2
const RING_BOTTOM = RING.cy + RING.r + HALF // 73.25
const PAD = HALF

/** Wordmark + ring only (header / compact use). */
function lockupCompact({ word, ring }) {
  return {
    body:
      `<path d="${ringPath()}" fill="none" stroke="${ring}" stroke-width="${RING.stroke}"/>` +
      `<path d="${WORD}" fill="${word}"/>`,
    w: WORD_W,
    h: RING_BOTTOM,
  }
}

/**
 * Full lockup with the letterspaced GEBÄUDETECHNIK line.
 * Measured on marke_weiss: subline cap 13 tall, baseline gap 11 below the ring,
 * tracked out to span the full width of the wordmark.
 */
function lockupFull({ word, ring, sub }) {
  const base = lockupCompact({ word, ring })
  const GAP = 11 // measured: 11px between the bottom of the ring and the subline
  const y = RING_BOTTOM + GAP
  const line = `<g transform="translate(0 ${n(y)})"><path d="${SUB_PATH}" fill="${sub}"/></g>`
  return { body: base.body + line, w: WORD_W, h: y + SUB_CAP }
}

/** The bare ring + stem, as a standalone brand device. */
function markOnly(fill) {
  const r = RING.r
  const s = RING.stroke
  const size = (r + s / 2) * 2
  const c = size / 2
  // The stem enters through the gap and stops just inside the ring, keeping the
  // same stem-to-ring proportion the lockup has.
  const stemTop = c - r - s / 2
  const stemBot = c - r * 0.34
  return {
    body:
      `<path d="${ringPath(c, c, r)}" fill="none" stroke="${fill}" stroke-width="${s}"/>` +
      `<path d="M${n(c - STEM / 2)} ${n(stemTop)}H${n(c + STEM / 2)}V${n(stemBot)}H${n(c - STEM / 2)}Z" fill="${fill}"/>`,
    w: size,
    h: size,
  }
}

function svg({ title, body, w, h, pad = PAD }) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${n(-pad)} ${n(-pad)} ${n(w + pad * 2)} ${n(h + pad * 2)}" ` +
    `role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`
  )
}

const ORANGE = '#EF7C00'
const INK = '#101D2E'
const WHITE = '#FFFFFF'

const files = {
  'veith-logo.svg': svg({
    title: 'VEITH Gebäudetechnik',
    ...lockupFull({ word: INK, ring: ORANGE, sub: INK }),
  }),
  'veith-logo-inverse.svg': svg({
    title: 'VEITH Gebäudetechnik',
    ...lockupFull({ word: WHITE, ring: ORANGE, sub: WHITE }),
  }),
  'veith-logo-mono.svg': svg({
    title: 'VEITH Gebäudetechnik',
    ...lockupFull({ word: 'currentColor', ring: 'currentColor', sub: 'currentColor' }),
  }),
  'veith-wordmark.svg': svg({
    title: 'VEITH',
    ...lockupCompact({ word: INK, ring: ORANGE }),
  }),
  'veith-wordmark-inverse.svg': svg({
    title: 'VEITH',
    ...lockupCompact({ word: WHITE, ring: ORANGE }),
  }),
  'veith-mark.svg': svg({ title: 'VEITH', ...markOnly(ORANGE), pad: 0 }),
  'veith-mark-mono.svg': svg({ title: 'VEITH', ...markOnly('currentColor'), pad: 0 }),
}

for (const [name, content] of Object.entries(files)) {
  writeFileSync(resolve(OUT, name), content)
  console.log('wrote', name, content.length, 'bytes')
}
