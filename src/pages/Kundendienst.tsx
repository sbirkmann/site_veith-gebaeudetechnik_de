import { Link } from 'react-router-dom'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { Reveal } from '../components/ui/Reveal'
import { PageHero } from '../components/ui/PageHero'
import { webPageJsonLd } from '../seo/schema'
import './Kundendienst.scss'

/**
 * Kundendienst.
 *
 * Someone opening this page usually has a problem right now, so the phone
 * number is the page — set as large as the type scale allows, above everything
 * else, tappable. The three cases the old page describes follow underneath as
 * a plain stack, and the Notdienst selection (Elektro / Heizung-Sanitär) is
 * carried over from the Faschingsferien notice.
 */

const cases = [
  {
    id: 'stoerung',
    title: 'Bei technischen Problemen und Fehlfunktionen',
    body: 'Wir sind da, wenn Sie uns brauchen: Wir sind schnell vor Ort oder stehen Ihnen mit fachlichen Tipps zur Seite. Schließlich ist manches schnell erledigt, wenn man weiß, was zu tun ist.',
  },
  {
    id: 'einbau',
    title: 'Beim Einbau eines neuen Gerätes',
    body: 'Es muss passen. Wir kommen vorbei und nehmen Maß, bevor bestellt wird.',
  },
  {
    id: 'gewerbe',
    title: 'Für Kunden aus Handwerk und Industrie',
    body: 'Für Betriebe bieten wir sehr schnelle Notfallreaktion — auch ohne Wartungsvertrag.',
  },
] as const

export default function Kundendienst() {
  useSeo({
    title: 'Kundendienst — 07223 80 100 10',
    description:
      'Der Kundendienst von VEITH Gebäudetechnik: Unter 07223 80 100 10 sind wir stets während unserer Geschäftszeiten erreichbar — bei Störungen, beim Gerätetausch und mit schneller Notfallreaktion für Handwerk und Industrie.',
    path: '/service/kundendienst',
    image: 'kundendienst',
    jsonLd: webPageJsonLd({
      path: '/service/kundendienst',
      name: 'Kundendienst — 07223 80 100 10',
      description:
        'Der Kundendienst von VEITH Gebäudetechnik: Unter 07223 80 100 10 sind wir stets während unserer Geschäftszeiten erreichbar — bei Störungen, beim Gerätetausch und mit schneller Notfallreaktion für Handwerk und Industrie.',
      image: 'kundendienst',
      crumbs: [
        { name: 'Startseite', path: '/' },
        { name: 'Service', path: '/service' },
        { name: 'Kundendienst', path: '/service/kundendienst' },
      ],
    }),
  })

  return (
    <>
      <PageHero
        eyebrow="Kundendienst"
        title="Kundendienst in Bühl"
        lead="Unter dieser Nummer erreichen Sie uns während unserer Geschäftszeiten."
        image={{
          src: 'kundendienst',
          alt: 'Servicemonteur von VEITH mit Werkzeugkoffer im Einsatz beim Kunden',
        }}
      >
        <a className="kd__phone" href={`tel:${company.phone.href}`}>
          <span className="kd__phone-label">Anrufen</span>
          <span className="kd__phone-number">{company.phone.display}</span>
        </a>
      </PageHero>

      <section className="kd__reach section--tight">
        <div className="container-wide">
          <dl className="kd__hours">
            {company.openingHours.map((h) => (
              <div key={`${h.days}-${h.time}`}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>

          <p className="kd__mail-line">
            Kein Notfall? Dann schreiben Sie uns an{' '}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------- the three cases */}
      <section className="kd__cases section" aria-labelledby="kd-faelle">
        <div className="container-wide">
          <h2 className="kd__h2" id="kd-faelle">
            Womit Sie zu uns kommen
          </h2>

          <ol className="kd__case-list">
            {cases.map((c, i) => (
              <Reveal as="li" key={c.id} className="kd__case" delay={i * 60}>
                <span className="kd__case-n" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="kd__case-title">{c.title}</h3>
                <p className="kd__case-body">{c.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------- Notdienst */}
      <section className="kd__notdienst on-night" aria-labelledby="kd-notdienst">
        <div className="container-wide">
          <div className="kd__notdienst-grid">
            <Reveal>
              <span className="kd__rule" aria-hidden="true" />
              <h2 className="kd__h2" id="kd-notdienst">
                Außerhalb der Geschäftszeiten
              </h2>
              <p className="kd__notdienst-body">
                Ist der Betrieb geschlossen — etwa über Feiertage oder
                Betriebsferien — bleibt ein Notdienst erreichbar. Sie wählen
                dieselbe Nummer; am Ende der Bandansage können Sie den
                gewünschten Notdienst auswählen.
              </p>
            </Reveal>

            <Reveal className="kd__notdienst-side" delay={80}>
              <p className="kd__notdienst-sidelabel">Auswahl in der Ansage</p>
              <ul className="kd__departments">
                <li>Elektro</li>
                <li>Heizung / Sanitär</li>
              </ul>
              <a
                className="kd__notdienst-phone"
                href={`tel:${company.phone.href}`}
              >
                {company.phone.display}
              </a>
              <p className="kd__notdienst-note">
                Aktuelle Schließzeiten geben wir unter{' '}
                <Link to="/aktuelles">Aktuelles</Link> bekannt.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
