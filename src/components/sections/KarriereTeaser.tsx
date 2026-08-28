import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { Button } from '../ui/Button'
import { vacancies } from '../../data/karriere'
import { company } from '../../data/company'
import './KarriereTeaser.scss'

/**
 * Careers on the homepage.
 *
 * Rather than a mood photograph and a slogan, this shows how many roles are
 * actually open and names a few — that is the information someone considering
 * VEITH wants first. The count is derived from the data, so it cannot drift.
 */
export function KarriereTeaser() {
  const open = vacancies.filter((v) => v.kind === 'stelle')
  const apprenticeships = vacancies.filter((v) => v.kind === 'ausbildung')

  return (
    <section className="kar section">
      <div className="container-wide">
        <div className="kar__grid">
          <Reveal className="kar__media">
            <Image
              src="werkstatt-detail"
              alt="Arbeit an einer Anlage in der Werkstatt von VEITH"
              ratio="4 / 5"
              sizes="(min-width: 62rem) 26rem, 100vw"
            />
          </Reveal>

          <Reveal className="kar__body" delay={80}>
            <span className="kar__rule" aria-hidden="true" />
            <p className="kar__eyebrow">Karriere</p>
            <h2 className="kar__title">
              Bei VEITH lernt man das Gebäude kennen, nicht nur das Gerät.
            </h2>
            <p className="kar__lead">
              Wir sind seit {company.founded} in Bühl tätig und durch stetiges Wachstum zu
              unserer heutigen Größe und Bandbreite gekommen. Die Gebäudetechnik
              entwickelt sich weiter — wir halten Schritt und suchen Verstärkung.
            </p>

            <dl className="kar__counts">
              <div>
                <dt>{open.length}</dt>
                <dd>offene Stellen für Fachkräfte</dd>
              </div>
              <div>
                <dt>{apprenticeships.length}</dt>
                <dd>Ausbildungsberufe</dd>
              </div>
            </dl>

            <ul className="kar__roles">
              {open.slice(0, 4).map((v) => (
                <li key={v.slug}>
                  <Link to={`/karriere#${v.slug}`}>{v.title}</Link>
                </li>
              ))}
            </ul>

            <div className="kar__actions">
              <Button to="/karriere" arrow>
                Alle Stellen und Ausbildungen
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
