import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { news } from '../data/news'
import { trades } from '../data/leistungen'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { formatDate } from '../components/ui/NewsCard'
import { KontaktCta } from '../components/sections/KontaktCta'
import { PageHero } from '../components/ui/PageHero'
import { webPageJsonLd } from '../seo/schema'
import './Referenzen.scss'

/**
 * Referenzen: Presseberichte aus der Praxis.
 *
 * The existing site has this page as a placeholder — it carries a heading and
 * the note that articles will follow, but no project write-ups. We therefore
 * do not fabricate a reference list. Instead the page is honest about what it
 * can show: the reports that do exist (press coverage and company news that
 * describe real work), and a direct route to ask for references by trade.
 */
export default function Referenzen() {
  useSeo({
    title: 'Referenzen — Presseberichte aus der Praxis',
    description:
      'Berichte aus der Praxis von VEITH Gebäudetechnik: Presseberichte zu Wärmepumpen im Altbau, Fachvorträge und Einblicke in laufende Projekte.',
    path: '/referenzen',
    image: 'photovoltaik-dach-team',
    jsonLd: webPageJsonLd({
      path: '/referenzen',
      name: 'Referenzen — Presseberichte aus der Praxis',
      description:
        'Berichte aus der Praxis von VEITH Gebäudetechnik: Presseberichte zu Wärmepumpen im Altbau, Fachvorträge und Einblicke in laufende Projekte.',
      image: 'photovoltaik-dach-team',
      crumbs: [
        { name: 'Startseite', path: '/' },
        { name: 'Referenzen', path: '/referenzen' },
      ],
    }),
  })

  // Only the entries that actually describe work in the field.
  const reports = news.filter((n) => n.kind === 'presse')

  return (
    <>
      <PageHero
        eyebrow="Referenzen"
        title="Presseberichte aus der Praxis"
        lead="Presseberichte, in denen unsere Leute und Anlagen vorkommen — sichtbar, obwohl die Technik oft unsichtbar bleibt."
        image={{
          src: 'photovoltaik-dach-team',
          alt: 'VEITH-Monteure bei der Photovoltaikmontage auf einem Wohnhausdach',
        }}
      />

      <section className="ref__reports">
        <div className="container-wide">
          <ul className="ref__list">
            {reports.map((r, i) => (
              <Reveal as="li" key={r.slug} className="ref__item" delay={i * 70}>
                <Link to={`/aktuelles/${r.slug}`}>
                  {r.image && (
                    <span className="ref__media">
                      <Image
                        src={r.image.src}
                        alt=""
                        ratio="3 / 2"
                        sizes="(min-width: 62rem) 20rem, 40vw"
                      />
                    </span>
                  )}
                  <span className="ref__text">
                    <span className="ref__meta">
                      {r.source && <span className="ref__source">{r.source.label}</span>}
                      <time dateTime={r.date}>{formatDate(r.date)}</time>
                    </span>
                    <span className="ref__name">{r.title}</span>
                    <span className="ref__excerpt">{r.excerpt}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- ask ------
          Since we cannot publish a project list, we make it easy to request
          one for the trade the visitor actually cares about. */}
      <section className="ref__ask section on-night">
        <div className="container-wide">
          <div className="ref__ask-grid">
            <div>
              <span className="ref__rule" aria-hidden="true" />
              <h2 className="ref__ask-title">
                Referenzen für Ihr Vorhaben?
              </h2>
              <p className="ref__ask-lead">
                Viele unserer Anlagen stehen bei Kunden, die nicht öffentlich
                genannt werden möchten. Sagen Sie uns, um welchen Bereich und
                welche Gebäudegröße es geht — dann zeigen wir Ihnen passende
                Beispiele im Gespräch.
              </p>
            </div>

            <ul className="ref__trades">
              {trades.map((t) => (
                <li key={t.id}>
                  <Link
                    to={`/leistungen/${t.slug}`}
                    style={{ '--accent': t.accent } as React.CSSProperties}
                  >
                    <span>{t.name}</span>
                    <svg viewBox="0 0 20 12" aria-hidden="true" focusable="false">
                      <path
                        d="M0 6h17.5M12.5 1l5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.15"
                        vectorEffect="nonScalingStroke"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <KontaktCta
        title="Fragen Sie nach Beispielen."
        lead="Ein Anruf genügt. Schildern Sie uns Ihr Vorhaben, dann sprechen wir über vergleichbare Anlagen aus unserer Praxis."
      />
    </>
  )
}
