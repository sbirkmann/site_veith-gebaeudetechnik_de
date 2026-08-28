import { useState } from 'react'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { contactGroups, telHref } from '../data/team'
import { ContactForm } from '../components/forms/ContactForm'
import { Reveal } from '../components/ui/Reveal'
import './Kontakt.scss'

export default function Kontakt() {
  useSeo({
    title: 'Kontakt und Ansprechpartner',
    description:
      'VEITH Gebäudetechnik in Bühl/Baden: Telefon 07223 80 100 10, Bußmatten 15. Öffnungszeiten und alle Ansprechpartner für Energie, Heizung, Klima, Sanitär und Elektro.',
    path: '/kontakt',
  })

  const [group, setGroup] = useState(contactGroups[0].id)
  const active = contactGroups.find((g) => g.id === group) ?? contactGroups[0]
  const { address } = company

  return (
    <>
      {/* ------------------------------------------------------------ intro */}
      <header className="kon__hero">
        <div className="container-wide">
          <div className="kon__hero-grid">
            <div>
              <span className="kon__rule" aria-hidden="true" />
              <p className="kon__eyebrow">Kontakt</p>
              <h1 className="kon__title">Schnell und unkompliziert</h1>
              <p className="kon__intro">
                Sie haben eine Frage oder möchten VEITH näher kennenlernen? Rufen
                Sie einfach an — oder schreiben Sie uns, wenn es Ihnen so lieber
                ist.
              </p>
              <a className="kon__call" href={`tel:${company.phone.href}`}>
                {company.phone.display}
              </a>
            </div>

            <div className="kon__facts">
              <div className="kon__fact">
                <h2>Adresse</h2>
                <address>
                  {company.legalName}
                  <br />
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </address>
                <a
                  className="kon__route"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                    `${address.street}, ${address.postalCode} ${address.city}`,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zum Routenplaner
                  <span className="visually-hidden"> (öffnet in neuem Tab)</span>
                </a>
              </div>

              <div className="kon__fact">
                <h2>Erreichbarkeit</h2>
                <dl>
                  <div>
                    <dt>Telefon</dt>
                    <dd>
                      <a href={`tel:${company.phone.href}`}>{company.phone.display}</a>
                    </dd>
                  </div>
                  <div>
                    <dt>Telefax</dt>
                    <dd>{company.fax.display}</dd>
                  </div>
                  <div>
                    <dt>E-Mail</dt>
                    <dd>
                      <a href={`mailto:${company.email}`}>{company.email}</a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="kon__fact">
                <h2>Öffnungszeiten</h2>
                <ul className="kon__hours">
                  {company.openingHours.map((h) => (
                    <li key={h.days}>
                      <span>{h.days}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="kon__note">{company.appointmentNote}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------- form */}
      <section className="kon__form-section section--tight">
        <div className="container-wide">
          <div className="kon__form-grid">
            <div className="kon__form-intro">
              <h2 className="kon__h2">Schreiben Sie uns</h2>
              <p>
                Beschreiben Sie kurz, worum es geht. Je genauer wir wissen, was
                bei Ihnen ansteht, desto konkreter können wir antworten — und
                desto eher landet Ihre Anfrage gleich beim richtigen Kollegen.
              </p>
              <p className="kon__form-hint">
                Dringend? Rufen Sie an. Während der Geschäftszeiten sind wir unter{' '}
                <a href={`tel:${company.phone.href}`}>{company.phone.display}</a>{' '}
                direkt erreichbar.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Ansprechpartner */}
      <section className="kon__team section on-night">
        <div className="container-wide">
          <span className="kon__rule" aria-hidden="true" />
          <h2 className="kon__team-title">Ansprechpartner</h2>
          <p className="kon__team-lead">
            Wählen Sie den Bereich, um den es geht — dann sparen Sie sich die
            Weiterleitung.
          </p>

          {/* Tabs: one group visible at a time, arrow keys move between them. */}
          <div
            className="kon__tabs"
            role="tablist"
            aria-label="Bereiche"
            onKeyDown={(e) => {
              const i = contactGroups.findIndex((g) => g.id === group)
              let n: number | null = null
              if (e.key === 'ArrowRight') n = (i + 1) % contactGroups.length
              if (e.key === 'ArrowLeft') n = (i - 1 + contactGroups.length) % contactGroups.length
              if (e.key === 'Home') n = 0
              if (e.key === 'End') n = contactGroups.length - 1
              if (n === null) return
              e.preventDefault()
              setGroup(contactGroups[n].id)
              document.getElementById(`tab-${contactGroups[n].id}`)?.focus()
            }}
          >
            {contactGroups.map((g) => (
              <button
                key={g.id}
                id={`tab-${g.id}`}
                type="button"
                role="tab"
                aria-selected={g.id === group}
                aria-controls="kon-panel"
                tabIndex={g.id === group ? 0 : -1}
                className={`kon__tab${g.id === group ? ' is-active' : ''}`}
                onClick={() => setGroup(g.id)}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div
            className="kon__panel"
            id="kon-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            tabIndex={0}
          >
            <p className="kon__panel-hint">{active.hint}</p>
            {active.note && <p className="kon__panel-note">{active.note}</p>}

            <ul className="kon__people">
              {active.people.map((p) => (
                <Reveal as="li" key={p.name} className="kon__person">
                  <p className="kon__person-name">{p.name}</p>
                  {p.qualification && (
                    <p className="kon__person-qual">{p.qualification}</p>
                  )}
                  <p className="kon__person-role">{p.role}</p>
                  <a className="kon__person-tel" href={`tel:${telHref(p.phone)}`}>
                    {p.phone}
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
