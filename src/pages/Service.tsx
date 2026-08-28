import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { Reveal } from '../components/ui/Reveal'
import { Image } from '../components/ui/Image'
import { KontaktCta } from '../components/sections/KontaktCta'
import { PageHero } from '../components/ui/PageHero'
import { webPageJsonLd } from '../seo/schema'
import './Service.scss'

/**
 * Service — the hub.
 *
 * The old page is a bare menu ("Wählen Sie Ihr Thema…"). It stays a menu here,
 * but a numbered one: the Kundendienst sits apart at the top because it is the
 * only entry someone reaches in a hurry, and the four remaining topics run
 * underneath as an index rather than as cards.
 */

interface Topic {
  no: string
  to: string
  title: string
  line: string
}

const topics: Topic[] = [
  {
    no: '02',
    to: '/service/seminare',
    title: 'Unsere Seminare',
    line: 'Kostenlose Informationsabende im VEITH Kompetenzzentrum — zu Technik, die gerade eine Entscheidung von Ihnen verlangt.',
  },
  {
    no: '03',
    to: '/service/foerderungen',
    title: 'Alle wichtigen Förderungen',
    line: 'Welches Programm für Ihr Vorhaben greift, welche Unterlagen dafür nötig sind und in welcher Reihenfolge beantragt wird.',
  },
  {
    no: '04',
    to: '/service/lebensraeume',
    title: 'Lebensräume',
    line: 'Unser Showroom, als Wohnung aufgebaut: Gebäudetechnik, Beleuchtung, Vernetzung, Klimatechnik und altersgerechtes Wohnen zum Anfassen.',
  },
  {
    no: '05',
    to: '/service/marken',
    title: 'Unsere Marken',
    line: 'Die 19 Hersteller, deren Komponenten wir verbauen — mit direktem Weg zu deren Produktinformationen.',
  },
]

export default function Service() {
  useSeo({
    title: 'Service — Kundendienst, Seminare und Förderungen',
    description:
      'Service bei VEITH Gebäudetechnik in Bühl: Kundendienst unter 07223 80 100 10, kostenlose Informationsabende, Förderprogramme, der Showroom Lebensräume und unsere Marken.',
    path: '/service',
    image: 'beratung-showroom',
    jsonLd: webPageJsonLd({
      path: '/service',
      name: 'Service — Kundendienst, Seminare und Förderungen',
      description:
        'Service bei VEITH Gebäudetechnik in Bühl: Kundendienst unter 07223 80 100 10, kostenlose Informationsabende, Förderprogramme, der Showroom Lebensräume und unsere Marken.',
      image: 'beratung-showroom',
      crumbs: [
        { name: 'Startseite', path: '/' },
        { name: 'Service', path: '/service' },
      ],
    }),
  })

  return (
    <>
      <PageHero
        eyebrow="Service"
        title="Kundendienst, Seminare, Förderungen"
        lead="Störung, Förderantrag, Vortrag oder Showroom — wählen Sie das Thema."
        image={{
          src: 'beratung-showroom',
          alt: 'Beratung im VEITH Kompetenzzentrum',
          position: '42% 40%',
        }}
      />

      {/* ------------------------------------------- 01: the urgent entry */}
      <section className="svc__urgent on-night" aria-labelledby="svc-kd">
        <div className="container-wide">
          <div className="svc__urgent-grid">
            <Reveal className="svc__urgent-text">
              <p className="svc__no">01</p>
              <h2 className="svc__urgent-title" id="svc-kd">
                <Link to="/service/kundendienst">Unser Kundendienst</Link>
              </h2>
              <p className="svc__urgent-line">
                Etwas fällt aus, etwas soll eingebaut werden, oder in Ihrem
                Betrieb steht die Anlage still: Unter dieser Nummer sind wir
                stets während unserer Geschäftszeiten erreichbar.
              </p>
              <a
                className="svc__urgent-phone"
                href={`tel:${company.phone.href}`}
              >
                {company.phone.display}
              </a>
            </Reveal>

            <Reveal className="svc__urgent-media" delay={80}>
              <Image
                src="kundendienst"
                alt="Servicemonteur von VEITH mit Werkzeugkoffer im Einsatz beim Kunden"
                ratio="4 / 3"
                sizes="(min-width: 62rem) 34rem, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ 02–05: the index */}
      <section className="svc__index section" aria-labelledby="svc-weitere">
        <div className="container-wide">
          <h2 className="svc__index-title" id="svc-weitere">
            Weitere Themen
          </h2>
          <ul className="svc__list">
            {topics.map((t, i) => (
              <Reveal as="li" key={t.to} className="svc__item" delay={i * 60}>
                <Link className="svc__item-link" to={t.to}>
                  <span className="svc__no">{t.no}</span>
                  <span className="svc__item-body">
                    <span className="svc__item-title">{t.title}</span>
                    <span className="svc__item-line">{t.line}</span>
                  </span>
                  <svg
                    className="svc__item-arrow"
                    viewBox="0 0 20 12"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M0 6h17.5M12.5 1l5 5-5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.15"
                      vectorEffect="nonScalingStroke"
                    />
                  </svg>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <KontaktCta
        title="Nicht sicher, wer zuständig ist?"
        lead="Rufen Sie an — wir sortieren am Telefon, worum es geht, und verbinden Sie mit dem richtigen Bereich."
      />
    </>
  )
}
