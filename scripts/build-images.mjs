/**
 * Turns the photography harvested from the old site into responsive,
 * modern-format assets under public/img/.
 *
 * For each source it emits AVIF + WebP at a few widths, plus a small JPEG
 * fallback, and writes public/img/manifest.json with each image's intrinsic
 * aspect ratio and a tiny blurred placeholder. The app reads that manifest so
 * every <img> can carry width/height and reserve its space — no layout shift.
 *
 * Run:  node scripts/build-images.mjs
 * One slug: node scripts/build-images.mjs gebaeude-schnitt
 *
 * Generated illustrations live in assets/generated/ (slug = filename stem).
 */
import sharp from 'sharp'
import { readdirSync, mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { resolve, dirname, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = resolve(ROOT, '_scrape/img2')
const EXTRA = resolve(ROOT, '_scrape/img')
const GENERATED = resolve(ROOT, 'assets/generated')
const OUT = resolve(ROOT, 'public/img')
const MANIFEST_APP = resolve(ROOT, 'src/data/image-manifest.json')
const MANIFEST_PUB = resolve(OUT, 'manifest.json')
/** Optional: `node scripts/build-images.mjs gebaeude-schnitt` rebuilds one slug. */
const ONLY = process.argv[2]

const WIDTHS = [480, 800, 1280, 1920]
// effort 4 is within ~2% of effort 6 on these photographs and encodes
// several times faster, which matters because some originals are 8000px wide.
const QUALITY = { avif: 52, webp: 74, jpeg: 78 }
const AVIF_EFFORT = 4

/** Source file -> the slug the app refers to it by. */
const RENAME = {
  '200607_veith_aussen_dsc3821bongartz': 'kompetenzzentrum-aussen',
  dsc3336: 'montage-photovoltaik-dach',
  dsc3402: 'ladepunkt-elektromobilitaet',
  dsc3551: 'montage-detail',
  dsc9470cbongartz: 'batteriespeicher-monitoring',
  'wbv_3413cbongartz-1': 'werkstatt-detail',
  'Energiezentrale_HWR_Menschen-scaled-e1715592554709': 'energiezentrale-beratung',
  egt_knx_installation_an_der_decke: 'knx-installation-decke',
  am_it_gewerbe_15_39: 'netzwerktechnik-gewerbe',
  veith_elektroinstallation: 'elektroinstallation',
  veith_sanitaerinstallation: 'sanitaerinstallation',
  veith_badausstattung_02: 'bad-ausstattung',
  veith_klima_privat_02: 'klima-wohnbereich',
  veith_klima_privat_03: 'klima-wohnraum',
  klima_technischeanlagen_it: 'klima-serverraum',
  klima_buero_laden_buro: 'klima-buero',
  waermepumpe_aussengeraet01: 'waermepumpe-aussengeraet',
  brennstoff_pelletslz: 'brennstoff-pellets',
  brennstoff_hackschnitzel: 'brennstoff-hackschnitzel',
  solarthermie_02_dach: 'solarthermie-dach',
  veith_kundendienst: 'kundendienst',
  veith_lebensraeume_01: 'lebensraeume-showroom',
  veith_lebensraeume_02: 'lebensraeume-detail',
  veith_licht_arbeitsplatz01: 'licht-arbeitsplatz',
  veith_vortrag01: 'seminar-vortrag',
  veith_gruppenbild_01: 'team-gruppenbild',
  veith_photovoltaik_01_01: 'photovoltaik-module',
  veith_photovoltaik_01_02: 'photovoltaik-flaeche',
  veith_photovoltaik_01_04: 'photovoltaik-montage',
  drei_jungs_hgsonne_800px: 'team-montage',
  '190920_beleuchtung_04_foto_arge_medien_im_zveh': 'beleuchtung-wohnraum',
  '190920_sicherheit_09_foto_arge_medien_im_zveh': 'sicherheitstechnik',
  klima_technischeanlagen_aussen: 'klima-aussenanlage',
  klima_buero_laden_laden: 'klima-laden',
  lebensraeume_themenbild_komfort: 'lebensraeume-komfort',
  lebensraeume_themenbild_sicherheit: 'lebensraeume-sicherheit',
  veith_badausstattung_03: 'bad-detail',
  veith_pellets_01: 'pellets-lager',
  veith_beratung_01_smartphone: 'beratung-showroom',
  veith_ecke_haus_sonne_01: 'kompetenzzentrum-marke',
  'veith_foerderungen01_800px-e1608291930912': 'foerderung-uebersicht',
  'dsc9364cbongartz-scaled-e1728624398315': 'photovoltaik-dach-team',
  'gebaeude-schnitt': 'gebaeude-schnitt',
}

async function run() {
  mkdirSync(OUT, { recursive: true })

  const sources = []
  for (const dir of [SRC, EXTRA, GENERATED]) {
    if (!existsSync(dir)) continue
    for (const f of readdirSync(dir)) {
      if (!/\.(jpe?g|png)$/i.test(f)) continue
      const stem = basename(f, extname(f))
      if (!(stem in RENAME)) continue
      const slug = RENAME[stem]
      if (sources.some((s) => s.slug === slug)) continue
      sources.push({ file: resolve(dir, f), slug })
    }
  }

  const selected = ONLY ? sources.filter((s) => s.slug === ONLY) : sources
  if (ONLY && selected.length === 0) {
    console.error(`No source for slug "${ONLY}"`)
    process.exit(1)
  }

  const manifest = ONLY && existsSync(MANIFEST_APP)
    ? JSON.parse(readFileSync(MANIFEST_APP, 'utf8'))
    : {}

  for (const { file, slug } of selected) {
    // Some originals are 8000px wide. Resize once to the largest width we
    // actually emit, then derive every variant from that buffer.
    const source = sharp(file, { failOn: 'none' })
    const probe = await source.metadata()
    const cap = Math.min(probe.width ?? WIDTHS.at(-1), WIDTHS.at(-1))
    const img = sharp(
      await source.resize({ width: cap, withoutEnlargement: true }).toBuffer(),
    )
    const meta = { width: probe.width, height: probe.height }
    const w = meta.width ?? 0
    const h = meta.height ?? 0
    if (!w || !h) continue

    const widths = WIDTHS.filter((x) => x <= w)
    if (widths.length === 0) widths.push(w)

    for (const target of widths) {
      const base = img.clone().resize({ width: target, withoutEnlargement: true })
      await base.clone().avif({ quality: QUALITY.avif, effort: AVIF_EFFORT })
        .toFile(resolve(OUT, `${slug}-${target}.avif`))
      await base.clone().webp({ quality: QUALITY.webp })
        .toFile(resolve(OUT, `${slug}-${target}.webp`))
    }
    // one JPEG so the markup always has a src that every browser understands
    await img.clone()
      .resize({ width: Math.min(1280, w), withoutEnlargement: true })
      .jpeg({ quality: QUALITY.jpeg, mozjpeg: true })
      .toFile(resolve(OUT, `${slug}.jpg`))

    // A 20px blur, inlined as a data URI, held behind the image while it loads.
    const tiny = await img.clone().resize({ width: 20 }).webp({ quality: 30 }).toBuffer()

    manifest[slug] = {
      width: w,
      height: h,
      widths,
      blur: `data:image/webp;base64,${tiny.toString('base64')}`,
    }
    console.log(`${slug.padEnd(28)} ${w}x${h}  ${widths.join(',')}`)
  }

  writeFileSync(MANIFEST_PUB, JSON.stringify(manifest, null, 0))
  writeFileSync(MANIFEST_APP, JSON.stringify(manifest, null, 0))
  console.log(`\n${Object.keys(manifest).length} images -> public/img/`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
