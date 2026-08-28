import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { company } from '../../data/company'
import { vacancies } from '../../data/karriere'
import { tradeById } from '../../data/leistungen'
import './KarriereTeaser.scss'

export function KarriereTeaser() {
  const stellen = vacancies.filter((v) => v.kind === 'stelle')
  const azubi = vacancies.filter((v) => v.kind === 'ausbildung')
  const shown = vacancies.slice(0, 6)

  return (
    <section className="kar">
      <div className="kar__inner container-wide">
        <Reveal className="kar__body">
          <p className="kar__eyebrow">Karriere</p>
          <h2 className="kar__title">Stellen und Ausbildung in Bühl</h2>
          <p className="kar__lead">
            Seit {company.founded} Gebäudetechnik aus Bühl. Wir suchen Leute für
            Elektro, Heizung, Sanitär und Klima — auf der Baustelle und im Service.
          </p>
          <dl className="kar__spec">
            <div>
              <dt>Stellen</dt>
              <dd>{stellen.length}</dd>
            </div>
            <div>
              <dt>Ausbildungen</dt>
              <dd>{azubi.length}</dd>
            </div>
          </dl>
          <div className="kar__actions">
            <Button to="/karriere" arrow>
              Alle Stellen und Ausbildungen
            </Button>
          </div>
        </Reveal>

        <Reveal className="kar__list-wrap" delay={80}>
          <p className="kar__list-label">Gerade offen</p>
          <ul className="kar__list">
            {shown.map((v) => {
              const trade = tradeById[v.trade]
              return (
                <li key={v.slug}>
                  <Link to={`/karriere#${v.slug}`}>
                    <span className="kar__list-title">{v.title}</span>
                    <span className="kar__list-meta">{trade.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
