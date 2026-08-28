/**
 * Responsive QA sweep.
 *
 * Loads every route at every breakpoint the brief names and reports, per
 * combination: horizontal overflow (and what caused it), text clipped by a
 * fixed height, touch targets under 24px, images that failed to load or have
 * no alt text, and heading-hierarchy problems.
 *
 * Run against a running dev or preview server:
 *   node scripts/qa-responsive.mjs [baseUrl]
 */
import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:5177'

const WIDTHS = [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1600, 1920]

const ROUTES = [
  '/',
  '/leistungen',
  '/leistungen/energie',
  '/leistungen/heizung',
  '/leistungen/klima',
  '/leistungen/sanitaer',
  '/leistungen/elektro',
  '/service',
  '/service/kundendienst',
  '/service/foerderungen',
  '/service/seminare',
  '/service/lebensraeume',
  '/service/marken',
  '/unternehmen',
  '/referenzen',
  '/karriere',
  '/aktuelles',
  '/aktuelles/vortrag-einspeiseverguetung-2026',
  '/kontakt',
  '/impressum',
  '/datenschutz',
  '/gibt-es-nicht',
]

/** Runs inside the page; returns everything measurable about this render. */
function audit() {
  const docW = document.documentElement.clientWidth
  const offenders = []

  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) continue
    const cs = getComputedStyle(el)
    if (cs.position === 'fixed' || cs.visibility === 'hidden' || cs.display === 'none') continue
    if (r.right > docW + 1 || r.left < -1) {
      offenders.push({
        sel:
          el.tagName.toLowerCase() +
          (typeof el.className === 'string' && el.className.trim()
            ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
            : ''),
        left: Math.round(r.left),
        right: Math.round(r.right),
      })
    }
  }

  const clipped = []
  for (const el of document.querySelectorAll('p,h1,h2,h3,h4,li,dt,dd,button,a,span')) {
    if (!el.textContent?.trim()) continue
    // .visually-hidden is deliberately clipped to 1px — that is the technique,
    // not a defect.
    if (el.closest('.visually-hidden') || el.classList.contains('visually-hidden')) continue
    const cs = getComputedStyle(el)
    if (
      (cs.overflow === 'hidden' || cs.overflowY === 'hidden') &&
      el.clientHeight > 0 &&
      el.scrollHeight > el.clientHeight + 2
    ) {
      clipped.push(
        el.tagName.toLowerCase() + '.' + String(el.className).slice(0, 28) +
          ` (${el.scrollHeight}>${el.clientHeight})`,
      )
    }
  }

  const small = []
  for (const el of document.querySelectorAll('a[href], button, input, select, textarea')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) continue
    if (getComputedStyle(el).visibility === 'hidden') continue
    // WCAG 2.5.8 exempts links sitting inside a sentence — padding them out
    // would break the line box. Only standalone controls are measured.
    const parent = el.parentElement
    const inline =
      parent &&
      ['P', 'LI', 'DD', 'SPAN', 'FIGCAPTION', 'ADDRESS', 'LABEL'].includes(parent.tagName) &&
      (parent.textContent ?? '').trim().length > (el.textContent ?? '').trim().length + 4
    if (inline) continue
    // A link whose ::after is stretched over an ancestor is tapped through
    // that whole box, so its own text height is not the real target.
    const after = getComputedStyle(el, '::after')
    if (after.content !== 'none' && after.position === 'absolute' && after.inset === '0px') continue
    if (r.height < 24 || r.width < 24) {
      small.push(
        `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 22)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      )
    }
  }

  const brokenImages = []
  const missingAlt = []
  for (const img of document.querySelectorAll('img')) {
    if (img.complete && img.naturalWidth === 0) brokenImages.push(img.currentSrc || img.src)
    if (!img.hasAttribute('alt')) missingAlt.push(img.currentSrc || img.src)
  }

  // Heading outline: exactly one h1, and no level skipped on the way down.
  const levels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
    Number(h.tagName[1]),
  )
  const headingIssues = []
  const h1s = levels.filter((l) => l === 1).length
  if (h1s !== 1) headingIssues.push(`${h1s} h1`)
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) {
      headingIssues.push(`h${levels[i - 1]} -> h${levels[i]}`)
      break
    }
  }

  return {
    overflowPx: Math.max(0, document.documentElement.scrollWidth - docW),
    offenders: offenders.slice(0, 6),
    clipped: clipped.slice(0, 5),
    small: small.slice(0, 5),
    brokenImages: brokenImages.slice(0, 5),
    missingAlt: missingAlt.slice(0, 5),
    headingIssues,
    title: document.title,
  }
}

/** Scrolls the page so IntersectionObserver reveals fire before measuring. */
async function settle(page) {
  await page.evaluate(async () => {
    const h = document.body.scrollHeight
    for (let y = 0; y < h; y += 600) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 120))
  })
}

const browser = await chromium.launch()
const problems = []
let checks = 0

for (const route of ROUTES) {
  const page = await browser.newPage()
  const consoleErrors = []
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160))
  })
  page.on('pageerror', (e) => consoleErrors.push('PAGEERROR ' + String(e).slice(0, 160)))

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await settle(page)
    const r = await page.evaluate(audit)
    checks++

    const issues = []
    if (r.overflowPx > 0) issues.push(`overflow +${r.overflowPx}px ${JSON.stringify(r.offenders)}`)
    if (r.clipped.length) issues.push(`clipped ${JSON.stringify(r.clipped)}`)
    if (r.small.length) issues.push(`small targets ${JSON.stringify(r.small)}`)
    if (r.brokenImages.length) issues.push(`broken img ${JSON.stringify(r.brokenImages)}`)
    if (r.missingAlt.length) issues.push(`missing alt ${JSON.stringify(r.missingAlt)}`)
    if (r.headingIssues.length) issues.push(`headings ${JSON.stringify(r.headingIssues)}`)

    if (issues.length) problems.push({ route, width, issues })
  }

  if (consoleErrors.length) {
    problems.push({ route, width: 'any', issues: ['console: ' + consoleErrors.slice(0, 3).join(' | ')] })
  }
  await page.close()
}

await browser.close()

console.log(`\nchecked ${checks} route x width combinations\n`)
if (problems.length === 0) {
  console.log('no problems found')
} else {
  for (const p of problems) {
    console.log(`\n${p.route}  @${p.width}`)
    for (const i of p.issues) console.log('   ' + i)
  }
  console.log(`\n${problems.length} problem group(s)`)
}
