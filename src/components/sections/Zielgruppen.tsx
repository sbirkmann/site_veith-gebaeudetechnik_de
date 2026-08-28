import { Link } from 'react-router-dom'
import { Reveal } from '../ui/Reveal'
import { Image } from '../ui/Image'
import { SectionHeader } from '../ui/SectionHeader'
import './Zielgruppen.scss'

const groups = [
  {
    id: 'privat',
    label: 'Privatkunden',
    question: 'Was kostet mich das, und was habe ich davon?',
    body: 'Sie wollen Komfort, Zuverlässigkeit und Zukunftssicherheit. Wir rechnen Ihnen vor, was eine Anlage einspart, welche Förderung greift und in welcher Reihenfolge die Schritte sinnvoll sind — für den Neubau ebenso wie für die Verbesserung an einem Haus, das steht.',
    to: '/leistungen/energie',
    linkLabel: 'Energie und Wärme fürs Eigenheim',
    image: {
      src: 'klima-wohnbereich',
      alt: 'Klimatisierung im Wohnbereich',
    },
  },
  {
    id: 'gewerbe',
    label: 'Gewerbe',
    question: 'Läuft der Betrieb, und was kostet er im Jahr?',
    body: 'Höchste Funktionalität zeichnet ein gutes Gebäude aus. Wir planen die Technik, die den effizienten Betrieb Ihrer Gebäude und Einrichtungen sichert — von der Industrie-Elektrik über Klimatechnik für Produktion und Serverraum bis zum Energiemanagement.',
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
    question: 'Denkt da jemand mit, bevor die Wände stehen?',
    body: 'Gebäudetechnik ist für uns ein organischer Bestandteil des Gebäudes. Wir haben langjährige Erfahrung in der Technikplanung für Objekte unterschiedlichster Formate und Funktionen und sind gern früh im Projekt Ansprechpartner.',
    to: '/kontakt',
    linkLabel: 'Ansprechpartner finden',
    image: {
      src: 'beratung-showroom',
      alt: 'Beratung zu Gebäudetechnik im Showroom',
    },
  },
]

export function Zielgruppen() {
  return (
    <section className="zg section">
      <div className="container-wide">
        <SectionHeader
          eyebrow="Für wen wir planen"
          title="Drei Auftraggeber, drei verschiedene Fragen"
          lead="Ein Bauherr, ein Betriebsleiter und ein Architekt wollen dasselbe Gebäude — aber sie fragen nach völlig unterschiedlichen Dingen."
        />

        <ul className="zg__list">
          {groups.map((g, i) => (
            <Reveal as="li" className="zg__item" key={g.id} delay={i * 70}>
              <article id={g.id}>
                <p className="zg__index" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="zg__media">
                  <Image
                    src={g.image.src}
                    alt={g.image.alt}
                    fill
                    sizes="(min-width: 62rem) 22rem, 100vw"
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
      </div>
    </section>
  )
}
