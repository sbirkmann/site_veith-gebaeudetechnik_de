import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { Hero } from '../components/sections/Hero'
import { Positionierung } from '../components/sections/Positionierung'
import { GewerkeSchichten } from '../components/sections/GewerkeSchichten'
import { Zielgruppen } from '../components/sections/Zielgruppen'
import { ServiceBlock } from '../components/sections/ServiceBlock'
import { KarriereTeaser } from '../components/sections/KarriereTeaser'
import { KontaktCta } from '../components/sections/KontaktCta'
import { SectionHeader } from '../components/ui/SectionHeader'
import { NewsCard } from '../components/ui/NewsCard'
import { Reveal } from '../components/ui/Reveal'
import { news } from '../data/news'
import { homeJsonLd } from '../seo/schema'
import './Home.scss'

export function Home() {
  useSeo({
    title:
      'VEITH Gebäudetechnik — Energie, Heizung, Klima, Sanitär und Elektro in Bühl',
    description:
      'Gebäudetechnik aus einer Hand in Bühl/Baden: Photovoltaik und Speicher, Wärmepumpe, Klimatechnik, Sanitär und Elektro. Beratung, Installation und Kundendienst seit 1989.',
    path: '/',
    image: 'montage-photovoltaik-dach',
    jsonLd: homeJsonLd(),
  })

  const latest = news.slice(0, 5)

  return (
    <>
      <Hero />
      <Positionierung />

      {/* --- the signature: five trades as strata of one building --------- */}
      <section className="home-gewerke section on-night">
        <div className="container-wide">
          <div className="home-gewerke__head">
            <SectionHeader
              eyebrow="Leistungsbereiche"
              title="Ein Gebäude hat Schichten. Wir bauen alle fünf."
              lead="Energie auf dem Dach, Wärme und Luft im Technikraum, Wasser im Schacht, Strom und Information überall dazwischen."
            />
            <Reveal className="home-gewerke__note" delay={80}>
              <p>
                Der Vorteil liegt nicht darin, dass wir fünf Dinge können, sondern
                darin, dass eine Stelle sie aufeinander abstimmt: Die Wärmepumpe weiß
                vom Speicher, der Speicher vom Dach, die Lüftung von der Kühlung.
              </p>
              <p>
                Wählen Sie eine Schicht — Sie sehen, was auf dieser Ebene zu tun ist
                und welche anderen Gewerke dazugehören.
              </p>
            </Reveal>
          </div>
          <Reveal className="home-gewerke__model">
            <GewerkeSchichten />
          </Reveal>
        </div>
      </section>

      <Zielgruppen />
      <ServiceBlock showHours />

      {/* --- current topics ---------------------------------------------- */}
      <section className="home-news section">
        <div className="container-wide">
          <div className="home-news__head">
            <SectionHeader
              eyebrow="Aktuelles"
              title="Was gerade ansteht"
              lead="Vorträge im Kompetenzzentrum, Neues aus dem Betrieb und Themen, die unsere Kunden gerade beschäftigen."
            />
            <Link className="home-news__all" to="/aktuelles">
              Alle Meldungen
            </Link>
          </div>

          <div className="home-news__grid">
            <Reveal className="home-news__lead-item">
              <NewsCard item={latest[0]} variant="feature" />
            </Reveal>
            <ul className="home-news__list">
              {latest.slice(1).map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 70}>
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <KarriereTeaser />
      <KontaktCta />
    </>
  )
}
