import { useState } from 'react'
import { useSeo } from '../hooks/useSeo'
import { vacancies, applicationEmail, proIntro, azubiIntro } from '../data/karriere'
import { tradeById } from '../data/leistungen'
import { Reveal } from '../components/ui/Reveal'
import { PageHero } from '../components/ui/PageHero'
import { karriereJsonLd } from '../seo/schema'
import './Karriere.scss'

/**
 * Karriere.
 *
 * Both audiences the existing site addresses — qualified trades and school
 * leavers — with their own voice ("Sie" and "Du", as VEITH itself writes them).
 * Each posting is an accordion so the full list stays scannable; the tasks and
 * requirements inside are transcribed from the published adverts.
 */
export default function Karriere() {
  useSeo({
    title: 'Karriere — Stellen und Ausbildung bei VEITH',
    description:
      'Offene Stellen und Ausbildungsplätze bei VEITH Gebäudetechnik in Bühl: Elektro, Heizung, Sanitär, Klima und Photovoltaik. Bewerbungen an job@veith-gt.de.',
    path: '/karriere',
    image: 'team-montage',
    jsonLd: karriereJsonLd(),
  })

  const stellen = vacancies.filter((v) => v.kind === 'stelle')
  const ausbildung = vacancies.filter((v) => v.kind === 'ausbildung')

  return (
    <>
      <PageHero
        eyebrow="Karriere"
        title="Stellen und Ausbildung in Bühl"
        lead={
          <>
            Bewerbungen an{' '}
            <a href={`mailto:${applicationEmail}`}>{applicationEmail}</a>
            {' — '}wir suchen Verstärkung in den Gewerken.
          </>
        }
        image={{
          src: 'team-montage',
          alt: 'Drei Monteure von VEITH vor dem Kompetenzzentrum',
          position: '50% 30%',
        }}
      />

      <VacancySection
        id="stellen"
        eyebrow="Für Profis"
        title="Arbeiten bei VEITH"
        lead={proIntro}
        items={stellen}
      />

      <VacancySection
        id="ausbildung"
        eyebrow="Für Einsteiger"
        title="Ausbildung bei VEITH"
        lead={azubiIntro}
        items={ausbildung}
        dark
      />

      {/* ------------------------------------------------------ how to apply */}
      <section className="krr__apply section">
        <div className="container-wide">
          <div className="krr__apply-panel">
            <div>
              <h2 className="krr__apply-title">Nichts Passendes dabei?</h2>
              <p>
                Schicken Sie uns trotzdem eine Nachricht. Die Gebäudetechnik
                wächst in allen fünf Bereichen — wenn Sie etwas können, das wir
                brauchen, finden wir eine Aufgabe dafür.
              </p>
            </div>
            <a className="krr__apply-mail" href={`mailto:${applicationEmail}`}>
              {applicationEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

/* -------------------------------------------------------------------------- */

interface SectionProps {
  id: string
  eyebrow: string
  title: string
  lead: string
  items: typeof vacancies
  dark?: boolean
}

function VacancySection({ id, eyebrow, title, lead, items, dark }: SectionProps) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <section className={`krr__sec section${dark ? ' on-night' : ''}`} id={id}>
      <div className="container-wide">
        <p className="krr__eyebrow">{eyebrow}</p>
        <h2 className="krr__h2">{title}</h2>
        <p className="krr__lead">{lead}</p>

        <ul className="krr__list">
          {items.map((v) => {
            const isOpen = open === v.slug
            const trade = tradeById[v.trade]
            return (
              <Reveal as="li" key={v.slug} className="krr__item" id={v.slug}>
                <h3>
                  <button
                    type="button"
                    className="krr__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${v.slug}`}
                    onClick={() => setOpen(isOpen ? null : v.slug)}
                    style={{ '--accent': trade.accent } as React.CSSProperties}
                  >
                    <span className="krr__item-main">
                      <span className="krr__item-title">{v.title}</span>
                      <span className="krr__item-teaser">{v.teaser}</span>
                    </span>
                    <span className="krr__item-meta">
                      <span className="krr__badge">{trade.name}</span>
                      {v.duration && (
                        <span className="krr__duration">{v.duration}</span>
                      )}
                    </span>
                    <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                      <path
                        d="M6 1v10M1 6h10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </button>
                </h3>

                <div className="krr__panel" id={`panel-${v.slug}`} hidden={!isOpen}>
                  <div className="krr__panel-grid">
                    {v.tasks.length > 0 && (
                      <div>
                        <h4>Aufgaben</h4>
                        <ul>
                          {v.tasks.map((t) => (
                            <li key={t}>{t}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h4>{v.kind === 'ausbildung' ? 'Voraussetzungen' : 'Anforderungen'}</h4>
                      <ul>
                        {v.requirements.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Wir bieten</h4>
                      <ul>
                        {v.offer.map((o) => (
                          <li key={o}>{o}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <a
                    className="krr__panel-apply"
                    href={`mailto:${applicationEmail}?subject=${encodeURIComponent(
                      `Bewerbung: ${v.title}`,
                    )}`}
                  >
                    Auf diese Stelle bewerben
                    <svg viewBox="0 0 20 12" aria-hidden="true" focusable="false">
                      <path
                        d="M0 6h17.5M12.5 1l5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.15"
                        vectorEffect="nonScalingStroke"
                      />
                    </svg>
                  </a>
                </div>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
