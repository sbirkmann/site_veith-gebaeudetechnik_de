import { Link } from 'react-router-dom'
import { trades } from '../data/leistungen'
import { useSeo } from '../hooks/useSeo'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeader } from '../components/ui/SectionHeader'
import { KontaktCta } from '../components/sections/KontaktCta'
import { PageHero } from '../components/ui/PageHero'
import { leistungenOverviewJsonLd } from '../seo/schema'
import './Leistungen.scss'

/**
 * Overview of the five Leistungsbereiche and the three audiences.
 *
 * Deliberately not the same presentation as the homepage: there the five are a
 * section model to explore, here they are a directory to scan and enter. Each
 * trade gets a full row with its scope visible, so a visitor can find the term
 * they came for without opening five pages.
 */

const audiences = [
  {
    id: 'privat',
    label: 'Für private Kunden',
    body: 'Wärmepumpe, Photovoltaik, Bad oder Elektro im Haus: wir sagen Ihnen, was zum Bestand passt und welche Förderung greift.',
  },
  {
    id: 'gewerbe',
    label: 'Für gewerbliche Kunden',
    body: 'Technik, die den Betrieb hält — von der Industrie-Elektrik über Klimatechnik bis zum Energiemanagement.',
  },
  {
    id: 'planer',
    label: 'Für Architekten und Planer',
    body: 'Gebäudetechnik gehört von Anfang an ins Konzept. Wir planen mit, für Wohnen und Gewerbe.',
  },
]

export default function Leistungen() {
  useSeo({
    title: 'Leistungen — Energie, Heizung, Klima, Sanitär und Elektro',
    description:
      'Alle Leistungen von VEITH Gebäudetechnik im Überblick: Photovoltaik und Speicher, Heizung, Klimatechnik, Sanitär und Elektro — für private und gewerbliche Kunden sowie Planer.',
    path: '/leistungen',
    image: 'photovoltaik-dach-team',
    jsonLd: leistungenOverviewJsonLd(),
  })

  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title="Energie, Heizung, Klima, Sanitär, Elektro"
        lead="Photovoltaik und Speicher, Wärmepumpe, Klimatechnik, Sanitär und Elektro — in Bühl, aus einer Hand. Wählen Sie das Gewerk, das bei Ihnen ansteht."
        image={{
          src: 'photovoltaik-dach-team',
          alt: 'Monteure von VEITH setzen Photovoltaikmodule auf einem Wohnhausdach in der Region Bühl',
          position: '58% 40%',
        }}
      />

      {/* ----------------------------------------------------- the directory */}
      <section className="lst__trades">
        <div className="container-wide">
          <ol className="lst__list">
            {trades.map((trade, i) => (
              <Reveal
                as="li"
                key={trade.id}
                className="lst__row"
                delay={i * 60}
              >
                <Link
                  to={`/leistungen/${trade.slug}`}
                  style={{ '--accent': trade.accent } as React.CSSProperties}
                >
                  <span className="lst__num">{String(i + 1).padStart(2, '0')}</span>

                  <span className="lst__media">
                    <Image
                      src={trade.hero.src}
                      alt=""
                      ratio="3 / 2"
                      sizes="(min-width: 62rem) 16rem, 40vw"
                    />
                  </span>

                  <span className="lst__text">
                    <span className="lst__name">{trade.name}</span>
                    <span className="lst__summary">{trade.summary}</span>
                    <span className="lst__scope">
                      {trade.scope.join(' · ')}
                    </span>
                    <span className="lst__process">{trade.process.title}</span>
                  </span>

                  <svg className="lst__arrow" viewBox="0 0 20 12" aria-hidden="true" focusable="false">
                    <path
                      d="M0 6h17.5M12.5 1l5 5-5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.15"
                      vectorEffect="nonScalingStroke"
                    />
                  </svg>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- audiences */}
      <section className="lst__aud section on-night">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Wen wir beliefern"
            title="Privat, Gewerbe, Planer"
          />
          <div className="lst__aud-grid">
            {audiences.map((a, i) => (
              <Reveal key={a.id} delay={i * 70}>
                <article id={a.id} className="lst__aud-item">
                  <h3>{a.label}</h3>
                  <p>{a.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <KontaktCta />
    </>
  )
}
