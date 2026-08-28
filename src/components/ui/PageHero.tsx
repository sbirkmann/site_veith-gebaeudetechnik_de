import type { ReactNode } from 'react'
import { Image } from './Image'
import './PageHero.scss'

interface PageHeroProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  image?: { src: string; alt: string; position?: string }
  crumbs?: ReactNode
  children?: ReactNode
}

/**
 * Page opening. Photograph + type when the page has a real image; otherwise a
 * type field. Scrim is dark enough for WCAG AA on white type.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  crumbs,
  children,
}: PageHeroProps) {
  return (
    <header className={`pghero${image ? ' pghero--photo' : ''}`}>
      {image && (
        <div className="pghero__media">
          <Image
            src={image.src}
            alt={image.alt}
            priority
            fill
            sizes="100vw"
            position={image.position}
          />
          <div className="pghero__scrim" aria-hidden="true" />
        </div>
      )}

      <div className="pghero__inner container-wide">
        {crumbs && <div className="pghero__crumbs">{crumbs}</div>}
        <p className="pghero__eyebrow">{eyebrow}</p>
        <h1 className="pghero__title">{title}</h1>
        {lead && <div className="pghero__lead">{typeof lead === 'string' ? <p>{lead}</p> : lead}</div>}
        {children && <div className="pghero__extra">{children}</div>}
      </div>
    </header>
  )
}
