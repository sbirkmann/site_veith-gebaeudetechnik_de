import { useState } from 'react'
import { useSeo } from '../hooks/useSeo'
import { company } from '../data/company'
import { contactGroups, telHref } from '../data/team'
import { ContactForm } from '../components/forms/ContactForm'
import { Reveal } from '../components/ui/Reveal'
import { PageHero } from '../components/ui/PageHero'
import { iconStroke } from '../components/ui/lineIcons'
import { webPageJsonLd } from '../seo/schema'
import './Kontakt.scss'

export default function Kontakt() {
  useSeo({
    title: 'Kontakt und Ansprechpartner',
    description:
      'VEITH Gebäudetechnik in Bühl/Baden: Telefon 07223 80 100 10, Bußmatten 15. Öffnungszeiten und alle Ansprechpartner für Energie, Heizung, Klima, Sanitär und Elektro.',
    path: '/kontakt',
    image: 'beratung-showroom',
    jsonLd: webPageJsonLd({
      path: '/kontakt',
      name: 'Kontakt und Ansprechpartner',
      description:
        'VEITH Gebäudetechnik in Bühl/Baden: Telefon 07223 80 100 10, Bußmatten 15. Öffnungszeiten und alle Ansprechpartner für Energie, Heizung, Klima, Sanitär und Elektro.',
      image: 'beratung-showroom',
      type: 'ContactPage',
      crumbs: [
        { name: 'Startseite', path: '/' },
        { name: 'Kontakt', path: '/kontakt' },
      ],
    }),
  })

  const [group, setGroup] = useState(contactGroups[0].id)
  const active = contactGroups.find((g) => g.id === group) ?? contactGroups[0]
  const { address } = company

  return (
    <>
      {/* ------------------------------------------------------------ intro */}
      <PageHero
        eyebrow="Kontakt"
        title="Anrufen oder schreiben"
        lead="Termin, Störung oder Vorhaben: Zentrale in Bühl unter 07223 80 100 10 — oder das Formular."
        image={{
          src: 'beratung-showroom',
          alt: 'Beratung im Showroom: Vorführung der Gebäudesteuerung am Smartphone',
          position: '38% 35%',
        }}
      />

      <section className="kon__facts-band" aria-label="Adresse und Erreichbarkeit">
        <div className="kon__phone-strip">
          <div className="container-wide">
            <p className="kon__phone-label">Zentrale</p>
            <a className="kon__call" href={`tel:${company.phone.href}`}>
              {company.phone.display}
            </a>
          </div>
        </div>
        <div className="container-wide">
          <div className="kon__facts">
            <div className="kon__fact">
              <div className="kon__fact-head">
                <KonIconPlan />
                <h2>Adresse</h2>
              </div>
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
              <div className="kon__fact-head">
                <KonIconPinout />
                <h2>Erreichbarkeit</h2>
              </div>
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
              <div className="kon__fact-head">
                <KonIconHours />
                <h2>Öffnungszeiten</h2>
              </div>
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
      </section>

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

function KonIconPlan() {
  return (
    <svg className="kon__fact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g {...iconStroke}>
        <rect x="3.5" y="6" width="17" height="13" />
        <path d="M3.5 13h17" />
        <path d="M10 6v13" />
        <path d="M10 13h5v4h-5z" />
        <path d="M3.5 4h17" opacity="0.4" strokeWidth={0.8} />
      </g>
    </svg>
  )
}

function KonIconPinout() {
  return (
    <svg className="kon__fact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g {...iconStroke}>
        <rect x="3.5" y="6" width="3" height="3" />
        <rect x="3.5" y="10.5" width="3" height="3" />
        <rect x="3.5" y="15" width="3" height="3" />
        <path d="M6.5 7.5h14M6.5 12h14M6.5 16.5h10" />
      </g>
    </svg>
  )
}

function KonIconHours() {
  return (
    <svg className="kon__fact-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <g {...iconStroke}>
        <path d="M4 6h16" />
        <rect x="4" y="8.5" width="7" height="3" />
        <rect x="13" y="8.5" width="7" height="3" />
        <path d="M4 15h16" />
        <rect x="4" y="17.5" width="7" height="3" />
      </g>
    </svg>
  )
}
