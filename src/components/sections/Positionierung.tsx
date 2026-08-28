import { Reveal } from '../ui/Reveal'
import { Button } from '../ui/Button'
import { BuildingSchnitt } from './BuildingSchnitt'
import './Positionierung.scss'

export function Positionierung() {
  return (
    <section className="pos">
      <div className="pos__band container-wide">
        <div className="pos__copy">
          <Reveal>
            <p className="pos__eyebrow">Seit 1989 in Bühl</p>
            <h2 className="pos__title">
              Die Gewerke müssen zusammenpassen — sonst tut es das Gebäude nicht.
            </h2>
            <div className="pos__text">
              <p>
                VEITH hat 1989 mit Elektrik und Elektronik angefangen. Heute
                planen und installieren wir Gebäudetechnik: Photovoltaik und
                Speicher, Wärmepumpe, Klima, Sanitär und Elektro — abgestimmt
                auf dasselbe Objekt.
              </p>
              <p>
                Das Kompetenzzentrum im Gewerbegebiet Bußmatten ist Arbeitsort
                und Nachweis. Wärmepumpe, Solarstrom, Fassade: die Zahlen stehen
                auf der Unternehmensseite, nicht noch einmal hier.
              </p>
            </div>
            <Button to="/unternehmen" variant="ghost" arrow>
              Kompetenzzentrum in Bußmatten
            </Button>
          </Reveal>
        </div>

        <Reveal className="pos__aside" delay={80}>
          <BuildingSchnitt />
        </Reveal>
      </div>
    </section>
  )
}
