import { useSeo } from '../hooks/useSeo'
import { company, kompetenzzentrum } from '../data/company'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { FactIcon } from '../components/sections/FactIcons'
import { KontaktCta } from '../components/sections/KontaktCta'
import { PageHero } from '../components/ui/PageHero'
import { webPageJsonLd } from '../seo/schema'
import './Unternehmen.scss'

/**
 * Ihr VEITH.
 *
 * The argument of this page is that the company's own headquarters is the
 * clearest statement of what it builds — so the building carries the page.
 * Every figure and every feature is quoted from the existing /der-veith/.
 */
export default function Unternehmen() {
  useSeo({
    title: 'Ihr VEITH — Gebäudetechnik aus Bühl seit 1989',
    description:
      'Seit 1989 steht VEITH für Gebäudetechnik in Bühl/Baden. Das eigene Kompetenzzentrum zeigt, was bei Energieeinsparung heute möglich ist — mit Wärmepumpe, über 120 kWp Solarstrom und Solarmodulen in der Fassade.',
    path: '/unternehmen',
    image: 'kompetenzzentrum-marke',
    jsonLd: webPageJsonLd({
      path: '/unternehmen',
      name: 'Ihr VEITH — Gebäudetechnik aus Bühl seit 1989',
      description:
        'Seit 1989 steht VEITH für Gebäudetechnik in Bühl/Baden. Das eigene Kompetenzzentrum zeigt, was bei Energieeinsparung heute möglich ist — mit Wärmepumpe, über 120 kWp Solarstrom und Solarmodulen in der Fassade.',
      image: 'kompetenzzentrum-marke',
      type: 'AboutPage',
      crumbs: [
        { name: 'Startseite', path: '/' },
        { name: 'Unternehmen', path: '/unternehmen' },
      ],
    }),
  })

  return (
    <>
      <PageHero
        eyebrow="Ihr VEITH"
        title={`Seit ${company.founded} Gebäudetechnik aus Bühl`}
        lead="Angefangen hat VEITH bei Elektronik und Elektrik. Heute planen wir das Gebäude als zusammenhängendes System."
        image={{
          src: 'kompetenzzentrum-aussen',
          alt: 'Das VEITH Kompetenzzentrum im Gewerbegebiet Bußmatten in Bühl',
          position: '50% 62%',
        }}
      />

      {/* ----------------------------------------------------------- credo */}
      <section className="unt__credo">
        <div className="container-wide">
          <Reveal className="unt__credo-inner">
            <p className="unt__credo-mark">Haltung</p>
            <p className="unt__credo-text">
              Wir stehen für ein Konzept, das alle notwendigen und wünschenswerten
              Aspekte berücksichtigt und realisiert, damit Sie sich wohl und
              sicher fühlen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------- the building as proof */}
      <section className="unt__kz section">
        <div className="container-wide">
          <div className="unt__kz-split">
            <Reveal className="unt__kz-media">
              <Image
                src="kompetenzzentrum-aussen"
                alt="Das VEITH Kompetenzzentrum im Gewerbegebiet Bußmatten in Bühl"
                ratio="4 / 3"
                sizes="(min-width: 62rem) 42rem, 100vw"
              />
            </Reveal>

            <Reveal className="unt__kz-text">
              <p className="unt__eyebrow">Kompetenzzentrum</p>
              <h2 className="unt__h2">Das Kompetenzzentrum in Bußmatten</h2>
              <p>
                Sie finden uns im {kompetenzzentrum.location}. Auf über 1.000 m²
                Büro-, Ausstellungs- und Lagerfläche zeigt VEITH, was an
                Energieeinsparung heute möglich ist — nicht als Prospekt, sondern
                als Gebäude, das seit Jahren in Betrieb ist.
              </p>
              <ul className="unt__features">
                {kompetenzzentrum.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="unt__kz-actions">
                <Button to="/leistungen" arrow>
                  Zu unseren Leistungsbereichen
                </Button>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      <Reveal className="unt__kz-facts" delay={80}>
        <div className="unt__kz-facts-inner">
          <p className="unt__facts-title">Kennzahlen des Gebäudes</p>
          <dl>
            {kompetenzzentrum.facts.map((f, i) => (
              <div className="unt__kz-fact" key={f.value}>
                <FactIcon index={i} />
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* ------------------------------------------------------------ team */}
      <section className="unt__team on-night">
        <Reveal className="unt__team-media">
          <Image
            src="team-gruppenbild"
            alt="Das Team von VEITH Gebäudetechnik vor dem Kompetenzzentrum in Bühl"
            fill
            sizes="100vw"
          />
        </Reveal>
        <div className="unt__team-text container-wide">
          <Reveal delay={70}>
            <h2 className="unt__h2">Die Leute, die das bauen</h2>
            <p>
              Gebäudetechnik ist Handwerk und Ingenieursarbeit zugleich. Bei uns
              arbeiten Meisterinnen und Meister aus Elektro-, Kälte- und
              SHK-Technik, Energieberater, Projektleiter und Auszubildende
              zusammen an denselben Objekten — deshalb sprechen die Gewerke bei
              uns tatsächlich miteinander.
            </p>
            <div className="unt__team-actions">
              <Button to="/kontakt" variant="secondary" arrow>
                Ansprechpartner
              </Button>
              <Button to="/karriere" variant="ghost" arrow>
                Offene Stellen
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <KontaktCta
        title="Lernen Sie uns kennen."
        lead="Kommen Sie vorbei und sehen Sie sich an, was in unserem eigenen Gebäude verbaut ist. Termine nach Vereinbarung."
      />
    </>
  )
}
