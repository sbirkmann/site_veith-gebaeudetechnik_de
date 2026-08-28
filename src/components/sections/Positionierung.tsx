import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { Button } from '../ui/Button'
import { kompetenzzentrum } from '../../data/company'
import './Positionierung.scss'

/**
 * VEITH's position, argued with the company's own building.
 *
 * Rather than asserting competence, this section shows the one project where
 * VEITH was both planner and client, and lists what that building achieves.
 * Every figure comes from the existing /der-veith/ page.
 */
export function Positionierung() {
  return (
    <section className="pos section">
      <div className="container-wide">
        <div className="pos__grid">
          <Reveal className="pos__intro">
            <span className="pos__rule" aria-hidden="true" />
            <p className="pos__eyebrow">Die Haltung</p>
            <h2 className="pos__title">
              Wir fassen ein Gebäude als Organismus auf — nicht als Summe seiner
              Anschlüsse.
            </h2>
            <div className="pos__copy">
              <p>
                Als VEITH 1989 anfing, ging es um Elektrik und Elektronik. Seither hat
                sich der Markt verändert wie kaum ein zweiter: Produkte für Industrie
                und Privat sind schneller, sicherer und vernetzt. Sensoren nehmen
                Veränderungen wahr, Prozessoren berechnen die passende Reaktion.
              </p>
              <p>
                Heute sprechen wir von Gebäudetechnik. Das heißt nicht, dass wir Ihnen
                keinen Lichtschalter mehr anbieten. Es heißt, dass Management, Steuerung
                und Funktion sich ergänzen müssen, damit ein Gebäude wirklich
                funktioniert — und dass jemand das Ganze im Blick behalten muss.
              </p>
            </div>
            <Button to="/unternehmen" variant="ghost" arrow>
              Mehr über VEITH
            </Button>
          </Reveal>

          {/* --- the building as evidence ---------------------------------- */}
          <Reveal className="pos__proof" delay={90}>
            <figure className="pos__figure">
              <Image
                src="kompetenzzentrum-aussen"
                alt="Das VEITH Kompetenzzentrum im Gewerbegebiet Bußmatten in Bühl"
                ratio="16 / 9"
                sizes="(min-width: 62rem) 58rem, 100vw"
              />
              <figcaption>
                Das Kompetenzzentrum im {kompetenzzentrum.location} — Büro,
                Ausstellung und Lager unter einem Dach.
              </figcaption>
            </figure>

            <dl className="pos__facts">
              {kompetenzzentrum.facts.map((f) => (
                <div className="pos__fact" key={f.value}>
                  <dt>{f.value}</dt>
                  <dd>{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
