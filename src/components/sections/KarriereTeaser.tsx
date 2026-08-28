import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { company } from '../../data/company'
import './KarriereTeaser.scss'

export function KarriereTeaser() {
  return (
    <section className="kar">
      <div className="kar__inner container-wide">
        <Reveal className="kar__body">
          <p className="kar__eyebrow">Karriere</p>
          <h2 className="kar__title">
            Das Gebäude kennenlernen, nicht nur das Gerät.
          </h2>
          <p className="kar__lead">
            Seit {company.founded} in Bühl, gewachsen mit der Technik. Wir suchen
            Leute, die das Ganze sehen wollen — vom Anschluss bis zur Steuerung.
          </p>
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
