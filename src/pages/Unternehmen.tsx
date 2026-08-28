import { useSeo } from '../hooks/useSeo'
import { company, kompetenzzentrum } from '../data/company'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { KontaktCta } from '../components/sections/KontaktCta'
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
    image: 'kompetenzzentrum-aussen',
  })

  return (
    <>
      {/* ------------------------------------------------------------ intro */}
      <header className="unt__hero">
        <div className="container-wide">
          <span className="unt__rule" aria-hidden="true" />
          <p className="unt__eyebrow">Ihr VEITH</p>
          <h1 className="unt__title">
            Seit {company.founded} in Bühl — und seither hat sich fast alles
            verändert
          </h1>
          <div className="unt__intro">
            <p>
              Als der Name VEITH anfing, stand er für professionelle Elektronik
              und Elektrik. Seither hat sich bei uns so viel verändert wie auf
              kaum einem anderen Markt: Die Produkte für Industrie und Privat
              haben sich weiterentwickelt, sind heute schneller, sicherer und
              vernetzt. Sensoren nehmen Veränderungen wahr, moderne Prozessoren
              berechnen die adäquate Reaktion auf Basis vorgewählter Programme.
            </p>
            <p>
              Heute sprechen wir von Gebäudetechnik. Das heißt nicht, dass wir
              Ihnen keinen Lichtschalter anbieten. Es heißt, dass wir ein Gebäude
              als Organismus auffassen — ideal ist es, wenn Management, Steuerung
              und Funktion sich perfekt ergänzen.
            </p>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------- credo */}
      <section className="unt__credo">
        <div className="container-wide">
          <Reveal className="unt__credo-inner">
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
          <Reveal className="unt__kz-figure">
            <Image
              src="kompetenzzentrum-aussen"
              alt="Das VEITH Kompetenzzentrum im Gewerbegebiet Bußmatten in Bühl bei Sonnenaufgang"
              ratio="21 / 9"
              sizes="100vw"
              priority
            />
          </Reveal>

          <div className="unt__kz-grid">
            <Reveal className="unt__kz-text">
              <span className="unt__rule" aria-hidden="true" />
              <h2 className="unt__h2">
                Unser Kompetenzzentrum für Solartechnik, regenerative Energien,
                Elektrotechnik und Energieeinsparung
              </h2>
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

            <Reveal className="unt__kz-facts" delay={80}>
              <p className="unt__facts-title">Kennzahlen des Gebäudes</p>
              <dl>
                {kompetenzzentrum.facts.map((f) => (
                  <div key={f.value}>
                    <dt>{f.value}</dt>
                    <dd>{f.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ team */}
      <section className="unt__team section on-night">
        <div className="container-wide">
          <div className="unt__team-grid">
            <Reveal className="unt__team-media">
              <Image
                src="team-gruppenbild"
                alt="Das Team von VEITH Gebäudetechnik vor dem Kompetenzzentrum in Bühl"
                ratio="16 / 11"
                sizes="(min-width: 62rem) 46rem, 100vw"
              />
            </Reveal>
            <Reveal className="unt__team-text" delay={70}>
              <span className="unt__rule" aria-hidden="true" />
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
        </div>
      </section>

      <KontaktCta
        title="Lernen Sie uns kennen."
        lead="Kommen Sie vorbei und sehen Sie sich an, was in unserem eigenen Gebäude verbaut ist. Termine nach Vereinbarung."
      />
    </>
  )
}
