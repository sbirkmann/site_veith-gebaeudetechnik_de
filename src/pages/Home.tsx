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
        <div className="home-gewerke__intro container-wide">
          <SectionHeader
            eyebrow="Leistungsbereiche"
            title="Energie, Heizung, Klima, Sanitär, Elektro"
            lead="Dach, Technikraum, Schacht, Verteilung — die Gewerke sitzen an verschiedenen Stellen im Gebäude. Wir stimmen sie an einer Stelle ab."
          />
          <Reveal className="home-gewerke__note" delay={80}>
            <p>
              Die Wärmepumpe braucht den Speicher, der Speicher den Strom vom Dach,
              die Kühlung die Regelung. Wählen Sie ein Gewerk — Sie sehen, was
              dazugehört.
            </p>
          </Reveal>
        </div>
        <Reveal className="home-gewerke__model container-wide">
          <GewerkeSchichten />
        </Reveal>
      </section>

      <Zielgruppen />
      <ServiceBlock />

      {/* --- current topics ---------------------------------------------- */}
      <section className="home-news">
        <div className="home-news__head container-wide">
          <SectionHeader
            eyebrow="Aktuelles"
            title="Vorträge und Betrieb"
            lead="Informationsabende in Bühl, Hinweise aus dem Betrieb, Presse aus der Praxis."
          />
          <Link className="home-news__all" to="/aktuelles">
            Alle Meldungen
          </Link>
        </div>

        <Reveal className="home-news__lead-item">
          <NewsCard item={latest[0]} variant="feature" />
        </Reveal>

        <ul className="home-news__list container-wide">
          {latest.slice(1).map((item, i) => (
            <Reveal as="li" key={item.slug} delay={i * 70}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </ul>
      </section>

      <KarriereTeaser />
      <KontaktCta />
    </>
  )
}
