import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { SectionHeader } from '../ui/SectionHeader'
import './Zielgruppen.scss'

const groups = [
  {
    id: 'privat',
    label: 'Privatkunden',
    question: 'Was kostet die Anlage, und was spare ich?',
    body: 'Wärmepumpe, Photovoltaik, Bad oder Elektro: Wir rechnen vor, welche Förderung greift und in welcher Reihenfolge die Schritte sinnvoll sind — Neubau ebenso wie Bestand in Bühl und der Umgebung.',
    to: '/leistungen/heizung',
    linkLabel: 'Wärmepumpe und Heizung',
    image: {
      src: 'klima-wohnbereich',
      alt: 'Klimatisierung im Wohnbereich',
    },
  },
  {
    id: 'gewerbe',
    label: 'Gewerbe',
    question: 'Läuft der Betrieb — und was kostet er im Jahr?',
    body: 'Industrie-Elektrik, Klimatechnik für Produktion und Serverraum, Energiemanagement: die Technik, die den Betrieb hält, nicht die Broschüre.',
    to: '/leistungen/elektro',
    linkLabel: 'Elektro und Gebäudemanagement',
    image: {
      src: 'klima-aussenanlage',
      alt: 'Klimatechnik an einem Gewerbegebäude',
    },
  },
  {
    id: 'planer',
    label: 'Architekten und Planer',
    question: 'Ist die Technik drin, bevor die Wände stehen?',
    body: 'Gebäudetechnik gehört ins Konzept, nicht als Nachtrag. Wir planen mit — für Wohnen und Gewerbe, früh im Projekt.',
    to: '/kontakt',
    linkLabel: 'Ansprechpartner',
    image: {
      src: 'beratung-showroom',
      alt: 'Beratung zu Gebäudetechnik im Showroom',
    },
  },
]

export function Zielgruppen() {
  return (
    <section className="zg">
      <div className="zg__intro container-wide">
        <SectionHeader
          eyebrow="Für wen wir planen"
          title="Privat, Gewerbe, Planer"
          lead="Dieselbe Werkstatt, drei verschiedene Fragen — Kosten, Betrieb, Einbauzeitpunkt."
        />
      </div>

      <ul className="zg__list">
        {groups.map((g, i) => (
          <Reveal as="li" className={`zg__item zg__item--${g.id}`} key={g.id} delay={i * 70}>
            <article id={g.id}>
              <div className="zg__media">
                <Image
                  src={g.image.src}
                  alt={g.image.alt}
                  fill
                  sizes={
                    g.id === 'privat'
                      ? '(min-width: 62rem) 48vw, 100vw'
                      : '(min-width: 62rem) 26vw, 100vw'
                  }
                />
              </div>
              <p className="zg__label">{g.label}</p>
              <h3 className="zg__question">{g.question}</h3>
              <p className="zg__body">{g.body}</p>
              <Link className="zg__link" to={g.to}>
                {g.linkLabel}
              </Link>
            </article>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
