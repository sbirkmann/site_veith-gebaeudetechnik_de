import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { BuildingSchnitt } from './BuildingSchnitt'
import { FactIcon } from './FactIcons'
import { kompetenzzentrum } from '../../data/company'
import './Positionierung.scss'

export function Positionierung() {
  return (
    <section className="pos">
      <div className="pos__band container-wide">
        <div className="pos__copy">
          <Reveal>
            <p className="pos__eyebrow">Die Haltung</p>
            <h2 className="pos__title">
              Ein Gebäude funktioniert nur, wenn die Gewerke zusammenpassen.
            </h2>
            <div className="pos__text">
              <p>
                Als VEITH 1989 anfing, ging es um Elektrik und Elektronik. Seither hat
                sich der Markt verändert wie kaum ein zweiter: Produkte für Industrie
                und Privat sind schneller, sicherer und vernetzt.
              </p>
              <p>
                Heute sprechen wir von Gebäudetechnik. Jemand muss Management,
                Steuerung und Funktion zusammenhalten, damit ein Gebäude wirklich
                funktioniert. Das Kompetenzzentrum im Gewerbegebiet Bußmatten ist
                dafür gebaut — als Arbeitsort und als Nachweis, dass die Technik
                hält, was wir versprechen.
              </p>
            </div>
            <Button to="/unternehmen" variant="ghost" arrow>
              Mehr über VEITH
            </Button>
          </Reveal>
        </div>

        <Reveal className="pos__aside" delay={80}>
          <BuildingSchnitt />
        </Reveal>
      </div>

      <ol className="pos__features container-wide">
        {kompetenzzentrum.features.map((feature, i) => (
          <Reveal as="li" key={feature} delay={i * 70}>
            <span className="pos__n" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p>{feature}</p>
          </Reveal>
        ))}
      </ol>

      <dl className="pos__facts">
        {kompetenzzentrum.facts.map((f, i) => (
          <div className="pos__fact" key={f.value}>
            <FactIcon index={i} />
            <dt>{f.value}</dt>
            <dd>{f.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
