import { useSeo } from '../hooks/useSeo'
import { fundingTopics, fundingLinks } from '../data/service'
import { company } from '../data/company'
import { Reveal } from '../components/ui/Reveal'
import { KontaktCta } from '../components/sections/KontaktCta'
import { PageHero } from '../components/ui/PageHero'
import { webPageJsonLd } from '../seo/schema'
import './Foerderungen.scss'

/**
 * Förderungen.
 *
 * Two parts, in the order the old page has them: the two subject areas as
 * numbered explainers, then the institutions that actually award the money as
 * a linked list. The "bis zu 50 %" figure stays attached to the Heizungstausch
 * where the source puts it and is not generalised into a headline claim.
 */
export default function Foerderungen() {
  useSeo({
    title: 'Förderungen — Heizung, Photovoltaik, Beratung',
    description:
      'Überblick über die Förderprogramme für Heizungstausch und Photovoltaik: welche Programme greifen, in welcher Reihenfolge beantragt wird und wer sie vergibt — BAFA, KfW und L-Bank.',
    path: '/service/foerderungen',
    image: 'foerderung-uebersicht',
    jsonLd: webPageJsonLd({
      path: '/service/foerderungen',
      name: 'Förderungen — Heizung, Photovoltaik, Beratung',
      description:
        'Überblick über die Förderprogramme für Heizungstausch und Photovoltaik: welche Programme greifen, in welcher Reihenfolge beantragt wird und wer sie vergibt — BAFA, KfW und L-Bank.',
      image: 'foerderung-uebersicht',
      crumbs: [
        { name: 'Startseite', path: '/' },
        { name: 'Service', path: '/service' },
        { name: 'Förderungen', path: '/service/foerderungen' },
      ],
    }),
  })

  return (
    <>
      <PageHero
        eyebrow="Förderungen"
        title="Heizungstausch, Photovoltaik, Beratung"
        lead="Sätze und Bedingungen ändern sich laufend. Wir sagen Ihnen, was zum Zeitpunkt Ihres Vorhabens gilt."
        image={{
          src: 'foerderung-uebersicht',
          alt: 'Übersicht staatlicher Förderprogramme für Heizung und Photovoltaik',
        }}
      />

      {/* ---------------------------------------------- the two subject areas */}
      <section className="fdr__topics section" aria-labelledby="fdr-themen">
        <div className="container-wide">
          <h2 className="fdr__h2" id="fdr-themen">
            Heizungstausch und Photovoltaik
          </h2>

          <ol className="fdr__topic-list">
            {fundingTopics.map((t, i) => (
              <Reveal as="li" key={t.id} className="fdr__topic" delay={i * 70}>
                <p className="fdr__topic-no" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <div className="fdr__topic-body">
                  <h3 className="fdr__topic-title">{t.title}</h3>
                  <p className="fdr__topic-claim">{t.claim}</p>
                  <p className="fdr__topic-text">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------ institutions */}
      <section className="fdr__inst on-night" aria-labelledby="fdr-stellen">
        <div className="container-wide">
          <div className="fdr__inst-head">
            <span className="fdr__rule" aria-hidden="true" />
            <h2 className="fdr__h2" id="fdr-stellen">
              Wer die Mittel vergibt
            </h2>
            <p className="fdr__inst-lead">
              Beantragt wird nicht bei uns, sondern bei diesen drei Stellen. Wir
              wissen, welche davon für Ihr Vorhaben zuständig ist, und
              unterstützen Sie beim Antrag.
            </p>
          </div>

          <ul className="fdr__inst-list">
            {fundingLinks.map((l, i) => (
              <Reveal as="li" key={l.name} className="fdr__inst-item" delay={i * 60}>
                <a
                  className="fdr__inst-link"
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="fdr__inst-abbr">{l.name}</span>
                  <span className="fdr__inst-full">{l.full}</span>
                  <span className="visually-hidden"> (öffnet in neuem Tab)</span>
                  <svg
                    className="fdr__inst-icon"
                    viewBox="0 0 14 14"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path
                      d="M4.5 9.5l5-5M5 4.5h4.5V9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                </a>
                <p className="fdr__inst-what">{l.what}</p>
              </Reveal>
            ))}
          </ul>

          <p className="fdr__inst-foot">
            Unterlagen und aktuelle Übersichten schicken wir Ihnen auf Anfrage zu
            — telefonisch unter{' '}
            <a href={`tel:${company.phone.href}`}>{company.phone.display}</a>{' '}
            oder per E-Mail an{' '}
            <a href={`mailto:${company.email}`}>{company.email}</a>.
          </p>
        </div>
      </section>

      <KontaktCta
        title="Erst rechnen, dann beantragen."
        lead="Wir sehen uns Ihr Gebäude an und sagen Ihnen, welche Programme greifen und was von den Kosten am Ende bei Ihnen bleibt."
      />
    </>
  )
}
