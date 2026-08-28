import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { company } from '../../data/company'
import { vacancies } from '../../data/karriere'
import './KarriereTeaser.scss'

export function KarriereTeaser() {
  const stellen = vacancies.filter((v) => v.kind === 'stelle').length
  const azubi = vacancies.filter((v) => v.kind === 'ausbildung').length

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
              <dd>{stellen}</dd>
            </div>
            <div>
              <dt>Ausbildungen</dt>
              <dd>{azubi}</dd>
            </div>
          </dl>
          <div className="kar__actions">
            <Button to="/karriere" arrow>
              Alle Stellen und Ausbildungen
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
