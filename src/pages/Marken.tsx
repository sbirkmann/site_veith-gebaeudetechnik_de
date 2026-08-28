import { useSeo } from '../hooks/useSeo'
import { brands } from '../data/service'
import { Reveal } from '../components/ui/Reveal'
import { KontaktCta } from '../components/sections/KontaktCta'
import './Marken.scss'

/**
 * Unsere Marken.
 *
 * We do not have the logo files, and a grid of nineteen grey boxes would say
 * nothing anyway. So this is an index: an alphabetical table of manufacturer,
 * supply area and a link to the manufacturer's own site — dense, scannable and
 * honest about being a list. No partnership or dealer status is claimed
 * anywhere, because the source page claims none.
 */
export default function Marken() {
  useSeo({
    title: 'Unsere Marken — Hersteller, die wir verbauen',
    description:
      'Die Hersteller, deren Komponenten VEITH Gebäudetechnik verbaut — von ABB und Gira über MENNEKES bis WAGO, alphabetisch mit Liefergebiet und Link zum Hersteller.',
    path: '/service/marken',
    image: 'elektroinstallation',
  })

  const sorted = [...brands].sort((a, b) =>
    a.name.localeCompare(b.name, 'de'),
  )

  // Group by initial so the index has real signposts on long screens.
  const groups = sorted.reduce<Record<string, typeof sorted>>((acc, b) => {
    const letter = b.name[0].toUpperCase()
    ;(acc[letter] ??= []).push(b)
    return acc
  }, {})

  return (
    <>
      <header className="mrk__hero">
        <div className="container-wide">
          <span className="mrk__rule" aria-hidden="true" />
          <p className="mrk__eyebrow">Unsere Marken</p>
          <h1 className="mrk__title">Stärken, die sich ergänzen</h1>
          <p className="mrk__intro">
            Gutes Handwerk baut auf starke Marken. Wir stellen sicher, dass Sie
            nur hochwertige und langlebige Komponenten für Ihr Gebäude erhalten.
          </p>
          <p className="mrk__sub">
            Hier eine Übersicht mit der Möglichkeit, sich direkt auf den Seiten
            der Hersteller über interessante Produkte zu informieren.
          </p>
          <p className="mrk__count">
            <span className="mrk__count-no">{brands.length}</span>
            <span className="mrk__count-label">Hersteller im Verzeichnis</span>
          </p>
        </div>
      </header>

      {/* -------------------------------------------------------- the index */}
      <section className="mrk__index section" aria-labelledby="mrk-verzeichnis">
        <div className="container-wide">
          <h2 className="visually-hidden" id="mrk-verzeichnis">
            Herstellerverzeichnis
          </h2>

          <div className="mrk__head" aria-hidden="true">
            <span>Hersteller</span>
            <span>Liefert</span>
            <span>Website</span>
          </div>

          <div className="mrk__groups">
            {Object.entries(groups).map(([letter, items]) => (
              <Reveal className="mrk__group" key={letter}>
                <h3 className="mrk__letter">
                  <span aria-hidden="true">{letter}</span>
                  <span className="visually-hidden">
                    Hersteller mit {letter}
                  </span>
                </h3>
                <ul className="mrk__rows">
                  {items.map((b) => (
                    <li className="mrk__row" key={b.name}>
                      <a
                        className="mrk__link"
                        href={b.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="mrk__name">{b.name}</span>
                        <span className="mrk__field">{b.field}</span>
                        <span className="mrk__host">
                          {new URL(b.href).hostname.replace(/^www\./, '')}
                          <span className="visually-hidden">
                            {' '}
                            (öffnet in neuem Tab)
                          </span>
                        </span>
                        <svg
                          className="mrk__icon"
                          viewBox="0 0 14 14"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            d="M4.5 9.5l5-5M5 4.5h4.5V9"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <p className="mrk__disclaimer">
            Die Links führen auf die Seiten der jeweiligen Hersteller. Für deren
            Inhalte sind allein die Betreiber verantwortlich.
          </p>
        </div>
      </section>

      <KontaktCta
        title="Welche Marke für Ihr Gebäude die richtige ist, hängt vom Gebäude ab."
        lead="Sagen Sie uns, was eingebaut werden soll — wir sagen Ihnen, womit wir es lösen würden und warum."
      />
    </>
  )
}
