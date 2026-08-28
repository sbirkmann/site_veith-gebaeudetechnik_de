import { Link } from 'react-router-dom'
import { Image } from './Image'
import { newsKindLabel, type NewsItem } from '../../data/news'
import './NewsCard.scss'

interface NewsCardProps {
  item: NewsItem
  /** 'feature' gives the item its image and more room; 'compact' is a list row. */
  variant?: 'feature' | 'compact'
  /**
   * Heading level for the card's title. Pick it from the surrounding document
   * outline: h2 when the cards are the page's top-level content, h3 when they
   * sit under a section heading.
   */
  headingLevel?: 2 | 3
}

/** Formats an ISO date as it would be written in German running text. */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function NewsCard({ item, variant = 'compact', headingLevel = 3 }: NewsCardProps) {
  const Heading = `h${headingLevel}` as const
  const compact = variant === 'compact'
  return (
    <article className={`ncard ncard--${variant}`}>
      <Link className="ncard__media" to={`/aktuelles/${item.slug}`} tabIndex={-1} aria-hidden="true">
        {item.image ? (
          <Image
            src={item.image.src}
            alt=""
            ratio={compact ? undefined : '16 / 10'}
            fill={compact}
            sizes={
              compact
                ? '5.5rem'
                : '(min-width: 62rem) 32rem, 100vw'
            }
          />
        ) : (
          <span className="ncard__ph">
            <span className="ncard__ph-label">{newsKindLabel[item.kind]}</span>
          </span>
        )}
      </Link>

      <div className="ncard__body">
        <p className="ncard__meta">
          <span className="ncard__kind">{newsKindLabel[item.kind]}</span>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </p>

        <Heading className="ncard__title">
          {/* The whole card is clickable via the stretched link, but only the
              heading text is in the tab order and read out. */}
          <Link to={`/aktuelles/${item.slug}`}>{item.title}</Link>
        </Heading>

        <p className="ncard__excerpt">{item.excerpt}</p>

        {item.event && <p className="ncard__event">{item.event.when}</p>}
      </div>
    </article>
  )
}
