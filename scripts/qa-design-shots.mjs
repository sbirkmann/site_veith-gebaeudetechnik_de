import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright'

const BASE = process.argv[2] ?? 'http://localhost:5173'
const OUT = '/home/sascha/dev/site_veith-gebaeudetechnik_de/.tmp-shots/qa'
const REVEAL = '.reveal{opacity:1!important;transform:none!important}'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const shots = [
  { route: '/', name: 'home_hero', sel: '.hero' },
  { route: '/', name: 'home_pos', sel: '.pos' },
  { route: '/', name: 'home_pos_band', sel: '.pos__band' },
  { route: '/', name: 'home_pos_facts', sel: '.pos__facts' },
  { route: '/', name: 'home_gewerke', sel: '.home-gewerke' },
  { route: '/', name: 'home_zg', sel: '.zg' },
  { route: '/', name: 'home_svc', sel: '.svc' },
  { route: '/', name: 'home_news', sel: '.home-news' },
  { route: '/', name: 'home_kar', sel: '.kar' },
  { route: '/', name: 'home_kcta', sel: '.kcta' },
  { route: '/', name: 'home_footer', sel: '.ftr' },
  { route: '/unternehmen', name: 'unt_hero', sel: '.pghero' },
  { route: '/unternehmen', name: 'unt_credo', sel: '.unt__credo' },
  { route: '/unternehmen', name: 'unt_kz', sel: '.unt__kz' },
  { route: '/service/lebensraeume', name: 'lbr_hero', sel: '.pghero' },
  { route: '/service/lebensraeume', name: 'lbr_gallery', sel: '.lbr__gallery' },
  { route: '/leistungen', name: 'lst_hero', sel: '.pghero' },
  { route: '/kontakt', name: 'kon_hero', sel: '.pghero' },
  { route: '/kontakt', name: 'kon_kcta', sel: '.kcta' },
]

async function capture(width, height = 900) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
  })
  const page = await context.newPage()
  await page.addInitScript(() => {
    document.documentElement.style.setProperty('--dur', '0.01ms')
  })

  let last = ''
  for (const shot of shots) {
    if (shot.route !== last) {
      await page.goto(BASE + shot.route, { waitUntil: 'networkidle', timeout: 60000 })
      await page.addStyleTag({ content: REVEAL })
      await page.waitForTimeout(400)
      last = shot.route
    }
    const el = page.locator(shot.sel).first()
    if ((await el.count()) === 0) {
      console.warn(`missing ${shot.sel} on ${shot.route}`)
      continue
    }
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(120)
    const file = `${OUT}/${width}_${shot.name}.png`
    await el.screenshot({ path: file })
    console.log(file)
  }
  await context.close()
}

await capture(1440, 900)
await capture(390, 844)
await browser.close()
