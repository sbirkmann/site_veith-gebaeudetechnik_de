import { Link, Navigate, useParams } from 'react-router-dom'
import { news, newsKindLabel } from '../data/news'
import { formatDate } from '../components/ui/NewsCard'
import { useSeo } from '../hooks/useSeo'
import { Image } from '../components/ui/Image'
import { company } from '../data/company'
import { KontaktCta } from '../components/sections/KontaktCta'
import { newsDetailJsonLd } from '../seo/schema'
import './NewsDetail.scss'

export default function NewsDetail() {
  const { slug } = useParams()
  const index = news.findIndex((n) => n.slug === slug)
  const item = index >= 0 ? news[index] : undefined

  if (!item) return <Navigate to="/aktuelles" replace />

  // Neighbouring entries, so a reader can keep going without returning to the list.
  const prev = news[index + 1]
  const next = news[index - 1]

  return (
    <article className="nd">
      <NewsSeo slug={item.slug} />

      <header className="nd__head">
        <div className="container">
          <nav className="nd__crumbs" aria-label="Brotkrumen">
            <Link to="/aktuelles">Aktuelles</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{newsKindLabel[item.kind]}</span>
          </nav>

          <p className="nd__meta">
            <span className="nd__kind">{newsKindLabel[item.kind]}</span>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </p>
          <h1 className="nd__title">{item.title}</h1>
          <p className="nd__excerpt">{item.excerpt}</p>
        </div>
      </header>

      {item.image && (
        <figure className="nd__figure">
          <div className="container">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              ratio="16 / 9"
              sizes="(min-width: 78rem) 72rem, 100vw"
              priority
            />
          </div>
        </figure>
      )}

      <div className="nd__body">
        <div className="container">
          {/* Event details are the actionable part, so they sit above the prose. */}
          {item.event && (
            <aside className="nd__event">
              <h2>Termin</h2>
              <p className="nd__event-when">{item.event.when}</p>
              {item.event.where && <p className="nd__event-where">{item.event.where}</p>}
              <p className="nd__event-signup">
                Anmeldung telefonisch unter{' '}
                <a href={`tel:${company.phone.href}`}>{company.phone.display}</a> oder
                per E-Mail an <a href={`mailto:${company.email}`}>{company.email}</a>.
              </p>
            </aside>
          )}

          <div className="nd__prose">
            {item.body.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          {item.source && (
            <p className="nd__source">Quelle: {item.source.label}</p>
          )}
        </div>
      </div>

      <nav className="nd__nav" aria-label="Weitere Meldungen">
        <div className="container">
          <ul>
            {prev && (
              <li className="nd__nav-prev">
                <Link to={`/aktuelles/${prev.slug}`}>
                  <span className="nd__nav-label">Ältere Meldung</span>
                  <span className="nd__nav-title">{prev.title}</span>
                </Link>
              </li>
            )}
            {next && (
              <li className="nd__nav-next">
                <Link to={`/aktuelles/${next.slug}`}>
                  <span className="nd__nav-label">Neuere Meldung</span>
                  <span className="nd__nav-title">{next.title}</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <KontaktCta />
    </article>
  )
}

/** Split out so the SEO hook receives a stable object per article. */
function NewsSeo({ slug }: { slug: string }) {
  const item = news.find((n) => n.slug === slug)!
  useSeo({
    title: item.title,
    description: item.excerpt,
    path: `/aktuelles/${item.slug}`,
    image: item.image?.src,
    type: 'article',
    jsonLd: newsDetailJsonLd(item),
  })
  return null
}
