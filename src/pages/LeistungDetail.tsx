import { Link, Navigate, useParams } from 'react-router-dom'
import { tradeBySlug, tradeById, trades } from '../data/leistungen'
import { useSeo } from '../hooks/useSeo'
import { Image } from '../components/ui/Image'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { KontaktCta } from '../components/sections/KontaktCta'
import { company } from '../data/company'
import { PageHero } from '../components/ui/PageHero'
import { leistungJsonLd } from '../seo/schema'
import './LeistungDetail.scss'

/**
 * One Leistungsbereich.
 *
 * The page is built from the trade's own data: an opening that states what the
 * reader gets, the scope exactly as VEITH publishes it, the topics as
 * alternating full-width blocks, and the links to the trades this one depends
 * on. The accent colour threads through the rules, the topic numbers and the
 * closing CTA, so each of the five pages feels distinct inside one system.
 */
export default function LeistungDetail() {
  const { slug } = useParams()
  const trade = slug ? tradeBySlug[slug] : undefined

  // Unknown slug: send the reader to the overview rather than a dead end.
  if (!trade) return <Navigate to="/leistungen" replace />

  return (
    <article className="ld" style={{ '--accent': trade.accent } as React.CSSProperties}>
      <Seo trade={trade} />

      <PageHero
        eyebrow={trade.eyebrow}
        title={trade.headline}
        lead={trade.intro}
        image={{ src: trade.hero.src, alt: trade.hero.alt }}
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

      {/* --------------------------------------------------- scope + index */}
      <section className="ld__scope section--tight">
        <div className="container-wide">
          <div className="ld__scope-grid">
            <div>
              <h2 className="ld__scope-title">
                VEITH ist Ihr Ansprechpartner für
              </h2>
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

      {/* ---------------------------------------------------------- topics */}
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

      {/* --------------------------------------------------------- related */}
      <section className="ld__related section--tight">
        <div className="container-wide">
          <span className="ld__rule" aria-hidden="true" />
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

          {/* All five stay one click away from every trade page. */}
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

/** Split out so the hook sees a stable object identity per trade. */
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
