import { Link, Navigate, useParams } from 'react-router-dom'
import { tradeBySlug, tradeById, trades } from '../data/leistungen'
import { contactGroups, telHref } from '../data/team'
import { brands } from '../data/service'
import { useSeo } from '../hooks/useSeo'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { KontaktCta } from '../components/sections/KontaktCta'
import { company } from '../data/company'
import { PageHero } from '../components/ui/PageHero'
import { leistungJsonLd } from '../seo/schema'
import './LeistungDetail.scss'

const elektroBrandFields = new Set([
  'Elektro',
  'Gebäudetechnik',
  'Energieverteilung',
  'Schalter und KNX',
  'Elektroinstallation',
  'Verbindtechnik',
  'Verbindungstechnik',
  'Ladetechnik',
  'Schalterprogramme',
  'Türkommunikation',
  'Zeit- und Lichtsteuerung',
  'Blitz- und Überspannungsschutz',
  'Verteilerschränke',
])

export default function LeistungDetail() {
  const { slug } = useParams()
  const trade = slug ? tradeBySlug[slug] : undefined

  if (!trade) return <Navigate to="/leistungen" replace />

  const group = contactGroups.find((g) => g.id === trade.contactGroupId)
  const people = group?.people ?? []
  const showBrands = trade.id === 'elektro'
  const brandList = showBrands
    ? brands.filter((b) => elektroBrandFields.has(b.field))
    : []

  return (
    <article
      className={`ld ld--${trade.id}`}
      style={{ '--accent': trade.accent } as React.CSSProperties}
    >
      <Seo trade={trade} />

      <PageHero
        eyebrow={trade.eyebrow}
        title={trade.headline}
        lead={trade.intro}
        image={{
          src: trade.hero.src,
          alt: trade.hero.alt,
          position: trade.hero.position,
        }}
        crumbs={
          <nav aria-label="Brotkrumen">
            <Link to="/leistungen">Leistungen</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{trade.name}</span>
          </nav>
        }
      >
        <Button href={`tel:${company.phone.href}`} arrow>
          Beratung: {company.phone.display}
        </Button>
      </PageHero>

      <section className="ld__scope section--tight">
        <div className="container-wide">
          <div className="ld__scope-grid">
            <div>
              <h2 className="ld__scope-title">VEITH ist Ihr Ansprechpartner für</h2>
              <ul className="ld__scope-list">
                {trade.scope.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            {trade.topics.length > 1 && (
              <nav className="ld__index" aria-label="Themen auf dieser Seite">
                <h2 className="ld__index-title">Direkt zum Thema</h2>
                <ul>
                  {trade.topics.map((t, i) => (
                    <li key={t.id}>
                      <a href={`#${t.id}`}>
                        <span className="ld__index-num">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {t.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>

      <section className="ld__process" aria-labelledby="ld-ablauf">
        <div className="container-wide">
          <h2 className="ld__process-title" id="ld-ablauf">
            {trade.process.title}
          </h2>
          <ol className="ld__steps">
            {trade.process.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 70}>
                <span className="ld__step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {trade.aside && (
        <section className="ld__aside on-night">
          <div className="container-wide">
            <p className="ld__aside-kicker">{trade.aside.title}</p>
            <p className="ld__aside-body">{trade.aside.body}</p>
            {trade.aside.to && (
              <Link className="ld__aside-link" to={trade.aside.to}>
                {trade.aside.toLabel ?? 'Weiterlesen'}
              </Link>
            )}
          </div>
        </section>
      )}

      <div className="ld__topics">
        {trade.topics.map((topic, i) => (
          <section
            className={`ld__topic${i % 2 === 1 ? ' ld__topic--flip' : ''}${
              topic.image ? '' : ' ld__topic--text'
            }`}
            id={topic.id}
            key={topic.id}
          >
            <div className="container-wide">
              <div className="ld__topic-grid">
                {topic.image && (
                  <Reveal className="ld__topic-media">
                    <Image
                      src={topic.image.src}
                      alt={topic.image.alt}
                      ratio="4 / 3"
                      sizes="(min-width: 62rem) 40vw, 100vw"
                    />
                  </Reveal>
                )}

                <Reveal className="ld__topic-body" delay={70}>
                  <p className="ld__topic-num">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="ld__topic-title">{topic.title}</h2>
                  <p className="ld__topic-lead">{topic.lead}</p>
                  {topic.body.map((p) => (
                    <p className="ld__topic-p" key={p.slice(0, 32)}>
                      {p}
                    </p>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      {people.length > 0 && (
        <section className="ld__people section--tight" aria-labelledby="ld-kontakt">
          <div className="container-wide">
            <h2 className="ld__people-title" id="ld-kontakt">
              Ansprechpartner {trade.name}
            </h2>
            {group?.hint && <p className="ld__people-hint">{group.hint}</p>}
            {group?.note && <p className="ld__people-note">{group.note}</p>}
            <ul className="ld__people-list">
              {people.map((p) => (
                <li key={p.name + p.phone}>
                  <p className="ld__people-name">{p.name}</p>
                  {p.qualification && (
                    <p className="ld__people-qual">{p.qualification}</p>
                  )}
                  <p className="ld__people-role">{p.role}</p>
                  <a className="ld__people-tel" href={`tel:${telHref(p.phone)}`}>
                    {p.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {brandList.length > 0 && (
        <section className="ld__brands" aria-labelledby="ld-marken">
          <div className="container-wide">
            <h2 className="ld__brands-title" id="ld-marken">
              Hersteller, deren Komponenten wir verbauen
            </h2>
            <p className="ld__brands-lead">
              Die Liste stammt von der Markenseite. Keine Aussage zu Partnerstatus.
            </p>
            <ul className="ld__brands-list">
              {brandList.map((b) => (
                <li key={b.name}>
                  <a href={b.href} rel="noopener noreferrer" target="_blank">
                    {b.name}
                    <span>{b.field}</span>
                  </a>
                </li>
              ))}
            </ul>
            <Link className="ld__brands-all" to="/service/marken">
              Alle Marken
            </Link>
          </div>
        </section>
      )}

      <section className="ld__related section--tight">
        <div className="container-wide">
          <h2 className="ld__related-title">Dazu gehören auch</h2>
          <p className="ld__related-lead">
            Zu {trade.name} gehören in der Praxis auch diese Leistungen.
          </p>

          <ul className="ld__related-list">
            {trade.related.map((r) => {
              const other = tradeById[r.trade]
              return (
                <li key={r.trade}>
                  <Link
                    to={`/leistungen/${other.slug}`}
                    style={{ '--accent': other.accent } as React.CSSProperties}
                  >
                    <span className="ld__related-name">{other.name}</span>
                    <span className="ld__related-reason">{r.reason}</span>
                    <svg viewBox="0 0 20 12" aria-hidden="true" focusable="false">
                      <path
                        d="M0 6h17.5M12.5 1l5 5-5 5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.15"
                        vectorEffect="nonScalingStroke"
                      />
                    </svg>
                  </Link>
                </li>
              )
            })}
          </ul>

          <nav className="ld__all" aria-label="Alle Leistungsbereiche">
            <p className="ld__all-title">Alle Leistungsbereiche</p>
            <ul>
              {trades.map((t) => (
                <li key={t.id}>
                  <Link
                    to={`/leistungen/${t.slug}`}
                    className={t.id === trade.id ? 'is-current' : undefined}
                    aria-current={t.id === trade.id ? 'page' : undefined}
                    style={{ '--accent': t.accent } as React.CSSProperties}
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <KontaktCta
        title={`${trade.name} für Ihr Gebäude?`}
        lead="Sagen Sie uns, was ansteht. Wir schauen uns die Voraussetzungen an und sagen, was sinnvoll ist — und was nicht."
      />
    </article>
  )
}

function Seo({ trade }: { trade: (typeof trades)[number] }) {
  useSeo({
    title: trade.meta.title,
    description: trade.meta.description,
    path: `/leistungen/${trade.slug}`,
    image: trade.hero.src,
    jsonLd: leistungJsonLd(trade),
  })
  return null
}
