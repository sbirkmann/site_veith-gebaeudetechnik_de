import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { Button } from '../ui/Button'
import { company } from '../../data/company'
import './KarriereTeaser.scss'

export function KarriereTeaser() {
  return (
    <section className="kar section">
      <div className="container-wide">
        <div className="kar__grid">
          <Reveal className="kar__media">
            <Image
              src="team-montage"
              alt="Monteure von VEITH bei der Arbeit"
              fill
              sizes="(min-width: 62rem) 24rem, 100vw"
              position="50% 30%"
            />
          </Reveal>

          <Reveal className="kar__body" delay={80}>
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
      </div>
    </section>
  )
}
