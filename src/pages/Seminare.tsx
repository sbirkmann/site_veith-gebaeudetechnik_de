import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { news, pastSeminars } from '../data/news'
import { company } from '../data/company'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import './Seminare.scss'

/**
 * Unsere Seminare.
 *
 * A programme, read chronologically: the next talk gets the whole top of the
 * page with its date, place and body text pulled straight from the news entry;
 * everything that has already been held runs below it as a plain archive list.
 * The talk itself is never duplicated here — it lives in src/data/news.ts.
 */
export default function Seminare() {
  // The newest seminar entry is the current talk; news is ordered newest first.
  const upcoming = news.find((n) => n.kind === 'seminar')

  useSeo({
    title: 'Unsere Seminare — kostenlose Informationsabende',
    description:
      'VEITH lädt zu kostenlosen Informationsabenden ins Kompetenzzentrum in Bühl ein: Wärmepumpe, Photovoltaik, Speicher, Förderung. Aktuelle Vorträge und Themen der vergangenen Abende.',
    path: '/service/seminare',
    image: 'seminar-vortrag',
  })

  return (
    <>
      <header className="sem__hero">
        <div className="container-wide">
          <span className="sem__rule" aria-hidden="true" />
          <p className="sem__eyebrow">Unsere Seminare</p>
          <h1 className="sem__title">Bleiben Sie auf dem Laufenden mit VEITH</h1>
          <div className="sem__intro">
            <p>
              Bei der wachsenden Fülle moderner Technologien sollte man gut
              informiert sein, um für sich die richtige Entscheidung zu treffen.
            </p>
            <p>
              Wir möchten, dass unsere Kunden umfassend und aktuell informiert
              sind. Darum laden wir Sie herzlich zu unseren kostenlosen
              Informationsabenden ins VEITH Kompetenzzentrum ein —{' '}
              {company.address.street}, {company.address.postalCode} Bühl.
            </p>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------ next talk */}
      <section className="sem__next on-night" aria-labelledby="sem-aktuell">
        <div className="container-wide">
          <h2 className="sem__h2" id="sem-aktuell">
            Aktueller Vortrag
          </h2>

          {upcoming ? (
            <Reveal className="sem__next-grid">
              <div className="sem__next-text">
                {upcoming.event && (
                  <p className="sem__when">
                    <span className="visually-hidden">Termin: </span>
                    {upcoming.event.when}
                  </p>
                )}
                <h3 className="sem__next-title">
                  <Link to={`/aktuelles/${upcoming.slug}`}>{upcoming.title}</Link>
                </h3>
                {upcoming.body.map((p) => (
                  <p className="sem__next-body" key={p.slice(0, 40)}>
                    {p}
                  </p>
                ))}
                {upcoming.event?.where && (
                  <p className="sem__where">
                    <span className="sem__where-label">Ort</span>
                    {upcoming.event.where}
                  </p>
                )}
                <div className="sem__next-actions">
                  <Button to={`/aktuelles/${upcoming.slug}`} arrow>
                    Zur Ankündigung
                  </Button>
                </div>
              </div>

              {upcoming.image && (
                <figure className="sem__next-media">
                  <Image
                    src={upcoming.image.src}
                    alt={upcoming.image.alt}
                    ratio="4 / 3"
                    sizes="(min-width: 62rem) 30rem, 100vw"
                  />
                </figure>
              )}
            </Reveal>
          ) : (
            <p className="sem__next-none">
              Zurzeit ist kein Termin angekündigt. Sie interessieren sich für ein
              bestimmtes Thema? Sprechen Sie uns an — wir nehmen Ihr Thema in die
              Planung auf.
            </p>
          )}
        </div>
      </section>

      {/* -------------------------------------------------- how to register */}
      <section className="sem__anmeldung section" aria-labelledby="sem-anmeldung">
        <div className="container-wide">
          <div className="sem__anmeldung-grid">
            <Reveal>
              <span className="sem__rule" aria-hidden="true" />
              <h2 className="sem__h2" id="sem-anmeldung">
                Anmeldung
              </h2>
              <p className="sem__anmeldung-body">
                Die Abende sind kostenlos, die Plätze im Kompetenzzentrum aber
                begrenzt. Melden Sie sich deshalb kurz an — telefonisch oder per
                E-Mail mit dem Vortragstitel im Betreff.
              </p>
              <p className="sem__anmeldung-body">
                Sie interessieren sich für ein Thema, das noch nicht auf dem
                Programm steht? Sagen Sie uns Bescheid.
              </p>
            </Reveal>

            <Reveal className="sem__anmeldung-ways" delay={80}>
              <a className="sem__way" href={`tel:${company.phone.href}`}>
                <span className="sem__way-label">Telefonisch</span>
                <span className="sem__way-value">{company.phone.display}</span>
              </a>
              <a
                className="sem__way"
                href={`mailto:${company.email}?subject=${encodeURIComponent(
                  upcoming
                    ? `Anmeldung Informationsabend: ${upcoming.title}`
                    : 'Anmeldung Informationsabend',
                )}`}
              >
                <span className="sem__way-label">Per E-Mail</span>
                <span className="sem__way-value">{company.email}</span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- the archive */}
      <section className="sem__past section" aria-labelledby="sem-bisher">
        <div className="container-wide">
          <div className="sem__past-grid">
            <div className="sem__past-head">
              <h2 className="sem__h2" id="sem-bisher">
                Bisherige Vorträge
              </h2>
              <p className="sem__past-lead">
                Woran unsere Gäste bisher Interesse hatten. Einzelne Themen
                wiederholen wir, wenn die Nachfrage groß genug ist.
              </p>
              <figure className="sem__past-media">
                <Image
                  src="seminar-vortrag"
                  alt="Fachvortrag vor Gästen im VEITH Kompetenzzentrum in Bühl"
                  ratio="4 / 3"
                  sizes="(min-width: 62rem) 26rem, 100vw"
                />
              </figure>
            </div>

            <ol className="sem__past-list">
              {pastSeminars.map((t, i) => (
                <Reveal as="li" key={t} className="sem__past-item" delay={i * 30}>
                  <span className="sem__past-no" aria-hidden="true">
                    {String(pastSeminars.length - i).padStart(2, '0')}
                  </span>
                  <span className="sem__past-topic">{t}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  )
}
